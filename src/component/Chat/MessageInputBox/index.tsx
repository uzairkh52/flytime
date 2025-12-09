import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";




import MicAnimationApp from "../MicAnimation";
import { deleteAndCreateThread, sendMessage } from "../../../store/slices/sendMessageSlice";
import { clearInputValue, setInputValue } from "../../../store/slices/baseSlice";
import axios from "axios";
import { Button } from "react-native-paper";
import { mainStyle } from "../../../assets/styles/component/mainStyle";

interface MessageInputBoxProps {
  isMessageHome?: any;
  isHomePage?: boolean;
  isSticky?: boolean;
  HeaderInput?: boolean;
  messagesEndRef?: any;
  isAiBooking?: boolean;
  isChat?: boolean;
  forInputSticky?: boolean;
}

const MessageInputBox = ({
  isSticky,
  messagesEndRef,
  isChat,
}: MessageInputBoxProps) => {
  const [isTyping, setIsTyping] = useState(false);
  const [isMicActive, setIsMicActive] = useState(false);

  const dispatch = useDispatch();
  const inputValue = useSelector((state: any) => state.base.inputValue || "");
  const sendMessages = useSelector((state: any) => state.sendMessage?.messages.length || 0);
  const getMessages = useSelector((state: any) => state.getMessages?.messages.length || 0);
  const isMessage = sendMessages > 0 || getMessages > 0;
  const isLoading = useSelector((state: any) => state.sendMessage?.isLoading);

  const inputRef = useRef<TextInput>(null);
  
  
  const handleSend = async () => {
    if (!inputValue.trim()) return;
    dispatch(sendMessage(inputValue));
    console.log('inputValue', inputValue);
    dispatch(clearInputValue());
    setIsTyping(false);

    // scroll
    if (messagesEndRef?.current) {
      messagesEndRef.current.scrollToEnd({ animated: true });
    }
  };


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={[styles.container, isSticky && styles.sticky]}
    >
      
      <View style={styles.inputRow}>
        {/* Text input */}
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder={isChat ? "Ask Mylz..." : "Start typing..."}
          value={inputValue}
          onChangeText={(text) => {
            dispatch(setInputValue(text));
            setIsTyping(text.length > 0);
          }}
          onSubmitEditing={handleSend}
          editable={!isLoading}
          returnKeyType="send"
        />

      </View>
      <View style={styles.inputRow}>
        <TouchableOpacity style={[mainStyle.Btn, mainStyle.BtnPrimary, mainStyle.BtnX]}>
          <Text style={mainStyle.white}>asas</Text>
        </TouchableOpacity>
      </View>

      {/* Optional: Mobile Builder */}
      
    </KeyboardAvoidingView>
  );
};

export default MessageInputBox;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    backgroundColor: "#fff",
  },
  sticky: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    width:"100%"
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 16,
  },
  micBtn: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#ddd",
  },
  sendBtn: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#007bff",
    marginLeft: 4,
  },
  sendText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  newThreadBtn: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#007bff",
    marginRight: 4,
  },
  newThreadText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});
