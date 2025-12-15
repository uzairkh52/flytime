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


import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";


import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { ChatStyle } from "../../../assets/styles/component/ChatStyle";


interface MessageInputBoxProps {
  isMessageHome?: any;
  isHomeScreen?: boolean;
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
  isHomeScreen,
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
    console.log("isHomeScreen22", isHomeScreen);
    
    if (!inputValue.trim()) return;
    console.log("sendMessage_trigger", inputValue);
    if (isHomeScreen) {
      await dispatch(deleteAndCreateThread());  // WAIT FOR NEW UUID
    }
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

      <View style={`${isChat ? ChatStyle.formGroup : homeStyle.formGroup}`}>
        {/* Text input */}
        {!isTyping && (
          <Text

            style={[
              isChat ? ChatStyle.label : homeStyle.label,
              mainStyle.white
            ]}
          >
            Ask Mylz to plan your trip
          </Text>
        )}
        <TextInput
          ref={inputRef}
          style={isChat ? ChatStyle.formControl : homeStyle.formControl}

          value={inputValue}
          onChangeText={(text) => {
            dispatch(setInputValue(text));
            setIsTyping(text.length > 0);
          }}
          onSubmitEditing={handleSend}
          editable={!isLoading}
          returnKeyType="send"
        />

        <TouchableOpacity onPress={handleSend} style={[homeStyle.BsendBtn, mainStyle.Basecolor1Bg, mainStyle.justifyContentCenter, mainStyle.alignItemsCenter]}>
          <FontAwesome5 name="arrow-right" style={[mainStyle.white, homeStyle.arrow]} />
        </TouchableOpacity>

        {/* <AntDesign name="search1" size={40} color="green" />
        <IconButton icon="rocket" size={30} /> */}

      </View>

      {/* Optional: Mobile Builder */}

    </KeyboardAvoidingView>
  );
};

export default MessageInputBox;

const styles = StyleSheet.create({

});
