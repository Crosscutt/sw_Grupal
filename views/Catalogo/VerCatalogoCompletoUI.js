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
    const itemId = navigation.getParam('itemId', 'NO-ID');
    console.warn(itemId)
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
<View>

<ScrollView
    scrollEventThrottle={16}
>
    <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20 }}>
            Toby
         </Text>
        <View style={{ height: 130, marginTop: 20 }}>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
               {
                  this.state.Datos.map(Dato=>{
                    return(
                      <View style={{ height: 130, width: 130, marginLeft: 20, borderWidth: 0.5, borderColor: '#ddddd' }} >
                      <View style={{ flex: 2 }}>
                          <Image
                              source={{uri:Dato.ruta_logo}}
                              style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }}
                          >
                          </Image>
                      </View>
                      <View style={{ flex: 1, paddingLeft: 10, paddingTop: 10 }}>
                          <Text>{Dato.nombre}</Text>
                      </View>
                     </View>
                    )

                  })

               }

            </ScrollView>


        </View>

    </View>
</ScrollView>

</View>
    )
  }
}
