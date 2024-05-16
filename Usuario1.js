import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default class Usuario1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tiempoTranscurrido: 0,
      contadorIniciado: false,
      contadorPausado: false
    };
    this.iniciarContador = this.iniciarContador.bind(this);
    this.pausarContador = this.pausarContador.bind(this);
    this.detenerContador = this.detenerContador.bind(this);
    this.reanudarContador = this.reanudarContador.bind(this);
  }

  iniciarContador() {
    this.setState({ contadorIniciado: true, contadorPausado: false });
    this.intervalo = setInterval(() => {
      this.setState(prevState => ({
        tiempoTranscurrido: prevState.tiempoTranscurrido + 1
      }));
    }, 1000); // Actualiza el contador cada segundo
  }

  pausarContador() {
    clearInterval(this.intervalo);
    this.setState({ contadorPausado: true });
  }

  detenerContador() {
    clearInterval(this.intervalo);
    this.setState({ contadorIniciado: false, contadorPausado: false, tiempoTranscurrido: 0 });
  }

  reanudarContador() {
    this.setState({ contadorPausado: false });
    this.iniciarContador();
  }

  render() {
    return (
      <View style={{ marginTop: 100, marginLeft: 50 }}>
        <Text style={{ color: 'black' }}>Contador de esta sesion...</Text>
        <Text style={{ color: 'black' }}>Tiempo transcurrido en esta sesion: {this.state.tiempoTranscurrido} segundos</Text>
        {!this.state.contadorIniciado && (
          <TouchableOpacity onPress={this.iniciarContador} style={{ padding: 10, backgroundColor: 'blue', borderRadius: 5 ,width:300}}>
            <Text style={{ color: 'white' }}>Iniciar Contador</Text>
          </TouchableOpacity>
        )}
        {this.state.contadorIniciado && !this.state.contadorPausado && (
          <TouchableOpacity onPress={this.pausarContador} style={{ padding: 10, backgroundColor: 'red', borderRadius: 5 ,width:300}}>
            <Text style={{ color: 'white' }}>Pausar Contador</Text>
          </TouchableOpacity>
        )}
        {this.state.contadorIniciado && this.state.contadorPausado && (
          <TouchableOpacity onPress={this.reanudarContador} style={{ padding: 10, backgroundColor: 'green', borderRadius: 5  ,width:300}}>
            <Text style={{ color: 'white' }}>Reanudar Contador</Text>
          </TouchableOpacity>
        )}
        {this.state.contadorIniciado && (
          <TouchableOpacity onPress={this.detenerContador} style={{ padding: 10, backgroundColor: 'gray', borderRadius: 5 ,width:300 }}>
            <Text style={{ color: 'white' }}>Detener Contador</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}
