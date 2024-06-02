import { useContext } from "react";
import { Button } from "react-native"
import MyContext from "../../configs/MyContext";
import { useNavigation } from "@react-navigation/native";

const Logout = () => {
    const [user, dispatch] = useContext(MyContext);
    const navigation = useNavigation();

    const logout = () => {
        dispatch({
            "type": "logout"
        })
    }

    const goToLogin = () => {
        navigation.navigate('Login');
    }

    if (user === null)
        return <Button title="Đăng Nhập" onPress={goToLogin} />
    
    return <Button title="Đăng Xuất" onPress={logout} />
}

export default Logout;