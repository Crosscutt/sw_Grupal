import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Card, CardItem } from 'native-base';
import axios from 'axios';
import Url from './url';

export default class registrar extends Component {

  static navigationOptions = {
    title: 'Registro de un Nuevo Usuario'
  }
  constructor(props) {
    super(props);
    this.state = {
      Username: "",
      Password: "",
      Nombre: "",
      Apellido: "",
      Email: ""
    }
  }

  enviar() {
    axios.post(Url + 'register', {
      username: this.state.Username,
      password: this.state.Password,
      nombre: this.state.Nombre,
      apellido: this.state.Apellido,
      email: this.state.Email
    })
      .then(function (response) {
          alert("Registro Exitoso");
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    return (
      <Container>
        <Content>

          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input onChangeText={(username) => this.setState({ Username: username })} />
            </Item>
            <Item floatingLabel >
              <Label>Password</Label>
              <Input onChangeText={(password) => this.setState({ Password: password })} textContentType='password' />
            </Item>
            <Item floatingLabel>
              <Label>Nombre</Label>
              <Input onChangeText={(nombre) => this.setState({ Nombre: nombre })} />
            </Item>
            <Item floatingLabel >
              <Label>Apellido</Label>
              <Input onChangeText={(apellido) => this.setState({ Apellido: apellido })} />
            </Item>
            <Item floatingLabel style={{marginVertical:50}}>
              <Label>Email</Label>
              <Input onChangeText={(email) => this.setState({ Email: email })} />
            </Item>

            <Button   block primary onPress={() => this.enviar()} >
              <Text>Registrar Datos</Text>
            </Button>

          </Form>
        </Content>
      </Container>
    );
  }
}