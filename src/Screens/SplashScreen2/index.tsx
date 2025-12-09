import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { mainStyle } from '../../assets/styles/component/mainStyle'
import { SafeAreaView } from 'react-native-safe-area-context'
import SplashScreen from '../../component/SplashScreen'
import { useNavigation } from '@react-navigation/native'

const SplashScreen2 = () => {
    const navigation = useNavigation();
    const handleSplesh2 = () => {
        navigation.navigate("SplashScreen3");
        
    }
    const handleSkip = () => {
        navigation.navigate("SignUpScreen");
    }
    return (
        <>
            <SplashScreen 
            data={{
                    heading: "Tailored for Every Style",
                    subHEading: "From relaxing to cultural deep dives, your trip adapts to your interests and travel style.",
                    BtnText: "Continue",
                    Screen: 2
                }}
                handleSplesh={handleSplesh2} // pass function as prop
                handleSkip={handleSkip}
            />
        </>
    )
}

export default SplashScreen2