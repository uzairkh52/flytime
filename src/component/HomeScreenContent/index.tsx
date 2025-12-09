import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useSelector } from "react-redux";




import MessageInputBox from "../Chat/MessageInputBox";
import ConventionalForms from "../Layout/ConventionalForms";
import HerosectionContent from "./HerosectionContent";

const HomeHeroSectionApp = () => {
  const [switchOn, setSwitchOn] = useState(true);

  const sendMessages = useSelector((state: any) => state.sendMessage?.messages.length || 0);
  const getMessages = useSelector((state: any) => state.getMessages?.messages.length || 0);
  const isMessage = sendMessages + getMessages > 0;

  const messagesEndRef = useRef<any>(null);

  return (
    <View style={styles.container}>
      {/* Hero Section */}
      {!isMessage && <HerosectionContent />}

      {/* Conditional Tab / Form Section */}
      <View style={styles.tabSection}>
        <MessageInputBox  />
      </View>

      {/* Footer */}
      
    </View>
  );
};

export default HomeHeroSectionApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  tabSection: {
    width: "100%",
    marginTop: 20,
  },
  formContainer: {
    width: "100%",
    padding: 10,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 20,
    padding: 10,
    borderRadius: 50,
    backgroundColor: "#ccc",
  },
  switchActive: {
    backgroundColor: "linear-gradient(90deg, #6DA3FF, #00C4CC)",
  },
  switchText: {
    color: "#fff",
    fontWeight: "bold",
  },
  switchCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#fff",
    position: "absolute",
    top: 2,
  },
  circleLeft: {
    left: 2,
    backgroundColor: "#ccc",
  },
  circleRight: {
    right: 2,
    backgroundColor: "#00C4CC",
  },
});
