import React, { Component } from 'react';
import { Container, Header, Tab, Tabs, TabHeading, Icon } from 'native-base';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';


export default class MenuPrincipalUI extends Component {

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
      <View >
      <Text style={styles.welcome}>ReserveIt</Text>
      <Text>----------</Text>
      <Text style={{textStyle: 'italic'}}>"¿Qué deseas hacer ahora?"</Text>
      <Button
        title='Explorar todo el catálogo >'
        onPress={() => {
          this.props.navigation.navigate('VerCatalogoCompletoUI');
        }}
      />
      <Button
        title='Explorar usando filtros >'
        onPress={() => {
          this.props.navigation.navigate('FiltroCatalogoUI');
        }}
      />
      <Text>----------</Text>
      <Button
        title='Mis reservas >'
        onPress={() => {
          this.props.navigation.navigate('MisReservasUI');
        }}
      />
      <Button
        title='Mis suscripciones >'
        onPress={() => {
          this.props.navigation.navigate('SuscripcionesUI');
        }}
      />
      <Text>----------</Text>
    </View>
    );
  }


} /* end of MenuPrincipalUI class */

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