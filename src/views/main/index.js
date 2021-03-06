import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  AsyncStorage,
  Dimensions,
  FlatList,
  StatusBar,
  ActivityIndicator,
  SafeAreaView
} from 'react-native';
import {
  Actions
} from 'react-native-router-flux'
import Product from '../../components/product'
import Api from '../../api'
import Bar from '../../components/bar'
import  VideoCover from '../../components/video'
const windowsWitdh = Dimensions.get('window').width
const api = new Api()
export default class Main extends Component {
  constructor(props) {
    super(props)
    this.handlePress = this.handlePress.bind(this)
    this.getData = this.getData.bind(this)
    this.renderProducts = this.renderProducts.bind(this)
    this.toggleMenu = this.toggleMenu.bind(this)
    this.state = {
      products: [],
      categoryId: 105,
      categoryName: 'Comidas Rápidas'
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.categoryId && props.categoryId !== state.categoryId) {
      let { categoryId, categoryName } = props
      return {
        categoryId,
        categoryName
      }
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.categoryId !== this.state.categoryId) this.getData()
  }

  componentDidMount() {
    this.getData()
  }
  _keyExtractor = (item, index) => (item.id)

  toggleMenu() {
     Actions.drawerOpen({key: 'drawer', open: value => true })
  }
  async getData() {
    const { categoryId } = this.state
    Actions.refresh({key: 'drawer', open: value => false })
    this.setState({ loading: true })
    let products = await api.getProducts(categoryId)
    this.setState({products: products, loading: false})

  }
  async handlePress(product) {
   Actions.product({product})
  }
  renderProducts(product) {
    return (
      <TouchableOpacity onPress =  {() => this.handlePress(product)}>
        <Product {...product} />
      </TouchableOpacity>
    )
  }
  renderLoading() {
    if (this.state.loading) {
      return(
        <View style = {{flex: 1}}>
          <ActivityIndicator size = "large"  color = "red"/>
        </View>
      )
    } else {
      return null
    }
  }
  render() {
    return (
     // <SafeAreaView style={{ flex: 1 }}>
        <View style = {styles.container}>
          <VideoCover />
          <Bar icon = 'ios-menu' categoryName = {this.state.categoryName} handlePress = {this.toggleMenu} options = {true} icon = "menu"/>
          {this.state.loading?this.renderLoading():
            <FlatList
              keyExtractor = {this._keyExtractor}
              style = {styles.list}
              numColumns = {2}
              data = {this.state.products}
              renderItem = {(product) => (this.renderProducts(product.item))}
            />
          }
        </View>
    //  </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    zIndex: 200,
  },
});


