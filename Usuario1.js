import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';

export default class ContadorTiempo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      horas: 0,
      minutos: 0,
      segundos: 0,
      corriendo: false,
    };
    this.intervalo = null;
  }

  iniciarContador = () => {
    this.setState({ corriendo: true });
    this.intervalo = setInterval(this.actualizarTiempo, 1000);
  };

  detenerContador = () => {
    clearInterval(this.intervalo);
    this.setState({ corriendo: false });
  };

  reiniciarContador = () => {
    clearInterval(this.intervalo);
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
    const { codigoAlumno, nombreAlumno } = this.props;
    const { horas, minutos, segundos } = this.state;

    // Enviar datos al servidor
    fetch('https://finalappbestmx.000webhostapp.com/enviarTiempo.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `codigoAlumno=${codigoAlumno}&nombreAlumno=${nombreAlumno}&horas=${horas}&minutos=${minutos}&segundos=${segundos}`,
    })
      .then(response => response.text())
      .then(data => {
        console.log(data); // Puedes manejar la respuesta del servidor aquí
        // Reiniciar contador después de enviar datos
        this.reiniciarContador();
      })
      .catch(error => {
        console.error('Error al enviar tiempo:', error);
      });

  };

  render() {
    const { nombreAlumno, codigoAlumno } = this.props; // Recibir los parámetros directamente desde props
    console.log('Nombre Alumno:', nombreAlumno);
    console.log('Código Alumno:', codigoAlumno);
    const { horas, minutos, segundos, corriendo } = this.state;

    return (
      <View>
        <ImageBackground source={require('./Imagenes/tab1.jpeg')} style={styles.backgroundImage}>
        <View style={{ marginTop: 50 }}>
          <Text style={{ color: 'white', marginLeft: '5%' }}>Bienvenido {this.props.nombreAlumno}</Text>
          <Text style={{ color: 'white', marginLeft: '5%' }}>Código Alumno: {this.props.codigoAlumno}</Text>
        </View>
        <View style={{ marginTop: 100 }}></View>
        <Text style={{ fontSize: 45, marginLeft: '5%',color:'white' }}>Tiempo: {horas.toString().padStart(2, '0')}:{minutos.toString().padStart(2, '0')}:{segundos.toString().padStart(2, '0')}</Text>
        <TouchableOpacity style={styles.boton} onPress={corriendo ? this.detenerContador : this.iniciarContador}>
          <Text style={styles.textoBoton}>{corriendo ? 'Detener' : 'Iniciar'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.boton} onPress={this.reiniciarContador}>
          <Text style={styles.textoBoton}>Reiniciar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.boton} onPress={this.enviarTiempo}>
          <Text style={styles.textoBoton}>Enviar Tiempo</Text>
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
    marginLeft: '10%'
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
