import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Home from '../screens/Home';
import Search from '../screens/Search';
import Favourite from '../screens/Favourite';
import User from '../screens/User';

const BottomTab = () => {
    const [tab, setTab]=useState(0);
    const navigation=useNavigation();
  return (
    <View style={styles.container}>
        {tab==0?(<Home/>):tab==1?(<Search/>):tab==2?(<Favourite/>):(<User/>)}
    <View style={styles.bottomView}>
        <TouchableOpacity style={styles.bottomTab} onPress={()=>{setTab(0)}}>
            <Image source={tab==0?require('../images/home_fill.png'):require('../images/home.png')} style={styles.icon}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomTab} onPress={()=>{setTab(1)}}>
            <Image source={tab==1?require('../images/search_fill.png'):require('../images/search.png')} style={styles.icon}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomTab} onPress={()=>{setTab(2)}}>
            <Image source={tab==2?require('../images/star_fill.png'):require('../images/star.png')} style={styles.icon}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomTab} onPress={()=>{setTab(3)}}>
            <Image source={tab==3?require('../images/user_fill.png'):require('../images/user.png')} style={styles.icon}/>
        </TouchableOpacity>
    </View>
    </View>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    bottomView:{
        position:'absolute',
        bottom:0,
        width:'100%',
        height:50,
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',
        backgroundColor:'#fff',
    },
    bottomTab:{
        justifyContent:'center',
        alignItems:'center',
    },
    icon:{
        width:24,
        height:24,
    },
});