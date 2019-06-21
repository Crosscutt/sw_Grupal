import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Alert
} from 'react-native';


export default class PwResetSuccessUI extends Component {

  // opciones para personalizar la navegación (ej: titulo en ActionBar)
  static navigationOptions = {
    title: 'Reestablecer Contraseña'
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
        <Text>--------------------</Text>
        <Text style={styles.welcome}>Contraseña Reestablecida.</Text>
        <Text>
          Ha reestablecido su contraseña de forma exitosa. Proceda a iniciar sesión.
        </Text>
        <Text>--------------------</Text>
        <Button
          title='Iniciar Sesión'
          onPress={() => { this.props.navigation.navigate('LoginUI') }}
        />
      </View>
    );
  } /* end of render() method */


} /* end of PwResetSuccessUI class */



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FCFCFC',
    padding: 10
  },
  horizontalContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FCFCFC',
    padding: 10
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