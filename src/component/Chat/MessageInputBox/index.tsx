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
import { Button, Icon } from "react-native-paper";
import { mainStyle } from "../../../assets/styles/component/mainStyle";
import { homeStyle } from "../../../assets/styles/component/homeStyle";

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

      <View style={homeStyle.formGroup}>
        {/* Text input */}
        {!isTyping && (
          <Text style={[homeStyle.label, mainStyle.white]}>
            Ask Mylz to plan your trip
          </Text>
        )}
        <TextInput
          ref={inputRef}
          style={homeStyle.formControl}

          value={inputValue}
          onChangeText={(text) => {
            dispatch(setInputValue(text));
            setIsTyping(text.length > 0);
          }}
          onSubmitEditing={handleSend}
          editable={!isLoading}
          returnKeyType="send"
        />

        <TouchableOpacity style={[mainStyle.Btn, mainStyle.BtnPrimary, mainStyle.BtnX]}>
          <Icon name="arrow-forward-ios" size={22} color="#000" />

        </TouchableOpacity>
      </View>

      {/* Optional: Mobile Builder */}

    </KeyboardAvoidingView>
  );
};

export default MessageInputBox;

const styles = StyleSheet.create({

});
