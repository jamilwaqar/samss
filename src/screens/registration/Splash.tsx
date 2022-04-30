import React, { useEffect } from 'react'
import { View, Image, StyleSheet, StatusBar, ImageBackground, Text } from 'react-native'
import { Images } from '../../constants/assets/images'
import { ColorSet, ScreenSize } from '../../styles'
import { getDataFromStorage } from '../../utils/storage'

const SplashScreen: React.FC<{ navigation: any }> = ({ navigation }) => {

  useEffect(() => {
    userData()
  }, [])

  const performTimeConsumingTask = () => {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve('splash')
      }, 3000),
    )
  }

  const userData = async () => {
    await performTimeConsumingTask()
    const data = await getDataFromStorage('user')
    // if (data != null) {
    //   navigation.replace('BottomTabNavigation')
    //   return
    // }
    navigation.replace('Auth')
  }
  return (
    <>

      <View style={[styles.container]}>
        <Image style={styles.image} source={Images.logo} />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ColorSet.white,
  },
  image: {
    width: ScreenSize.screenWidth.width50,
    alignSelf: "center",
    // height: ScreenSize.screenWidth.width60,
    resizeMode: 'contain',
    // marginTop: ScreenSize.screenWidth.width15
  },
  bgImage: {
    width: '100%',
    height: ScreenSize.screenHeight.height100,
  },
})

export default SplashScreen
