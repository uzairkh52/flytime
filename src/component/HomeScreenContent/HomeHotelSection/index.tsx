import React from 'react';
import { View, Text, Image, Pressable, ScrollView } from 'react-native';

import { HotelCardStyle } from '../../../assets/styles/component/SplashStyle'; 
import { mainStyle } from '../../../assets/styles/component/mainStyle';

import HotelImage from "../../../assets/images/discover-hotel.png";

const HomeHotelSection = () => {
  // STATIC DATA
  const hotels = [
    {
      name: "Grand Royal Hotel",
      location: "Paris, France",
      roomName: "Deluxe King Room",
      guests: "2 adults, 1 child",
      board: "Breakfast included",
      checkIn: "01 Dec",
      checkOut: "05 Dec",
      perNightPrice: 120,
      totalPrice: 480,
      nights: 4,
      image: HotelImage,
    },
    {
      name: "Luxury Stay",
      location: "Rome, Italy",
      roomName: "Suite Room",
      guests: "2 adults",
      board: "Breakfast included",
      checkIn: "02 Dec",
      checkOut: "06 Dec",
      perNightPrice: 150,
      totalPrice: 600,
      nights: 4,
      image: HotelImage,
    },
    {
      name: "City Center Hotel",
      location: "London, UK",
      roomName: "Standard Room",
      guests: "1 adult",
      board: "No meals",
      checkIn: "03 Dec",
      checkOut: "07 Dec",
      perNightPrice: 100,
      totalPrice: 400,
      nights: 4,
      image: HotelImage,
    },
  ];

  return (
    <View style={[ mainStyle.mb20]}>
      <View >
        <Text style={[mainStyle.h2]}>Hotels recommendation for you</Text>
      </View>

      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={{ paddingRight: 0 }}
      >
        {hotels.map((hotel, index) => (
          <View key={index} style={[HotelCardStyle.card, { marginRight: 16, width: 300 }]}>
            {/* ROW WRAPPER */}
            <View style={HotelCardStyle.Hotelrow}>
              {/* LEFT SECTION */}
              <View style={HotelCardStyle.topSection}>
                <View style={HotelCardStyle.leftContent}>
                  <Image 
                    source={hotel.image}
                    resizeMode='cover'
                    style={HotelCardStyle.thumbnail}
                  />
                </View>

                <View style={HotelCardStyle.rightContent}>
                  <Text style={mainStyle.h2}>{hotel.name}</Text>
                  <Text style={mainStyle.size10}>{hotel.location}</Text>
                  <Text style={[mainStyle.size10, mainStyle.blackText]}>
                    {hotel.roomName} • {hotel.guests}
                  </Text>
                  <Text style={[mainStyle.size10]}>{hotel.board}</Text>
                  <Text style={[mainStyle.black50, mainStyle.size10]}>
                    {hotel.checkIn} - {hotel.checkOut}
                  </Text>

                  <View style={[mainStyle.displayFlex, mainStyle.justifyContentEnd, mainStyle.flexRow]}>
                    <Pressable style={mainStyle.BtnSeeDetail} onPress={() => {}}>
                      <Text style={mainStyle.Basecolor1}>See details</Text>
                    </Pressable>
                  </View>
                </View>
              </View>

              {/* RIGHT SECTION */}
              <View style={HotelCardStyle.BottomSection}>
                <View>
                  <Text style={mainStyle.darkgray}>${hotel.perNightPrice} / night</Text>
                  <Text style={mainStyle.black50}>
                    ${hotel.totalPrice} total ({hotel.nights} nights)
                  </Text>
                </View>

                <Pressable style={[mainStyle.Btn, mainStyle.BtnPrimary, mainStyle.Btnsm, mainStyle.BtnRound]}>
                  <Text style={[mainStyle.white, mainStyle.BtnSmText]}>Select room</Text>
                </Pressable>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default HomeHotelSection;
