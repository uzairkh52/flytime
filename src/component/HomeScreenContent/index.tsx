import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { useSelector } from "react-redux";




import MessageInputBox from "../Chat/MessageInputBox";
import ConventionalForms from "../Layout/ConventionalForms";
import HerosectionContent from "./HerosectionContent";
import { mainStyle } from "../../assets/styles/component/mainStyle";

const HomeHeroSectionApp = () => {
  const [switchOn, setSwitchOn] = useState(true);

  const sendMessages = useSelector((state: any) => state.sendMessage?.messages.length || 0);
  const getMessages = useSelector((state: any) => state.getMessages?.messages.length || 0);
  const isMessage = sendMessages + getMessages > 0;

  const messagesEndRef = useRef<any>(null);

  return (

    <SafeAreaView style={[mainStyle.Basecolor1Bg, styles.main]}>
      <ScrollView

        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={[mainStyle.container, styles.Header]}>
          <Text style={[mainStyle.h1, mainStyle.white]}>
            asasas
          </Text>
          <Text style={[mainStyle.p, mainStyle.white]}>
            asas
          </Text>
        </View>

        {/* Form */}
        <View style={[mainStyle.container, styles.Body]}>
        </View>
      </ScrollView>
    </SafeAreaView>

  );
};

export default HomeHeroSectionApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },

});
