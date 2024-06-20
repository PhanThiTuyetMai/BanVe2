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

    if (user === null) {
        return (
            <Button
                style={{ backgroundColor: "#BF6B7B", margin: 10 }} // Thiết lập màu và margin
                onPress={goToLogin}
                title="Đăng nhập" // Sử dụng title thay vì children nếu không dùng mode="contained"
            />
        );
    }

    return (
        <Button
            style={{ backgroundColor: "#BF6B7B", margin: 10 }} // Thiết lập màu và margin
            onPress={logout}
            title="Đăng xuất" // Sử dụng title thay vì children nếu không dùng mode="contained"
        />
    );
}

export default Logout;