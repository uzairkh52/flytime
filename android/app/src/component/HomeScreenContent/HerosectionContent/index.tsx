import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const HerosectionContent = () => {
  // Adjust font size based on screen width
  const headingFontSize = width >= 1024 ? 48 : width >= 768 ? 48 : 36;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.innerContent}>
          <View style={styles.headingWrapper}>
            <View style={styles.titleRow}>
              <Text style={[styles.heading, { fontSize: headingFontSize }]}>
                Travel, crafted
              </Text>
              
            </View>

            {width >= 768 ? (
              <Text style={styles.subHeading}>
                Real direct prices and perfectly synced plans. Verified by Mylz AI
                across top platforms.
              </Text>
            ) : (
              <Text style={styles.subHeading}>
                Real direct prices and perfectly synced plans.
              </Text>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: "#1539CF", // adjust to your theme background
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
  innerContent: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  headingWrapper: {
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginBottom: 6,
  },
  heading: {
    color: "#fff",
    fontWeight: "800", // exbold
    lineHeight: 1.2 * 48, // approximate line height
    textAlign: "center",
  },
  icon: {
    width: 32,
    height: 32,
  },
  subHeading: {
    color: "#fff",
    textAlign: "center",
    marginTop: 4,
    paddingHorizontal: 8,
  },
});

export default HerosectionContent;
