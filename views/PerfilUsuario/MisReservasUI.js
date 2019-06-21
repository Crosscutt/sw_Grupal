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
import HistorialReserva from './HistorialReservas';
import ReservasDia from './ReservaPendiente';

export default class SuscripcionesUI extends Component {

  static navigationOptions = {
    title: 'Suscripciones'
  }

  constructor(props) {
    super(props);

    this.state = {
      Id:""
    };
  }

  componentWillMount(){
    const { navigation } = this.props;
    const id = navigation.getParam('idCliente');
    this.setState({Id:id});
  }
  render() {
    return (
      <Container>
        <Tabs >
        <Tab heading="Hoy">
            <ReservasDia idCliente={this.state.Id}/>
          </Tab>
          <Tab heading="Historial">
            <HistorialReserva idCliente={this.state.Id} />
          </Tab>
 
        </Tabs>
      </Container>
    );
  }
  
} 



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