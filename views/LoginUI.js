import React, { Component } from 'react';
import axios from 'axios';
import {  Button, Text, Card, CardItem, Body, } from 'native-base';
import {
  StyleSheet,
  View,
  TextInput,
  CheckBox,
  Alert
} from 'react-native';


export default class LoginUI extends Component {

  users = [
    {
      username: '',
      password: '',
      userType: 1
    },
    {
      username: 'wigner',
      password: '123123123',
      userType: 3
    }
  ];

  // opciones para personalizar la navegación (ej: titulo en ActionBar)
  static navigationOptions = {
    title: 'Iniciar Sesión'
  }

  constructor(props) {
    super(props);

    // establecimiento del estado inicial del componente
    this.state = {
      username: '',
      password: '',
      rememberMe: false
    };
  }

  /**
   * Renderización del componente vía JSX
   */
  render() {
    // JSX va aquí :D
    return (
      <View >
        <Card>
          <Text style={styles.welcome}>Bienvenido a ReserveIt!</Text>
          <Text style={styles.welcome}>Inicio de Sesión</Text>
          <CardItem>
            <Body>
              <Text>Para gozar de la funcionalidad de esta aplicación, primero debe iniciar sesión.</Text>
            </Body>
          </CardItem>
          <CardItem>
            <TextInput
              style={styles.textInput}
              placeholder='Nombre de Usuario'
              returnKeyType='next'
              onChangeText={(newText) => { this.setState({ username: newText }) }}
              onSubmitEditing={() => { this.txtPassword.focus() }}
            />
          </CardItem>
          <CardItem>
            <TextInput
              ref={(thisTxt) => { this.txtPassword = thisTxt }}
              style={styles.textInput}
              placeholder='Contraseña'
              secureTextEntry
              password
              returnKeyType='go'
              onChangeText={(newText) => { this.setState({ password: newText }) }}
              onSubmitEditing={() => { this.iniciarSesion() }}
            />
          </CardItem>


          <CardItem>
            <Body>
            <View style={styles.horizontalContainer}>
              <CheckBox
                value={this.state.rememberMe}
                onValueChange={(newValue) => { this.props.value = newValue }} />
              <Text>Recordarme</Text>
            </View>
            </Body>
          </CardItem>
          
          <CardItem>
          <Body>
          <Button  block success onPress={() => {   this.props.navigation.navigate('MenuUsuarioUI')        /*this.iniciarSesion()*/ }}>
              <Text>Iniciar Sesión</Text>
            </Button>
          </Body>
          </CardItem>

          <CardItem>
            <Body>
            <Button  block success onPress={() => { this.props.navigation.navigate('registrarse') }}>
              <Text>Registra Nuevo</Text>
            </Button>
            </Body>
          </CardItem>


          <CardItem>
            <Body>
            <Button  block success onPress={() => { this.props.navigation.navigate('PwResetRequestUI') }}>
              <Text>Olvidé mi contraseña</Text>
            </Button>
            </Body>
          </CardItem>

        </Card>
      </View>
    );
  } /* end of render() method */


  /**
   * Autentica al usuario actual con el servidor.
   * En caso de que el usuario que está iniciando sesión no sea de tipo "cliente",
   * se debería mostrar un error.
   */
  iniciarSesion() {
    axios.post('http://192.168.0.107:8000/api/loginu', {
      username: this.state.username,
      password: this.state.password
    })
      .then( (response) =>{
        if(response.data!=0){
          console.warn("Hola");
         this.props.navigation.navigate('MenuUsuarioUI');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  Registrar() {

  }


  autenticarUsuario(username, password) {
    // TO DO: enviar solicitud al servidor para determinar si los datos ingresados
    // corresponden a un usuario registrado
    for (i = 0; i < this.users.length; i++) {
      if (this.users[i].username === this.state.username
        && this.users[i].password === this.state.password)
        return true;
    }
    return false;
  }


} /* end of LoginUI class */



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
    width: '100%'
  },
  buttons: {
    width: '75%'
  }
});