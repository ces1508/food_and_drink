import React, {Component} from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import {
  Text,
  Platform
} from 'react-native'
export default class BtnFavoite extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
    <Icon.Button name = "ios-star"
      color = {this.props.favorite? 'yellow': 'white'}
      style = {{backgroundColor: 'gray'}}
      onPress = {() => this.props.handlePress()}
      >
      <Text style={{ 
        fontSize: 25, 
        fontFamily: Platform.OS === 'ios' ? 'Adventures  Overlanders' : 'Adventures & Overlanders' 
      }}>
        {this.props.favorite?'Quitar de Favoritos': 'Agregar a Favoritos'}
      </Text>
    </Icon.Button>
    )
  }
}