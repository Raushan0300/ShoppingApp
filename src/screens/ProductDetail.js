import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Header from '../common/Header';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductDetail = () => {
    const navigation=useNavigation();
    const route=useRoute();
    const addToCart = async () => {
        try {
          const user = await AsyncStorage.getItem('uname');
          if (user) {
            const userDoc = await firestore().collection('Users').doc(user).get();
            if (userDoc.exists) {
              let cart = userDoc.data().cart || [];
              if (!Array.isArray(cart)) {
                // If cart is not an array (e.g., undefined), set it to an empty array
                cart = [];
              }
              cart.push(route.params.data);
              await firestore().collection('Users').doc(user).update({
                cart: cart,
              });
              await AsyncStorage.setItem('cart', JSON.stringify(cart));
            } else {
              console.log('User document does not exist');
            }
          } else {
            console.log('User is not logged in');
          }
        } catch (error) {
          console.error('Error adding to cart:', error);
        }
      };      

      const addToFavourite = async () => {
        try {
          const user = await AsyncStorage.getItem('uname');
          if (user) {
            const userDoc = await firestore().collection('Users').doc(user).get();
            if (userDoc.exists) {
              let cart = userDoc.data().favourite || [];
              if (!Array.isArray(cart)) {
                cart = [];
              }
              cart.push(route.params.data);
              await firestore().collection('Users').doc(user).update({
                favourite: cart,
              });
              await AsyncStorage.setItem('favourite', JSON.stringify(cart));
            } else {
              console.log('User document does not exist');
            }
          } else {
            console.log('User is not logged in');
          }
        } catch (error) {
          console.error('Error adding to cart:', error);
        }
      }
      
  return (
    <GestureHandlerRootView style={styles.container}>
      <Header leftIcon={require('../images/back.png')}
      RightIcon={require('../images/cart.png')}
      onClickLeftIcon={()=>{navigation.goBack()}}
      onClickRightIcon={()=>{navigation.navigate('Cart')}} />
      <ScrollView>
        <Image source={{uri:route.params.data.image}} style={styles.img} />
        <TouchableOpacity style={styles.iconBtn} onPress={()=>{addToFavourite()}}>
            <Image source={require('../images/star.png')} style={styles.icon}/>
        </TouchableOpacity>
        <Text style={styles.title}>{route.params.data.title}</Text>
        <Text style={styles.desc}>{route.params.data.description}</Text>
        <View style={styles.prview}>
            <Text style={[styles.price, {color:'#000'}]}>Price:</Text>
            <Text style={[styles.price, {marginLeft:5}]}>{'₹'+route.params.data.price}</Text>
        </View>
        <View>
            <TouchableOpacity style={styles.cartBtn} onPress={()=>{addToCart()}}>
                <Text style={styles.cartBtnText}>Add to Cart</Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    },
    img:{
        width:'90%',
        height:350,
        resizeMode:'contain',
        marginTop:10,
        alignSelf:'center',
    },
    title:{
        color:'#000',
        fontSize:22,
        fontWeight:'600',
        marginHorizontal:20,
        marginTop:20
    },
    desc:{
        color:'#000',
        fontSize:14,
        marginHorizontal:20,
        marginTop:10,
    },
    price:{
        marginLeft:20,
        marginTop:20,
        color:'#22560b',
        fontSize:22,
        fontWeight:'700'
    },
    prview:{
        flexDirection:'row',
    },
    cartBtn:{
        backgroundColor:'#038ff3',
        width:'80%',
        alignSelf:'center',
        marginTop:50,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:15,
        bottom:20,
    },
    cartBtnText:{
        color:'#fff',
        fontSize:20,
        fontWeight:'500',
    },
    icon:{
        width:24,
        height:24,
    },
    iconBtn:{
        position:'absolute',
        top:20,
        right:20,
    }
});