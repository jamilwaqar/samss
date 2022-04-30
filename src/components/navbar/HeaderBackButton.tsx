import React from 'react'
import { StyleSheet,View, Image, TouchableOpacity } from 'react-native'

import { Images } from '../../constants/assets/images'


interface BackButtonProps {
  onPress: (() => void) | undefined
}

const HeaderBackButton: React.FC<BackButtonProps> = ({ onPress }) => {
  return (
    <View style={[styles.header]}>
      <TouchableOpacity onPress={onPress} >
        <Image style={styles.image} source={Images.back} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 15,
    zIndex: 99,
  },
  image: {
    width: 16,
    height: 18,
    resizeMode: 'contain',
  },
})

export default HeaderBackButton
