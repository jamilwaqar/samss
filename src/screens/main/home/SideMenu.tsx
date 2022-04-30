import React, { createRef } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, } from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { H4, BottomSheet,Button } from '../../../components'
import { Images } from '../../../constants/assets/images'
import { ColorSet, FamilySet } from '../../../styles';
import appStyle from '../../../assets/styles/appStyle'

// import AsyncStorage from '@react-native-community/async-storage';





const CustomSidebarMenu = (props) => {
  const logoutActionSheetRef = createRef()

  const onPressCloseSheet = () => {
    logoutActionSheetRef.current?.setModalVisible(false)
  }
  const onPressLogout = async () => {
    logoutActionSheetRef.current?.setModalVisible(false)
    props.navigation.replace('Auth');
  }

  return (
    <View style={stylesSidebar.sideMenuContainer}>
      <View style={stylesSidebar.profileHeader}>
        <View style={stylesSidebar.profileHeaderPicCircle}>
          <Image style={stylesSidebar.logo} source={Images.logo} />
        </View>

        {/* <H1 style={stylesSidebar.headingText}>SAMS</H1> */}
      </View>
      {/* <View style={stylesSidebar.profileHeaderLine} /> */}


      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label={({ color }) => <Text style={{ color: color }}>Logout</Text>}
          onPress={() => {
            props.navigation.toggleDrawer();
            logoutActionSheetRef.current?.setModalVisible(true);
          }}
        />
      </DrawerContentScrollView>

      <BottomSheet bottomSheetRef={logoutActionSheetRef}
        bottomCloseBtn={false}
        closeOnTouchBackdrop
      >
        <View>
          <View style={[appStyle.rowBtw, appStyle.pb5, appStyle.asFlexEnd]}>
            <TouchableOpacity
              style={appStyle.iconContainer}
              onPress={onPressCloseSheet}
              hitSlop={{ top: 20, bottom: 20, right: 20, left: 20 }}>
              <Image style={appStyle.iconMd} source={Images.cross} />
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              onPress={onPressCloseSheet}
              style={[appStyle.row, appStyle.aiCenter, appStyle.pb15]}
            >
              <H4 style={appStyle.menuItemText}>Are you sure you want to logout?</H4>
            </TouchableOpacity>
            <View style={appStyle.rowBtw}>
              <View style={appStyle.btnSmall}>
                <Button onPress={onPressLogout}>Yes</Button>
              </View>
              <View style={appStyle.btnSmall}>
                <Button onPress={onPressCloseSheet} containerStyle={{ backgroundColor: ColorSet.red }}>Cancel</Button>
              </View>
            </View>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

export default CustomSidebarMenu;

const stylesSidebar = StyleSheet.create({
  menuContainer: {
    paddingLeft: 20,

  },
  headingText: {
    alignItems: 'center',
    alignSelf: 'center',
    color: ColorSet.white,
    marginLeft: 20,
    fontFamily: FamilySet.regular,
    letterSpacing: 2
  },
  logo: {
    height: 40,
    width: 40
  },
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: ColorSet.white,
    // paddingTop: 40,
    color: 'white',

  },
  profileHeader: {
    flexDirection: 'row',
    backgroundColor: ColorSet.blue,
    paddingHorizontal: 15,
    paddingVertical: 27,
    textAlign: 'center',
    // marginTop:20

  },
  profileHeaderPicCircle: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    color: 'white',
    backgroundColor: '#ffffff',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  profileHeaderText: {
    color: 'white',
    alignSelf: 'center',
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
  profileHeaderLine: {
    height: 1,
    marginHorizontal: 20,
    backgroundColor: '#e2e2e2',
    marginTop: 15,
  },
});
