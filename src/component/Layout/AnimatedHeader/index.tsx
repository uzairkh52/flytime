import React, { useRef } from 'react'
import { Animated, StatusBar } from 'react-native'
import { variable } from '../../../assets/styles/variable';

const AnimatedHeader = ({scrollY}) => {
      

      // Interpolate background color and shadow based on scroll
        
    const headerBackground = scrollY.interpolate({
        inputRange: [0, 20],
        outputRange: ["transparent", variable.white],
        extrapolate: "clamp",
    });
    
    const headerElevation = scrollY.interpolate({
        inputRange: [0, 20],
        outputRange: [0, 4],
        extrapolate: "clamp",
    });
    const headerShadowOpacity = scrollY.interpolate({
        inputRange: [0, 20],
        outputRange: [0, 0.25],
        extrapolate: "clamp",
    });



  return (
    <>
    <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />  
      {/* Animated Header */}
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 80,
          zIndex: 10,
          backgroundColor: headerBackground,
          elevation: headerElevation, // Android shadow
          shadowColor: "#000",
          shadowOpacity: headerShadowOpacity, // iOS shadow
          shadowOffset: { width: 0, height: 2 },
          justifyContent: "center",
          paddingHorizontal: 16,
        }}
      >
      
      </Animated.View>

</>
  )
}

export default AnimatedHeader