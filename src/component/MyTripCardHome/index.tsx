import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";

// Static TripCard Component
const MyTripCardHome = ({ trip }) => {
  return (
    <View style={styles.card}>
      {/* <Image source={trip.image} style={styles.cardImage} resizeMode="cover" /> */}
      <View style={styles.cardBody}>
        {/* <Text style={styles.cardTitle}>{trip.title}</Text> */}
        <Text style={styles.cardDate}>
          {/* {trip.startDate} - {trip.endDate} */}
        </Text>
        {/* <Text style={styles.cardLocation}>{trip.location}</Text> */}
      </View>
    </View>
  );
};

const MyTrips = () => {
  const [tab, setTab] = useState(0); // 0 = Upcoming, 1 = Past

  // Static Data
  const upcomingTrips = [
    {
      title: "Paris City Tour",
      location: "Paris, France",
      startDate: "01 Dec",
      endDate: "05 Dec",
    //   image: require("../assets/images/trip1.jpg"),
    },
    {
      title: "Rome Holiday",
      location: "Rome, Italy",
      startDate: "10 Dec",
      endDate: "15 Dec",
    //   image: require("../assets/images/trip2.jpg"),
    },
    {
      title: "London Adventure",
      location: "London, UK",
      startDate: "20 Dec",
      endDate: "25 Dec",
    //   image: require("../assets/images/trip3.jpg"),
    },
  ];

  const pastTrips = [
    {
      title: "Barcelona Weekend",
      location: "Barcelona, Spain",
      startDate: "01 Nov",
      endDate: "03 Nov",
    //   image: require("../assets/images/trip4.jpg"),
    },
    {
      title: "Berlin City Visit",
      location: "Berlin, Germany",
      startDate: "10 Oct",
      endDate: "15 Oct",
    //   image: require("../assets/images/trip5.jpg"),
    },
  ];

  const selectedTrips = tab === 0 ? upcomingTrips : pastTrips;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Booked Trips</Text>

      {/* Tabs */}
      <View style={styles.tabs}>
        <Pressable
          style={[styles.tab, tab === 0 && styles.activeTab]}
          onPress={() => setTab(0)}
        >
          <Text style={tab === 0 ? styles.activeTabText : styles.tabText}>
            Upcoming Trips
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, tab === 1 && styles.activeTab]}
          onPress={() => setTab(1)}
        >
          <Text style={tab === 1 ? styles.activeTabText : styles.tabText}>
            Past Trips
          </Text>
        </Pressable>
      </View>

      {/* Trips List */}
      <FlatList
        data={selectedTrips}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        renderItem={({ item }) => <TripCard trip={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 40 },
  header: { fontSize: 22, fontWeight: "bold", paddingHorizontal: 16, marginBottom: 16 },
  tabs: { flexDirection: "row", marginBottom: 16, paddingHorizontal: 16 },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: { borderBottomColor: "#1539CF" },
  tabText: { fontSize: 16, color: "#888" },
  activeTabText: { fontSize: 16, color: "#1539CF", fontWeight: "bold" },
  card: {
    width: 220,
    borderRadius: 12,
    backgroundColor: "#f5f5f5",
    marginRight: 16,
    overflow: "hidden",
  },
  cardImage: { width: "100%", height: 120 },
  cardBody: { padding: 10 },
  cardTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
  cardDate: { fontSize: 12, color: "#666", marginBottom: 2 },
  cardLocation: { fontSize: 12, color: "#666" },
});

export default MyTripCardHome;