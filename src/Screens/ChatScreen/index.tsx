import React, { useRef } from "react";
import { View, Button, Animated } from "react-native";
import SlideUpPanel from "../../component/SlidUpPanel/FlightDetailPanel";
import MessageInputBox from "../../component/Chat/MessageInputBox";
import Messages from "../../component/Chat/Messages";
import CheckoutControl from "../../component/Search/CheckoutControl";
import AnimatedHeader from "../../component/Layout/AnimatedHeader";
import { ChatStyle } from "../../assets/styles/component/ChatStyle";
import { mainStyle } from "../../assets/styles/component/mainStyle";

const ChatScreen = () => {
  const panelRef = useRef(null);
  console.log("panelRef_current", panelRef.current?.open);

  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <>
    <View style={[mainStyle.lightgrayBg, ChatStyle.main, { flex: 1 }]}>
      <AnimatedHeader scrollY={scrollY}>
        <View>

        </View>
      </AnimatedHeader>
      <Messages scrollY={scrollY} />
      <CheckoutControl />      
      <MessageInputBox isChat  />
    </View>
    </>
  );
};

export default ChatScreen;
