import React from "react";
import { View } from "react-native";
import FromAndTo from "./FromAndTo";
import BottomSection from "./BottomSection";
import { flightStyles } from "../../../../../assets/styles/component/SearchResult/flightStyles";

type FlightSearchCardProps = {
  offerData: any;  // replace 'any' with your type later
  offerkey: any;
};

const FlightSearchCard = ({ offerData, offerkey }: FlightSearchCardProps) => {
  

  return (
    <View style={flightStyles.flightOfferCard}>

      {/* TOP SECTION */}
      <View style={flightStyles.CardTop}>
        <FromAndTo offerData={offerData} />
        <BottomSection offerData={offerData} offerkey={offerkey} />
      </View>

      {/* If you add right section later, place here */}

    </View>
  );
};

export default FlightSearchCard;
