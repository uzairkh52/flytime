import { StyleSheet } from 'react-native';
import { variable } from '../../variable'; // your colors/fonts

export const flightStyles = StyleSheet.create({
  topSection: {
   paddingBottom:8,
  },
  flightOfferCard: {
    maxWidth: '100%',
    backgroundColor: variable.white,
    borderWidth: 1,
    borderColor: '#E6EEEE',
    borderRadius: 16,
    flexDirection: 'column',
    marginBottom: 10,
  },

  selectFlightBtn: {
    height: 30,
    fontSize: 12,
    width: 150,
    paddingVertical: 9,
    paddingHorizontal: 40,
    // White-space nowrap is default in React Native Text
  },

  selectFlightBtnIsSelected: {
    backgroundColor: '#DEE1E6',
    pointerEvents: 'none',
    height: 30,
    paddingVertical: 9,
    paddingHorizontal: 40,
  },

  
  airlineLogo: {
  justifyContent: "center",
  alignItems: "center", // center the image inside
  backgroundColor: "#FFFFFF",
  width: "20%",
  height: 52,
  borderRadius: 4, // optional: rounded corners
},

airlineLogoImg: {
  width: 40,          // slightly smaller than parent
  height: 40,         // explicitly set height
  resizeMode: "contain",
},

  rowExtraInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    fontSize: 14,
    color: 'gray',
  },
  airlineRow: {
   gap:4
  },
  flightPriceSection: {
    fontSize: 18,
  },

  destination: {
    fontSize: 10,
    position: 'relative',
    bottom: 5,
  },

  Duration: {
    fontSize: 8, // mobile size
    position: 'relative',
    bottom: -1.5,
  },

  flightDay: {
    fontSize: 10,
  },

  CardTop: {
    paddingTop: 16,
    paddingBottom: 0,
    paddingLeft: 12,
    paddingRight: 12,
  },

  CardRight: {
    padding: 12,
    borderLeftWidth: 1,
    borderLeftColor: variable.lightgray3,
  },

  airlineLogo: {
    borderRadius: 0,
    justifyContent: 'flex-start',
    backgroundColor: variable.white,
    width: 36,
    height: 36,
    resizeMode: 'contain',
  },

  flightDurationBox: {
    width: '80%',
  },

  flightDuration: {
    fontSize: 10,
    color: variable.black,
  },

  SearchDivider: {
    borderTopWidth: 1,
    borderColor: 'transparent',
    marginVertical: 8,
    position: 'relative',
  },

  dotContainer: {
    position: 'absolute',
    left: 0,
    bottom: -1.5,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 14,
  },

  dot: {
    width: 5.5,
    height: 5.5,
    borderRadius: 3,
    backgroundColor: variable.basecolor,
  },

  flightTime: {
    fontWeight: '700',
    fontSize: 14,
  },

  Timings: {
    flexDirection: 'column',
    gap: 2,
  },


  flightRoute: {
    fontSize: 10,
  },
  // 

  FromAndToRow: {
    width: '100%',
  },
  fromAndToDetail: {
  },
  FlightTimingsCol: {
    width:"90%",
    display:"flex",
    flexDirection:"column",
  },
  DetailRow: {
    flexDirection: 'row',
    gap: 8,
  },
  // botom section

  bottomContainer: {
    flexDirection: 'column',
    paddingVertical: 12,
    
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  baggageWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  baggageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
    marginBottom: 4,
  },
  baggageText: {
    fontSize: 13,
    color: '#333',
  },
  baggageType: {
    fontWeight: '600',
    color: '#000',
  },
  
  seeDetailsArrow: {
    fontSize: 16,
    marginLeft: 4,
    color: '#1E3A8A',
  },
  priceText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
  },
  selectBtn: {
    backgroundColor: '#1E3A8A',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  selectBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  
});
