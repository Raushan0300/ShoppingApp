import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../common/Header';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Cart = () => {
  const navigation=useNavigation();
  const [products, setProducts]=useState([]);

  useFocusEffect(
    React.useCallback(async () => {
      try {
        const productString = await AsyncStorage.getItem('cart');
        if (productString) {
          const productArray = JSON.parse(productString);
          setProducts(productArray);
        }
      } catch (error) {
        console.log('Error fetching cart data:', error);
      }
    }, [])
  );
  

  return (
    <GestureHandlerRootView style={styles.container}>
      <Header leftIcon={require('../images/back.png')}
      title={'Cart'}
      onClickLeftIcon={()=>{navigation.goBack()}}/>

        <FlatList data={products} renderItem={({item, index})=>{
          return(
            <TouchableOpacity style={styles.productItem} onPress={()=>{navigation.navigate('ProductDetail', {data:item})}}>
              <Image source={{uri:item.image}} style={styles.itemImage} />
              <View style={{width:Dimensions.get('window').width-100}}>
                <Text style={styles.title}>{item.title.length>25 ? item.title.substring(0,25)+'...':item.title}</Text>
                <Text style={styles.desc}>{item.description.length>60 ? item.description.substring(0,60)+'...':item.description}</Text>
                <Text style={styles.price}>{'₹'+item.price}</Text>
              </View>
            </TouchableOpacity>
          )
        }} />
    </GestureHandlerRootView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  productItem:{
    width:Dimensions.get('window').width,
    height:100,
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'#fff',
    marginTop:10
  },
  itemImage:{
    width:90,
    height:90,
    resizeMode:'contain',
    marginLeft:5
  },
  title:{
    color:'#000',
    fontSize:17,
    fontWeight:'500',
    marginLeft:10
  },
  desc:{
    color:'#000',
    fontSize:10,
    marginLeft:10
  },
  price:{
    marginLeft:10,
    color:'#22560b',
    fontSize:19,
    fontWeight:'600',
    marginTop:5
  }
});