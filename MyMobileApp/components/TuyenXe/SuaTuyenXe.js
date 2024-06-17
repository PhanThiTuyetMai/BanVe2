import { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-paper";
import API, { endpoints } from "../../configs/API";
import { useNavigation } from "@react-navigation/native";
import MyStyles from "../../styles/MyStyles";

const SuaTuyenXe = ({route}) => {
    const { TuyenXeID } = route.params;
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

    useEffect(() => {
        TuyenXeData();
    }, [TuyenXeID]);


    const updateState = (field, value) => {
        setTuyenXe(current => {
            return {...current, [field]: value}
        })
    };

    const TuyenXeData = async () => {
        try {
            const res = await API.get(`${endpoints['tuyenxe']}?q=${TuyenXeID}`);
            const data = res.data.results;
            if (data && data.length > 0) {
                setTuyenXe(data[0]);
            }
        } catch (err) {
            console.error('Lỗi khi lấy thông tin tuyến xe.',err);
        }
    };

    const suaTuyenXe = async () => {
        try {
            await API.put(`${endpoints['tuyenxe']}${TuyenXeID}/Sua_TuyenXe/`, {
                Ten_tuyen: tuyenXe.Ten_tuyen,
                Diendi: tuyenXe.Diendi,
                Diemden: tuyenXe.Diemden,
                BangGia: tuyenXe.BangGia,
            });
            await TuyenXeData();
            console.log('Thông tin tuyến xe đã được cập nhật');
            Alert.alert(
                'Cập nhật thành công',
                'Bạn vui lòng quay lại trang Tuyến xe để xem sự thay đổi. Nếu không thấy sự thay đổi vui lòng thoát và tải lại.',
                [
                    {
                        text: 'OK',
                        onPress: () => nav.navigate('Danh Sách Tuyến Xe')
                    }
                ],
                {cancelable: false}
            )

        } catch (err) {
            console.error('Lỗi khi cập nhật thông tin tuyến xe.', err);
        }
    }

    // const xoaTuyenXe = async () => {
    //     try {
    //         await API.delete(`${endpoints['tuyenxe']}${TuyenXeID}/Xoa_TuyenXe`,);
    //         Alert.alert('Xóa tuyến xe thành công.');
    //         nav.navigate('Danh sách tuyến xe');
    //     } catch (err) {
    //         console.error('Không thể xóa tuyến xe.', err);
    //     }
    // }

    const xoaTuyenXe = async () => {
        Alert.alert(
            'Xác nhận xóa',
            'Bạn có chắc chắn muốn xóa tuyến xe này?',
            [
                {
                    text: 'Hủy',
                    style: 'cancel',
                },
                {
                    text: 'Xóa',
                    onPress: async () => {
                        try {
                            const res = await API.delete(`${endpoints['tuyenxe']}${TuyenXeID}/Xoa_TuyenXe`);
                            if (res.status === 204) {
                                console.log('Tuyến xe được xóa thành công');
                                Alert.alert(
                                    'Xóa thành công',
                                    'Bạn vui lòng quay lại trang Tuyến Xe để xem sự thay đổi. Nếu bạn không thấy sự thay đổi vui lòng thoát và tải lại',
                                    [
                                        {
                                            text: 'OK',
                                            onPress: () => navigation.navigate('Danh Sách Tuyến Xe')
                                        },
                                    ],
                                    { cancelable: false }
                                );
                            } else {
                                console.error('Không thể xóa tuyến xe');
                            }
                        } catch (error) {
                            console.error('Error:', error);
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <ScrollView>
            {fields.map(t => <TextInput
                value={tuyenXe[t.name]}
                onChangeText={c => updateState(t.name, c)} 
                key={t.label} 
                style={MyStyles.margin}
                label={t.label}
                right={<TextInput.Icon icon={t.icon} />} />)}
            
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, { width: 150 }]} onPress={suaTuyenXe}>
                    <Text>SAVE</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { width: 150 }]} onPress={xoaTuyenXe}>
                    <Text>DELETE</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 35,
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

export default SuaTuyenXe;