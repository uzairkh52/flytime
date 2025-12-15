import { StyleSheet } from "react-native";
import { variable } from "../../variable";

export const tripStyles = StyleSheet.create({

  tabs: { flexDirection: "row", marginBottom: 16, gap:10 },
  tab: {
    backgroundColor: "rgba(248, 99, 65, 0.1)",
    borderRadius: 106,
    paddingHorizontal: 20,
    paddingVertical: 8,
    opacity:0.7,
  },
  activeTab: { 
    opacity:1,
    backgroundColor:variable.basecolor1,
  },
  tabText: { fontSize: 15, color: variable.basecolor2, fontWeight:500, },
  TabTextActive: {color:variable.white},

  noTripsText: { textAlign: "center", marginTop: 20, fontSize: 16, color: "#555" },

//   card
card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusContainer: {
    backgroundColor: "#D9F1E9",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  statusText: {
    color: "#005742",
    fontWeight: "600",
    fontSize: 12,
  },
  routeText: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  dateText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 8,
  },
  hotelImage: {
    width: 63,
    height: 63,
    borderRadius: 12,
  },
  descriptionText: {
    fontSize: 12,
    color: "#555",
    marginBottom: 4,
  },
  
})