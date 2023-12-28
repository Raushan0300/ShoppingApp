import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import firestore from '@react-native-firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Account = () => {
    const navigation=useNavigation();
    const [page, setPage]=useState(0);
    const [name, setName]=useState('');
    const [email, setEmail]=useState('');
    const [pass, setPass]=useState('');
    const [uname, setUname]=useState('');
    const [isLoading, setIsLoading]=useState(0);

    const SignUp=async()=>{
        setIsLoading(1);
        const userExists=await CheckUname();
        if(!userExists){
            await firestore()
            .collection('Users')
            .doc(uname)
            .set({
                name:name,
                email:email,
                password:pass,
                username:uname,
                cart:[],
                favourite:[]
            })
            .then(async()=>{
                console.log('User Added');
                Alert.alert('Account Created Successfully!');
                await saveUserDataToLocal();
                setIsLoading(0);
            });
        } else{
            Alert.alert('User Name not available. Try again!');
            setIsLoading(0);
        };
    };

    const CheckUname=async()=>{
        const user = await firestore().collection('Users').doc(uname).get();
        return user.exists;
    };

    const CheckPass=async()=>{
        const userDoc=await firestore().collection('Users').doc(uname).get();
        if(userDoc.exists){
            const password=userDoc.data().password;
            return password===pass;
        } else{
            return false;
        };
    };

    const LogIn=async()=>{
        setIsLoading(1)
        const userExists=await CheckUname();
        if(userExists){
            const password=await CheckPass();
            if(password){
                await saveUserDataToLocal();
                console.log('Success');
                navigation.navigate('BottomTab');
            } else{
                Alert.alert('Incorrect Password');
            };
        } else{
            Alert.alert('User not found');
        };
        setIsLoading(0);
    };
    const saveUserDataToLocal=async()=>{
        const userDoc=await firestore().collection('Users').doc(uname).get();
        const name=userDoc.data().name;
        const email=userDoc.data().email;
        await AsyncStorage.setItem('userLoggedIn', 'true');
        await AsyncStorage.setItem('userEmail',email);
        await AsyncStorage.setItem('userName',name);
        await AsyncStorage.setItem('uname',uname);
    };
  return (
    <View style={styles.container}>
      {page==0?(
        <View style={styles.formView}>
        <View style={styles.titleHeader}>
            <Text style={styles.title}>Log In</Text>
        </View>
        <View style={styles.formContainer}>
            <TextInput placeholder='User Name' value={uname} onChangeText={text=>{setUname(text)}} style={styles.form}/>
            <TextInput placeholder='Password' value={pass} onChangeText={text=>{setPass(text)}} style={styles.form}/>
        </View>
        <View style={styles.btnView}>
            <TouchableOpacity style={styles.btnLogin} activeOpacity={1} onPress={()=>{LogIn()}}>
                {isLoading==0?(<Text style={styles.btnLoginText}>Log In</Text>):<ActivityIndicator size={'large'} color={'#fff'}/>}
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnSignup} onPress={()=>{setPage(1)}}>
                <Text style={styles.btnSignupText}>Sign Up</Text>
            </TouchableOpacity>
        </View>
      </View>
      ):
      <View style={styles.formView}>
        <View style={styles.titleHeader}>
            <Text style={styles.title}>Sign Up</Text>
        </View>
        <View style={styles.formContainer}>
            <TextInput placeholder='Name' value={name} onChangeText={text=>{setName(text)}} style={styles.form}/>
            <TextInput placeholder='E-Mail' value={email} onChangeText={text=>{setEmail(text)}} style={styles.form}/>
            <TextInput placeholder='Password' value={pass} onChangeText={text=>{setPass(text)}} style={styles.form}/>
            <TextInput placeholder='User Name' value={uname} onChangeText={text=>{setUname(text)}} style={styles.form}/>
        </View>
        <View style={styles.btnView}>
            <TouchableOpacity style={styles.btnLogin} onPress={()=>{SignUp()}} activeOpacity={1}>
                {isLoading==0?(<Text style={styles.btnLoginText}>Sign Up</Text>):<ActivityIndicator size={'large'} color={'#fff'}/>}
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnSignup} onPress={()=>{setPage(0)}}>
                <Text style={styles.btnSignupText}>Log In</Text>
            </TouchableOpacity>
        </View>
      </View>}
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    title:{
        fontSize:40,
        color:'#fff',
        fontWeight:'700',
    },
    formView:{
        justifyContent:'center',
        alignItems:'center',
        width:'80%',
        alignSelf:'center',
        borderWidth:2.5,
        borderRadius:30,
        paddingBottom:30,
    },
    form:{
        borderBottomWidth:0.5,
        width:'75%',
        paddingBottom:0,
        marginTop:10,
        paddingLeft:10,
    },
    titleHeader:{
        backgroundColor:'#000',
        width:'100%',
        borderTopEndRadius:20,
        borderTopStartRadius:20,
        alignContent:'center',
        alignItems:'center'
    },
    formContainer:{
        width:'90%',
        justifyContent:'center',
        alignItems:'center',
        borderWidth:0.5,
        backgroundColor:'#fff',
        paddingBottom:10,
        marginTop:10,
        borderRadius:15,
    },
    btnView:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:15,
        width:'100%'
    },
    btnLogin:{
        backgroundColor:'blue',
        height:40,
        width:'60%',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
    },
    btnSignup:{
        marginTop:15,
        borderBottomWidth:0.5
    },
    btnLoginText:{
        fontSize:18,
        color:'#fff',
        fontWeight:'500'
    },
    btnSignupText:{
        color:'#000'
    }
});