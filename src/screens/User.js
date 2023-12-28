import { ActivityIndicator, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../common/Header';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const User = () => {
  const navigation=useNavigation();
  const [userName, setUserName]=useState('');
  const [userEmail, setUserEmail]=useState('');
  const [isLoggedIn, setIsLoggedIn]=useState(false);
  const [loading, setLoading]=useState(false);

  useFocusEffect(
    React.useCallback(()=>{
      getUserData();
    },[])
  );

  const getUserData=async()=>{
    try {
      setLoading(true);
      const loggedIn=await AsyncStorage.getItem('userLoggedIn');
    if(loggedIn==='true'){
      const storedName=await AsyncStorage.getItem('userName');
      const storedEmail=await AsyncStorage.getItem('userEmail');

      setUserName(storedName||'');
      setUserEmail(storedEmail||'');
      setIsLoggedIn(true);
    } else{
      setIsLoggedIn(false);
    }
    } catch (error) {
      console.log('not load data', error);
    } finally{
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <Header
      RightIcon={require('../images/cart.png')}
      title={'Profile'}
      onClickLeftIcon={()=>{}}
      onClickRightIcon={()=>{navigation.navigate('Cart')}}/>
      <Text style={styles.name}>{userName}</Text>
      {!isLoggedIn && !loading &&(<TouchableOpacity onPress={()=>{navigation.navigate('Account')}} style={styles.logIn}>
        <Text style={styles.loginText}>Log In</Text>
      </TouchableOpacity>)}
      {loading&&<ActivityIndicator size={'large'}/>}
      <Text style={styles.email}>{userEmail}</Text>
      {isLoggedIn && !loading && (<View style={styles.profileView}>
        <TouchableOpacity style={styles.profileBtn} onPress={()=>{navigation.navigate('EditProfile')}}>
          <Image source={require('../images/edit.png')} style={styles.icon} />
          <Text style={styles.btnText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileBtn}>
          <Image source={require('../images/wallet.png')} style={styles.icon} />
          <Text style={styles.btnText}>Saved Cards</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileBtn}>
          <Image source={require('../images/pin.png')} style={styles.icon} />
          <Text style={styles.btnText}>Saved Addresses</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileBtn}>
          <Image source={require('../images/help.png')} style={styles.icon} />
          <Text style={styles.btnText}>Help Centre</Text>
        </TouchableOpacity>
      </View>)}
    </View>
  )
}

export default User

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  name:{
    fontSize:30,
    fontWeight:'700',
    marginLeft:15,
    marginTop:20,
    color:'#000'
  },
  email:{
    color:'#000',
    marginLeft:15,
    fontSize:15,
    marginTop:5,
  },
  profileView:{
    width:Dimensions.get('window').width-30,
    alignSelf:'center',
    marginTop:50
  },
  profileBtn:{
    marginTop:5,
    borderWidth:0.5,
    borderRadius:10,
    height:35,
    flexDirection:'row',
    alignItems:'center'
  },
  btnText:{
    fontSize:15,
    color:'#000',
    marginLeft:20,
  },
  icon:{
    width:24,
    height:24,
    marginLeft:10
  },
  logIn:{
    backgroundColor:'#038ff3',
    width:'60%',
    height:40,
    alignSelf:'center',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
  },
  loginText:{
    color:'#fff',
    fontSize:22,
    fontWeight:'500'
  }
})