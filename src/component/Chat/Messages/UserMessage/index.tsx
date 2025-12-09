import React from 'react';
import { View, Text } from 'react-native';

import { Searchstyles } from '../../../../assets/styles/component/SearchResult';
import { variable } from '../../../../assets/styles/variable';
import { mainStyle } from '../../../../assets/styles/component/mainStyle';

const UserMessage = ({ userMessage }) => {
  const formattedText =
    userMessage
      ?.replaceAll('Segment', '\n\nSegment')
      .replace('SYSTEM MESSAGE:', 'System Message:\n')
      .replace('Airline:', '\nAirline:')
      .replace('Baggage', '\nBaggage')
      .replace('Cabin Class:', '\nCabin Class:')
      .replace('Passengers:', '\nPassengers:')
      .replace('Total Price:', '\nTotal Price:')
      .replace('Final with markup:', '\nFinal with markup:')
      .replace('Additional Notes:', '\nAdditional Notes:')
      .replace('Offer expires:', '\nOffer expires:')
      .replace('Payment required by:', '\nPayment required by:') || '';

  return (
    <>
      <View style={[mainStyle.displayFlex, mainStyle.flexRow, mainStyle.justifyContentEnd]}>
        <View style={Searchstyles.UserMessage}>
          <Text style={mainStyle.paragraph}>{formattedText}</Text>
        </View>
      </View>
    </>
  );
};

export default UserMessage;
