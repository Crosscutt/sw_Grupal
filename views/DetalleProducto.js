import React, { Component } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Button, Left, Body, Right, Icon } from 'native-base';
import axios from 'axios'
import Url from './url';
const styles = StyleSheet.create({
  imagen: {
    width: '100%',
    resizeMode: "cover",
    height: 300
  },
  imagen_logo: {
    alignSelf: 'center',
    height: 50,
    width: 50,
    borderWidth: 1,
    borderRadius: 75,
    resizeMode: "center",
  },
  cant: {
    fontSize: 30,
    alignSelf: 'center',
  },
  total: {
    alignSelf: 'center',
  }
});

export default class DetalleProducto extends Component {
  static navigationOptions = {
    title: 'ReserveIt'
  }
  constructor(props) {
    super(props);
    this.state = {
      Nombre: "",
      Descripcion: "",
      Foto: "",
      Precio: 0,
      Cantidad: 0,
      Disponible:0,
      Total: 0,
      Foto_Empresa:"",
      Eslogan:"",
      Nombre_Empresa:"",
      IdOferta:0,
      idCliente:0
    }
  }

  componentWillMount() {
    const { navigation } = this.props;
    const itemID = navigation.getParam('itemID');
    const id=navigation.getParam('idCliente');
    const Company=navigation.getParam('Company');
    this.setState({ Nombre: itemID.nombre, Descripcion: itemID.descripcion, Foto: itemID.foto_producto, Precio: itemID.precio,Foto_Empresa:Company.foto_empresa,Nombre_Empresa:Company.empresa,Eslogan:Company.slogan,Disponible:itemID.cantidad,IdOferta:itemID.id_oferta,idCliente:id})
  }

  contador(cant) {
    if (cant == 0) {
      const c = this.state.Cantidad + 1;
      if(this.state.Disponible!=0){
        this.setState({ Cantidad: this.state.Cantidad + 1, Total: c * this.state.Precio ,Disponible:this.state.Disponible-1})
      }
    } else {
      if (this.state.Cantidad != 0) {
        this.setState({ Cantidad: this.state.Cantidad - 1, Total: this.state.Total - this.state.Precio,Disponible:this.state.Disponible+1 })
      }
    }

  }

  Reservar(){
    axios.post(Url+'reserve', {
      idCliente:this.state.idCliente,
      monto_total:this.state.Total,
      cantidad:this.state.Cantidad,
      idOferta:this.state.IdOferta
    })
    .then((response)=> {
      console.warn(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
    this.setState({yala:true})
  }
  render() {
    return (
      <Container>
        <Content>
          <Card >
            <CardItem >
              <Left>
                <Image style={styles.imagen_logo} source={{ uri: this.state.Foto_Empresa }} />
                <Body>
                  <Text>{this.state.Nombre_Empresa}</Text>
                  <Text note>{this.state.Eslogan}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Image style={styles.imagen} source={{ uri: this.state.Foto }} />
                <Text> Descripcion del producto : {this.state.Descripcion}</Text>
                <Text> Nombre del producto :  {this.state.Nombre}</Text>
                <Text> Cantidad Disponible : {this.state.Disponible}     </Text>
                <Text> Precio : {this.state.Precio} Bs.</Text>

                <CardItem>
                  <Left>
                    <Button bordered success onPress={() => this.contador(1)}>
                      <Icon active name="md-remove" />
                    </Button>
                  </Left>
                  <Body>
                    <Text style={styles.cant}>{this.state.Cantidad}</Text>
                  </Body>
                  <Right>
                    <Button bordered success onPress={() => this.contador(0)}>
                      <Icon active name="md-add" />
                    </Button>
                  </Right>
                </CardItem>
                <Text style={styles.total}>Total : {this.state.Total} Bs.</Text>
              </Body>
            </CardItem>
            <Button block success onPress={()=>this.Reservar()}>
              <Text>Reservar Ahora</Text>
            </Button>
          </Card>
        </Content>
      </Container>
    );
  }
}