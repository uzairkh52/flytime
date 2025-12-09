import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import HomeScreen from './src/Screens/HomeScreen';
import HeaderUser from './src/component/Layout/Header/HeaderUser';
import LoginScreen from './src/Screens/Auth/LoginScreen';
import FlightDetailScreen from './src/Screens/FlightDetailScreen';
import PassengerFormScreen from './src/Screens/PassengerFormScreen';
import AddBaggageScreen from './src/Screens/AddBaggageScreen';
import PaymentScreen from './src/Screens/PaymentScreen';
import SignUpScreen from './src/Screens/Auth/SignUpScreen';
import ChatScreen from './src/Screens/ChatScreen';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import SplashScreen1 from './src/Screens/SplashScreen1';
import SplashScreen2 from './src/Screens/SplashScreen2';
import SplashScreen3 from './src/Screens/SplashScreen3';
import SplashScreen4 from './src/Screens/SplashScreen4';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen1">
          <Stack.Screen
            name='SplashScreen1'
            component={SplashScreen1}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='SplashScreen2'
            component={SplashScreen2}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='SplashScreen3'
            component={SplashScreen3}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='SplashScreen4'
            component={SplashScreen4}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={navigation => ({
                title: 'Home',
                headerRight: () => <HeaderUser navigation={navigation} />,

                // Remove headerRight (it hides back arrow)
              })}
            />

            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="FlightDetailScreen"
              component={FlightDetailScreen}
              options={{
                title: 'Flight Details',
              }}
            />
            <Stack.Screen
            name='PassengerFormScreen'
            component={PassengerFormScreen}
            options={{
              title:"PassengerFormScreen"
            }}
             />
             <Stack.Screen 
              name='AddBaggageScreen'
              component={AddBaggageScreen}
              options={{
                title: "AddBaggageScreen"
              }}
             />
             <Stack.Screen 
                name='PaymentScreen'
                component={PaymentScreen}
                options={{
                  title:"PaymentScreen",
                }}
             />
            <Stack.Screen
              name="SignUpScreen"
              options={({ navigation }) => ({
                title: 'Sign in',
                // Remove headerRight so default back arrow appears
                headerBackVisible: true,
                headerRight: () => <HeaderUser navigation={navigation} />,
              })}
              component={SignUpScreen}
            />
            <Stack.Screen
              name="ChatScreen"
              component={ChatScreen}
              options={({ navigation }) => ({
                headerRight: () => <HeaderUser navigation={navigation} />,

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
            />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
