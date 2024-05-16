// Inicio.js
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Usuario1 from './ManejoTabs';

const Stack = createNativeStackNavigator();

export default class Inicio extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="ManejoTabs"
            component={Usuario1}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
