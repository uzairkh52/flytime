import React, { useState, useRef } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import UserMessage from "./UserMessage";
import AiMessage from "./AiMessage";


const Messages = () => {
  const scrollRef = useRef(null);

  const isLoading = useSelector((state:any) => state.sendMessage?.isLoading);
  const sendMessages = useSelector((state:any) => state.sendMessage?.messages);

  const messages = [...sendMessages];

  console.log("sendMessages3:", messages);

  return (
    <>
      {messages.length > 0 ? (
        <ScrollView
          ref={scrollRef}
          onContentSizeChange={() =>
            scrollRef.current?.scrollToEnd({ animated: true })
          }
          style={{
            flex: 1,
            backgroundColor: '#fff',
            paddingHorizontal: 15,
            paddingVertical: 10,
          }}
        >
          
          {messages.map((msg, index) => (
            <View key={index}>
              {msg?.user && !msg.user.startsWith('SYSTEM MESSAGE:') && (
                <UserMessage userMessage={msg.user} />
              )}
              {console.log('msg_response', msg)}
              {msg?.ai && <AiMessage aiMessage={msg?.ai} />}
              

              {isLoading && index === messages.length - 1 && (
                <View style={{ marginVertical: 10 }}>
                  <ActivityIndicator size="large" />
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      ) : (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text>No messages yet.</Text>
        </View>
      )}
    </>
  );
};

export default Messages;
