import React, { useRef, useEffect } from "react";
import { View, Text, ActivityIndicator, Animated } from "react-native";
import { useSelector } from "react-redux";
import UserMessage from "./UserMessage";
import AiMessage from "./AiMessage";
import { mainStyle } from "../../../assets/styles/component/mainStyle";
import { variable } from "../../../assets/styles/variable";

const Messages = ({ scrollY }) => {
  const scrollRef = useRef<Animated.ScrollView>(null);

  const isLoading = useSelector((state:any) => state.sendMessage?.isLoading);
  const sendMessages = useSelector((state:any) => state.sendMessage?.messages);

  const messages = [...sendMessages];

  // Auto-scroll when new messages arrive
  useEffect(() => {
    if (messages.length > 0) {
      scrollRef.current?.scrollToEnd({ animated: true });
    }
  }, [messages]);

  return (
    <Animated.ScrollView
      ref={scrollRef}
      style={[mainStyle.container, mainStyle.flex1]}
      
      scrollEventThrottle={16}
      contentContainerStyle={{
        paddingTop: variable.headerHEight + variable.containerPaddingTop,
        paddingBottom: 100, // space for input box
      }}
      keyboardShouldPersistTaps="handled"
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false }
      )}
      showsVerticalScrollIndicator={false}
    >
      {messages.length > 0 ? (
        messages.map((msg, index) => (
          <View key={index} style={{ marginBottom: 10 }}>
            {msg?.user && !msg.user.startsWith('SYSTEM MESSAGE:') && (
              <UserMessage userMessage={msg.user} />
            )}
            {msg?.ai && <AiMessage aiMessage={msg?.ai} />}

            {isLoading && index === messages.length - 1 && (
              <View style={{ marginVertical: 10 }}>
                <ActivityIndicator size="large" />
              </View>
            )}
          </View>
        ))
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>No messages yet.</Text>
        </View>
      )}
    </Animated.ScrollView>
  );
};

export default Messages;
