import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { mainStyle } from '../../assets/styles/component/mainStyle'
import { SafeAreaView } from 'react-native-safe-area-context'
import SplashScreen from '../../component/SplashScreen'
import { useNavigation } from '@react-navigation/native'
import LoginScreen from '../Auth/LoginScreen'
import SignUpScreen from '../Auth/SignUpScreen'

const SplashScreen4 = () => {
    const navigation = useNavigation();
    const handleSplesh4 = () => {
        navigation.navigate("SignUpScreen");
        
    }
    const handleSkip = () => {
        navigation.navigate("LoginScreen");
    }
    return (
        <>
            <SplashScreen 
            data={{
                    heading: "Join Us and Start Your Adventure!",
                    subHEading: "Create an account or log in to access your personalized travel itineraries and recommendations.",
                    BtnText: "Register",
                    Screen: 4
                }}
                handleSplesh={handleSplesh4}
                handleSkip={handleSkip}
            />
        </>
    )
}

export default SplashScreen4