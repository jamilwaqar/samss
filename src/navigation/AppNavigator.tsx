import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerNavigationRoutes from './DrawerNavigationRoutes';

import {
  Dashboard,
  LoginScreen,
  SplashScreen,
  ForgotPasswordScreen,
  OtpScreen,
  ResetPasswordScreen
} from '../screens/index'

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator()

const SplashStackScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
    </Stack.Navigator>
  );
}

const Auth = () => {
  return (
    <Stack.Navigator
    initialRouteName="Login"
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="Otp" component={OtpScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    </Stack.Navigator>
  );
}



function AppNavigator() {
  return (
      <NavigationContainer>
        <Stack.Navigator
        initialRouteName="Splash"
          screenOptions={{
            headerShown: false
          }}>
          <Stack.Screen name="SplashStack" component={SplashStackScreen} />
          <Stack.Screen name="Auth" component={Auth} />
          <Stack.Screen
          name="HomeScreen"
          component={DrawerNavigationRoutes}
        />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default AppNavigator;
