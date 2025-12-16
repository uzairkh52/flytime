import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import { Buffer } from 'buffer';

import AppStack from './src/navigation/AppStack';

global.Buffer = global.Buffer || Buffer;

export default function App() {
  return (
    <Provider store={store}>
          
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </Provider>
  );
}
