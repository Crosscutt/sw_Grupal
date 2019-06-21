import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, Dimensions, Image, TouchableHighlight ,Button} from 'react-native'
import axios from 'axios'


export default class ListarEmpresaUI extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      gender: "",
      isFetching: false,
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
    axios.get('http://192.168.0.107:8000/api/company')
      .then(response => {
        this.setState({ data: response.data, isFetching: false })
      });

  }
 
  VerLista(idEmpresa){
    this.props.navigation.navigate('ListarSucursalesUI',{itemID:idEmpresa});
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
            <View style={styles.ContainerView} onTouchStart={()=>this.VerLista(item.empresa_id)}>
              <View>
                <Image
                  source={{ uri: item.ruta_logo }}
                  style={{ height: 100, width: 100, borderRadius: 50, marginLeft: 4 }}
                  resizeMode='contain'
                />
              </View>
              <View style={{ flexDirection: 'column', marginLeft: 16, marginRight: 16, flexWrap: 'wrap', alignSelf: "center", width: deviceWidth - 160 }}>
                <Text>Email Id : {item.email}</Text>

                <Text>Date of birth : {item.direccion}</Text>
                <Text>Phone number : {item.telefono}</Text>

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