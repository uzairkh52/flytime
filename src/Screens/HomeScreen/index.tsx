import React from "react";
import { View, Text, Button, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import HomeHeroSectionApp from "../../component/HomeScreenContent";
import { mainStyle } from "../../assets/styles/component/mainStyle";
import { homeStyle } from "../../assets/styles/component/homeStyle";
import MessageInputBox from "../../component/Chat/MessageInputBox";

const HomeScreen = ({ navigation }: any) => {
  return (
  <SafeAreaView style={[mainStyle.lightgrayBg, homeStyle.main]}>
        <ScrollView
  
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={[mainStyle.container, homeStyle.Header]}>
            <Text style={[mainStyle.p, mainStyle.basecolor,]}>
              Where do you want to go?

            </Text>
            <Text style={[mainStyle.h1, mainStyle.Basecolor1]}>
              Let’s Plan Your Trip
            </Text>
          </View>
  
          {/* Form */}
          <View style={[mainStyle.container, homeStyle.Body]}>
          <MessageInputBox />
          
          </View>
        </ScrollView>
      </SafeAreaView>
  
  );
};

export default HomeScreen;