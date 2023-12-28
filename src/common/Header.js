import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Header = ({title, leftIcon, RightIcon, onClickLeftIcon, onClickRightIcon}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.btn} onPress={()=>{onClickLeftIcon()}}>
        <Image source={leftIcon} style={styles.icon}/>
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity style={styles.btn} onPress={()=>{onClickRightIcon()}} >
        <Image source={RightIcon} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
    header:{
        width:Dimensions.get('window').width,
        height:60,
        backgroundColor:'#41fbf3',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:20
    },
    btn:{
      width:40,
      height:40,
      justifyContent:'center',
      alignItems:'center'
    },
    icon:{
      width:24,
      height:24,
    },
    title:{
      color:'#000',
      fontSize:20,
      fontWeight:'600'
    }
});