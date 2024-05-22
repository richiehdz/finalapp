import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Login from './Login';
import Usuario1 from './Usuario1';
import Usuario2 from './Usuario2';
import Usuario3 from './Usuario3';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Tab = createBottomTabNavigator();

export default class ManejoTabs extends Component {
  componentDidMount() {
    this.verificarDatosAlumno();
  }

  verificarDatosAlumno = async () => {
    try {
      const codigoAlumno = await AsyncStorage.getItem('codigoAlumno');
      if (codigoAlumno) {
        // Si se han guardado datos de código de alumno, navegar a Usuario1
        this.props.navigation.navigate('Usuario1');
      } else {
        // Si no se han guardado datos de código de alumno, navegar a Login
        this.props.navigation.navigate('Login');
      }
    } catch (error) {
      console.error('Error al verificar datos del alumno:', error);
    }
  };

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
