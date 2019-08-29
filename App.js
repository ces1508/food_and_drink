import React, { Component } from 'react';
import {Scene, 
  Router, 
  ActionConst,
  Drawer
} from 'react-native-router-flux'
import SideMenu from './src/components/sideMenu/sideMenu'
import MainView from './src/views/main'
import Product from './src/views/product'
import CartView from './src/views/cart'
import FavoritesView from './src/views/favorites'
import Login from './src/views/login'
import ConfirmBuy from './src/views/confirmBuy'
import WhitOutRegister from './src/views/sinRegistro'
import Splash from './src/views/splash'
import { getPlatform } from './src/utils'
export default class App extends Component {

  render() {
    return (
      <Router>
        <Drawer 
          hideNavBar
          key="drawer"
          style={{backgroundColor: '#000'}}
          contentComponent={() => <SideMenu />}
          drawerWidth={300}>
          <Scene hideNavBar panHandlers={null}> 
            <Scene key = "splash" component = {Splash} title = 'splash' hideNavBar = {true} type = "reset"  initial = {true} />
            <Scene key = "main" component = {MainView} title = "Hamburgesas" hideNavBar = {true} type="reset"   />
            <Scene key = "product" component = {Product} hideNavBar = {true} />
            <Scene key = "cart" component = {CartView} hideNavBar = {true}/>
            <Scene key = "favorites" component = {FavoritesView} hideNavBar = {true}/>
            <Scene key = "login" component = {Login} hideNavBar = {true} />
            <Scene key = "confirmBuy" component = {ConfirmBuy} hideNavBar = {true} />
            <Scene key = "whitoutRegister" component = {WhitOutRegister} hideNavBar = {true} modal = {true} type={ActionConst.PUSH}/>
          </Scene>
        </Drawer>
      </Router>
    )
  }
}
