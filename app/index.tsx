import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import Home from './Components/Home';
import Menu from './Components/Menu';
import Feedbacks from './Components/Feedbacks';
import Help from './Components/Help';
import Cart from './Components/Cart';

const Stack = createStackNavigator();

const Index = () => {
  

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Signup" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }} />
        <Stack.Screen name="feedback" component={Feedbacks} options={{headerShown:false}}/>
        <Stack.Screen name="help" component={Help} options={{headerShown:false}}/>
        <Stack.Screen name="cart" component={Cart} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Index;

const styles = StyleSheet.create({});
