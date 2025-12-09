import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import HomeHeroSectionApp from "../../component/HomeScreenContent";

const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <HomeHeroSectionApp />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 32,
    fontWeight: "bold",
  },
  buttonContainer: {
    width: "80%",
    marginVertical: 10,
  },
});
