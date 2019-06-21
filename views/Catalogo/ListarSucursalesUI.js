import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';



export default class ListarSucursalesUI extends Component {

  // opciones para personalizar la navegación (ej: titulo en ActionBar)
  static navigationOptions = {
    title: 'Lista de Sucursales'
  }

  constructor(props) {
    super(props);

    // establecimiento del estado inicial del componente
    this.state = {};
  }

  /**
   * Renderización del componente vía JSX
   */
  render() {
    // JSX va aquí :D
    return (
      <View style={styles.container}>
        <Text>----------</Text>
        <Text style={styles.welcome}>Lista de Sucursales</Text>
        <ScrollView>
          <Text>Sucursal</Text>
          <Text>Sucursal</Text>
          <Text>Sucursal</Text>
          <Text>Sucursal</Text>
          <Text>Sucursal</Text>
          <Text>Sucursal</Text>
          <Text>Sucursal</Text>
        </ScrollView>
        <Text>----------</Text>
      </View>
    );
  }
  
} /* end of ListarSucursalesUI class */



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FCFCFC'
  },
  horizontalContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#FCFCFC'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'silver',
    borderRadius: 3,
    height: 40
  }
});