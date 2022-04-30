import React from 'react';

// Import Navigators from React Navigation
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Import Screens
import { NavigationDrawerHeader } from '../components'

import {
  Dashboard,
  EditProfileScreen,
  SideMenuScreen,
  RecruitsListScreen,
  AddRecruitScreen
} from '../screens/index'

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const homeScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen
        name="HomeScreen"
        component={Dashboard}
      />
    </Stack.Navigator>
  );
};

const profileScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="ProfileScreen"
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen
        name="ProfileScreen"
        component={EditProfileScreen}
        options={{
          title: 'Profile', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const recruitsScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="RecruitsListScreen"
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen
        name="RecruitsListScreen"
        component={RecruitsListScreen}
        options={{
          title: 'Recruits Listing', //Set Header Title
        }}
      />
      <Stack.Screen
        name="AddRecruit"
        component={AddRecruitScreen}
        options={{
          title: 'Add Recruit', //Set Header Title
        }}
      />

    </Stack.Navigator>
  );
};


const DrawerNavigatorRoutes = (props) => {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={SideMenuScreen}>
      <Drawer.Screen
        name="homeScreenStack"
        options={{ drawerLabel: 'Dashboard' }}
        component={homeScreenStack}
      />
      <Drawer.Screen
        name="profileScreenStack"
        options={{ drawerLabel: 'Profile' }}
        component={profileScreenStack}
      />
      <Drawer.Screen
        name="recruitsScreenStack"
        options={{ drawerLabel: 'Recruits' }}
        component={recruitsScreenStack}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigatorRoutes;
