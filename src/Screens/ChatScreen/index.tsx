import React, { useRef } from "react";
import { View, Button } from "react-native";
import SlideUpPanel from "../../component/SlidUpPanel/FlightDetailPanel";
import MessageInputBox from "../../component/Chat/MessageInputBox";
import Messages from "../../component/Chat/Messages";
import CheckoutControl from "../../component/Search/CheckoutControl";


const ChatScreen = () => {
  const panelRef = useRef(null);
  console.log("panelRef_current", panelRef.current?.open);
  

  return (
    <>
      <Messages />
      <CheckoutControl />      
      <MessageInputBox  />
            
   </>
  );
};

export default ChatScreen;
