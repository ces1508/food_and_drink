import { AsyncStorage,  Alert, Platform } from 'react-native'

export const getUser = async () => {
  try {
    let user = await AsyncStorage.getItem('currentUser')
    if(user) {
      user = JSON.parse(user)
      return user
    } else {
      return  null
    }
  } catch (e) {
    return null
  }
}

export const updatedUser = async (data) => {
  try {
    let user = await getUser()
    newUser = {...data}
    user.email = newUser.email,
    user.delivery_address = newUser.delivery_address
    user.phone = newUser.phone,
    user.username = newUser.username
    await AsyncStorage.setItem('currentUser', JSON.stringify(user))
  } catch(e) {
    console.log(e.stack)
    Alert.alert('ocurrió un error al actualizar tus datos')
  }
}

export const getPlatform = () => {
  let platform = Platform.OS
  console.warn('la plataforma es ', platform)
  return Platform.OS
}


export const getCantProduct = async () => {
  try {
    let products = await AsyncStorage.getItem('fastFoodCart')
    let cant = 0
    if (products && products.length > 0)
      cant = products.reduce((prevProduct, currentProduct, index) => {
          if (prevProduct.unit_price) {
            cant  = (prevProduct.cant * prevProduct.unit_price) + (currentProduct.cant * currentProduct.unit_price)
          } else {
            sum =  prevProduct + (currentProduct.cant * currentProduct.unit_price)
          }
        return sum
      })

  } catch (e) {

  }
}