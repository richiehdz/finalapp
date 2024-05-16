import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default class Usuario3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anuncios: [],
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
        this.setState({ anuncios: JSON.parse(xhr.responseText) });
      }
    };
    xhr.send();
  };

  renderItem = ({ item }) => (
    <View style={styles.anuncio}>
      <Text style={styles.titulo}>{item.titulo}</Text>
      <Text>{item.descripcion}</Text>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Anuncios</Text>
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
});
