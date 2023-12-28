import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './src/Main';
import Cart from './src/screens/Cart';
import ProductDetail from './src/screens/ProductDetail';
import { Provider } from 'react-redux';
import { Store } from './src/redux/Store';
import Account from './src/screens/Account';
import EditProfile from './src/screens/EditProfile';

const App = () => {
  const Stack=createNativeStackNavigator();
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Main' component={Main} options={{headerShown:false}}/>
          <Stack.Screen name='Cart' component={Cart} options={{headerShown:false}}/>
          <Stack.Screen name='ProductDetail' component={ProductDetail} options={{headerShown:false}}/>
          <Stack.Screen name='Account' component={Account} options={{headerShown:false}}/>
          <Stack.Screen name='EditProfile' component={EditProfile} options={{headerShown:false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});