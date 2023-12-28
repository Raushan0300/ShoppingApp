import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTab from './common/BottomTab';
import { Swipeable } from 'react-native-gesture-handler';

const Main = () => {
    const Drawer=createDrawerNavigator();
  return (
    <Drawer.Navigator>
        <Drawer.Screen name='BottomTab' component={BottomTab} options={{headerShown:false, swipeEnabled:false}}/>
    </Drawer.Navigator>
  )
}

export default Main;

const styles = StyleSheet.create({});