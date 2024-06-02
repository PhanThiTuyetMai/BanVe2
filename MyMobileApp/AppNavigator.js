// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import NhanVienDetail from './components/NhanVien/NhanVienDetail';

// Import các màn hình của Drawer

const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="NhanVienDetail" component={NhanVienDetail} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

