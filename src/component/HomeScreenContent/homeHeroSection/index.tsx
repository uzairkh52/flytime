import { View, Text } from 'react-native'
import React from 'react'
import { mainStyle } from '../../../assets/styles/component/mainStyle';
import { homeStyle } from '../../../assets/styles/component/homeStyle';

const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) return "Good Morning ☀️";
  if (hour < 17) return "Good Afternoon 🌤️";
  return "Good Evening 🌙";
};


const HomeHeroSection = () => {
  return (
    <View style={[mainStyle.container, homeStyle.Header]}>
      <Text style={[mainStyle.p, mainStyle.basecolor]}>
        {getGreeting()}
      </Text>
      <Text style={[mainStyle.h1, mainStyle.Basecolor1]}>
        Let’s Plan Your Trip!
      </Text>
    </View>
  )
}

export default HomeHeroSection;