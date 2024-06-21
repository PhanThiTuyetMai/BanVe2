import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Alert, View, TouchableOpacity, Image, KeyboardAvoidingView} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import API, { endpoints } from '../../configs/API';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { TextInput, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SuaNhanVien = ({ route }) => {
    const navigation = useNavigation();
    const { nhanvienID } = route.params;
    const [id, setID] = useState('');
    const [name, setName] = useState('');
    const [ngaySinh, setNgaySinh] = useState('');
    const [gioiTinh, setGioiTinh] = useState('');
    const [diaChi, setDiaChi] = useState('');
    const [cmnd, setCMND] = useState('');
    const [dienThoai, setDienThoai] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState(null); 
    const [oldAvatar, setOldAvatar] = useState(null); 
    const [newAvatar, setNewAvatar] = useState(null); 

    useEffect(() => {
        NhanVienData();
    }, [nhanvienID]);

    const NhanVienData = async () => {
        try {
            const token = await AsyncStorage.getItem('access_token');
            if(token){
                const headers = {
                    'Authorization': `Bearer ${token}`
                };
                const response = await API.get(`${endpoints['nhanvien']}?ma_nhanvien=${nhanvienID}`, {headers});
                const data = response.data.results;
                data && data.map(
                    c => {
                        console.log(c.avatar);
                        setID(c.id);
                        setName(c.Ten_NV);
                        setNgaySinh(c.NgaySinh);
                        setGioiTinh(c.GioiTinh);
                        setDiaChi(c.DiaChi);
                        setCMND(c.CMND);
                        setDienThoai(c.DienThoai);
                        setEmail(c.Email);
                        setAvatar(c.avatar); 
                        setOldAvatar(c.avatar); 
                    }
                )
            } else {
                Alert.alert('Bạn có phải là Quản Lý!!', 'Vui lòng đăng nhập đúng tài khoản!')
            }
        } catch (error) {
            console.error('Lỗi khi lấy thông tin nhân viên:', error);
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;
            const fileNameWithExtension = uri.substring(uri.lastIndexOf('/') + 1); 
            setNewAvatar(fileNameWithExtension); 
        }
    };

    const gotoDetail = (NhanVienID) => {
        navigation.navigate('NhanVienDetail', { NhanVienID })
    };

    const suaNhanVien = async () => {
        try {
            const token = await AsyncStorage.getItem('access_token');
            if (!token) {
                throw new Error('Khong Tim Thay Access token');
            }
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            };
            await API.put(`${endpoints['nhanvien']}${nhanvienID}/Sua_NV/`, {
                Ten_NV: name,
                NgaySinh: ngaySinh,
                GioiTinh: gioiTinh,
                DiaChi: diaChi,
                CMND: cmnd,
                DienThoai: dienThoai,
                Email: email,
                avatar: newAvatar || oldAvatar, 
            }, {headers});
            await NhanVienData();
            console.log('Thông tin nhân viên đã được cập nhật');
            Alert.alert(
                'Cập nhật thành công',
                'Bạn vui lòng quay lại trang Nhân Viên để xem sự thay đổi. Nếu bạn không thấy sự thay đổi vui lòng thoát và tải lại',
                [
                    {
                        text: 'OK',
                        onPress: () => navigation.navigate('Nhân Viên - Danh Sách')
                    },
                ],
                { cancelable: false }
            )
        } catch (error) {
            Alert.alert('Lỗi', 'Lỗi khi cập nhật thông tin nhân viên!!!')
        }
    };
    
    return (
        <KeyboardAvoidingView>
            <ScrollView style={styles.container}>
                <Text style={styles.label}>Tên nhân viên:</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                />
                <Text style={styles.label}>Ngày Sinh:</Text>
                <TextInput
                    style={styles.input}
                    value={ngaySinh}
                    onChangeText={setNgaySinh}
                />
                <Text style={styles.label}>Giới Tính:</Text>
                <TextInput
                    style={styles.input}
                    value={gioiTinh}
                    onChangeText={setGioiTinh}
                />
                <Text style={styles.label}>Địa Chỉ:</Text>
                <TextInput
                    style={styles.input}
                    value={diaChi}
                    onChangeText={setDiaChi}
                />
                <Text style={styles.label}>CMND:</Text>
                <TextInput
                    style={styles.input}
                    value={cmnd}
                    onChangeText={setCMND}
                />
                <Text style={styles.label}>Điện Thoại:</Text>
                <TextInput
                    style={styles.input}
                    value={dienThoai}
                    onChangeText={setDienThoai}
                />
                <Text style={styles.label}>Email:</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                />
                <View style={{ marginBottom: 30 }}>
                    <View style={styles.imagePickerContainer}>
                        <Text style={{ marginRight: 10 }}>Chọn ảnh đại diện:</Text>
                        <Button style={{backgroundColor: "#4f6e4b"}} mode="contained" onPress={pickImage}>CHỌN ẢNH</Button>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        {newAvatar ? (
                            <Image source={{ uri: 
                            `file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FMyMobileApp-caeae716-14f8-42e8-8345-b048446019bf/ImagePicker/${newAvatar.substring(newAvatar.lastIndexOf('/') + 1)}`
                            }} style={styles.image} />
                        ) : (
                                avatar && <Image source={{uri: avatar.endsWith('.jpeg') ? 
                                `file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FMyMobileApp-caeae716-14f8-42e8-8345-b048446019bf/ImagePicker/${newAvatar.substring(newAvatar.lastIndexOf('/') + 1)}` : avatar}} 
                                style={styles.image} />
                            )}
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, { width: 150 }]} onPress={() => gotoDetail(id)}>
                        <Text style={styles.buttonText}>Quay Lại</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, { width: 150 }]} onPress={suaNhanVien}>
                        <Text style={styles.buttonText}>Cập nhật</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    image: {
        width: 200,
        height: 200,
        marginTop: 10,
        borderRadius: 5,
    },
    imagePickerContainer: {
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        marginBottom: 5,
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        marginBottom: 15,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        fontSize: 16,
        backgroundColor:'#F2CED5'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 35,
    },
    button: {
        backgroundColor: '#BF6B7B',
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginHorizontal: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default SuaNhanVien;