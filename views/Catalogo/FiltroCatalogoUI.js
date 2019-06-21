import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Picker,
  ToastAndroid,
  Button,
  Alert
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';



export default class FiltroCatalogoUI extends Component {

  // opciones para personalizar la navegación (ej: titulo en ActionBar)
  static navigationOptions = {
    title: 'Filtrar Catálogo'
  }

  constructor(props) {
    super(props);

    // establecimiento del estado inicial del componente
    this.state = {
      nombreProducto: null,
      idEmpresa: null,
      idSucursal: null,
      idCategoriaProducto: null,
      distancia: null
    };
  }

  /**
   * Renderización del componente vía JSX
   */
  render() {
    // JSX va aquí :D
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Lista de Empresas</Text>
        <ScrollView>

          <Text>Nombre de Producto:</Text>
          <TextInput
            placeholder='Ej: cuarto de libra'
            style={styles.textInput} />
          
          <Text>Empresa:</Text>
          <Picker
            onValueChange={(value,index)=>{
              ToastAndroid.show(`Selected item #${index}, value:${value}`);
              this.setState({idEmpresa: value});
            }} >
            <Picker.Item label='Empresa1' value='Empresa1'/>
            <Picker.Item label='Empresa2' value='Empresa2'/>
            <Picker.Item label='Empresa3' value='Empresa3'/>
            <Picker.Item label='Empresa4' value='Empresa4'/>
          </Picker>

          <Text>Sucursal:</Text>
          <Picker
            onValueChange={(value,index)=>{
              ToastAndroid.show(`Selected item #${index}, value:${value}`);
              this.setState({idEmpresa: value});
            }} >
            <Picker.Item label='Sucursal1' value='Sucursal1'/>
            <Picker.Item label='Sucursal2' value='Sucursal2'/>
            <Picker.Item label='Sucursal3' value='Sucursal3'/>
            <Picker.Item label='Sucursal4' value='Sucursal4'/>
          </Picker>

          <Text>Categoría de productos:</Text>
          <Picker
            onValueChange={(value,index)=>{
              ToastAndroid.show(`Selected item #${index}, value:${value}`);
              this.setState({idEmpresa: value});
            }} >
            <Picker.Item label='Categoría1' value='Categoría1'/>
            <Picker.Item label='Categoría2' value='Categoría2'/>
            <Picker.Item label='Categoría3' value='Categoría3'/>
            <Picker.Item label='Categoría4' value='Categoría4'/>
          </Picker>

          <Text>Distancia:</Text>
          <Picker
            onValueChange={(value,index)=>{
              ToastAndroid.show(`Selected item #${index}, value:${value}`);
              this.setState({idEmpresa: value});
            }} >
            <Picker.Item label='100m a la redonda' value='100'/>
            <Picker.Item label='250m a la redonda' value='250'/>
            <Picker.Item label='500m a la redonda' value='500'/>
            <Picker.Item label='1000m a la redonda' value='1000'/>
          </Picker>

          <Button 
            title='Buscar'
            onPress={()=>{Alert.alert('Resumen',
              `Nombre de producto: ${this.state.nombreProducto}\n`
              + `Empresa ID: ${this.state.idEmpresa}\n`
              + `Sucursal ID: ${this.state.idSucursal}\n`
              + `Categoría ID: ${this.state.idCategoriaProducto}\n`
              + `Distancia Máxima: ${this.state.distancia}\n`
            )}} />

        </ScrollView>
      </View>
    );
  }
  
} /* end of FiltroCatalogoUI class */



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
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'silver',
    borderRadius: 3,
    height: 40,
    width: '75%'
  },
});