import React, { useRef, useState, useEffect } from 'react'
import { StyleSheet, View, StatusBar, Platform, UIManager, TouchableOpacity, Image, Animated } from 'react-native'
import appStyle from '../../../assets/styles/appStyle'
import { Fonts, ColorSet } from '../../../styles'
import { Images } from '../../../constants/assets/images'
import { H2, Loader, Paragraph, Input, H5, H4, H3, Header, Link } from '../../../components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SafeAreaView } from 'react-native-safe-area-context'
// import { useSelector } from 'react-redux'
import { DateHelper } from '../../../utils/'
import * as Animatable from 'react-native-animatable';



if (
     Platform.OS === 'android' &&
     UIManager.setLayoutAnimationEnabledExperimental
) {
     UIManager.setLayoutAnimationEnabledExperimental(true)
}
const animationType = 'fadeInRight'
const AddRecruitScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
     const [focused, setFocused] = useState(false)
     const [isLoading, setIsLoading] = useState<boolean>(false)
     const [headerShown, setHeaderShown] = useState(false)
     const translation = useRef(new Animated.Value(-100)).current
     const opacity = useRef(new Animated.Value(0)).current
     // const { data } = useSelector(state => state.statReducer);

     // const healthArray = data.portfoiloHealth
     useEffect(() => {

          Animated.timing(translation, {
               toValue: headerShown ? 0 : -50,
               duration: 200,
               useNativeDriver: true,
          }).start()
          Animated.timing(opacity, {
               toValue: headerShown ? 1 : 0,
               duration: 150,
               useNativeDriver: true,
          }).start()

     }, [headerShown])

     const onChangeText = () => {
          if (error.length > 0) {
            setError('')
            setIsErrorVisible(true)
          } else {
            setIsErrorVisible(false)
            setError('')
          }
        }

     return (
          <View style={[appStyle.safeContainer]}>
               <StatusBar backgroundColor={ColorSet.blue} translucent barStyle={'light-content'} />

               <Header
                    onPress={() => navigation.goBack()}
                    isHamburger={false}>Add Recruit</Header>

               <KeyboardAwareScrollView
                    showsVerticalScrollIndicator={false}
                    style={appStyle.flex1}>
                    <View style={[appStyle.wrapper]}>
                         <View>
                              <Input
                                   label="Email"
                                   // value={email}
                                   keyboardType="email-address"
                                   // setValue={setEmail}
                                   // errorText={emailFormatError}
                                   onChangeText={onChangeText}
                              />
                              <Input
                                   label="Password"
                                   // value={password}
                                   // setValue={setPassword}
                                   isSecure={true}
                                   // errorText={passwordFormatError}
                                   onChangeText={onChangeText}
                              />
                              <View style={appStyle.asFlexEnd}>
                                   <Link onPress={() => navigation.navigate('ForgotPassword')}>
                                        Forgot Password?
                                   </Link>
                              </View>
                         </View>

                    </View>
               </KeyboardAwareScrollView>

               <Loader
                    isLoading={isLoading}
                    // shadow={false}
                    layout={'outside'}
                    message={'Verifying your information...'}
               />

          </View>
     )
}

const styles = StyleSheet.create({
     title: {
          ...Fonts.size.medium,
     },
     headerFixedTitle: {
          ...Fonts.size.medium,
     },
     card: {
          backgroundColor: '#fff',
          shadowColor: 'rgba(0,0,0,0.26)',
          shadowOffset: {
               width: 0,
               height: 7,
          },
          shadowOpacity: 0.12,
          shadowRadius: 9.51,

          elevation: 23,
          borderRadius: 12,
          // padding: 15,
          marginBottom: 20,
          borderWidth: 1,
          borderColor: '#ddd',
          overflow: 'hidden',
          paddingBottom: 15
     },
     cardIconContainer: {
          marginRight: 15,
          alignSelf: 'flex-start',
     },
     linkText: {
          marginRight: 10,
          paddingTop: 3,
          color: ColorSet.blue
     }
})

export default AddRecruitScreen
