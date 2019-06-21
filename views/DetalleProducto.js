import React, { Component } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Button, Left, Body, Right, Icon } from 'native-base';

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
const pv = 5;

export default class DetalleProducto extends Component {
    static navigationOptions = {
        title: 'ReserveIt'
      }
  constructor(props) {
    super(props);
    this.state = {
      Nombre:"",
      Descripcion:"",  
      Foto:"",
      Precio:0,
      Cantidad: 0,
      Total: 0
    }
  }

  componentWillMount(){
    const { navigation } = this.props;
    const itemID = navigation.getParam('itemID');
    this.setState({Nombre:itemID.nombre,Descripcion:itemID.descripcion,Foto:itemID.foto,Precio:itemID.precio})
  }

  contador(cant) {
    if (cant == 0) {
      const c = this.state.Cantidad + 1;
      this.setState({ Cantidad: this.state.Cantidad + 1, Total: c * pv })
    } else {
      if (this.state.Cantidad != 0) {
        this.setState({ Cantidad: this.state.Cantidad - 1, Total: this.state.Total - pv })
      }
    }

  }
  render() {
    return (
      <Container>
        <Content>
          <Card >
            <CardItem >
              <Left>
                <Image style={styles.imagen_logo} source={{ uri: 'https:\/\/upload.wikimedia.org\/wikipedia\/commons\/thumb\/3\/3a\/Burger_King_Logo.svg\/1200px-Burger_King_Logo.svg.png' }} />
                <Body>
                  <Text>Nuevo producto</Text>
                  <Text note>April 15, 2016</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Image style={styles.imagen} source={{ uri: this.state.Foto }} />
                <Text> Descripcion del producto : {this.state.Descripcion}</Text>
                <Text> Nombre del producto :  {this.state.Nombre}</Text>
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
            <Button block success>
              <Text>Reservar Ahora</Text>
            </Button>
          </Card>
        </Content>
      </Container>
    );
  }
}