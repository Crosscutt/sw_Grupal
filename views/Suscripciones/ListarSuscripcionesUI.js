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
import { Container, Header, Content, Tab, Tabs } from 'native-base';
import ListarEmpresas from './ListarSuscripcionEmpresa';
import ListarProducto from './ListarSuscripcionProducto';
import ListarSucursal from './ListarSuscripcionSucursal';

export default class SuscripcionesUI extends Component {

  // opciones para personalizar la navegación (ej: titulo en ActionBar)
  static navigationOptions = {
    title: 'Suscripciones'
  }

  constructor(props) {
    super(props);

    // establecimiento del estado inicial del componente
    this.state = {
       Id:0
    };
  }

   componentWillMount(){
    const { navigation } = this.props;
    const id = navigation.getParam('idCliente');
    this.setState({Id:id});
   }


  render() {
    // JSX va aquí :D
    return (
      <Container>
        <Tabs >
          <Tab heading="Empresas">
            <ListarEmpresas idCliente={this.state.Id} />
          </Tab>
          <Tab heading="Sucursal">
          <ListarSucursal idCliente={this.state.Id} />
          </Tab>
          <Tab heading="Productos">
            <ListarProducto idCliente={this.state.Id} />

          </Tab>
        </Tabs>
      </Container>
    );
  }

} /* end of SuscripcionesUI class */



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
    width: '75%'
  },
  buttons: {
    width: '75%'
  }
});