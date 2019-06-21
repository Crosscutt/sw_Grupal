import React, { Component } from 'react'
import { View, StyleSheet, FlatList, Dimensions, Image, TouchableHighlight, TextInput, Picker } from 'react-native'
import axios from 'axios'
import { CardItem, Right, Button, Text, Card, Icon, Body } from 'native-base';
import Modal from 'react-native-modal'
import Url from '../url';

export default class ListarEmpresaUI extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      gender: "",
      isFetching: false,
      marcado: false,
      Numero: 0,
      Tipo: 1,
      idCliente:0,

    }
  }
  static navigationOptions = {
    title: 'Empresas'
  }
  componentWillMount() {

    this.cargar();
  }

  onRefresh() {
    this.setState({ isFetching: true }, function () { this.cargar() });
  }

  cargar() {
    const { navigation } = this.props;
    const itemID = navigation.getParam('idCliente');

    axios.get('http://192.168.0.107:8000/api/company')
      .then(response => {
        this.setState({ data: response.data, isFetching: false ,idCliente:itemID})
      });

  }

  VerLista(idEmpresa) {
    this.props.navigation.navigate('ListarSucursalesUI', { itemID: idEmpresa });
  }
  Suscribirse() {
    axios.post(Url + 'suscription', {
      idCliente: this.state.idCliente,
      idEmpresa: this.state.idSuscripcion,
      tipo: this.state.Tipo,
      numero: this.state.Numero
    })
      .then((response) => {
            alert("Suscripcion realizada Exitosamente")
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <Modal isVisible={this.state.marcado} backdropColor="white">
          <Card style={{
            height: 280,
          }} >
            <CardItem header bordered>
              <Text>Elija el tiempo de la Suscripcion </Text>
              <Button transparent onPress={() => this.setState({ marcado: false })}>
                <Icon name="md-close" active></Icon>
              </Button>
            </CardItem>
            <CardItem>
              <TextInput keyboardType='phone-pad' onChangeText={(text) => this.setState({ Numero: text })} placeholder="Digite un Numero" />
            </CardItem>

            <CardItem bordered>
              <Body>
                <Picker
                  selectedValue={this.state.idProducto}
                  style={{ height: 50, width: 300 }}
                  onValueChange={(itemValue, itemIndex) => this.setState({ Tipo: itemValue })}>
                  <Picker.Item label="Dia" value="1" />
                  <Picker.Item label="Semana" value="2" />
                  <Picker.Item label="Mes" value="3" />
                  <Picker.Item label="Año" value="4" />
                </Picker>
              </Body>
            </CardItem>
            <Button danger block onPress={() => this.Suscribirse()}>
              <Text>Guardar Suscripcion</Text>
            </Button>
          </Card>
        </Modal>
        <FlatList
          data={this.state.data}
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.isFetching}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) =>
            <View style={styles.ContainerView} >
              <View>
                <Image
                  source={{ uri: item.ruta_logo }}
                  style={{ height: 100, width: 100, borderRadius: 50, marginLeft: 4 }}
                  resizeMode='contain'
                  onTouchStart={() => this.VerLista(item.empresa_id)}
                />
              </View>
              <View style={{ flexDirection: 'column', marginLeft: 16, marginRight: 16, flexWrap: 'wrap', alignSelf: "center", width: deviceWidth - 160 }}>
                <Text>Email  : {item.email}</Text>

                <Text>Direccion : {item.direccion}</Text>
                <Text>Telefono : {item.telefono}</Text>
                <Button small danger onPress={() => this.setState({ marcado: !this.state.marcado,idSuscripcion:item.empresa_id })}><Text>suscribirse</Text></Button>
              </View>


            </View>
          }
        />
      </View>
    )
  }
}



const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 22
  },
  ContainerView:
  {
    // backgroundColor:'grey',
    marginBottom: 1,
    paddingVertical: 10,
    backgroundColor: '#F5F5F5',

    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    width: deviceWidth - 40,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 1,
    flexDirection: 'row'
  }
});