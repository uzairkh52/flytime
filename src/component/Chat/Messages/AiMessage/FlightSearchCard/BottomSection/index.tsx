import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  useWindowDimensions,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { flightStyles } from '../../../../../../assets/styles/component/SearchResult/flightStyles';
import { mainStyle } from '../../../../../../assets/styles/component/mainStyle';

import { AddToCart, setisPanelOpen, setOfferkeyforDetail, setSelectedFlight, setSelectOfferKey, setSingleFlightData } from '../../../../../../store/slices/BookingflightSlice';
import { AppDispatch } from '../../../../../../store/store';
import { useNavigation } from '@react-navigation/native';



type BottomSectiondProps = {
  offerData: any; // replace 'any' with the real type
  offerkey: any;  // replace 'any' with the real type
};

const BottomSection = ({ offerData, offerkey }: BottomSectiondProps) => {
console.log("test_offer3", offerData);
const dispatch = useDispatch<AppDispatch>();
  
  const { width } = useWindowDimensions();
  const isMobile = width < 600;

  const [showPanel, setShowPanel] = useState(false);
  const uuid = useSelector((state:any)=> state?.sendMessage?.threadUuid)
  const selectedOfferKey = useSelector((state:any)=> state?.booking?.selectOfferKey);
  
  console.log("selectedOfferKey", selectedOfferKey);
  
  
  
  // const CartDetails = useSelector((state: any) => state.booking.getCartDetail?.items);
  // Get unique baggage items
  const getUniqueBaggages = () => {
    const map = new Map();

    offerData?.slices?.forEach((slice: any) => {
      slice?.segments?.forEach((segment: any) => {
        segment?.passengers?.forEach((passenger: any) => {
          passenger?.baggages?.forEach((baggage: any) => {
            const key = `${baggage.type}-${baggage.formatted_type}`;
            if (!map.has(key)) map.set(key, baggage);
          });
        });
      });
    });

    return Array.from(map.values());
  };

  const uniqueBaggages = getUniqueBaggages();
  
  const navigation = useNavigation();
  

  const handleSeeDetail = (offerKey: string)=> {
    console.log("handleofferKey", offerKey);
    if (offerKey) {
       //  Store selected flight key for detail
      // dispatch(setSeeDetailButton("Chat"));
      dispatch(setSingleFlightData(offerData)); //for data
    }
    navigation.navigate("FlightDetailScreen")
    
  }
  const handleSelectFlight = (offerKey: string) => {
    dispatch(setSelectOfferKey(offerKey));
    
    
    if (offerKey) {
      
      const params = {
        chat_thread_uuid: uuid,
        offer_type: "flight",
        offer_id: offerData?.id,
        price: offerData?.total_amount_plus_markup,
        currency: offerData?.total_currency,
        raw_data: {},
      };
      console.log("params_0", params);
      
      dispatch(AddToCart(params));
      dispatch(setSelectedFlight(offerData));
    }
  };

  

  return (
    <View style={[flightStyles.bottomContainer]}>
      {/* First Row: Baggage Left, Btn Details Right */}
      <View style={flightStyles.row}>
        <View style={flightStyles.baggageWrapper}>
          {uniqueBaggages.map((baggage, index) => (
            <View key={index} style={flightStyles.baggageRow}>
              <Text style={flightStyles.baggageText}>
                {baggage.quantity}x{' '}
                <Text style={flightStyles.baggageType}>
                  {baggage.formatted_type}
                </Text>
              </Text>
            </View>
          ))}
        </View>
        <Pressable
          style={mainStyle.BtnSeeDetail}
          onPress={() => handleSeeDetail(offerkey)}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={mainStyle.Basecolor1}>See details</Text>
            {/* <MaterialDesignIcons
              name="chevron-right"
              size={20}
              style={mainStyle.Basecolor1}
            /> */}
          </View>
        </Pressable>
      </View>

      {/* Second Row: Price Left, Select Button Right */}
      <View style={flightStyles.row}>
        <Text style={flightStyles.priceText}>
          {offerData?.total_amount_plus_markup} {offerData?.tax_currency}
        </Text>
        <TouchableOpacity
          style={[
            mainStyle.Btn,
            mainStyle.BtnRound,
            mainStyle.BtnX,
            selectedOfferKey === offerkey
              ? mainStyle.BtnDisabled
              : mainStyle.BtnPrimary,
            // { opacity: 0.5 } // show disabled effect
          ]}
          onPress={() => handleSelectFlight(offerkey)}
          disabled={selectedOfferKey === offerkey ? true : false}
        >
          <Text style={flightStyles.selectBtnText}>Select</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BottomSection;
