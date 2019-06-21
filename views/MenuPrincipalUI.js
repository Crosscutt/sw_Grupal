import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Badge, Card, Text, Body, CardItem, Right } from 'native-base';
import ListarEmpresasUI from './Catalogo/ListarEmpresasUI';
import axios from 'axios';
import Modal from 'react-native-modal'
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Dimensions,
  Picker
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
      Datos: [],
      marcado: false
    };
  }

  componentWillMount() {
    axios.get('http://25793a06.ngrok.io/producto/index')
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
  Suscribirse() {
    axios.post(`/api/solicitud/store`, {
    })
      .then((response) => {
      })
      .catch(function (error) {
        console.log(error);
      });
    this.setState({ yala: true })
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

            <Modal isVisible={this.state.marcado} backdropColor="white">
              <Card style={{
                height: 200,
              }} >
                <CardItem header bordered>
                  <Text>Elija el tiempo de la Suscripcion </Text>

                  <Button transparent onPress={() => this.setState({ marcado: false })}>
                    <Icon name="md-close" active></Icon>
                  </Button>

                </CardItem>

                <CardItem bordered>
                  <Body>
                    <Picker
                      selectedValue={this.state.idProducto}
                      style={{ height: 50, width: 300 }}
                      onValueChange={(itemValue, itemIndex) => this.setState({ idProducto: itemValue })}>
                      <Picker.Item label="1 Dia" value="1" />
                      <Picker.Item label="1 Semana" value="2" />

                      <Picker.Item label="2 Semanas " value="3" />
                      <Picker.Item label="1 Mes" value="4" />

                      <Picker.Item label="6 Meses " value="5" />
                      <Picker.Item label="1 Año" value="6" />
                      <Picker.Item label="Por siempre" value="6" />
                    </Picker>
                  </Body>
                </CardItem>
                <Button danger block onPress={() => this.Suscribirse()}>
                  <Text>Guardar Suscripcion</Text>
                </Button>
              </Card>
            </Modal>
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
                      <Right>
                        <Button small danger onPress={() => this.setState({ marcado: !this.state.marcado })}>
                          <Text>Suscribirse</Text>
                        </Button>
                      </Right>
                      <CardItem>
                        <Text style={{ fontWeight: '100', marginTop: 10, color: 'blue' }}>
                          Nombre : <Text>{dato.nombre}</Text>
                        </Text>
                      </CardItem>
                      <CardItem>
                        <Text style={{ fontWeight: '100', marginTop: 10, color: 'blue' }}>
                          Precio: <Text>{dato.precio} Bs.</Text>
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
              <Text onPress={() => this.props.navigation.navigate('ReservasUI')} > Reservas</Text>
            </Button >
            <Button active={this.state.suscripcion} onPress={() => this.setState({ suscripcion: !this.state.suscripcion })}>
              <Text>Suscripcion</Text>
            </Button>
            <Button active={this.state.bandera} onPress={() => this.buscar()} badge vertical >
              <Badge ><Text>51</Text></Badge>
              <Text>Buscar</Text>
            </Button>
            <Button onPress={() => this.buscar()} badge vertical >
              <Badge ><Text>1</Text></Badge>
              <Text>Perfil</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }


}



