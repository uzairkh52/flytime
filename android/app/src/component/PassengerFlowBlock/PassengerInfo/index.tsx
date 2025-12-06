import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { mainStyle } from "../../../assets/styles/component/mainStyle";
import PassengersCard from "./PassengersCard";
import { RootState } from "../../../store/store";
import { passengerCaptain, setAllPassengerFill } from "../../../store/slices/passengerFlightSlice";
import ExtraServices from "../../Checkout/ExtraServices";

const PassengerInfo = ({ getdata }) => {
  const dispatch = useDispatch();

//   const passengerPofile = useSelector(state => state.passengerDrawer.passProfile);
  const filledPassengerUUIDs = useSelector((state: RootState) => state.passengerFlight.filledPassengerUUIDs);
  console.log("filledPassengerUUIDs", filledPassengerUUIDs);
  
  const selectedFlight = useSelector((state: RootState) => state.booking.flightDetail);
  console.log("selectedFlight_01", selectedFlight);
  
//   const availableServices = useSelector(
//     state => state.booking?.addCart?.raw_data?.available_services
//   );

  const CartType = useSelector((state:RootState) => state.booking.cartType);

//   if (!availableServices?.length) {
//     dispatch(setpriceSummary(true));
//   }

//   const handlePassengerClick = (uuid, isFilled, type, age, passportNumber, passenger) => {

//     const passengerTypeFinal =
//       age <= 1 ? "infant" : age <= 12 ? "child" : "adult";

//     if (passengerPofile?.length > 0) {
//       dispatch(setPassProfileDrawer(true));
//       dispatch(setPassengerUUID(uuid));
//       dispatch(setPassengerType(passengerTypeFinal));
//       dispatch(setPassengerAge(passenger.age));
//       dispatch(setPassengerPassport(passportNumber));
//       dispatch(setSelectPassenger(passenger));
//     } else {
//       if (!isFilled) {
//         dispatch(setPassengerPassport(passportNumber));
//         dispatch(setisPassengerDrawer(true));
//         dispatch(setSelectPassenger(passenger));
//       }
//     }
//   };

  // Captain Logic
  useEffect(() => {
    if (filledPassengerUUIDs?.length === getdata?.length) {
      if (CartType === "all" || CartType === "flight") {
        dispatch(passengerCaptain());
        dispatch(setAllPassengerFill(true));
      } else if (CartType === "hotel") {
      //   dispatch(passengerCaptainHotel());
      //   dispatch(setAllPassengerFill(true));
      }
    } else {
      dispatch(setAllPassengerFill(false));
    }
  }, [filledPassengerUUIDs, getdata]);

//   let initialMsg = "Please add traveller details to proceed to payment.";
//   if (CartType === "flight") initialMsg = "Let's confirm who’s flying.";
//   if (CartType === "hotel") initialMsg = "Please add guest details to proceed to payment.";


console.log("pass_passenger_data", getdata);

  return (
    <ScrollView>
      {/* <View style={styles.header}>
        <Text style={styles.headerText}>{initialMsg}</Text>
        </View> */}

      {/* Passenger List */}
      <View style={styles.passengerSection}>
        {getdata?.map((passenger, index) => {
           const isFilled = filledPassengerUUIDs.includes(passenger.uuid);
           console.log("isFilled", isFilled);
           

          return (
            <View key={passenger.uuid} style={styles.cardWrapper}>
              <TouchableOpacity
                activeOpacity={0.7}
                //  onPress={() =>
                //    handlePassengerClick(
                //      passenger.uuid,
                //      isFilled,
                //      passenger.type,
                //      passenger.age,
                //      passenger.passport_number,
                //      passenger
                //    )
                //  }
              >
                
                <PassengersCard
            totalPass={index + 1}
            getPassenger={passenger}
            isFilled={isFilled}
          />
              </TouchableOpacity>
            </View>
          );
        })}
      </View>

      {/* Extra Services */}
      {filledPassengerUUIDs.length === getdata.length && (
          <>
            <View style={styles.serviceHeader}>
              <Text style={styles.serviceTitle}>Select now your extra baggage.</Text>
            </View>

            <View style={styles.extraWrap}>
              {getdata
                ?.filter(p => filledPassengerUUIDs.includes(p.uuid))
                .map(passenger => (
                  <ExtraServices
                    key={passenger.uuid}
                    getPassenger={passenger}
                    selectedFlight={selectedFlight}
                  />
                ))}
            </View>
          </>
        )}
    </ScrollView>
  );
};

export default PassengerInfo;

const styles = StyleSheet.create({
  header: {
    paddingVertical: 10,
  },
  headerText: {
    fontWeight: "600",
    fontSize: 16,
    color: "#000",
  },
  passengerSection: {
    marginTop: 10,
  },
  cardWrapper: {
    marginBottom: 12,
  },
  serviceHeader: {
    paddingVertical: 15,
  },
  serviceTitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#000",
  },
  extraWrap: {
    marginTop: 10,
  },
});
