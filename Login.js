import React, { Component } from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import { Button, Input } from '@rneui/base';
import AsyncStorage from '@react-native-async-storage/async-storage';


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
    const _this = this;
    const http = new XMLHttpRequest();
    const url = 'http://148.202.152.33/cucei/autentificacion_siauu_temporal.php';
    const params = 'codigo=' + encodeURIComponent(correo) + '&nip=' + encodeURIComponent(password);

    http.open('POST', url, true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function() {
      if (http.readyState === 4 && http.status === 200) {
        const responseParts = http.responseText.split(',');
        if (responseParts[0] === '0') {
          alert('Datos incorrectos');
        } else {
          const codigoAlumno = responseParts[1];
          const nombreAlumno = responseParts[2];
          console.log(nombreAlumno);
          console.log(codigoAlumno);

          if (codigoAlumno && nombreAlumno) {
            AsyncStorage.setItem('codigoAlumno', codigoAlumno)
              .then(() => {
                console.log('Código de alumno guardado correctamente');
              })
              .catch(error => {
                console.error('Error al guardar código de alumno:', error);
              });

            AsyncStorage.setItem('nombreAlumno', nombreAlumno)
              .then(() => {
                console.log('Nombre de alumno guardado correctamente');
              })
              .catch(error => {
                console.error('Error al guardar nombre de alumno:', error);
              });

            // Navegar a la pantalla Usuario1 (ManejoTabs) y pasar los datos como parámetros
            //_this.props.navigation.navigate("Usuario1", { nombreAlumno, codigoAlumno });
            _this.props.navigation.navigate("Usuario1");
          } else {
            alert('Los datos de alumno no están completos');
          }
        }
      }
    };

    http.send(params);
  };

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
