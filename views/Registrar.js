import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label ,Button,Text} from 'native-base';
import axios from 'axios';
export default class registrar extends Component {
    constructor(props){
        super(props);
        this.state={
            Username:"",
            Password:"",
            Nombre:"",
            Apellido:"",
            Email:""
        }
    }

    enviar(){
        axios.post('http://192.168.0.107:8000/api/register', {
            username:this.state.Username,
            password:this.state.Password,
            nombre:this.state.Nombre,
            apellido:this.state.Apellido,
            email:this.state.Email
          })
          .then(function (response) {
            console.warn(response);
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
              <Input onChangeText={(username)=>this.setState({Username:username})}/>
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input onChangeText={(password)=>this.setState({Password:password})}/>
            </Item>
            <Item floatingLabel>
              <Label>Nombre</Label>
              <Input onChangeText={(nombre)=>this.setState({Nombre:nombre})}/>
            </Item>
            <Item floatingLabel last>
              <Label>Apellido</Label>
              <Input onChangeText={(apellido)=>this.setState({Apellido:apellido})}/>
            </Item>
            <Item floatingLabel>
              <Label>email</Label>
              <Input onChangeText={(email)=>this.setState({Email:email})}/>
            </Item>

            <Button block dark onPress={()=>this.enviar()}>
               <Text>Enviar</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}