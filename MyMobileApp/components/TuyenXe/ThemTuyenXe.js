import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Alert, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-paper";
import API, { BASE_URL, endpoints } from "../../configs/API";
import MyStyles from "../../styles/MyStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ThemTuyenXe = () => {
    const nav = useNavigation();
    const [tuyenXe, setTuyenXe] = useState({});

    const fields = [{
        "label": "Tên tuyến xe",
        "icon": "text",
        "name": "Ten_tuyen"
    
    }, {
        "label": "Điểm đi",
        "icon": "text",
        "name": "Diendi"
    }, {
        "label": "Điểm đến",
        "icon": "text",
        "name": "Diemden"
    }, {
        "label": "Bảng giá",
        "icon": "text",
        "name": "BangGia"
    },];

    const updateState = (field, value) => {
        setTuyenXe(current => {
            return {...current, [field]: value}
        })
    }

    const addTuyenXe = async() => {
        try {
            let form = new FormData();
            for(key in tuyenXe)
                form.append(key, tuyenXe[key]);
            console.info(form);
            const token = await AsyncStorage.getItem('access_token');
            let response = await API.post(endpoints['them_tuyenXe'],form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.status !== 201) {
                throw new Error('Đã xảy ra lỗi khi thêm tuyến xe.');
            } else {
                Alert.alert('Thêm tuyến xe thành công. Vui lòng quay lại trang Danh Sách Tuyến Xe xem kết quả');
                nav.navigate('Danh Sách Tuyến Xe')
            }

            

        } catch (err) {
            console.error(err);
            Alert.alert('Đã xảy ra lỗi khi thêm tuyến xe.');
        }
        
    };

    const quayLai = () => {
        nav.navigate('Danh Sách Tuyến Xe');
    }

    return (
        <KeyboardAvoidingView>
            <ScrollView>
                {fields.map(t => <TextInput
                value={tuyenXe[t.name]}
                onChangeText={c => updateState(t.name, c)} 
                key={t.label} 
                style={MyStyles.margin}
                label={t.label}
                right={<TextInput.Icon icon={t.icon} />} />)}

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, {width: 'auto'}]} onPress={quayLai}>
                        <Text style={styles.buttonText}>Quay lại</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, {width: 'auto'}]} onPress={addTuyenXe}>
                        <Text style={styles.buttonText}>Thêm tuyến xe</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
        
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        marginTop: 20,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginHorizontal: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ThemTuyenXe;