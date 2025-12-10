import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { mainStyle } from "../../../assets/styles/component/mainStyle";

const { width } = Dimensions.get("window");

const HerosectionContent = () => {
  // Adjust font size based on screen width
  const headingFontSize = width >= 1024 ? 48 : width >= 768 ? 48 : 36;

  return (
    <View >
      <View style={mainStyle.flexColumn}>
        <Text style={[mainStyle.p]}>
          Where do you want to go?
        </Text>
        <Text>Let’s Plan Your Trip</Text>

      </View>


    </View>
  );
};


export default HerosectionContent;
