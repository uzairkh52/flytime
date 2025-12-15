import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { mainStyle } from '../../assets/styles/component/mainStyle'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import HomeScreen from '../../Screens/HomeScreen'
import { RootState } from '../../store/store'
import ThreadWatcher from '../../utils/HeaderUtils'

const SplashScreen = ({ data, handleSplesh, handleSkip }) => {

    const {loginState} = useSelector((state: RootState) => state?.login);
    const isLogin = useSelector((state: RootState) => state);
    const navigation = useNavigation();
    console.log("loginState_001", loginState)

    useEffect(() => {
        if (loginState) {
            navigation.reset({
                index: 0,
                routes: [
                    {
                        name: "MainTabs",
                        params: {
                            screen: "HomeTab",
                        },
                    },
                ],
            });
        }
    }, [loginState]);

    


    return (
        <>
            <ThreadWatcher />
            <SafeAreaView style={[
                mainStyle.container,
                mainStyle.flex1,
                mainStyle.justifyContentCenter,
                mainStyle.whiteBg
            ]}>
                <View >
                    
                    <View style={[mainStyle.mb50]}>
                        <Text style={[mainStyle.h1, mainStyle.exbold, mainStyle.center, mainStyle.mb10]}>{data?.heading}</Text>
                        <Text style={[mainStyle.p, mainStyle.center]}>{data?.subHEading}</Text>

                    </View>
                    <View style={[mainStyle.flexColumn, mainStyle.justifyContentCenter, mainStyle.gap10]}>
                        <TouchableOpacity onPress={handleSplesh} style={[mainStyle.Btn, mainStyle.BtnPrimary, mainStyle.Btnlg]}>
                            <Text style={mainStyle.BtnPrimaryText}>{data?.BtnText}</Text>
                        </TouchableOpacity>
                        {data?.Screen !== 1 ? (
                            <>
                                <TouchableOpacity onPress={handleSkip} style={[mainStyle.Btn, mainStyle.Btnborder, mainStyle.Btnlg]}>
                                    <Text style={mainStyle.BtnBorderText}>{data?.Screen === 4 ? "Login" : "Skip"} </Text>
                                </TouchableOpacity>
                            </>
                        ) : ""}

                    </View>

                </View>
            </SafeAreaView>
        </>
    )
}

export default SplashScreen