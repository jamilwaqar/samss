import React from 'react';
import {
  StyleSheet,
  View,
  StatusBar
} from 'react-native'
import { Provider } from 'react-redux';
import { store } from './src/redux/Store';
import { ColorSet } from '../samss/src/styles'

import AppNavigator from './src/navigation/AppNavigator';
function App() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'transparent'} translucent barStyle={'dark-content'} />
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
export default App;
