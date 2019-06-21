import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, Dimensions, Image, TouchableHighlight } from 'react-native'
import axios from 'axios'


export default class ListarSucursalesUI extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      gender: "",
      isFetching: false,
      idEmpresa:""
    }
  }
  static navigationOptions = {
    title: 'Lista de Sucursales'
  }
  componentWillMount() {
    const { navigation } = this.props;
    const itemID = navigation.getParam('itemID', 'NO-ID');
    this.cargar(itemID);
  }

  onRefresh() {
    this.setState({ isFetching: true }, function () { this.cargar() });
  }

  cargar(itemID) {
    axios.get('http://192.168.0.107:8000/api/office/'+itemID)
      .then(response => {
        this.setState({ data: response.data, isFetching: false })
      });

  }
 
  VerProductos(idSucursal){
    this.props.navigation.navigate('VerCatalogoCompletoUI',{itemId:idSucursal});
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.isFetching}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) =>
            <View style={styles.ContainerView} onTouchStart={()=>this.VerProductos(item.sucursal_id)}>
              <View>
                <Image
                  source={{ uri: item.ruta_logo }}
                  style={{ height: 100, width: 100, borderRadius: 50, marginLeft: 4 }}
                  resizeMode='contain'
                />
              </View>
              <View style={{ flexDirection: 'column', marginLeft: 16, marginRight: 16, flexWrap: 'wrap', alignSelf: "center", width: deviceWidth - 160 }}>
                <Text>Nombre de la sucursal: {item.nombre}</Text>

                <Text>Ubucacion : {item.direccion}</Text>
                <Text>Telefono : {item.telefono}</Text>

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