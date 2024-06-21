import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MyStyles from "../../styles/MyStyles";
import Footer from "../../styles/Footer";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import MyContext from '../../configs/MyContext';

const HomeAdmin = () => {
    const nav = useNavigation();
    const [user, dispatch] = useContext(MyContext);

    return(
        <View style={MyStyles.container}>
            <ScrollView>
                <View style={{marginLeft: 90}}>
                    <Text style={styles.subject}>Hi, {[user.first_name, user.last_name].join(' ')}!</Text>
                    <TouchableOpacity style={[styles.buttonContainer, { backgroundColor: '#1E90FF' }]} 
                        onPress={() => nav.navigate('Tuyến Xe')}>
                    <Text style={[MyStyles.text, MyStyles.margin]}>Quản lý tuyến xe</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.buttonContainer, { backgroundColor: 'red' }]}  onPress={() => nav.navigate('Nhân Viên')}>
                    <Text style={[MyStyles.text, MyStyles.margin]}>Quản lý nhân viên</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.buttonContainer, { backgroundColor: 'yellow' }]}  onPress={() => nav.navigate('Tài Xế')}>
                    <Text style={[MyStyles.text, MyStyles.margin]}>Quản lý Tài xế</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.buttonContainer, { backgroundColor: 'pink' }]}  onPress={() => nav.navigate('Khách Hàng')}>
                    <Text style={[MyStyles.text, MyStyles.margin]}>Quản lý khách hàng</Text>
                    </TouchableOpacity>
                </View>
                
            </ScrollView>
        </View>
    );

}

const styles = StyleSheet.create ({
    subject: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#BF6B7B",
        marginTop: 10,
        marginLeft: 40,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        width: 200,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
})

export default HomeAdmin;