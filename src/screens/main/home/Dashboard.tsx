import React, { useRef, useState, useEffect } from 'react'
import { StyleSheet, Platform, UIManager, View, RefreshControl, Image, Animated, StatusBar, ScrollView } from 'react-native'
import appStyle from '../../../assets/styles/appStyle'
import { Fonts, FamilySet, ScreenSize, ColorSet } from '../../../styles'
import { Images } from '../../../constants/assets/images'
import { H2, Loader, Paragraph, NavigationDrawerHeader, Header, H1, H3, H4, H5 } from '../../../components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SafeAreaView } from 'react-native-safe-area-context'
import { screenHeight, screenWidth } from '../../../styles/screenSize'
import ProgressCircle from 'react-native-progress-circle'
import { DateHelper } from '../../../utils/'
import * as Animatable from 'react-native-animatable';

import { getData, getDataWithoutId, graphData } from '../../../networking/DashboardApiService'
import { api } from '../../../networking/Environment'
import screens from '../../../constants/screens'

const DashboardScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [focused, setFocused] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [headerShown, setHeaderShown] = useState(false)
  const translation = useRef(new Animated.Value(-100)).current
  const opacity = useRef(new Animated.Value(0)).current
  const [projectData, setProjectData] = useState([]);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [graphValues, setGraphValues] = useState([1, 2, 3, 4]);
  const [graphLabels, setGraphLabels] = useState(['1', '2', '3', '4']);
  const [activeGraphTab, setActiveGraphTab] = useState<number>(1)
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)


  useEffect(() => {

  }, []);


  const onRefresh = () => {
    // getDashboardData();
  }
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

  }, [])
  if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
  }

  const getDashboardData = async () => {
    const dashboardResponse: any = await getData(api.dashboardStats)
    const dashboardProjectsResponse: any = await getDataWithoutId(api.dashboardProjects)
    if (dashboardResponse != null) {
      setDashboardStats(dashboardResponse.data)
    }
    if (dashboardProjectsResponse != null) {
      setProjectData(dashboardProjectsResponse.data)
    }

  }

  return (
    <View style={[appStyle.safeContainer]}>
      <StatusBar backgroundColor={ColorSet.blue} translucent barStyle={'light-content'} />
      <Header
        navigation={navigation}
        isHamburger={true}
      >Dashboard
      </Header>

      <KeyboardAwareScrollView
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
          />
        }
        keyboardShouldPersistTaps="always"
        contentContainerStyle={appStyle.scrollContainer}
        stickyHeaderIndices={[!focused ? 1 : 0]}
        onScroll={event => {
          const scrolling = event.nativeEvent.contentOffset.y
          if (scrolling > 40) {
            setHeaderShown(true)
          } else {
            setHeaderShown(false)
          }
        }}
        scrollEventThrottle={16}
      >
        <View style={[appStyle.wrapper]}>

          {!isLoading &&
            <>
              <View style={[appStyle.pt20, appStyle.mhN20,appStyle.aiCenter ]}>
                  <Animatable.View
                    animation={'fadeInLeft'}
                    style={[appStyle.detailCard, styles.dashboardDetailCard, { backgroundColor: ColorSet.lightBlue }]}>
                    <View
                      style={styles.dashCardUnderlay} />
                    <View
                      style={styles.dashGraphicContainer}
                    >
                      <Image style={styles.dashGraphic} source={Images.graphic} />
                    </View>
                    <H1 style={{ ...styles.cardText, ...styles.dashCardTitle }}>Users Currently Online</H1>
                    <H2 style={{ ...appStyle.pt10, ...styles.dashCardSub, ...styles.center }}>25</H2>
                  </Animatable.View>
                  <Animatable.View
                    delay={200}
                    animation={'fadeInRight'}
                    style={[appStyle.detailCard, styles.dashboardDetailCard, { backgroundColor: ColorSet.green }]}
                  >
                    <View
                      style={styles.dashCardUnderlay} />
                    <View
                      style={styles.dashGraphicContainer} >
                      <Image style={styles.dashGraphic} source={Images.graphic} />
                    </View>
                    <H1 style={{ ...styles.cardText, ...styles.dashCardTitle }}>Schools Ranked By Usage</H1>

                    <View style={[appStyle.rowBtw]}>
                      <H5 style={{ ...appStyle.pt10, ...styles.dashCardSub }}>Montreat College</H5>
                      <H5 style={{ ...appStyle.pt10, ...styles.dashCardSub, }}>3499</H5>
                    </View>
                    <View style={[appStyle.rowBtw,]}>
                      <H5 style={{ ...styles.dashCardSub }}>EMSS</H5>
                      <H5 style={{ ...styles.dashCardSub, }}>4791</H5>
                    </View>
                  </Animatable.View>
                  <Animatable.View
                    animation={'fadeInLeft'}
                    delay={400}
                    style={[appStyle.detailCard, styles.dashboardDetailCard, { backgroundColor: ColorSet.orange }]}
                  >
                    <View
                      style={styles.dashCardUnderlay} />

                    <H1 style={{ ...styles.cardText, ...styles.dashCardTitle }}>Average Weekly Usage Total</H1>
                    <View style={[appStyle.rowBtw]}>
                      <H5 style={{ ...appStyle.pt10, ...styles.dashCardSub }}>Montreat College</H5>
                      <H5 style={{ ...appStyle.pt10, ...styles.dashCardSub, }}>68:31:46</H5>
                    </View>
                    <View style={[appStyle.rowBtw,]}>
                      <H5 style={{ ...styles.dashCardSub }}>EMSS</H5>
                      <H5 style={{ ...styles.dashCardSub, }}>24:36:44</H5>
                    </View>

                  </Animatable.View>
                  <Animatable.View
                    delay={800}
                    animation={'fadeInRight'}
                    style={[appStyle.detailCard, styles.dashboardDetailCard, { backgroundColor: ColorSet.red }]}
                  >
                    <View
                      style={styles.dashCardUnderlay} />
                    <View
                      style={styles.dashGraphicContainer}
                    >
                      <Image style={styles.dashGraphic} source={Images.graphic} />
                    </View>
                    <H1 style={{ ...styles.cardText, ...styles.dashCardTitle }}>Other Options</H1>
                    <View style={[appStyle.rowBtw]}>
                      <H5 style={{ ...appStyle.pt10, ...styles.dashCardSub }}>Limit</H5>
                      <H5 style={{ ...appStyle.pt10, ...styles.dashCardSub, }}>0</H5>
                    </View>
                    <View style={[appStyle.rowBtw,]}>
                      <H5 style={{ ...styles.dashCardSub }}>Current</H5>
                      <H5 style={{ ...styles.dashCardSub, }}>0</H5>
                    </View>
                  </Animatable.View>
              </View>

            </>
          }
        </View>
      </KeyboardAwareScrollView>

      <Loader
        isLoading={isLoading}
        // shadow={false}
        layout={'outside'}
        message={'Fetching data...'}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  cardText: {
    letterSpacing: 0.3,
    color: '#2C2C2C',
    paddingBottom: 5,
    paddingTop: 10
  },
  dashboardDetailCard: {
    backgroundColor: ColorSet.blue,
    justifyContent: 'space-evenly',
    height: screenWidth.width40 - 20,
    width: screenWidth.width100 - 20,
    overflow: 'hidden',
    zIndex: 4,
    // borderRadius: 16,

  },
  dashCardUnderlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    height: screenWidth.width50 - 20,
    width: screenWidth.width50 - 20,
    zIndex: 2
  },

  dashGraphicContainer: {
    position: 'absolute',
    top: -10,
    right: -10,
    zIndex: 1
  },
  dashGraphic: {
    height: screenWidth.width30 - 10,
    width: screenWidth.width30 - 10, resizeMode: 'contain'
  },
  dashCardTitle: {
    ...appStyle.pt0, color: '#fff', fontFamily: FamilySet.medium, position: 'relative', zIndex: 4,
    textAlign: 'center'
  },
  dashCardSub: {
    color: '#fff',
    position: 'relative',
    zIndex: 4,
    fontFamily: FamilySet.regular,
    ...Fonts.size.normal
  },


  center: {
    textAlign: 'center',
    fontFamily: FamilySet.bold
  }
})

export default DashboardScreen
