import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, Dimensions, Image, TouchableHighlight, ScrollView } from 'react-native'
import axios from 'axios'


export default class VerCatalogoCompletoUI extends Component {

  constructor(props) {
    super(props);
    this.state = {
      Datos: [],
      gender: "",
      isFetching: false,
    }
  }

  componentWillMount() {
    const { navigation } = this.props;
    const itemId = navigation.getParam('ItemID');
    this.cargar(itemId);
  }

  onRefresh() {
    this.setState({ isFetching: true }, function () { this.cargar() });
  }

  cargar(itemId) {
    axios.get('http://192.168.0.107:8000/api/products/' + itemId)
      .then(response => {
        this.setState({ Datos: response.data, isFetching: false })
        console.warn(response.data)
      });

  }



  render() {
    return (
      <View style={styles.container}>
      <FlatList
        data={this.state.Datos}
        onRefresh={() => this.onRefresh()}
        refreshing={this.state.isFetching}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) =>
          <View style={styles.ContainerView} >
            <View>
              <Image
                source={{ uri: item.ruta_foto }}
                style={{ height: 100, width: 100, borderRadius: 50, marginLeft: 4 }}
                resizeMode='contain'
                onTouchStart={() => this.VerProductos(item.sucursal_id)}

              />
            </View>
            <View style={{ flexDirection: 'column', marginLeft: 16, marginRight: 16, flexWrap: 'wrap', alignSelf: "center", width: deviceWidth - 160 }}>
              <Text>Nombre del Producto : {item.nombre}</Text>

              <Text>Descripcion : {item.description}</Text>

            </View>

          </View>
        }
      />
    </View>    )
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