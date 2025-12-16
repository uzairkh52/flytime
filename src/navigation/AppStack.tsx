import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SplashScreen1 from '../Screens/SplashScreen1';
import SplashScreen2 from '../Screens/SplashScreen2';
import SplashScreen3 from '../Screens/SplashScreen3';
import SplashScreen4 from '../Screens/SplashScreen4';
import BottomTabs from '../BottomTabs';
import HeaderUser from '../component/Layout/Header/HeaderUser';
import HeaderLeftUser from '../component/Layout/Header/HeaderLeft';
import ChatScreen from '../Screens/ChatScreen';
import LoginScreen from '../Screens/Auth/LoginScreen';
import SignUpScreen from '../Screens/Auth/SignUpScreen';
import FlightDetailScreen from '../Screens/FlightDetailScreen';
import PassengerFormScreen from '../Screens/PassengerFormScreen';
import AddBaggageScreen from '../Screens/AddBaggageScreen';
import PaymentScreen from '../Screens/PaymentScreen';

const AppStack = () => {
    const Stack = createNativeStackNavigator();
    return (
        <>
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
        </>
    )
}

export default AppStack