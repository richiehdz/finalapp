import React, { Component } from 'react';
import { View, Text } from 'react-native';


export default class Usuario2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{marginTop:300,marginLeft:200}}>
        <Text style={{color:'black'}}> Tiempo total: </Text>
      </View>
    );
  }
}
