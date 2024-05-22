import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, AppState } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackgroundTimer from 'react-native-background-timer';

export default class Usuario1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      horas: 0,
      minutos: 0,
      segundos: 0,
      corriendo: false,
      nombreAlumno: '',
      codigoAlumno: '',
      appState: AppState.currentState,
    };
    this.intervalo = null;
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.obtenerNombreAlumno();
    });

    AppState.addEventListener('change', this.handleAppStateChange);

    // Cargar el estado del contador desde AsyncStorage
    this.cargarEstadoContador();
  }

  componentWillUnmount() {
    if (this.focusListener) {
      this.focusListener.remove();
    }
    this.detenerContador(); // Detén el contador cuando el componente se desmonte
    AppState.removeEventListener('change', this.handleAppStateChange);

   
    this.guardarEstadoContador();
  }

  handleAppStateChange = async nextAppState => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      // La aplicación volvió a estar activa
      this.obtenerNombreAlumno();
      await this.cargarEstadoContador(); // Cargar el estado del contador cuando la aplicación vuelva a estar activa
    }
    this.setState({ appState: nextAppState });
  };

  cargarEstadoContador = async () => {
    try {
      const estado = await AsyncStorage.getItem('estadoContador');
      if (estado !== null) {
        const { corriendo, horas, minutos, segundos } = JSON.parse(estado);
        this.setState({ corriendo, horas, minutos, segundos });
        if (corriendo) {
          this.iniciarContador();
        }
      }
    } catch (error) {
      console.error('Error al cargar el estado del contador:', error);
    }
  };

  guardarEstadoContador = async () => {
    try {
      const { corriendo, horas, minutos, segundos } = this.state;
      await AsyncStorage.setItem('estadoContador', JSON.stringify({ corriendo, horas, minutos, segundos }));
    } catch (error) {
      console.error('Error al guardar el estado del contador:', error);
    }
  };

  obtenerNombreAlumno = async () => {
    try {
      const nombreAlumno = await AsyncStorage.getItem('nombreAlumno');
      const codigoAlumno = await AsyncStorage.getItem('codigoAlumno');
      if (nombreAlumno !== null && codigoAlumno !== null) {
        this.setState({ nombreAlumno, codigoAlumno }, () => {
          if (this.state.corriendo) {
            this.iniciarContador();
          }
        });
      }
    } catch (error) {
      console.error('Error al obtener el nombre y código del alumno:', error);
    }
  };

  iniciarContador = () => {
    if (!this.state.corriendo) {
      this.setState({ corriendo: true });
      this.intervalo = BackgroundTimer.setInterval(this.actualizarTiempo, 1000);
    }
  };
  

  detenerContador = () => {
    BackgroundTimer.clearInterval(this.intervalo);
    this.setState({ corriendo: false });
  };

  reiniciarContador = () => {
    BackgroundTimer.clearInterval(this.intervalo);
    this.setState({ horas: 0, minutos: 0, segundos: 0, corriendo: false });
  };

  actualizarTiempo = () => {
    const { horas, minutos, segundos } = this.state;
    let nuevosSegundos = segundos + 1;
    let nuevosMinutos = minutos;
    let nuevasHoras = horas;
    if (nuevosSegundos === 60) {
      nuevosSegundos = 0;
      nuevosMinutos += 1;
    }
    if (nuevosMinutos === 60) {
      nuevosMinutos = 0;
      nuevasHoras += 1;
    }
    this.setState({ horas: nuevasHoras, minutos: nuevosMinutos, segundos: nuevosSegundos });
  };

  enviarTiempo = () => {
    const { nombreAlumno, codigoAlumno, horas, minutos, segundos } = this.state;

    fetch('https://finalappbestmx.000webhostapp.com/enviarTiempo.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `codigoAlumno=${encodeURIComponent(codigoAlumno)}&nombreAlumno=${encodeURIComponent(nombreAlumno)}&horas=${encodeURIComponent(horas)}&minutos=${encodeURIComponent(minutos)}&segundos=${encodeURIComponent(segundos)}`,
    })
      .then(response => response.text())
      .then(data => {
        console.log(data);
        this.reiniciarContador();
      })
      .catch(error => {
        console.error('Error al enviar tiempo:', error);
      });
  };

  cerrarSesion = async () => {
    try {
      await AsyncStorage.removeItem('codigoAlumno');
      await AsyncStorage.removeItem('nombreAlumno');
      this.props.navigation.navigate('Login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  toggleContador = () => {
    if (this.state.corriendo) {
      this.detenerContador();
    } else {
      this.iniciarContador();
    }
  };

  render() {
    const { horas, minutos, segundos, corriendo, nombreAlumno, codigoAlumno } = this.state;

    return (
      <View>
        <ImageBackground source={require('./Imagenes/tab1.jpeg')} style={styles.backgroundImage}>
          <View style={{ marginTop: 50 }}>
            <Text style={{ color: 'white', marginLeft: '5%' }}>Bienvenido {nombreAlumno}</Text>
            <Text style={{ color: 'white', marginLeft: '5%' }}>Código Alumno: {codigoAlumno}</Text>
          </View>
          <View style={{ marginTop: 100 }}></View>
          <Text style={{ fontSize: 45, marginLeft: '5%', color: 'white' }}>
            Tiempo: {horas.toString().padStart(2, '0')}:{minutos.toString().padStart(2, '0')}:{segundos.toString().padStart(2, '0')}
          </Text>
          <TouchableOpacity style={styles.boton} onPress={this.toggleContador}>
            <Text style={styles.textoBoton}>{corriendo ? 'Detener' : 'Iniciar'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.boton} onPress={this.reiniciarContador}>
            <Text style={styles.textoBoton}>Reiniciar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.boton} onPress={this.enviarTiempo}>
            <Text style={styles.textoBoton}>Enviar Tiempo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botonCerrarSesion} onPress={this.cerrarSesion}>
            <Text style={styles.textoBoton}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  boton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
    width: 300,
    marginLeft: '10%',
  },
  botonCerrarSesion: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
    width: 300,
    marginLeft: '10%',
  },
  textoBoton: {
    color: 'white',
    fontSize: 16,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
});