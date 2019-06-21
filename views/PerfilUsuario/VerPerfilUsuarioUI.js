import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Text, Body, Icon } from 'native-base';
import { StyleSheet, Image, View, Alert, Dimensions } from 'react-native';
import axios from 'axios';
import Url from '../url';

const styles = StyleSheet.create({
  titulo: {
    color: 'blue',
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  car: {
    height: 400,
  }
});

export default class VerPerfilUsuarioUI extends Component {

  static navigationOptions = {
    title: 'Mi perfil'
  }

  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentWillMount() {

    const { navigation } = this.props;
    const cliente = navigation.getParam('idCliente');
    axios.get(Url + 'perfil/' + cliente)
      .then(response => {
        this.setState({ data: response.data, isFetching: false })
      });
  }



  render() {
    return (
      <Card>
        <CardItem header bordered>
          <Text>Datos Personales</Text>
        </CardItem>
        <View>
            <CardItem bordered >
              <Body>
                <Text style={styles.titulo}>Nombre : <Text>{this.state.data.nombres}</Text></Text>
                <Text style={styles.titulo}>Apellido : <Text>{this.state.data.apellidos}</Text></Text>
                <Text style={styles.titulo}>Email :<Text> {this.state.data.email} </Text></Text>
                <Text style={styles.titulo}>Username:<Text>{this.state.data.username} </Text></Text>
              </Body>
            </CardItem>
          <CardItem header bordered>
            <Text>Mi foto</Text>
          </CardItem>
          <CardItem bordered >
            <Image
              style={{
                width: 300,
                resizeMode: "center",
                height: 100
              }}
              source={require('../../Imagenes/oficial2.png')}
            />
          </CardItem>

        </View>
      </Card>

    );
  }
}