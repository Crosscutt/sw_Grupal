/**
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

// importando las demás vistas
import WelcomeUI from './views/WelcomeUI';

// login y signup
import LoginUI from './views/LoginUI';
import SignupUI from './views/Signup/SignupUI';
import SignupVerificationUI from './views/Signup/SignupVerificationUI';
import SignupSuccessUI from './views/Signup/SignupSuccessUI';


// password reset
import PwResetRequest from './views/PasswordReset/PwResetRequestUI';
import PwResetConfirmUI from './views/PasswordReset/PwResetConfirmUI';
import PwResetNewPwInputUI from './views/PasswordReset/PwResetNewPwInputUI';
import PwResetSuccessUI from './views/PasswordReset/PwResetSuccessUI';

// PerfilUsuario
import VerPerfilUsuarioUI from './views/PerfilUsuario/VerPerfilUsuarioUI';
import EditarPerfilUsuarioUI from './views/PerfilUsuario/EditarPerfilUsuarioUI';
import NotificacionesUI from './views/PerfilUsuario/NotificacionesUI';
import MenuPrincipalUI from './views/MenuPrincipalUI';
import registrar from './views/Registrar';
import MisReviewsUI from './views/PerfilUsuario/MisReviewsUI';
import MisReservasUI from './views/PerfilUsuario/MisReservasUI';

// Catálogo de productos
import VerCatalogoCompletoUI from './views/Catalogo/VerCatalogoCompletoUI';
import FiltroCatalogoUI from './views/Catalogo/FiltroCatalogoUI';
import VerCatalogoFiltradoUI from './views/Catalogo/VerCatalogoFiltradoUI';
import ListarEmpresasUI from './views/Catalogo/ListarEmpresasUI';
import ListarSucursalesUI from './views/Catalogo/ListarSucursalesUI';
import VerEmpresaUI from './views/Catalogo/VerEmpresaUI';
import VerSucursalUI from './views/Catalogo/VerSucursalUI';

// suscripciones
import ListarSuscripcionesUI from './views/Suscripciones/ListarSuscripcionesUI';
import NuevaSuscripcionUI from './views/Suscripciones/NuevaSuscripcionUI';
import VerSuscripcionUI from './views/Suscripciones/VerSuscripcionUI';

//DETALLE PRODUCTO
import DetalleProducto from './views/DetalleProducto';



/*
  PENDIENTE: Poblar este mapa de rutas con los archivos de UI definidos anteriormente
 */
const navRouteMap = {
  WelcomeUI: {
    screen: WelcomeUI
  },
  LoginUI: {
    screen: LoginUI,
  },
  MenuUsuarioUI: {
    screen: MenuPrincipalUI
  },
  NotificacionesUI: {
    screen: NotificacionesUI
  },
  ReservasUI: {
    screen: MisReservasUI
  },
  SignupUI: {
    screen: SignupUI
  },
  SuscripcionesUI: {
  screen: ListarSuscripcionesUI
  },
  registrarse:{
    screen: registrar
  },
  VerCatalogoCompletoUI:{
    screen:VerCatalogoCompletoUI
  },
  ListarEmpresasUI:{
    screen:ListarEmpresasUI
  },
  ListarSucursalesUI:{
    screen:ListarSucursalesUI
  },
  DetalleProducto:{
    screen:DetalleProducto
  }

};

const navOptions = {
  initialScreen: 'WelcomeUI'
};

const AppNavigator = createStackNavigator(navRouteMap, navOptions);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />
  };
}
