import { StyleSheet } from "react-native";

export const HotelCardStyle = StyleSheet.create({
  card: {
    justifyContent: 'center',
    minHeight: 130,
    width: '100%',
    backgroundColor: '#fff',
    borderColor: '#E6EEEE',
    borderWidth: 1,
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
    overflow: 'hidden',
    // hover scale replacement
    transform: [{ scale: 1 }],
  },

  Hotelrow: {
    flexDirection: 'column',
    width: '100%',
    
  },
  
  topSection: {
  flexDirection: 'row',
  gap: 10,
  paddingBottom:10,
},

leftContent: {
  width: 96,          // FIXED WIDTH same as thumbnail
},
thumbnail: {
  width: 96,
  height: 96,
  borderRadius: 12,
  overflow: 'hidden', // ensures rounded corners clip image
  justifyContent: 'center',
  alignItems: 'center',
  
},

rightContent: {
  flex: 1,            // takes remaining space
  flexShrink: 1,      // allows shrinking for wrap
  
},

  BottomSection: {
    flexDirection:"row",
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    

  },

  categoryChip: {
    marginTop: 3,
    fontSize: 13,
    color: '#666',
  },

  location: {
    marginTop: 4,
    fontSize: 12,
    color: '#444',
  },

  roomText: {
    marginTop: 6,
    fontSize: 13,
    color: '#333',
  },

  amenitiesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
  },

  amenity: {
    fontSize: 12,
    backgroundColor: '#F1F1F1',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },

  
  pricePerNight: {
    fontSize: 16,
    color: '#1539CF',
    fontWeight: '600',
  },

  totalPrice: {
    fontSize: 12,
    color: '#555',
    marginTop: 3,
  },

  // Mobile size override
  mobile_selectBtn: {
    width: 150,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  mobile_isSelected: {
    width: 150,
    height: 30,
    backgroundColor: '#DEE1E6',
  },
});
