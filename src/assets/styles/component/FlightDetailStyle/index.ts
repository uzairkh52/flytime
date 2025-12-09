import { StyleSheet } from "react-native";

export const FlightDetailStyle = StyleSheet.create({
  checkoutDrawer: {
    flex: 1,
    padding: 0,
    flexDirection: "column",
    height: "100%",
    overflow: "hidden",
  },
  checkoutDrawerSection: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    height: "100%",
    overflow: "hidden",
  },
  checkoutDrawerBody: {
    flex: 1,
    paddingTop: 18,
    paddingBottom: 18,
  },
  PassengerFormDrawerBody: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  checkoutPaymentBody: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  onewayReturn: {
    fontSize: 12,
    fontWeight: "bold",
    paddingVertical: 4,
    paddingHorizontal: 8,
    lineHeight: 16,
    gap: 8,
    flexDirection: "row",
    borderRadius: 8,
    backgroundColor: "#000",
    color: "#fff",
  },
  airlineLogoContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    
    borderColor: "#d3d3d3", // lightgray
    justifyContent: "center",
    alignItems: "center",
  },
  airlineLogoImage: {
    width: "80%",
    height: "auto",
    resizeMode: "contain",
  },
  detailsSection: {
    paddingBottom: 44,
  },
  fromAndToBodyBottom: {
   
    paddingTop: 18,
    borderTopWidth: 1,
    borderTopColor: "#E6EEEE",
    marginBottom: 24,
  },
  rowExtraInfo: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 14,
    color: "gray",
  },
  fromAndToContainer: {
    borderBottomWidth: 0,
  },
  isBaggageContainer: {
    borderBottomWidth: 0,
    marginBottom: 24,
  },
  fromAndToBody: {
    paddingBottom: 0,
    gap:10,
  },
  fromAndToRow: {
   flexDirection: "row",
   justifyContent:"space-between"
  },
  Col1: { width: "30%" },
  Col2: { width: "30%" },
  Col3: { width: "30%", justifyContent: "flex-end", textAlign:"right"},
  flightDurationRow: { paddingLeft: 30 },
  durationRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  
},
  FromRowDot: {
    position: "absolute",
    left: 0,
    top: 6,
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: "#d3d3d3",
  },
  ToRowDot: {
    position: "absolute",
    left: 0,
    bottom: 6,
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: "#d3d3d3",
  },
  checkoutDrawerFooter: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: "100%",
    backgroundColor: "#fff",
    zIndex: 3,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  LayoverSection: {
    marginBottom: 24,
    backgroundColor: "rgba(105, 112, 123, 0.1)", // #69707B1A
    color: "#1539CF", // basecolor example
    padding: 8,
    borderRadius: 6,
  },
  checkoutDrawerHeader: {
    paddingTop: 28,
    paddingHorizontal: 24,
    gap: 18,
  },

//   footer
footerContainer: {
    borderTopWidth: 1,
    borderColor: "#E6EEEE",
    padding: 16,
    backgroundColor: "#fff",
  },
  policySection: {
    marginBottom: 12,
  },
  policyText: {
    fontSize: 12,
    color: "gray",
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceInfo: {
    flexDirection: "column",
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1539CF",
  },
  eachPrice: {
    fontSize: 12,
    color: "gray",
    marginTop: 2,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  closeBtn: {
    marginRight: 12,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  closeText: {
    fontSize: 14,
    color: "gray",
  },
  selectFlightBtn: {
    backgroundColor: "#1539CF",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  selectFlightText: {
    color: "#fff",
    fontWeight: "700",
  },
});
