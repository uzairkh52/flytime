import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { mainStyle } from '../../assets/styles/component/mainStyle'
import { SafeAreaView } from 'react-native-safe-area-context'
import SplashScreen from '../../component/SplashScreen'
import { useNavigation } from '@react-navigation/native'
import SplashScreen4 from '../SplashScreen4'

const SplashScreen3 = () => {
    const navigation = useNavigation();
    const handleSplesh3 = () => {
        navigation.navigate("SplashScreen4");
        
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
                    Screen: 3
                }}
                handleSplesh={handleSplesh3}
                handleSkip={handleSkip}
            />
        </>
    )
}

export default SplashScreen3