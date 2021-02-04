/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import 'react-native-gesture-handler';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import Home from './screens/Home';
import Register from './screens/Register';
import Login from './screens/Login';
import ChangePassword from './screens/ChangePassword';
import ForgotPassword from './screens/ForgotPassword';

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'home'}>
        <Stack.Screen options={{ 
          title:'Home Page'
         }} name={'home'} component={Home} />
        <Stack.Screen options={{ 
          title:'Register',
          headerShown:false
         }} name={'register'} component={Register} />
        <Stack.Screen options={{ 
          headerShown:false,
          title:'Login'
         }} name={'login'} component={Login} />
        <Stack.Screen options={{ 
          headerShown:false,
          title:'Change Password'
         }} name={'change-password'} component={ChangePassword} />
        <Stack.Screen options={{ 
          title:'Forgot Password',
          headerShown:false,
         }} name={'forgot-password'} component={ForgotPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
