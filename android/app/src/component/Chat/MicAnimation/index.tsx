import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet, Dimensions } from "react-native";
import Voice from "@react-native-voice/voice";

const MicAnimationApp = ({ active }) => {
  const barCount = Dimensions.get("window").width < 767 ? 40 : 80;
  const animatedValues = useRef(
    [...Array(barCount)].map(() => new Animated.Value(0.3))
  ).current;

  const startAnimation = () => {
    animatedValues.forEach((anim, index) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: Math.random() * 1.4 + 0.3,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0.3,
            duration: 200,
            useNativeDriver: true,
          }),
        ])
      ).start();
    });
  };

  const stopAnimation = () => {
    animatedValues.forEach((anim) => {
      anim.stopAnimation();
      anim.setValue(0.3);
    });
  };

  useEffect(() => {
    if (active) {
      startAnimation();

      Voice.start("en-US").catch((e) => console.log("Mic error:", e));

      return () => {
        Voice.stop();
        stopAnimation();
      };
    } else {
      stopAnimation();
    }
  }, [active]);

  return (
    <View style={styles.container}>
      {animatedValues.map((anim, i) => (
        <Animated.View
          key={i}
          style={[
            styles.bar,
            {
              transform: [{ scaleY: anim }],
            },
          ]}
        />
      ))}
    </View>
  );
};

export default MicAnimationApp;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 30,
    alignItems: "center",
    overflow: "hidden",
  },
  bar: {
    width: 3,
    backgroundColor: "#3c6095",
    marginHorizontal: 1,
    borderRadius: 3,
  },
});
