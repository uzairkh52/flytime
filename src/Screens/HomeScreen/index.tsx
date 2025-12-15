import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Animated,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { mainStyle } from "../../assets/styles/component/mainStyle";
import { homeStyle } from "../../assets/styles/component/homeStyle";
import MessageInputBox from "../../component/Chat/MessageInputBox";
import DiscoverSection from "../../component/HomeScreenContent/DiscoverSection";
import HomeHotelSection from "../../component/HomeScreenContent/HomeHotelSection";

import { useNavigation } from "@react-navigation/native";
import MyTripScreen from "../MyTripScreen";
import { useDispatch } from "react-redux";
import { MyTrip } from "../../store/slices/baseSlice";
import AnimatedHeader from "../../component/Layout/AnimatedHeader";
import HeaderLeftUser from "../../component/Layout/Header/HeaderLeft";
import HeaderUser from "../../component/Layout/Header/HeaderUser";
import { variable } from "../../assets/styles/variable";

const HEADER_HEIGHT = 80; // adjust based on your design

const HomeScreen = () => {
  const navigation = useNavigation();


  // const handleMytrip = () => {
  //   navigation.navigate("MainTabs", {
  //     screen: "MyTripTab",
  //   });
  // };

  const handleMytrip =()=> {
    navigation.navigate("MainTabs",{
      screen: "MyTripTab",
    })
  }


  // Animated value to track scroll


  
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(MyTrip());
    }, [dispatch]);
  
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={[mainStyle.lightgrayBg, homeStyle.main]}>
      <AnimatedHeader scrollY={scrollY}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          
        </View>
      </AnimatedHeader>

      {/* Scrollable Content */}
      <Animated.ScrollView
        keyboardShouldPersistTaps="handled"
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingTop: variable.headerHEight + variable.containerPaddingTop }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        {/* Hero Section */}
        <View style={[mainStyle.container, homeStyle.Header]}>
          <Text style={[mainStyle.p, mainStyle.basecolor]}>Where do you want to go?</Text>
          <Text style={[mainStyle.h1, mainStyle.Basecolor1]}>Let's Plan Your Trip</Text>
        </View>

        {/* Body */}
        <View style={[mainStyle.container, homeStyle.Body]}>
          <MessageInputBox isHomeScreen />
          <DiscoverSection />
          <HomeHotelSection />
          <MyTripScreen handleMytrip={handleMytrip} Screentype={"home"} />
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
