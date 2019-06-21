import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Badge, Card, Text, Body, CardItem, Right, Left } from 'native-base';
import axios from 'axios';
import Modal from 'react-native-modal'
import Url from './url';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Dimensions,
  Picker,
  TextInput
} from 'react-native';
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';
  

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
      marcado: false,
      idSuscripcion: "",
      Numero: 0,
      Tipo: 1,
      idCliente: 0,
      Producto: []
    };
  }
  
  componentWillMount() {
    this.createNotificationListeners();
    this.notificationListener();
    this.notificationOpenedListener();

    const { navigation } = this.props;
    const itemID = navigation.getParam('itemID');

    axios.get(Url + 'details')
      .then((response) => {
        this.setState({ Datos: response.data, idCliente: itemID.cliente_id })
      })
  }

  async createNotificationListeners() {
 
    this.notificationListener = firebase.notifications().onNotification((notification) => {
        const { title, body } = notification;
        console.warn(notification);
        this.showAlert(title, body);
    });
  
  
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
        const { title, body } = notificationOpen.notification;
        console.warn(notificationOpen.notification);
        this.showAlert(title, body);
    });
  
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
        const { title, body } = notificationOpen.notification;
        console.warn(notificationOpen.notification);
        this.showAlert(title, body);
        
    }
    this.messageListener = firebase.messaging().onMessage((message) => {
      console.log(JSON.stringify(message));
    });
  }
  showAlert(title, body) {
    Alert.alert(
      title, body,
      [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }
  
    //1
  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
        this.getToken();
    } else {
        this.requestPermission();
    }
  }
  
    //3
  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    this.setState({token:fcmToken,yaMande:true})
    if (!fcmToken) {
        fcmToken = await firebase.messaging().getToken();
        if (fcmToken) {
            await AsyncStorage.setItem('fcmToken', fcmToken);
        }
    }
  }
   //2
async requestPermission() {
  try {
      await firebase.messaging().requestPermission();
      this.getToken();
  } catch (error) {
      console.log('permission rejected');
  }
}
  AbrirModal(id) {
    this.setState({ marcado: !this.state.marcado, idSuscripcion: id })
  }


  buscar() {
    this.setState({ bandera: !this.state.bandera });
    this.props.navigation.navigate('ListarEmpresasUI', { idCliente: this.state.idCliente });
  }
  detalle(dato, empresa) {
    this.props.navigation.navigate('DetalleProducto', { itemID: dato, Company: empresa, idCliente: this.state.idCliente });
  }
  cargarP(longitud, dato) {
    var producto = [];
    for (i = 1; i <= longitud; i++) {
      producto.push(dato[i]);
    }
    return producto;
  }
  render() {
    return (
      <Container>
        <ScrollView scrollEventThrottle={16}>
          <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20 }}>
              CATALOGO DE PRODUCTOS
          </Text>

            <View style={{ marginTop: 10, paddingHorizontal: 20 }}>
              <CardItem>
                <Text style={{ fontWeight: '100', marginTop: 10 }}>
                  Puede hacer su reserva ahora mismo que esta esperando
               </Text>
              </CardItem>
              {this.state.Datos.map(dato => {
                return (
                  <View key={dato[0].id_empresa} style={{ borderWidth: 0.5, marginTop: 15, height: 300, borderRadius: 10 }}>
                    <CardItem  >
                      <Left>
                        <Image style={styles.imagen_logo} source={{ uri: dato[0].foto_empresa }} />
                        <Body>
                          <Text>{dato[0].empresa}</Text>
                          <Text note>{dato[0].slogan}</Text>
                        </Body>
                      </Left>
                    </CardItem>
                    <View style={{ height: 170, marginTop: 10 }}>
                      <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        borderColor='silver'
                      >
                        {this.cargarP(Object.keys(dato).length, dato).map(piv => {
                          return (
                            <View key={piv != undefined ? piv.id_oferta : -1}>
                              {piv != undefined ?
                                <View >
                                  <View style={{ height: 170, width: 200, marginLeft: 20, borderWidth: 0.4, borderRadius: 10, borderColor: '#ddddd' }}  >
                                    <View style={{ flex: 2 }}>
                                      <Image
                                        source={{ uri: piv.foto_producto }}
                                        style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }}
                                        onTouchStart={() => this.detalle(piv, dato[0])}
                                      >
                                      </Image>
                                    </View>
                                    <View style={{ flex: 1, paddingLeft: 10, paddingTop: 10 }}>
                                      <Text>{piv.nombre}</Text>
                                      <Text>Precio : {piv.precio}</Text>
                                    </View>
                                  </View>
                                </View>
                                : null}
                            </View>
                          )
                        })}
                      </ScrollView>
                    </View>
                  </View>
                )
              })
              }
            </View>
          </View>
        </ScrollView>
        <Text>

        </Text>
        <Content />
        <Footer>
          <FooterTab>
            <Button onPress={() => this.props.navigation.navigate('VerPerfilUsuarioUI', { idCliente: this.state.idCliente })} badge vertical >
              <Badge ><Text>1</Text></Badge>
              <Text>Perfil</Text>
            </Button>
            <Button>
              <Text onPress={() => this.props.navigation.navigate('ReservasUI', { idCliente: this.state.idCliente })} > Reservas</Text>
            </Button >
            <Button active={this.state.suscripcion} onPress={() => this.props.navigation.navigate('SuscripcionesUI', { idCliente: this.state.idCliente })}>
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



const styles = StyleSheet.create({
  imagen_logo: {
    alignSelf: 'center',
    height: 50,
    width: 50,
    borderWidth: 1,
    borderRadius: 75,
    resizeMode: "center",
  }
});