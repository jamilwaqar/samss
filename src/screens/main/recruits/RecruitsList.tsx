import React, { useRef, useState, useEffect } from 'react'
import { StyleSheet, View, StatusBar, Platform, UIManager, TouchableOpacity, Image, Animated } from 'react-native'
import appStyle from '../../../assets/styles/appStyle'
import { Fonts, ColorSet } from '../../../styles'
import { Images } from '../../../constants/assets/images'
import { H2, Loader, Paragraph, Accordion, H5, H4, H3, Header, Link } from '../../../components'
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
const RecruitListScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
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



     return (
          <View style={[appStyle.safeContainer]}>
               <StatusBar backgroundColor={ColorSet.blue} translucent barStyle={'light-content'} />

               <Header
                    navigation={navigation}
                    isHamburger={true}>Recruits</Header>
               <View style={[appStyle.pt10, appStyle.mr15, appStyle.asFlexEnd]}>
                    <TouchableOpacity
                         onPress={() => navigation.navigate('AddRecruit')}
                         hitSlop={{ top: 20, bottom: 20, right: 20, left: 20 }}
                         style={appStyle.iconContainer}>
                         <View style={appStyle.row}>
                              <Paragraph style={styles.linkText}>Add new</Paragraph>
                              <Image source={Images.add} style={appStyle.iconMd} />
                         </View>

                    </TouchableOpacity>
               </View>
               <KeyboardAwareScrollView
                    showsVerticalScrollIndicator={false}
                    style={appStyle.flex1}>
                    <View style={[appStyle.wrapper]}>

                         <View style={[appStyle.flex1, appStyle.pt20]}>

                              <Animatable.View style={styles.card}
                                   animation={animationType}>
                                   <View>
                                        <View style={[appStyle.row, appStyle.jcSpaceBetween, appStyle.p15]}>
                                             <View style={appStyle.flex1}>
                                                  <H4 style={{ color: ColorSet.grey }}>#1</H4>
                                                  <H3 style={appStyle.pt5}>Montreat College</H3>
                                             </View>
                                        </View>
                                        <Accordion
                                             label={
                                                  <View style={[appStyle.row, appStyle.aiCenter, appStyle.pl15]}>
                                                       <Image style={appStyle.iconSm} source={Images.date} />
                                                       <Paragraph style={appStyle.pl5}>2022</Paragraph>
                                                  </View>
                                             }
                                        >
                                             <View style={[appStyle.dividerTop, appStyle.mt10, appStyle.ph15]}>
                                                  <View style={[appStyle.rowBtw, appStyle.pt10]}>
                                                       <View style={appStyle.flex1}>
                                                            <H5>First Name</H5>
                                                            <H5 style={appStyle.cardDescText}>John</H5>
                                                       </View>
                                                       <View style={[appStyle.flex1, appStyle.aiFlexEnd]}>
                                                            <H5>Last Name</H5>
                                                            <H5 style={appStyle.cardDescText}>Doe</H5>
                                                       </View>

                                                  </View>
                                                  <View style={[appStyle.rowBtw, appStyle.pt10]}>
                                                       <View style={appStyle.flex1}>
                                                            <H5>Middle Name</H5>
                                                            <H5 style={appStyle.cardDescText}>Adam</H5>
                                                       </View>
                                                       <View style={[appStyle.flex1, appStyle.aiFlexEnd]}>
                                                            <H5>Nick Name</H5>
                                                            <H5 style={appStyle.cardDescText}>Bruce</H5>
                                                       </View>
                                                  </View>
                                                  <View style={[appStyle.rowBtw, appStyle.pt10]}>
                                                       <View style={appStyle.flex1}>
                                                            <H5>Email</H5>
                                                            <H5 style={appStyle.cardDescText}>john@gmail.com</H5>
                                                       </View>
                                                       <View style={[appStyle.flex1, appStyle.aiFlexEnd]}>
                                                            <H5>Mobile</H5>
                                                            <H5 style={appStyle.cardDescText}>+123456789</H5>
                                                       </View>
                                                  </View>
                                                  <View style={[appStyle.rowBtw, appStyle.pt10]}>
                                                       <View style={appStyle.flex1}>
                                                            <H5>Sports</H5>
                                                            <H5 style={appStyle.cardDescText}>Football</H5>
                                                       </View>
                                                       <View style={[appStyle.flex1, appStyle.aiFlexEnd]}>
                                                            <H5>High School</H5>
                                                            <H5 style={appStyle.cardDescText}>Montreat School</H5>
                                                       </View>
                                                  </View>
                                                  <View style={[appStyle.rowBtw, appStyle.pt10]}>
                                                       <View style={appStyle.flex1}>
                                                            <H5>Start Term</H5>
                                                            <H5 style={appStyle.cardDescText}>Cupertino</H5>
                                                       </View>
                                                  </View>
                                             </View>
                                        </Accordion>
                                   </View>
                              </Animatable.View>

                              <Animatable.View style={styles.card}
                                   animation={animationType}
                                   delay={200}
                              >
                                   <View>
                                        <View style={[appStyle.row, appStyle.jcSpaceBetween, appStyle.p15]}>
                                             <View style={appStyle.flex1}>
                                                  <H4 style={{ color: ColorSet.grey }}>#2</H4>
                                                  <H3 style={appStyle.pt5}>Montreat College</H3>
                                             </View>
                                        </View>
                                        <Accordion
                                             label={
                                                  <View style={[appStyle.row, appStyle.aiCenter, appStyle.pl15]}>
                                                       <Image style={appStyle.iconSm} source={Images.date} />
                                                       <Paragraph style={appStyle.pl5}>2022</Paragraph>
                                                  </View>
                                             }
                                        >
                                             <View style={[appStyle.dividerTop, appStyle.mt10, appStyle.ph15]}>
                                                  <View style={[appStyle.rowBtw, appStyle.pt10]}>
                                                       <View style={appStyle.flex1}>
                                                            <H5>First Name</H5>
                                                            <H5 style={appStyle.cardDescText}>John</H5>
                                                       </View>
                                                       <View style={[appStyle.flex1, appStyle.aiFlexEnd]}>
                                                            <H5>Last Name</H5>
                                                            <H5 style={appStyle.cardDescText}>Doe</H5>
                                                       </View>

                                                  </View>
                                                  <View style={[appStyle.rowBtw, appStyle.pt10]}>
                                                       <View style={appStyle.flex1}>
                                                            <H5>Middle Name</H5>
                                                            <H5 style={appStyle.cardDescText}>Adam</H5>
                                                       </View>
                                                       <View style={[appStyle.flex1, appStyle.aiFlexEnd]}>
                                                            <H5>Nick Name</H5>
                                                            <H5 style={appStyle.cardDescText}>Bruce</H5>
                                                       </View>
                                                  </View>
                                                  <View style={[appStyle.rowBtw, appStyle.pt10]}>
                                                       <View style={appStyle.flex1}>
                                                            <H5>Email</H5>
                                                            <H5 style={appStyle.cardDescText}>john@gmail.com</H5>
                                                       </View>
                                                       <View style={[appStyle.flex1, appStyle.aiFlexEnd]}>
                                                            <H5>Mobile</H5>
                                                            <H5 style={appStyle.cardDescText}>+123456789</H5>
                                                       </View>
                                                  </View>
                                                  <View style={[appStyle.rowBtw, appStyle.pt10]}>
                                                       <View style={appStyle.flex1}>
                                                            <H5>Sports</H5>
                                                            <H5 style={appStyle.cardDescText}>Football</H5>
                                                       </View>
                                                       <View style={[appStyle.flex1, appStyle.aiFlexEnd]}>
                                                            <H5>High School</H5>
                                                            <H5 style={appStyle.cardDescText}>Montreat School</H5>
                                                       </View>
                                                  </View>
                                                  <View style={[appStyle.rowBtw, appStyle.pt10]}>
                                                       <View style={appStyle.flex1}>
                                                            <H5>Start Term</H5>
                                                            <H5 style={appStyle.cardDescText}>Cupertino</H5>
                                                       </View>
                                                  </View>
                                             </View>
                                        </Accordion>
                                   </View>
                              </Animatable.View>

                              <Animatable.View style={styles.card}
                                   animation={animationType}
                                   delay={400}
                              >
                                   <View>
                                        <View style={[appStyle.row, appStyle.jcSpaceBetween, appStyle.p15]}>
                                             <View style={appStyle.flex1}>
                                                  <H4 style={{ color: ColorSet.grey }}>#3</H4>
                                                  <H3 style={appStyle.pt5}>Montreat College</H3>
                                             </View>
                                        </View>
                                        <Accordion
                                             label={
                                                  <View style={[appStyle.row, appStyle.aiCenter, appStyle.pl15]}>
                                                       <Image style={appStyle.iconSm} source={Images.date} />
                                                       <Paragraph style={appStyle.pl5}>2022</Paragraph>
                                                  </View>
                                             }
                                        >
                                             <View style={[appStyle.dividerTop, appStyle.mt10, appStyle.ph15]}>
                                                  <View style={[appStyle.rowBtw, appStyle.pt10]}>
                                                       <View style={appStyle.flex1}>
                                                            <H5>First Name</H5>
                                                            <H5 style={appStyle.cardDescText}>John</H5>
                                                       </View>
                                                       <View style={[appStyle.flex1, appStyle.aiFlexEnd]}>
                                                            <H5>Last Name</H5>
                                                            <H5 style={appStyle.cardDescText}>Doe</H5>
                                                       </View>

                                                  </View>
                                                  <View style={[appStyle.rowBtw, appStyle.pt10]}>
                                                       <View style={appStyle.flex1}>
                                                            <H5>Middle Name</H5>
                                                            <H5 style={appStyle.cardDescText}>Adam</H5>
                                                       </View>
                                                       <View style={[appStyle.flex1, appStyle.aiFlexEnd]}>
                                                            <H5>Nick Name</H5>
                                                            <H5 style={appStyle.cardDescText}>Bruce</H5>
                                                       </View>
                                                  </View>
                                                  <View style={[appStyle.rowBtw, appStyle.pt10]}>
                                                       <View style={appStyle.flex1}>
                                                            <H5>Email</H5>
                                                            <H5 style={appStyle.cardDescText}>john@gmail.com</H5>
                                                       </View>
                                                       <View style={[appStyle.flex1, appStyle.aiFlexEnd]}>
                                                            <H5>Mobile</H5>
                                                            <H5 style={appStyle.cardDescText}>+123456789</H5>
                                                       </View>
                                                  </View>
                                                  <View style={[appStyle.rowBtw, appStyle.pt10]}>
                                                       <View style={appStyle.flex1}>
                                                            <H5>Sports</H5>
                                                            <H5 style={appStyle.cardDescText}>Football</H5>
                                                       </View>
                                                       <View style={[appStyle.flex1, appStyle.aiFlexEnd]}>
                                                            <H5>High School</H5>
                                                            <H5 style={appStyle.cardDescText}>Montreat School</H5>
                                                       </View>
                                                  </View>
                                                  <View style={[appStyle.rowBtw, appStyle.pt10]}>
                                                       <View style={appStyle.flex1}>
                                                            <H5>Start Term</H5>
                                                            <H5 style={appStyle.cardDescText}>Cupertino</H5>
                                                       </View>
                                                  </View>
                                             </View>
                                        </Accordion>
                                   </View>
                              </Animatable.View>

                              <Animatable.View style={styles.card}
                                   animation={animationType}
                                   delay={600}
                              >
                                   <View>
                                        <View style={[appStyle.row, appStyle.jcSpaceBetween, appStyle.p15]}>
                                             <View style={appStyle.flex1}>
                                                  <H4 style={{ color: ColorSet.grey }}>#4</H4>
                                                  <H3 style={appStyle.pt5}>Montreat College</H3>
                                             </View>
                                        </View>
                                        <Accordion
                                             label={
                                                  <View style={[appStyle.row, appStyle.aiCenter, appStyle.pl15]}>
                                                       <Image style={appStyle.iconSm} source={Images.date} />
                                                       <Paragraph style={appStyle.pl5}>2022</Paragraph>
                                                  </View>
                                             }
                                        >
                                             <View style={[appStyle.dividerTop, appStyle.mt10, appStyle.ph15]}>
                                                  <View style={[appStyle.rowBtw, appStyle.pt10]}>
                                                       <View style={appStyle.flex1}>
                                                            <H5>First Name</H5>
                                                            <H5 style={appStyle.cardDescText}>John</H5>
                                                       </View>
                                                       <View style={[appStyle.flex1, appStyle.aiFlexEnd]}>
                                                            <H5>Last Name</H5>
                                                            <H5 style={appStyle.cardDescText}>Doe</H5>
                                                       </View>

                                                  </View>
                                                  <View style={[appStyle.rowBtw, appStyle.pt10]}>
                                                       <View style={appStyle.flex1}>
                                                            <H5>Middle Name</H5>
                                                            <H5 style={appStyle.cardDescText}>Adam</H5>
                                                       </View>
                                                       <View style={[appStyle.flex1, appStyle.aiFlexEnd]}>
                                                            <H5>Nick Name</H5>
                                                            <H5 style={appStyle.cardDescText}>Bruce</H5>
                                                       </View>
                                                  </View>
                                                  <View style={[appStyle.rowBtw, appStyle.pt10]}>
                                                       <View style={appStyle.flex1}>
                                                            <H5>Email</H5>
                                                            <H5 style={appStyle.cardDescText}>john@gmail.com</H5>
                                                       </View>
                                                       <View style={[appStyle.flex1, appStyle.aiFlexEnd]}>
                                                            <H5>Mobile</H5>
                                                            <H5 style={appStyle.cardDescText}>+123456789</H5>
                                                       </View>
                                                  </View>
                                                  <View style={[appStyle.rowBtw, appStyle.pt10]}>
                                                       <View style={appStyle.flex1}>
                                                            <H5>Sports</H5>
                                                            <H5 style={appStyle.cardDescText}>Football</H5>
                                                       </View>
                                                       <View style={[appStyle.flex1, appStyle.aiFlexEnd]}>
                                                            <H5>High School</H5>
                                                            <H5 style={appStyle.cardDescText}>Montreat School</H5>
                                                       </View>
                                                  </View>
                                                  <View style={[appStyle.rowBtw, appStyle.pt10]}>
                                                       <View style={appStyle.flex1}>
                                                            <H5>Start Term</H5>
                                                            <H5 style={appStyle.cardDescText}>Cupertino</H5>
                                                       </View>
                                                  </View>
                                             </View>
                                        </Accordion>
                                   </View>
                              </Animatable.View>

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

export default RecruitListScreen
