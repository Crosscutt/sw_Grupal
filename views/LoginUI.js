import React, { Component } from 'react';
import axios from 'axios';
import { Button, Text, Card, CardItem, Body, } from 'native-base';
import {
  StyleSheet,
  View,
  TextInput,
  CheckBox,
  Alert,
  Image
} from 'react-native';
import Url from './url';
import firebase from "react-native-firebase";
import AsyncStorage from '@react-native-community/async-storage';

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
      rememberMe: false,
      token:"",
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
          <View style={styles.Imagen} >
              <Image
                style={{ height: 150, width: 100, resizeMode: "stretch" }}
                source={require('../Imagenes/oficial3.png')}
              />
            </View>
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
              <Button block success onPress={() => { this.iniciarSesion() }}>
                <Text>Iniciar Sesión</Text>
              </Button>
            </Body>
          </CardItem>

          <CardItem>
            <Body>
              <Button block success onPress={() => { this.props.navigation.navigate('registrarse') }}>
                <Text>Registra Nuevo</Text>
              </Button>
            </Body>
          </CardItem>


          <CardItem>
            <Body>
              <Button block success onPress={() => { this.props.navigation.navigate('PwResetRequestUI') }}>
                <Text>Olvidé mi contraseña</Text>
              </Button>
            </Body>
          </CardItem>

        </Card>
      </View>
    );
  } /* end of render() method */

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }
  async getToken() {
    let fcmToken = await AsyncStorage.getItem("fcmToken");
    this.setState({token:fcmToken});
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      
      if (fcmToken) {
        // user has a device token
        await AsyncStorage.setItem("fcmToken", fcmToken);
      }
    }
  }
  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log("permission rejected");
    }
  }
  componentDidMount(){
    this.checkPermission();

  }
  /**
   * Autentica al usuario actual con el servidor.
   * En caso de que el usuario que está iniciando sesión no sea de tipo "cliente",
   * se debería mostrar un error.
   */
  iniciarSesion() {
    axios.post(Url + 'loginu', {
      username: this.state.username,
      password: this.state.password,
      token:this.state.token
    })
      .then((response) => {
        if (response.data.cliente_id != 0) {
          this.props.navigation.navigate('MenuUsuarioUI', { itemID: response.data });
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
  },
  Imagen:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height:100

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