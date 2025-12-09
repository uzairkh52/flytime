import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { mainStyle } from '../../assets/styles/component/mainStyle'
import { SafeAreaView } from 'react-native-safe-area-context'
import SplashScreen from '../../component/SplashScreen'
import { useNavigation } from '@react-navigation/native'
import SplashScreen2 from '../SplashScreen2'
import LoginScreen from '../Auth/LoginScreen'
import SignUpScreen from '../Auth/SignUpScreen'

const SplashScreen1 = () => {
    const navigation = useNavigation();
    const handleSplesh1 = () => {
        navigation.navigate("SplashScreen2");
        
    }
    const handleSkip = () => {
        navigation.navigate("SignUpScreen");
    }
    return (
        <>
            <SplashScreen
                data={{
                    heading: "Plan Smarter, Travel Better",
                    subHEading: "Discover unforgettable journeys with personalized itineraries made just for you.",
                    BtnText: "Get Started",
                    Screen: 1
                }}
                handleSplesh={handleSplesh1} // pass function as prop
                handleSkip={handleSkip}
            />

        </>
    )
}

export default SplashScreen1