import React, {Component} from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
  ToastAndroid,
  Vibration,
  Linking,
  Platform,
  SafeAreaView
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import BtnFavorite from '../../components/btnFavorite'
import BtnAddToCart from '../../components/btnAddCart'
import numeral from 'numeral'
import Bar from '../../components/bar'
import {Actions} from 'react-native-router-flux'
import Puntos from '../../components/puntos'
const width = Dimensions.get('window').width
import { getPlatform } from '../../utils'
import Api from '../../api'
import Toast, { DURATION } from 'react-native-easy-toast'
const api = new Api()
const imagesEndoint = 'http://162.221.185.186/~foodydrink/mokets-admin/uploads/'
const isIos = Platform.OS === 'Android'? false: true
export default class ProductView extends Component {
  constructor (props) {
    super(props)
    this.back = this.back.bind(this)
    this.makeFavorite = this.makeFavorite.bind(this)
    this.getFavorite = this.getFavorite.bind(this)
    this.AlreadyInCart = this.AlreadyInCart.bind(this)
    this.addToCart = this.addToCart.bind(this)
    this.getProductsCart = this.getProductsCart.bind(this)
    this.state = {favorite: false}
  }

  back() {
    Actions.pop()
  }

  handleLink(url) {
    Linking.openURL(url)
  }
  async AlreadyInCart() {
    let product = this.props.product
    try {
      products = await AsyncStorage.getItem('fastFoodCart')
      if (products !== null) {
        products = JSON.parse(products)
        let exists =  products.filter((p) => {
          return p.id === product.id
        })
        return exists.length > 0? true: false
      } else {
        return false
      }
    } catch (e) {
    }
  }

  async getProductsCart() {
    try {
      let products = await AsyncStorage.getItem('fastFoodCart')
      products = JSON.parse(products)
      if (products !== null) {
        return products
      }
      return []
    } catch (e) {
      return false
    }
  }
  async addToCart() {
    try {
      let {product} = this.props
      let products =  await this.getProductsCart()
      let exists = await this.AlreadyInCart()
      if (exists){
        let productIndex = products.findIndex((p) => {
          return p.id === product.id
        })
        products[productIndex].cant += 1
      } else {
        product.cant = 1
        products.push(product)
      }
      await AsyncStorage.setItem('fastFoodCart', JSON.stringify(products))
      Vibration.vibrate()
      // ToastAndroid.showWithGravity('producto agregado al carrito', ToastAndroid.SHORT, ToastAndroid.CENTER)
      this.refs.toast.show('producto agregado al carrito', DURATION.LENGTH_SHORT)
    } catch (e) {
      // ToastAndroid.show('Ocurrió un error, por favor intentalo más tarde', ToastAndroid.SHORT, ToastAndroid.CENTER)
    }
  }
  async getFavorite() {
    let product = this.props.product
    try {
      let favorites = await AsyncStorage.getItem('fastFoodFavorites')
      favorites = JSON.parse(favorites)
      let isFavorite = favorites.filter((fav) => fav.id ===  product.id)
      if (isFavorite.length > 0) {
        this.setState({favorite: true})
      } else {
        this.setState({favorite: false})
      }
    } catch (e) {
      // ToastAndroid.show('Ocurrió un error, por favor intentalo más tarde', ToastAndroid.SHORT, ToastAndroid.CENTER)
    }
  }
  async componentWillMount() {
    this.getFavorite()
  }
  async makeFavorite (product) {
    let favorite = await api.makeFavorite(product)
    this.getFavorite()
  }
  render() {
    let price = numeral(this.props.product.unit_price).format('($0,0)')
    return(
      <SafeAreaView style={{ flex: 1 }}>
        <View style = {{flex:1, backgroundColor: 'black'}}>
          <Bar icon = "ios-arrow-round-back" title = {this.props.product.name} handlePress = {this.back} icon = "arrowLeft" cart = {true}>
          </Bar>
          <ScrollView style = {styles.main}>
            <View>
              <View style = {styles.actions}>
                <View style = {styles.addFavorite}>
                  <BtnFavorite handlePress = {() => this.makeFavorite(this.props.product)} favorite = {this.state.favorite}/>
                </View>
                <View style = {styles.addCar}>
                  <BtnAddToCart  handlePress = {this.addToCart}/>
                </View>
              </View>
              <View style = {styles.containerImage}>
                <Image
                  source = {{ uri: `${imagesEndoint}${this.props.product.images[0].path}` }}
                  resizeMode = 'stretch'
                  style = {styles.imageProduct}
                />
              </View>
              <View style = {styles.productinfo}>
                <View style = {{flex: 1, flexDirection: 'row', justifyContent: 'space-between', height: 50, alignItems: 'center'}}>
                  <Text style = {styles.productName}> {this.props.product.name} </Text>
                  <Text style = {{backgroundColor: 'white', color: 'black'}}> {price} </Text>
                </View>
              <Puntos />
                <View style = {styles.productDescription}>
                  <Text style = {styles.productName}> Descripción: </Text>
                  <Text style = {styles.productName}> {this.props.product.description} </Text>
                </View>
              </View>
              <Toast ref = 'toast' style={{backgroundColor:'green'}} position = 'center'/>
              <View style = {{flex: 1}}>
                <View style = {{flexDirection: 'row'}}>
                  <Text style = {styles.productName}> Síguenos en  </Text>
                  <Puntos customStyle = {styles.puntos}/>
                </View>
                <View style = {{flexDirection: 'row', paddingLeft: 20, paddingRight: 20, justifyContent: 'space-between', alignItems:'center', marginBottom: 15}}>
                  <Icon
                    name = "facebook"
                    size = {40}
                    style = {{marginRight: 20}}
                    color = "white"
                    onPress = {() => this.handleLink('https://www.facebook.com/FoodandDrink24/')}
                  />
                  <Icon
                    name = "instagram"
                    color = "white"
                    size = {40}
                    style = {{marginLeft: 20}}
                    onPress = {() => this.handleLink('https://www.instagram.com/foodanddrink24_7/')}
                  />
                  <Icon
                    name = "twitter"
                    color = "white"
                    size = {40}
                    style = {{marginLeft: 20}}
                    onPress = {() => this.handleLink('https://www.instagram.com/foodanddrink24_7/')}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  actions: {
    flex: 1,
    flexDirection: 'row',
    height: 45,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  main: {
    flex: 1,
    backgroundColor: 'black',
    paddingLeft: 8,
    paddingRight: 8,
  },
  addFavorite: {
  },
  productinfo: {
    marginBottom: 30,
  },
  containerImage: {
    marginTop: 10,
    flex: 1,
    height: 250,
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 10,
  },
  imageProduct: {
    width: 250,
    height: 250,
  },
  productName: {
    color: 'white',
    fontSize: 25,
    fontFamily: Platform.OS === 'ios' ? 'Adventures  Overlanders' : 'Adventures & Overlanders' 

  },
  productDescription: {
    backgroundColor: 'gray',
    marginTop: 20,
    borderRadius: 10,
    paddingTop: 20,
    paddingLeft: 10,
    paddingBottom: 15,
  },
  puntos: {
    width:width / 2,
    height: 20
  },
  rosalineFont: {
    fontSize: 25
  }
})