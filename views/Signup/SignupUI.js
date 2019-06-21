import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Alert
} from 'react-native';
//comentaimport { Validadores } from '../logic/Validadores.js';


export default class SignupUI extends Component {

  // opciones para personalizar la navegación (ej: titulo en ActionBar)
  static navigationOptions = {
    title: 'Crear cuenta nueva'
  }

  constructor(props) {
    super(props);

    // establecimiento del estado inicial del componente
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      email: ''
    };

    // instanciar validadores
    this.validador = new Validadores();
  }

  /**
   * Renderización del componente vía JSX
   */
  render() {
    // JSX va aquí :D
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Registrar nueva cuenta</Text>
        <Text>Nombre de Usuario: </Text>
        <TextInput
          style={styles.textInput}
          placeholder='Ej: Adam Smith'
          returnKeyType='next'
          onChangeText={(newText) => { this.setState({ username: newText }) }}
          onSubmitEditing={() => {
            if (this.validarUsername())
              this.txtPassword.focus()
          }}
        />
        <Text>Contraseña: </Text>
        <TextInput
          ref={(thisTxt) => { this.txtPassword = thisTxt }}
          style={styles.textInput}
          placeholder='****'
          secureTextEntry
          password
          returnKeyType='next'
          onChangeText={(newText) => { this.setState({ password: newText }); }}
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
          onSubmitEditing={() => { this.registrarUsuario(); }}
        />
        <Button
          title='Registrar cuenta nueva'
          onPress={() => { this.registrarUsuario(); }}
        />
      </View>
    );
  } /* end of render() method */



  registrarUsuario() {
    /*  Pendiente de implementación:
        - Enviar datos via POST al servidor
        - Recibir una confirmación o rechazo
        - en caso de confirmación, indicar al usuario para verificar su cuenta via mail
     */
    if (this.validarSignupForm()) {
      Alert.alert('Registro exitoso!',
        `Nombre de usuario: ${this.state.username}\n`
        + `Verifique su cuenta con el código de verificación enviado al email: ${this.state.email}`);
      this.props.navigation.navigate('SignupVerificationUI');
    }
  }


  /**
   * Validar username ingresado
   */
  validarUsername() {
    // TO DO: POST request al servidor para determinar username único
    if (!this.validador.usernameLength(this.state.username)) {
      Alert.alert('Error', 'El nombre de usuario ingresado es muy corto. Utilice otro.');
      return false;
    }
    if (!this.validador.usernameUnique(this.state.username)) {
      Alert.alert('Error', 'El nombre de usuario ingresado ya está ocupado. Utilice otro.');
      return false;
    }
    return true;
  }


  /**
   * Valida el email ingresado
   */
  validarEmail() {
    var re = /\S+@\S+\.\S+/;
    if (!re.test(this.state.email)) {
      Alert.alert('Error', 'El email ingresado no parece ser válido.');
      return false;
    }
    return true;
  }


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
  validarSignupForm() {
    return (
      this.validarUsername()
      && this.validarEmail()
      && this.validarPasswords()
    );
  }


} /* end of SignupUI class */



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
  },
});