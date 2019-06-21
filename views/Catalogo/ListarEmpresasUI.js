import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';



export default class ListarEmpresasUI extends Component {

  // opciones para personalizar la navegación (ej: titulo en ActionBar)
  static navigationOptions = {
    title: 'Lista de Empresas'
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
        <Text style={styles.welcome}>Lista de Empresas</Text>
        <ScrollView>
          <Text>Empresa1</Text>
          <Text>Empresa2</Text>
          <Text>Empresa3</Text>
          <Text>Empresa4</Text>
          <Text>Empresa5</Text>
          <Text>Empresa6</Text>
          <Text>Empresa7</Text>
        </ScrollView>
        <Text>----------</Text>
      </View>
    );
  }
  
} /* end of ListarEmpresasUI class */



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
    height: 40,
    width: '75%'
  }
});