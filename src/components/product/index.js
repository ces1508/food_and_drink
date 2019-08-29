import React, {Component} from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator
} from 'react-native'
import numeral from 'numeral'
import Puntos from '../puntos'
import { getPlatform } from '../../utils'
const width = Dimensions.get('window').width
const imagesEndoint = 'http://162.221.185.186/~foodydrink/mokets-admin/uploads/'
export default class Product extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let price = numeral(this.props.unit_price).format('($0,0)')
    return (
      <View style = {styles.product}>
        <Image
          source = {{ uri: `${imagesEndoint}${this.props.images[0].path}` }}
          style = {styles.image}
          resizeMode = "cover"
        />
        <View style = {styles.productPrice}>
          <Puntos customStyle = {styles.puntos} />
          <Text style = {[styles.productPriceText]}> {price}</Text>
        </View>
      </View>
    )
  }
}

const styles = new StyleSheet.create({
  image: {
    width: (width / 2) - 10,
    height: 178,
  },
  product: {
    width: width / 2,
    alignItems: 'center',
    margin: 0,
    padding: 0,
    marginTop: 20,
    borderStyle: 'dashed',
    borderColor: 'red',
  },
  productTitle: {
    color: 'white'
  },
  productPrice: {
    flex: 1,
    width: 130
  },
  puntos: {
    width: 130,
    height: 10,
  },
  productPriceText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',

    backgroundColor: 'transparent',
    paddingTop: getPlatform === 'android'? 0: 5,
    fontFamily:  getPlatform === 'android'? 'beyond_the_mountains' : 'Beyond The Mountains',
  }
})