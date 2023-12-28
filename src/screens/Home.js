import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../common/Header';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/slices/ProductSlice';

const Home = () => {
  const navigation=useNavigation();
  const [products, setProducts]=useState([]);
  const dispatch=useDispatch();

  useEffect(()=>{
    getProducts();
  },[])

  const getProducts=()=>{
    fetch('https://fakestoreapi.com/products')
        .then(res=>res.json())
        .then(json=>{
          setProducts(json);
          dispatch(addProduct(json))});
  }


  return (
    <View style={styles.container}>
        <Header title={'Shopping'}
        RightIcon={require('../images/cart.png')}
        onClickLeftIcon={()=>{}}
        onClickRightIcon={()=>{navigation.navigate('Cart')}} />

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
    </View>
  );
};

export default Home;

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