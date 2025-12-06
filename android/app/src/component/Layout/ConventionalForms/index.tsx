import React, { useState } from "react";
import { View, StyleSheet, Image, ActivityIndicator } from "react-native";
import { TabView, TabBar } from "react-native-paper";
import { useSelector } from "react-redux";

import TravelForm from "./TravelForm";
import HotelForm from "./HotelForm";

const ConventionalForms = () => {
  const [index, setIndex] = useState(0);

  const routes = [
    { key: "travel", title: "Travel" },
    { key: "hotel", title: "Hotel" },
  ];

  // Travel form state
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [tripClass, setTripClass] = useState("");
  const [dateRange, setDateRange] = useState([{ startDate: new Date(), endDate: new Date() }]);

  const [showCalendar, setShowCalendar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Hotel form state
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [travellers, setTravellers] = useState(1);
  const [roomType, setRoomType] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const inputLoading = useSelector((state) => state?.sendMessage?.inputLoading);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "travel":
        return (
          <TravelForm
            origin={origin}
            setOrigin={setOrigin}
            destination={destination}
            setDestination={setDestination}
            dateRange={dateRange}
            setDateRange={setDateRange}
            showCalendar={showCalendar}
            setShowCalendar={setShowCalendar}
            tripClass={tripClass}
            setTripClass={setTripClass}
            isLoading={isLoading}
          />
        );

      case "hotel":
        return (
          <HotelForm
            location={location}
            setLocation={setLocation}
            checkIn={checkIn}
            setCheckIn={setCheckIn}
            checkOut={checkOut}
            setCheckOut={setCheckOut}
            travellers={travellers}
            setTravellers={setTravellers}
            roomType={roomType}
            setRoomType={setRoomType}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
          />
        );
    }
  };

  return (
    <View style={styles.container}>
      {/* Loader */}
      {inputLoading && (
        <ActivityIndicator size="small" color="#1539CF" style={styles.loader} />
      )}

      {/* Tabs */}
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: "#1539CF" }}
            style={{ backgroundColor: "#fff" }}
            activeColor="#1539CF"
            inactiveColor="#777"
          />
        )}
      />
    </View>
  );
};

export default ConventionalForms;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  loader: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 100,
  },
});
