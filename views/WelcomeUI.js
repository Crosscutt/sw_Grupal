import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';


export default class WelcomeUI extends Component {

  // opciones para personalizar la navegación (ej: titulo en ActionBar)
  static navigationOptions = {
    title: 'ReserveIt'
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
        <Text style={styles.welcome}>ReserveIt</Text>
        <Text>----------</Text>
        <Text>"Salvando alimentos, un plato a la vez."</Text>
        <Text>----------</Text>
        <Text>¡Bienvenido!</Text>
        <Text>----------</Text>
        <Button
          title='Iniciar Sesión'
          onPress={() => {
            this.props.navigation.navigate('LoginUI');
          }}
        />
        <Text>----------</Text>
      </View>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FCFCFC',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});