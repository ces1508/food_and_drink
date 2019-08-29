import React, {Component} from 'react'
import {View, Image, Dimensions, StyleSheet, TouchableHighlight} from 'react-native'
import { Actions } from 'react-native-router-flux'
import { getPlatform } from '../../utils'
const width = Dimensions.get('window').width


export default class CateogiesMenu extends Component {
  constructor(){
    super()
  }

  goProductsByCategories(id, name) {
    Actions.refresh({ categoryId: id, categoryName: name, type: 'refresh' })
  }
  render(){
    return (
      <View style = {styles.main}>
        <TouchableHighlight onPress = {() => this.goProductsByCategories(105, 'Comidas Rápidas')}>
          <View>
            <Image
              source = {require('../../../assets/images/hamburguesa-icon.png')}
              style = {styles.category}
              resizeMode = 'contain'
            />
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress = {() => this.goProductsByCategories(113, 'Bebidas')}>
          <View>
            <Image
              source = {require('../../../assets/images/bebidas.png')}
              style = {styles.category}
              resizeMode = 'contain'
            />
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress = {() => this.goProductsByCategories(108, 'Platos Especiales')}>
          <View>
            <Image
              source = {require('../../../assets/images/platos.png')}
              style = {styles.category}
              resizeMode = 'contain'
            />
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress = {() => this.goProductsByCategories(111, "Snacks")}>
          <View>
            <Image
              source = {require('../../../assets/images/snack.png')}
              resizeMode = 'contain'
              style = {styles.category}
            />
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    width: width,
    height:50,
    flexDirection: 'row'
  },
  category: {
    width: width / 5,
    height: 45,
    marginLeft: 2
  },
  categoryName: {
    fontFamily:  getPlatform === 'android'? 'beyond_the_mountains' : 'Beyond The Mountains',
    color: 'white',
    position: 'absolute',
    bottom: 0,
    paddingLeft: 10,
  }
})