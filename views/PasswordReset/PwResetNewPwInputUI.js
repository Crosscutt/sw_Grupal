import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Alert
} from 'react-native';
import { Validador } from '../../logic/Validadores';


export default class PwResetNewPwInputUI extends Component {

  // opciones para personalizar la navegación (ej: titulo en ActionBar)
  static navigationOptions = {
    title: 'Reestablecer Contraseña'
  }

  constructor(props) {
    super(props);

    // establecimiento del estado inicial del componente
    this.state = {
      password: '',
      confirmPassword: ''
    };

    this.validador = new Validador();
  }

  /**
   * Renderización del componente vía JSX
   */
  render() {
    // JSX va aquí :D
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Establecer nueva contraseña.</Text>
        <Text>
          Para finalizar el proceso de reestablecimiento de su contraseña olvidada,
          debe especificar una nueva contraseña.
        </Text>
        <Text>--------------------</Text>
        <Text>Contraseña: </Text>
        <TextInput
          style={styles.textInput}
          placeholder='****'
          secureTextEntry
          password
          returnKeyType='next'
          onChangeText={(newText) => { this.setState({ password: newText }) }}
          onSubmitEditing={() => {
            if (this.validarPassword())
              this.txtConfirmPassword.focus()
          }}
        />
        <Text>Confirmar contraseña: </Text>
        <TextInput
          ref={(thisTxt) => { this.txtConfirmPassword = thisTxt }}
          style={styles.textInput}
          placeholder='****'
          secureTextEntry
          password
          returnKeyType='go'
          onChangeText={(newText) => { this.setState({ confirmPassword: newText }) }}
          onSubmitEditing={() => { this.reestablecerPassword() }}
        />
        <Button
          title='Reestablecer Contraseña >'
          onPress={() => { this.reestablecerPassword(); }}
        />

      </View>
    );
  } /* end of render() method */



  /**
   * Valida el password ingresado
   */
  validarPassword() {
    if (!this.validador.validarPassword(this.state.password)) {
      // TO DO: mecanismo para informar qué 
      Alert.alert('Error', `La contraseña debe tener al menos ${this.validador.passwordMinLength} caracteres.`);
      return false;
    }
    return true;
  }


  /**
   * Valida que las contraseñas ingresadas sean iguales
   */
  validarPasswords() {
    if (!this.validador.validarPasswords(this.state.password, this.state.confirmPassword)) {
      Alert.alert('Error', 'Las contraseñas ingresadas no coinciden.');
      return false;
    }
    return true;
  }


  /**
   * Valida todos los datos del form, y lanza alertas en caso de que haya
   * errores de validación.
   */
  validarForm() {
    return (this.validarPasswords());
  }


  /**
   * 
   */
  reestablecerPassword() {
    /*  Por hacer:
        - enviar solicitud al servidor para confirmar el reestablecimiento de pw
        - esperar mensaje de confirmación de reestablecimiento exitoso
        - en caso de éxito, informar al usuario y redirigirlo al LoginUI
        - en caso de fallo, informar al usuario para reintentar o informar al admin
     */
    if (this.validarForm()) {
      Alert.alert('Contraseña reestablecida!',
        'Proceda a iniciar sesión con su nueva contraseña');
      this.props.navigation.navigate('LoginUI');
    }
  }


} /* end of PwResetNewPwInputUI class */



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