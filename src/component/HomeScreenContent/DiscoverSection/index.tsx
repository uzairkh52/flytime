import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { mainStyle } from "../../../assets/styles/component/mainStyle";

import FlightImage from "../../../assets/images/discover-flight.png";
import HotelImage from "../../../assets/images/discover-hotel.png";
import CarImage from "../../../assets/images/discover-car.png";
import { homeStyle } from "../../../assets/styles/component/homeStyle";

const DiscoverSection = () => {
  const items = [
    { title: "Hotel", image: HotelImage },
    { title: "Flight", image: FlightImage },
    { title: "Car", image: CarImage },
  ];

  return (
    <View style={[mainStyle.py20]}>
      <View>
        <Text style={[mainStyle.h2, ]}>Discover</Text>
      </View>

      <View style={mainStyle.row}>
        {items.map((item, index) => (
          <View key={index} style={mainStyle.col}>
            <View style={homeStyle.card}>
              {/* IMAGE BACKGROUND WITH CARD RADIUS */}
              <ImageBackground
                source={item.image}
                style={homeStyle.circle}
                imageStyle={homeStyle.circleImage}
                resizeMode="cover"
              />

              <Text style={[mainStyle.black, mainStyle.center, mainStyle.white, mainStyle.h5, homeStyle.cardText]}>
                {item.title}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};


export default DiscoverSection;
