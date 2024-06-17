import React from 'react';
import { TouchableOpacity, Text, Alert } from 'react-native';
import axios from 'axios';
import { Linking } from 'react-native';

const PaymentButton = ({ amount }) => {
  const handlePaymentPress = async () => {
    try {
      const response = await axios.post('http://192.168.0.103:8000/zalo/payment/', null, {
        headers: {
          amount: amount.toString(), 
        },
      });
      
      if (response.data.order_url) {
        Alert.alert('Thông báo', 'Chuyển hướng đến trang thanh toán...');
        Linking.openURL(response.data.order_url);
      }
    } catch (error) {
      console.error('Lỗi khi gọi API thanh toán:', error);
      Alert.alert('Lỗi', 'Đã xảy ra lỗi khi thanh toán');
    }
  };

  return (
    <TouchableOpacity onPress={handlePaymentPress} style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5 }}>
      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Thanh toán</Text>
    </TouchableOpacity>
  );
};

export default PaymentButton;
