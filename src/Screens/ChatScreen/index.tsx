import React, { useRef } from "react";
import { View, Button, Animated } from "react-native";
import SlideUpPanel from "../../component/SlidUpPanel/FlightDetailPanel";
import MessageInputBox from "../../component/Chat/MessageInputBox";
import Messages from "../../component/Chat/Messages";
import CheckoutControl from "../../component/Search/CheckoutControl";
import AnimatedHeader from "../../component/Layout/AnimatedHeader";

const ChatScreen = () => {
  const panelRef = useRef(null);
  console.log("panelRef_current", panelRef.current?.open);

  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <>
      <AnimatedHeader scrollY={scrollY}>
        <View>

        </View>
        </AnimatedHeader>
      <Messages scrollY={scrollY} />
      <CheckoutControl />      
      <MessageInputBox isChat  />
    </>
  );
};

export default ChatScreen;
