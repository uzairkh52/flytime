import React, { useRef, useEffect } from "react";
import {
  Animated,
  StyleSheet,
  View,
  PanResponder,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";

const { height } = Dimensions.get("window");

type SlideUpPanelProps = {
  heightPercentage?: number; // e.g., 0.8 for 80%
  isOpen?: boolean; // optional external control
  onClose?: () => void; // callback when closed
  children?: React.ReactNode; // content inside panel
  backdropOpacity?: number; // default 0.5
};

const SlideUpPanel = React.forwardRef(
  (
    {
      heightPercentage = 0.8,
      isOpen = false,
      onClose,
      children,
      backdropOpacity = 0.5,
    }: SlideUpPanelProps,
    ref
  ) => {
    const PANEL_HEIGHT = height * heightPercentage;
    const translateY = useRef(new Animated.Value(height)).current;

    // PUBLIC METHODS
    React.useImperativeHandle(ref, () => ({
      open: () => animateTo(height - PANEL_HEIGHT),
      close: () => animateTo(height),
    }));

    const animateTo = (toValue: number) => {
      Animated.timing(translateY, {
        toValue,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        if (toValue === height && onClose) onClose();
      });
    };

    // React to external isOpen prop
    useEffect(() => {
      if (isOpen) animateTo(height - PANEL_HEIGHT);
      else animateTo(height);
    }, [isOpen]);

    // Dragging
    const panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        const newPosition = height - PANEL_HEIGHT + gesture.dy;
        if (newPosition < height - PANEL_HEIGHT) return;
        if (newPosition > height) return;
        translateY.setValue(newPosition);
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dy > 40) animateTo(height);
        else animateTo(height - PANEL_HEIGHT);
      },
    });

    // Backdrop opacity interpolation
    const backdropAnim = translateY.interpolate({
      inputRange: [height - PANEL_HEIGHT, height],
      outputRange: [backdropOpacity, 0],
      extrapolate: "clamp",
    });

    return (
      <>
        {/* BACKDROP */}
        <View style={styles.PannelBody}>
          <Animated.View
            pointerEvents={isOpen ? "auto" : "none"}
            style={[styles.backdrop, { opacity: backdropAnim }]}
          >
            <TouchableWithoutFeedback onPress={() => animateTo(height)}>
              <View style={{ flex: 1 }} />
            </TouchableWithoutFeedback>
          </Animated.View>

          {/* PANEL */}
          <Animated.View
            style={[styles.panel, { height: PANEL_HEIGHT, transform: [{ translateY }] }]}
            {...panResponder.panHandlers}
          >
            <View style={styles.dragHandle} />
            {children}
          </Animated.View>
        </View>
      </>
    );
  }
);

export default SlideUpPanel;

const styles = StyleSheet.create({
  panel: {
    
    position: "absolute",
    left: 0,
    top:100,
    
    right: 0,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    elevation: 10,
  },
  dragHandle: {
    width: 50,
    height: 6,
    backgroundColor: "#ccc",
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 10,
  },
  backdrop: {
    
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
  },
});
