import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


class Producto extends Component{
  constructor(props){

    this.state = {};
  }

  render(){
    return(
      <View style={styles.horizontalContainer}>
        <Text>Imagen</Text>
        <View style={styles.container}>
          <Text style={{fontSize:20, color:'black'}}>Nombre: {this.props.nombre}</Text>
          <Text style={{color:'gray'}}>Descripcion: {this.props.descripcion}</Text>
        </View>
        <Text style={{color:'green'}}>Precio: {this.props.precio}</Text>
      </View>
    );
  }

}

export default class VerCatalogoCompletoUI extends Component {

  // opciones para personalizar la navegación (ej: titulo en ActionBar)
  static navigationOptions = {
    title: 'Ver Catálogo de Productos'
  }

  constructor(props) {
    super(props);

    // establecimiento del estado inicial del componente
    this.state = {};
  }

  /**
   * Renderización del componente vía JSX
   */
  render() {
    // JSX va aquí :D
    return (
      <View style={styles.container}>
        <Text>----------</Text>
        <Text style={styles.welcome}>Catálogo Completo</Text>
        <Text>----------</Text>
        <ScrollView>
          <Producto
            precio='20'
            nombre= 'NombreDelProducto!'
            descripcion='UberDescription!'
           />
           <Producto
            precio='30'
            nombre= 'TreintaProds!'
            descripcion='UberDescription!'
           />
           <Producto
            precio='15'
            nombre= 'ProductoA15Pesos!'
            descripcion='LolDescription!'
           />
        </ScrollView>
      </View>
    );
  }
  
} /* end of VerCatalogoCompletoUI class */



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FCFCFC'
  },
  horizontalContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#FCFCFC'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});