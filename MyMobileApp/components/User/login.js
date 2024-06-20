import { ScrollView, StyleSheet, Text, View } from "react-native"
import MyStyles from "../../styles/MyStyles"
import { Button, TextInput, TouchableRipple } from "react-native-paper";
import LoginStyle from "./LoginStyle";
import { useContext, useState } from "react";
import MyContext from "../../configs/MyContext";
import API, { authAPI, endpoints } from "../../configs/API";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, dispatch] = useContext(MyContext);
  const [loading, setLoading ] = useState(false);
 
  const login = async () => {
    setLoading(true);
    try{
          const formData = new FormData();
          formData.append('username', username);
          formData.append('password', password);
          formData.append('client_id', "bs7r97ArUviQw1i7szIJTWuuNUlnaqye1DYQbgbP");
          formData.append('client_secret', "pU5wRaAJ9wH1dz9YrZTdQB3NNo0SAtdSxIx2hKhHCkGfskOpj0b6wN32qoNkWsWCt6JmO5uvzgFIaGvdlxv8IlHQc1svwr3OkuANk6OhLm0y0KtjkH2X3VQdtGdmmHWU");
          formData.append('grant_type', "password");

          const config = {
            headers: {
              'Content-Type': 'multipart/form-data', 
            },
          };

          const res = await API.post(endpoints['login'], formData, config);

          await AsyncStorage.setItem('access_token', res.data.access_token)
          
          let user = await authAPI(res.data.access_token).get(endpoints['current-user']);
          
          dispatch({
            "type": "login",
            "payload": user.data
          });

          navigation.navigate("Home");

    } catch(ex){
      console.error(ex);
    }
  }
  
  return (
      <View style={MyStyles.container}>
          <ScrollView>
            <Text style={[MyStyles.subject, {marginTop: 80, marginBottom: 50}]}>ĐĂNG NHẬP</Text>
            <TextInput value={username} onChangeText={t => setUsername(t)} placeholder="Tên đăng nhập..." style={LoginStyle.input} right={<TextInput.Icon icon="account"/>}/>
            <TextInput value={password} onChangeText={t => setPassword(t)} secureTextEntry={true} placeholder="Mật khẩu..." style={LoginStyle.input} right={<TextInput.Icon icon="eye"/>}/>
            <Button style={{backgroundColor: "#BF6B7B", marginTop: 60}} loading={loading} icon="account" mode="contained" onPress={login}>ĐĂNG NHẬP</Button>
          </ScrollView>
      </View>
  )
}
  
export default Login;  