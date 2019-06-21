import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Badge, Card, Text, Body, CardItem } from 'native-base';
import ListarEmpresasUI from './Catalogo/ListarEmpresasUI';
import axios from 'axios';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Dimensions
} from 'react-native';


const { height, width } = Dimensions.get('window')

export default class MenuPrincipalUI extends Component {

  static navigationOptions = {
    title: 'ReserveIt'
  }
  constructor(props) {
    super(props);
    this.state = {
      bandera: false,
      suscripcion: false,
      Datos: []
    };
  }

  componentWillMount() {
    axios.get('http://8db7c9c8.ngrok.io/producto/index')
      .then((response) => {
        this.setState({ Datos: response.data })
      })
  }


  buscar() {
    this.setState({ bandera: !this.state.bandera });
    this.props.navigation.navigate('ListarEmpresasUI');
  }
  detalle(dato) {
    this.props.navigation.navigate('DetalleProducto', { itemID: dato });
  }
  render() {
    return (
      <Container>
        <ScrollView scrollEventThrottle={16}>
          <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20 }}>
              CATALOGO DE PRODUCTOS
          </Text>
            <View style={{ height: 130, marginTop: 20 }}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {this.state.Datos.map(dato => {
                  return (
                    <View style={{ height: 130, width: 130, marginLeft: 20, borderWidth: 0.5, borderColor: '#ddddd' }} key={dato.id} onTouchStart={() => this.detalle(dato)}>
                      <View style={{ flex: 2 }}>
                        <Image
                          source={{ uri: dato.foto }}
                          style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }}
                        >
                        </Image>
                      </View>
                      <View style={{ flex: 1, paddingLeft: 10, paddingTop: 10 }}>
                        <Text>{dato.nombre}</Text>
                      </View>
                    </View>
                  )
                })
                }
              </ScrollView>
            </View>
            <View style={{ marginTop: 40, paddingHorizontal: 20 }}>
              <Text style={{ fontSize: 24, fontWeight: '700' }}>
                Nuevos Productos Ofertados
              </Text>
              <Text style={{ fontWeight: '100', marginTop: 10 }}>
                Puede hacer su reserva ahora mismo que esta esperando
               </Text>

              {this.state.Datos.map(dato => {
                return (
                  <View key={dato.id}>
                    <View style={{ width: width - 40, height: 200, marginTop: 20 }}>
                      <Image
                        style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 5, borderWidth: 1, borderColor: '#dddddd' }}
                        source={{ uri: dato.foto }}
                      />
                    </View>
                    <Card>
                      <CardItem>
                        <Text style={{ fontWeight: '100', marginTop: 10, color: 'blue' }}>
                          Nombre : <Text>{dato.nombre}</Text>
                        </Text>
                      </CardItem>
                      <CardItem>
                        <Text style={{ fontWeight: '100', marginTop: 10, color: 'blue' }}>
                          Precio: <Text>{dato.precio}</Text>
                        </Text>
                      </CardItem>
                      <CardItem>
                      <Text style={{ fontWeight: '100', marginTop: 10, color: 'blue' }}>
                        Descripcion :  <Text>{dato.descripcion}</Text>
                      </Text>
                      </CardItem>
                    </Card>
                  </View>
                )

              })
              }

            </View>

          </View>
        </ScrollView>
        <Content />
        <Footer>
          <FooterTab>
            <Button>
              <Text>Reservas</Text>
            </Button >
            <Button active={this.state.suscripcion} onPress={() => this.setState({ suscripcion: !this.state.suscripcion })}>
              <Text>Suscripcion</Text>
            </Button>
            <Button active={this.state.bandera} onPress={() => this.buscar()} badge vertical >
              <Badge ><Text>51</Text></Badge>
              <Text>Buscar</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }


}



