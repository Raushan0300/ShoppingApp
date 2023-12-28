import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Header from '../common/Header';

const EditProfile = () => {
  const navigation = useNavigation();
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [currentUserName, setCurrentUserName] = useState('');
  const [loading, setLoading]=useState(false);

  useEffect(() => {
    const loadUserName = async () => {
      try {
        const storedUname = await AsyncStorage.getItem('uname');
        const storedName=await AsyncStorage.getItem('userName');
        const storedEmail=await AsyncStorage.getItem('userEmail');
        setCurrentUserName(storedUname || '');
        setNewName(storedName);
        setNewEmail(storedEmail);
      } catch (error) {
        console.log('Failed to load user name', error);
      }
    };

    loadUserName();
  }, []);

  const saveChanges = async () => {
    try {
        setLoading(true)

      const userDoc = await firestore().collection('Users').doc(currentUserName).get();
      if (userDoc.exists) {
        await firestore().collection('Users').doc(currentUserName).update({
          name: newName,
          email: newEmail
        });
        await AsyncStorage.setItem('userName',newName);
        await AsyncStorage.setItem('userEmail',newEmail);

        Alert.alert('Success', 'Profile updated successfully!');
      } else {
        Alert.alert('Error', 'User not found in Firestore');
      }
    } catch (error) {
      console.log('Failed to save changes', error);
      Alert.alert('Error', 'Failed to save changes');
    } finally{
        setLoading(false);
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>

        <Header leftIcon={require('../images/back.png')}
        title={'Edit Profile'}
        onClickLeftIcon={()=>{navigation.goBack()}}/>
      <View style={styles.mainView}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setNewName(text)}
          value={newName}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your new email"
          value={newEmail}
          onChangeText={(text) => setNewEmail(text)}
        />
      </View>

      {!loading?(<TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>):<ActivityIndicator size={'large'}/>}
      </View>
    </GestureHandlerRootView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainView:{
    marginTop:30,
    width:'80%',
    alignSelf:'center'
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#666666',
  },
  currentName: {
    fontSize: 16,
    color: '#333333',
  },
  input: {
    height: 40,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#333333',
  },
  saveButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});
