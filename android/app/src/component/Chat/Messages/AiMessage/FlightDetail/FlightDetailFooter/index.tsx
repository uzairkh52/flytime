import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { currencySymbols } from "../../../../../../utils/util";
import { FlightDetailStyle } from "../../../../../../assets/styles/component/FlightDetailStyle";
import { mainStyle } from "../../../../../../assets/styles/component/mainStyle";
import { useNavigation } from "@react-navigation/native";

const FlightDetailFooter = ({ getFlightDetails, onSelectFlight }) => {
  const navigation = useNavigation();
  const personQuantity = getFlightDetails?.passengers?.length || 1;

  const handleClose = () => {
    // Pass the flight details or any payload required by ChatScreen
    navigation.goBack();
  };

  return (
    <View style={FlightDetailStyle.footerContainer}>
      {/* Policy Section */}
      <View style={FlightDetailStyle.policySection}>
        <Text style={FlightDetailStyle.policyText}>
          Airline-direct booking - protected from airline disruptions.
        </Text>
      </View>

      {/* Price & Actions */}
      <View style={FlightDetailStyle.priceRow}>
        {/* Price Info */}
        <View style={FlightDetailStyle.priceInfo}>
          <Text style={[mainStyle.font.h2, mainStyle.Basecolor1]}>
            {currencySymbols[getFlightDetails?.tax_currency] || getFlightDetails?.tax_currency}
            {Math.round(getFlightDetails?.total_amount_plus_markup_rounded)}
          </Text>
          {personQuantity > 1 && (
            <Text style={FlightDetailStyle.eachPrice}>
              {currencySymbols[getFlightDetails?.tax_currency] || getFlightDetails?.tax_currency}
              {Math.round(getFlightDetails?.per_passenger_amount_plus_markup_rounded)} each
            </Text>
          )}
        </View>

        {/* Actions */}
        <View style={FlightDetailStyle.actions}>
          <TouchableOpacity onPress={handleClose} style={FlightDetailStyle.closeBtn}>
            <Text style={FlightDetailStyle.closeText}>Close</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onSelectFlight}
            style={[mainStyle.Btn, mainStyle.BtnX, mainStyle.BtnPrimary, mainStyle.BtnRound]}
          >
            <Text style={FlightDetailStyle.selectFlightText}>Select flight</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FlightDetailFooter;
