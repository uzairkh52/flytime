import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { setPassFormData, setSelectPassenger } from "../../../../store/slices/passengerFlightSlice";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
// import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
// import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const PassengersCard = ({ getPassenger, totalPass, isFilled }) => {
  console.log("pass_getdata", getPassenger.type);
  
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const handlePassenger = (getPassenger) => {
    if (!isFilled) {
      dispatch(setPassFormData(null));
      navigation.navigate("PassengerFormScreen");
      
      dispatch(setSelectPassenger(getPassenger));
    }
  }
  return (
    <TouchableOpacity
      onPress={()=>handlePassenger(getPassenger)}
      activeOpacity={0.7}
      style={[
        styles.card,
        // isFilled ? styles.filledCard : styles.notActive,
        // !onClickCard ? styles.disabledCard : {},
      ]}
    >
      {/* Left Section */}
      <View style={styles.leftSection}>
        {/* <Image
          source={require('../../../assets/images/user-circle.png')}
          style={styles.userIcon}
        /> */}

        <View>
          {!isFilled ? (
            <>
              <Text style={styles.title}>Traveller {totalPass}</Text>

              <Text style={styles.subTitle}>
                {getPassenger.type === 'infant_without_seat' ? (
                  <>
                    Infant <Text style={styles.ageRed}>{getPassenger?.age}</Text>{' '}
                    year
                  </>
                ) : getPassenger.type === 'child' ? (
                  <>
                    Child <Text style={styles.ageRed}>{getPassenger?.age}</Text> year
                  </>
                ) : getPassenger.type === 'adult' ? (
                  <>Adult 18 years and older</>
                ) : (
                  getPassenger.type
                )}
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.title}>
                {getPassenger?.given_name} {getPassenger?.family_name}
              </Text>

              <Text style={styles.subTitle}>
                {getPassenger.type === 'infant_without_seat' ? (
                  <>
                    Infant <Text style={styles.ageRed}>{getPassenger?.age}</Text>{' '}
                    year
                  </>
                ) : getPassenger.type === 'child' ? (
                  <>
                    Child <Text style={styles.ageRed}>{getPassenger?.age}</Text> year
                  </>
                ) : getPassenger.type === 'adult' ? (
                  'Adult'
                ) : (
                  getPassenger.type
                )}
              </Text>
            </>
          )}
        </View>
      </View>

      {/* Right Section */}
      {/* <View style={styles.rightSection}>
        <Text style={styles.addChangeText}>{isFilled ? 'Change' : 'Add'}</Text>
        <FontAwesomeIcon icon={faAngleRight} size={14} color="#1539CF" />
      </View> */}
    </TouchableOpacity>
  );
};

export default PassengersCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e4e4e4",
  },
  filledCard: {
    borderColor: "#1539CF",
    backgroundColor: "#EEF2FF",
  },
  notActive: {
    borderColor: "#ccc",
  },
  disabledCard: {
    opacity: 0.4,
  },

  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flexShrink: 1,
  },
  userIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000",
    marginBottom: 2,
  },
  subTitle: {
    fontSize: 12,
    color: "gray",
  },
  ageRed: {
    color: "red",
    fontWeight: "600",
  },

  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  addChangeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#1539CF",
  },
});
