import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ToastAndroid,
  Alert
} from 'react-native';



export default class ForgotPasswordRequestUI extends Component {

  // opciones para personalizar la navegación (ej: titulo en ActionBar)
  static navigationOptions = {
    title: 'Reestablecer Contraseña'
  }

  constructor(props) {
    super(props);

    // establecimiento del estado inicial del componente
    this.state = {
      email: ''
    };
  }

  /**
   * Renderización del componente vía JSX
   */
  render() {
    // JSX va aquí :D
    return (
      <View style={styles.container}>
        <Text>Para solicitar el reestablecimiento de su cuenta, ingrese su dirección de correo electrónico.</Text>
        <Text>--------------------</Text>
        <Text>Correo Electrónico:</Text>
        <TextInput
          style={styles.textInput}
          placeholder='Ej: alguien@mail.com'
          returnKeyType='go'
          onChangeText={(newText) => { this.setState({ email: newText }) }}
          onSubmitEditing={() => { this.solicitarCodigoReestablecimiento() }}
        />

        <Button
          title='Enviar Solicitud'
          onPress={() => { this.solicitarCodigoReestablecimiento() }}
        />
      </View>
    );
  } /* end of render() method */


  /**
   * Envía una solicitud al servidor instruyendo el envío de un código de confirmación
   * a la dirección de email especificada, dado que la misma corresponda a una cuenta
   * de usuario válida y activa. 
   */
  solicitarCodigoReestablecimiento() {
    Alert.alert('No implementado', 'Esta función aún no está implementada');
    ToastAndroid.show(`Email: ${this.state.email}`, ToastAndroid.LONG);
  }


} /* end of ForgotPasswordRequestUI class */



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FCFCFC',
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