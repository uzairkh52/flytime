import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setBookingDrawer } from '../../store/slices/BookingflightSlice';
import FromAndToDetail from '../../component/Chat/Messages/AiMessage/FlightDetail/FromAndToDetail';
import FlightDetailFooter from '../../component/Chat/Messages/AiMessage/FlightDetail/FlightDetailFooter';
import { FlightDetailStyle } from '../../assets/styles/component/FlightDetailStyle';
import { mainStyle } from '../../assets/styles/component/mainStyle';

const FlightDetailScreen = () => {
  const dispatch = useDispatch();
  const getFlightDetail = useSelector(
    state => state?.booking?.singleFlightData,
  );

  if (!getFlightDetail) return <Text>Loading...</Text>;

  return (
    <View style={[FlightDetailStyle.checkoutDrawer, mainStyle.whiteBg]}>
      {/* Header */}
      {/* <View style={FlightDetailStyle.checkoutDrawerHeader}>
        <TouchableOpacity onPress={() => dispatch(setBookingDrawer(false))} style={FlightDetailStyle.backBtn}>
          <Text style={FlightDetailStyle.backArrow}>←</Text>
          <Text style={FlightDetailStyle.backText}>Back to MyFlights</Text>
        </TouchableOpacity>
        <Text style={mainStyle.font.h2}>Flight Details</Text>
      </View>
      <View style={mainStyle.hr}></View> */}

      {/* Body */}
      <ScrollView style={FlightDetailStyle.checkoutDrawerBody}>
        <View style={mainStyle.container}>
          <View style={FlightDetailStyle.detailsSection}>
            <Text style={FlightDetailStyle.routeTitle}>
              {getFlightDetail?.slices[0]?.origin.city_name} →{' '}
              {getFlightDetail?.slices[0]?.destination.city_name}
            </Text>
            <Text style={FlightDetailStyle.dateText}>
              {getFlightDetail?.slices
                .slice(0, 2)
                .map(slice =>
                  new Date(slice.departing_at).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                  }),
                )
                .join(' - ')}
            </Text>
            <Text style={FlightDetailStyle.grayText}>
              {getFlightDetail?.slices.length <= 1 ? 'One Way' : 'Return'},{' '}
              {
                getFlightDetail?.slices[0]?.segments[0]?.passengers[0]
                  ?.cabin_class_marketing_name
              }
            </Text>
          </View>

          {getFlightDetail?.slices.map((slice, index) => (
            <FromAndToDetail
              key={index}
              sliceLength={getFlightDetail?.slices.length}
              getdata={slice}
              logo={slice?.segments[0]?.marketing_carrier?.logo_symbol_url}
              flightType={index === 0 ? 'Outbound' : 'Return'}
            />
          ))}
          
        </View>
      </ScrollView>

      <FlightDetailFooter getFlightDetails={getFlightDetail} />
    </View>
  );
};

export default FlightDetailScreen;
