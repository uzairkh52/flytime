import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import { Buffer } from 'buffer';



// Screens (STACK ONLY)
import SplashScreen1 from './src/Screens/SplashScreen1';
import SplashScreen2 from './src/Screens/SplashScreen2';
import SplashScreen3 from './src/Screens/SplashScreen3';
import SplashScreen4 from './src/Screens/SplashScreen4';
import LoginScreen from './src/Screens/Auth/LoginScreen';
import SignUpScreen from './src/Screens/Auth/SignUpScreen';
import FlightDetailScreen from './src/Screens/FlightDetailScreen';
import PassengerFormScreen from './src/Screens/PassengerFormScreen';
import AddBaggageScreen from './src/Screens/AddBaggageScreen';
import PaymentScreen from './src/Screens/PaymentScreen';
import BottomTabs from './src/BottomTabs';
import HeaderUser from './src/component/Layout/Header/HeaderUser';
import HeaderLeftUser from './src/component/Layout/Header/HeaderLeft';
import HomeScreen from './src/Screens/HomeScreen';
import ThreadWatcher from './src/utils/HeaderUtils';
import ChatScreen from './src/Screens/ChatScreen';
import { Text, TouchableOpacity } from 'react-native';

global.Buffer = global.Buffer || Buffer;

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
          
      <NavigationContainer>

         <Stack.Navigator initialRouteName="SplashScreen1">

          {/* ================= SPLASH FLOW ================= */}
          <Stack.Screen
            name="SplashScreen1"
            component={SplashScreen1}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SplashScreen2"
            component={SplashScreen2}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SplashScreen3"
            component={SplashScreen3}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SplashScreen4"
            component={SplashScreen4}
            options={{ headerShown: false }}
          />

          {/* ================= MAIN APP (BOTTOM TABS) ================= */}
          <Stack.Screen
            name="MainTabs"
            component={BottomTabs}
            options={{
              headerShown: true,
              headerTitle: "",
              headerTransparent: true,
              headerShadowVisible: false,
              headerRight: () => <HeaderUser />,
              headerLeft: () => <HeaderLeftUser />,
            }}
          />
          {/* <Stack.Screen
            name="ChatScreen"
            component={ChatScreen}
            options={({
              headerRight: () => <HeaderUser />,

              headerTitle: () => (
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: 'black',
                    }}
                  >
                    Mylz
                  </Text>
                </TouchableOpacity>
              ),
            })}
          /> */}
            <Stack.Screen 
              name="ChatScreen" 
              component={ChatScreen} 
              options={{
              headerShown: true,
              headerTitle: "",
              headerTransparent: true,
              headerShadowVisible: false,
              headerRight: () => <HeaderUser />,
              headerLeft: () => <HeaderLeftUser />,
            }}
            />


          {/* ================= AUTH ================= */}
          
          
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUpScreen"
            component={SignUpScreen}
            options={{ headerShown: false }}
          />

          {/* ================= STACK ONLY SCREENS ================= */}
          <Stack.Screen
            name="FlightDetailScreen"
            component={FlightDetailScreen}
            options={{ title: 'Flight Details' }}
          />
          <Stack.Screen
            name="PassengerFormScreen"
            component={PassengerFormScreen}
            options={{ title: 'Passengers' }}
          />
          <Stack.Screen
            name="AddBaggageScreen"
            component={AddBaggageScreen}
            options={{ title: 'Add Baggage' }}
          />
          <Stack.Screen
            name="PaymentScreen"
            component={PaymentScreen}
            options={{ title: 'Payment' }}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
