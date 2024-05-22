import React, { Component } from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import { Button, Input } from '@rneui/base';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Usuario1 from './Usuario1';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      correo: "",
      password: "",
    };
  }

  entrar = () => {
    const { correo, password } = this.state;
    let _this=this;
    var http = new XMLHttpRequest();
    var url = 'http://148.202.152.33/cucei/autentificacion_siauu_temporal.php';
    var params = 'codigo=' + encodeURIComponent(correo) + '&nip=' + encodeURIComponent(password);
  
    http.open('POST', url, true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  
    http.onreadystatechange = function() {
      if (http.readyState == 4 && http.status == 200) {
        if (http.responseText == '0') {
          alert('datos incorrectos');
        } else {
          _this.props.navigation.navigate("Usuario1");
          alert(http.responseText);
        }
      }
    };
  
    http.send(params);
  }
  
  
  
  

  handleCorreoChange = (correo) => {
    this.setState({ correo });
  }

  handlePasswordChange = (password) => {
    this.setState({ password });
  }

  render() {
    return (
      <View>
        <ImageBackground source={require('./Imagenes/1.jpg')} style={styles.backgroundImage}>
          <View style={styles.formContainer}>
            <Input
              placeholder='Codigo'
              onChangeText={this.handleCorreoChange}
              leftIcon={{ type: 'font-awesome', name: 'user', color: 'red' }}
              inputStyle={{ color: 'white' }}
            />
            <Input
              placeholder='NIP'
              onChangeText={this.handlePasswordChange}
              secureTextEntry={true}
              leftIcon={{ type: 'font-awesome', name: 'lock', color: 'red' }}
              inputStyle={{ color: 'white' }}
            />
            <Button
              title="Entrar"
              onPress={this.entrar}
              icon={{
                name: 'arrow-right',
                type: 'font-awesome',
                size: 15,
                color: 'white',
              }}
              buttonStyle={{
                backgroundColor: 'rgba(90, 154, 230, 1)',
                borderRadius: 30,
              }}
              containerStyle={{
                width: 200,
                marginHorizontal: 'auto',
                marginTop: 20,
              }}
            />
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  formContainer: {
    marginTop: 200,
    paddingHorizontal: 20,
  },
});