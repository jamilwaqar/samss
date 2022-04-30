import React from 'react'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'

import { Images } from '../../constants/assets/images'
import { H2, Paragraph, NavigationDrawerHeader } from '../../components'
import { ColorSet } from '../../styles'
import appStyle from '../../assets/styles/appStyle'


interface HeaderProps {
     navigation?: TextStyle | undefined
     subTitle?: Text | undefined
     isHamburger?: boolean
     onPress?: (() => void) | undefined

}

const Header: React.FC<HeaderProps> = props => {
     const { navigation, subTitle, isHamburger, onPress } = props

     return (
          <View style={[appStyle.headerContainer]}>
               <View style={[appStyle.row,appStyle.mt20]}>
                    <View>
                         {isHamburger ?
                              <NavigationDrawerHeader navigationProps={navigation} />
                              :
                              <TouchableOpacity style={{ paddingTop: 5 }} onPress={onPress} >
                                   <Image style={styles.image} source={Images.back} />
                              </TouchableOpacity>
                         }
                    </View>
                    <View style={[appStyle.ph20,{alignSelf:'center'}]}>
                         <H2 style={styles.heading}>
                              {props.children}
                         </H2>
                         {subTitle &&
                              <Paragraph style={styles.heading}>{subTitle}</Paragraph>
                         }
                    </View>
               </View>
          </View>
     )
}

const styles = StyleSheet.create({
     heading: {
          color: ColorSet.white,

     },
     image: {
          width: 16,
          height: 18,
          resizeMode: 'contain',
          tintColor: ColorSet.white
     },
})

export default Header
