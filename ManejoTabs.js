import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Usuario1 from './Usuario1';
import Usuario2 from './Usuario2';
import Usuario3 from './Usuario3';

const Tab = createBottomTabNavigator();

export default class ManejoTabs extends Component {
  render() {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: 'cyan',
          tabBarActiveBackgroundColor: 'gray',
          tabBarInactiveTintColor: 'black',
        }}
      >
        <Tab.Screen
          name="Inicio"
          component={Usuario1}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="play" color='black' size={size} />
              )
          }}
        />
                <Tab.Screen
          name="Registros"
          component={Usuario2}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="database" color='black' size={size} />
              )
          }}
        />
                <Tab.Screen
          name="Anuncios"
          component={Usuario3}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="forum" color='black' size={size} />
              )
          }}
        />
      </Tab.Navigator>
    );
  }
}
