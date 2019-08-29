import React, {Component} from 'react'
import {
  Text
} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
export default class BtnAddCart extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <Icon.Button name = "cart-outline" style = {{backgroundColor: 'gray'}} color = 'yellow' onPress = {() => this.props.handlePress()}>
        <Text style = {{ fontSize: 25, fontFamily: 'Adventures & Overlanders' }}> Agregar al Carro </Text>
      </Icon.Button>
    )
  }
}