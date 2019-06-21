import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image
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
        <Text style={styles.welcome}>Bienvenido</Text>
        <Text>"Salvando alimentos, un plato a la vez."</Text>
        <Image
          style={{ height: 250, width: 210,resizeMode:"stretch"}}
          source={require('../Imagenes/oficial.png')}
        />
        <Image />
        <Button
          title='Iniciar Sesión'
          onPress={() => {
            this.props.navigation.navigate('LoginUI');
          }}
        />
      </View>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F2E0',
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    fontWeight: "bold"
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});