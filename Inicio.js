// Inicio.js
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Usuario1 from './ManejoTabs';
import Login from './Login';

const Stack = createNativeStackNavigator();

export default class Inicio extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name="Usuario1" component={Usuario1} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
