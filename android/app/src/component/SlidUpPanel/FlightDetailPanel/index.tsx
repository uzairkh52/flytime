import React, { useRef, useState } from "react";
import { View, Button, Text, Alert } from "react-native";
import SlideUpPanel from "../../../utils/SlideUpPanel";
import { useDispatch, useSelector } from "react-redux";
import { setisPanelOpen } from "../../../store/slices/BookingflightSlice";
import { AppDispatch } from "../../../store/store";


const FlightDetailPanel = () => {
  const panelRef = useRef<any>(null);
  const isPnelOpen = useSelector((state:any) => state?.booking?.isPanelOpen);
  const dispatch = useDispatch<AppDispatch>();

  console.log("isPnelOpen", isPnelOpen);
  

  const handlePanelClose =()=> {
    dispatch(setisPanelOpen(false))
  }
  

  return (
    <View style={{ flex: 1 }}>
      
      <SlideUpPanel
        ref={panelRef}
        isOpen={true}
        onClose={handlePanelClose}
        heightPercentage={0.8} // 80% of screen
      >
        <Text style={{ fontSize: 18 }}>Reusable Panel Content</Text>
        <Text style={{ fontSize: 18 }}>Reusable Panel Content</Text>
        <Text style={{ fontSize: 18 }}>Reusable Panel Content</Text>
        <Text style={{ fontSize: 18 }}>Reusable Panel Content</Text>
        <Text>You can put anything here: flight, hotel, forms, etc.</Text>
      </SlideUpPanel>
    </View>
  );
};

export default FlightDetailPanel;
