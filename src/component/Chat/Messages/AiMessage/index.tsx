import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';
import FlightSearchCard from './FlightSearchCard';

import { mainStyle } from '../../../../assets/styles/component/mainStyle';
import { Searchstyles } from '../../../../assets/styles/component/SearchResult';
import HotelCard from './HotelSearchCard';
import PassengerFlowBlock from '../../../PassengerFlowBlock';

const AiMessage = ({ aiMessage }: { aiMessage: any }) => {
  const scrollRef = useRef<ScrollView>(null);
  const [showAllFlight, setShowAllFlight] = useState(false);
  const [hotelsToShow, setHotelsToShow] = useState(10); // initial 10 hotels
  const handleSeeMoreHotels = () => {
    setHotelsToShow(prev => prev + 10); // load 10 more each click
  };

  const getNextFlight = useSelector(
    (state: any) => state.sendMessage?.appendFlights?.ai,
  );
  const noMoreFlights = useSelector(
    (state: any) => state.sendMessage?.noMoreFlights,
  );

  // Flight offers to display
  const displayedGetFlights = showAllFlight
    ? [...(aiMessage?.offers || []), ...(getNextFlight?.offers || [])]
    : aiMessage?.offers;
  console.log('displayedGetFlights', displayedGetFlights);

  const handleSeeMoreFlights = () => {
    setShowAllFlight(true);
  };

  // Extract normal message text
  const normalMessage =
    typeof aiMessage?.message === 'string' ? aiMessage?.message : null;

  console.log('normalMessage', aiMessage);

  useEffect(() => {
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [aiMessage, displayedGetFlights]);

  console.log('aiMessage_001', aiMessage);

  return (
    <View>
      {/* Normal AI message */}
      {normalMessage && (
        <>
          <View
            style={[
              mainStyle.displayFlex,
              mainStyle.flexRow,
              mainStyle.justifyContentEnd,
            ]}
          >
            <View style={Searchstyles.AiMessage}>
              <Text style={mainStyle.paragraph}>{normalMessage}</Text>
            </View>
          </View>
        </>
      )}

      {/* Flight offers */}
      {displayedGetFlights?.length > 0 &&
        displayedGetFlights.map((offer: any, i: number) => (
          <>
          
          <FlightSearchCard  offerData={offer} offerkey={`${offer.id}-${i}`}/>
          </>
        ))}

      {/* See more flights button */}
      {displayedGetFlights?.length > 0 &&
        !noMoreFlights &&
        (aiMessage?.ai?.next_page_number ||
          getNextFlight?.next_page_number) && (
          <TouchableOpacity
            onPress={handleSeeMoreFlights}
            style={styles.seeMoreBtn}
          >
            <Text style={styles.seeMoreText}>See more flight options</Text>
          </TouchableOpacity>
        )}
      {Array.isArray(aiMessage?.hotels?.hotels) &&
        aiMessage?.hotels?.hotels.length > 0 && (
          <>
            {/* <SearchFilterTags
              offerUrl={aiMessage?.ai?.url}
              hotelCount={aiMessage?.ai?.hotels?.total}
              filters={aiMessage?.ai?.filters}
            /> */}
            {aiMessage?.hotels?.hotels
              .slice(0, hotelsToShow)
              .map((gethotel, idx) => (
                <>
                  <View key={idx}>
                  
                    <HotelCard
                      // offerkey={`${gethotel.code}-${idx}`}
                      hotel={gethotel}
                      // price={gethotel?.total}
                      allHotels={aiMessage?.hotels}
                    />
                  </View>
                </>
              ))}

            {/* See more hotels button */}
            {/* {hotelsToShow < getHotels.hotels.length ? (
              <Box
                onClick={handleSeeMoreHotels}
                sx={{ my: 2, cursor: "pointer" }}
                display="flex"
                alignItems="center"
                gap={1}
                className="bold basecolor1"
              >
                <Typography className="bold" lineHeight={1} component={"span"}>
                  Show more stays
                </Typography>
              </Box>
            ) : (
              ""
            )} */}
          </>
        )}

      {/* No flights found */}
      {aiMessage?.ai === 'isNotFound' && (
        <Text style={styles.noMoreText}>No flights found.</Text>
      )}
       <PassengerFlowBlock
        aiMessage={aiMessage}
        // filledPassenger={"filledPassengerUUIDs"}
        // orderDetail={"orderDetail"}
        // paymentSuccess={"paymentSuccess"}
      />

      {/* Error */}
      {aiMessage?.ai?.error && (
        <Text style={styles.noMoreText}>
          {aiMessage.ai.error.response?.message || 'Something went wrong.'}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default AiMessage;
