import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, Dimensions, Image, TouchableHighlight } from 'react-native'
import axios from 'axios'
import Url from '../url';

export default class ListarEmpresas extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      gender: "",
      isFetching: false,
    }
  }

  componentWillMount() {

    this.cargar();
  }

  onRefresh() {
    this.setState({ isFetching: true }, function () { this.cargar() });
  }

  cargar() {
    
    const cliente=this.props.idCliente;
    axios.get(Url+'empresa/'+cliente)
      .then(response => {
        this.setState({ data: response.data, isFetching: false })
      });

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
            <View style={styles.ContainerView}>
              <View>
                <Image
                  source={{ uri: item.foto }}
                  style={{ height: 100, width: 100, borderRadius: 50, marginLeft: 4 }}
                  resizeMode='contain'
                />
              </View>
              <View style={{ flexDirection: 'column', marginLeft: 16, marginRight: 16, flexWrap: 'wrap', alignSelf: "center", width: deviceWidth - 160 }}>
                <Text>Nombre : {item.nombre}</Text>
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