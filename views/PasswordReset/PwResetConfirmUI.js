import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  CheckBox,
  Alert
} from 'react-native';



export default class ForgotPasswordConfirmUI extends Component {

  // opciones para personalizar la navegación (ej: titulo en ActionBar)
  static navigationOptions = {
    title: 'Reestablecer Contraseña'
  }

  constructor(props) {
    super(props);

    // establecimiento del estado inicial del componente
    this.state = {
      pwResetConfirmCode: ''
    };
  }

  /**
   * Renderización del componente vía JSX
   */
  render() {
    // JSX va aquí :D
    return (
      <View style={styles.container}>
        <Text>Para reestablecer su contraseña debe ingresar el código que fue enviado a su correo electrónico.</Text>
        <Text>--------------------</Text>
        <Text>Código de confirmación:</Text>
        <TextInput
          style={styles.textInput}
          placeholder='Ej: QszZXZlgb2YgZGVsaWdod...'
          returnKeyType='go'
          onChangeText={(newText) => { this.setState({ pwResetConfirmCode: newText }) }}
          onSubmitEditing={() => { this.txtPassword.focus() }}
        />

        <Button
          title='Enviar Solicitud'
          onPress={() => { Alert.alert('No implementado', 'Esta función aún no está implementada') }}
        />
      </View>
    );
  } /* end of render() method */


} /* end of ForgotPasswordConfirmUI class */



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
  },
});