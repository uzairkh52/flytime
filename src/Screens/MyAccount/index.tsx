import { View, Text, Animated } from 'react-native'
import React, { useRef } from 'react'
import AnimatedHeader from '../../component/Layout/AnimatedHeader'
import { mainStyle } from '../../assets/styles/component/mainStyle'

const MyAccount = () => {
    const scrollY = useRef(new Animated.Value(0)).current;
  return (
    <>
    <AnimatedHeader scrollY={scrollY} 

    />
    <Animated.ScrollView
        scrollEventThrottle={16}
        contentContainerStyle={[mainStyle.mainBody, mainStyle.container]}
        keyboardShouldPersistTaps={"handled"}
        onScroll={Animated.event(
        [{ 
            nativeEvent: {contentOffset: {y: scrollY}}
        }],
        {useNativeDriver: false},
        )}
    >
        <Text>test</Text>
        <Text>test</Text>
        <Text>test</Text>
        <Text>test</Text>
        <Text>test</Text>

    </Animated.ScrollView>
    </>
  )
}

export default MyAccount