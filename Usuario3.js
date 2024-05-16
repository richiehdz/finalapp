import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Linking } from 'react-native';

export default class Usuario3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anuncios: [],
      expandedAnuncioId: null,
    };
  }

  componentDidMount() {
    this.fetchAnuncios();
  }

  fetchAnuncios = () => {
    var xhr = new XMLHttpRequest();
    var url = 'https://finalappbestmx.000webhostapp.com/obtener_anuncios.php';
    xhr.open('GET', url, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const anuncios = JSON.parse(xhr.responseText);
        this.setState({ anuncios });
      }
    };
    xhr.send();
  };
  recargarAnuncios = () => {
    this.fetchAnuncios();
  };
  openLink = () => {
    Linking.openURL('https://finalappbestmx.000webhostapp.com/crear_anuncio.php');
  };

  toggleDescription = (id) => {
    this.setState((prevState) => ({
      expandedAnuncioId: prevState.expandedAnuncioId === id ? null : id,
    }));
  };

  renderDescription = (descripcion, id) => {
    const { expandedAnuncioId } = this.state;
    if (descripcion.length > 100) {
      if (expandedAnuncioId === id) {
        return (
          <Text style={styles.descripcion}>{descripcion}</Text>
        );
      } else {
        return (
          <TouchableOpacity onPress={() => this.toggleDescription(id)}>
            <Text style={styles.descripcion}>{descripcion.substring(0, 100)}...</Text>
            <Text style={styles.leerMas}>Leer más</Text>
          </TouchableOpacity>
        );
      }
    } else {
      return (
        <Text style={styles.descripcion}>{descripcion}</Text>
      );
    }
  };

  renderItem = ({ item }) => (
    <View style={styles.anuncio}>
      <Text style={styles.titulo}>{item.titulo}</Text>
      <Text style={styles.fecha}>{new Date(item.fecha).toLocaleString()}</Text>
      {this.renderDescription(item.descripcion, item.id)}
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Anuncios</Text>
        <TouchableOpacity onPress={this.openLink} style={styles.boton}>
          <Text style={styles.botonTexto}>Crear Anuncio</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.recargarAnuncios} style={styles.botonRecargar}>
          <Text style={styles.botonTexto}>Recargar Anuncios</Text>
        </TouchableOpacity>
        <FlatList
          data={this.state.anuncios}
          renderItem={this.renderItem}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  boton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  botonTexto: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  botonRecargar: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  anuncio: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  fecha: {
    marginTop: 8,
    fontStyle: 'italic',
    color: '#666',
  },
  descripcion: {
    marginTop: 8,
  },
  leerMas: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
