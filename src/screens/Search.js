import { Dimensions, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Header from '../common/Header';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const Search = () => {
    const navigation=useNavigation();
    const [searchText, setSearchText]=useState('');
    const product=useSelector(state=>state);
    const [productData, setProductData]=useState(product.product.data);
    const [searchedList, setSearchedList]=useState([]);
    const filterData=text=>{
      let newData=productData.filter(item=>{
        return item.title && item.title.toLowerCase().includes(text.toLowerCase())
      });
      setSearchedList(newData);
    };
  return (
    <View style={styles.container}>
      <Header
      RightIcon={require('../images/cart.png')}
      title={'Search'}
      onClickLeftIcon={()=>{}}
      onClickRightIcon={()=>(navigation.navigate('Cart'))}/>

      <View style={styles.searchBar}>
        <Image source={require('../images/search.png')} style={styles.icon}/>
        <TextInput placeholder='Search Here...' value={searchText}
        onChangeText={text=>{
          setSearchText(text);
          filterData(text);
          }} style={styles.input}/>
        {searchText?(<TouchableOpacity onPress={()=>{
          setSearchText('');
          setSearchedList([]);}}>
          <Image source={require('../images/closed.png')} style={styles.icon}/>
        </TouchableOpacity>):(<View style={styles.icon}></View>)}
      </View>
      <FlatList data={searchedList} renderItem={({item, index})=>{
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

export default Search;

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    searchBar:{
        width:'90%',
        height:50,
        borderWidth:0.5,
        alignSelf:'center',
        marginTop:20,
        borderRadius:20,
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        paddingHorizontal:20,
    },
    icon:{
        width:24,
        height:24
    },
    input:{
        width:'80%',
        color:"#000",
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