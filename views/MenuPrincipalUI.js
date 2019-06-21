import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Badge, Card, Text, Body, CardItem, Right, Left } from 'native-base';
import axios from 'axios';
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
import firebase from "react-native-firebase";


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
  componentDidMount(){
    this.createNotificationListeners();
  }
  componentWillMount() {
    //this.notificationListener();
    this.notificationOpenedListener();
    this.messageListener();
    const { navigation } = this.props;
    const itemID = navigation.getParam('itemID');

    axios.get(Url + 'details')
      .then((response) => {
        this.setState({ Datos: response.data, idCliente: itemID.cliente_id })
      })
  }
  AbrirModal(id) {
    this.setState({ marcado: !this.state.marcado, idSuscripcion: id })
  }

  async createNotificationListeners() {
    /*
     * Triggered when a particular notification has been received in foreground
     * */


    /*
     // eslint-disable-next-line max-len
     // eslint-disable-next-line max-len
     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
     * */
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        this.setState({
          latSucursal: notificationOpen.notification.data.latitud,
          lngSucursal: notificationOpen.notification.data.longitud
        });
        this.showAlert('Solicitud: Tienes un nuevo trabajo', 'No olvides de marcar tu asistencia');
      });

      /* console.warn(notificationOpen.notification.data);
        console.warn(notificationOpen.notification.body);
        this.setState({
          latClient: notificationOpen.data.latitud,
          lngClient: notificationOpen.data.longitud,
          idServicio: notificationOpen.data.id
        }); */
    /*
     * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
     * */
    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
      console.log('AQUI constante');
    if (notificationOpen) {
      console.log('Dentro del If constante');
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
    }
    /*
     * Triggered for data only payload in foreground
     * */
    this.messageListener = firebase.messaging().onMessage(message => {
      //process data message
      //this.setState = { mensaje: message.getData() };
      this.showAlert("hola", this.state);
    });
  }
  showAlert(title, body) {
    Alert.alert(
      title,
      body,
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
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
              <Text style={{ fontWeight: '100', marginTop: 10 }}>
                Puede hacer su reserva ahora mismo que esta esperando
               </Text>

              {this.state.Datos.map(dato => {
                return (
                  <View key={dato[0].id_empresa}>
                    <CardItem >
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
                            <View key={piv!=undefined?piv.id_oferta:-1}>
                              {piv != undefined ?
                                <View >
                                  <View style={{ height: 170, width: 200, marginLeft: 20, borderWidth: 0.5, borderColor: '#ddddd' }}  >
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