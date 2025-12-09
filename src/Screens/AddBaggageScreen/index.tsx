import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  addBaggage,
  removeBaggage,
  setAddSelectedBaggage,
} from "../../store/slices/baggageSlice";
import { RootState } from "../../store/store";

const AddBaggageScreen = () => {
  const dispatch = useDispatch();

  const [baggageCount, setBaggageCount] = useState({});
  const [tabValue, setTabValue] = useState(0);

  const GetViewPassengers = useSelector(
    (state: RootState) => state.passengerFlight.ViewPassengers
  );

  const getselectedFlight = useSelector(
    (state: RootState) => state.booking.flightDetail
  );

  const baggageOptions = useSelector(
    (state: RootState) => state.baggage.baggageOptions
  );

  const segmentId = useSelector(
    (state: RootState) => state.baggage.SegmentId
  );

  const HandlecloseDrawer = () => {
    
  };

  const handleIncrement = (uuid, passengerId) => {
    const current = baggageCount?.[passengerId]?.[uuid] || 0;

    if (current >= 1) return; // allow only 1

    const newCount = current + 1;

    setBaggageCount((prev) => ({
      ...prev,
      [passengerId]: {
        ...(prev[passengerId] || {}),
        [uuid]: newCount,
      },
    }));

    dispatch(setAddSelectedBaggage(uuid));
    dispatch(addBaggage(uuid));
  };

  const handleDecrement = (uuid, passengerId) => {
    const current = baggageCount?.[passengerId]?.[uuid] || 0;
    if (current <= 0) return;

    setBaggageCount((prev) => ({
      ...prev,
      [passengerId]: {
        ...(prev[passengerId] || {}),
        [uuid]: current - 1,
      },
    }));

    dispatch(removeBaggage(uuid));
  };

  // ---------------------------
  // INITIAL INCLUDED BAG PRICE
  // ---------------------------
  let totalInitialBaggagePrice = 0;

  GetViewPassengers?.forEach((p) => {
    const pUUID = p.uuid;
    const data = baggageOptions?.[pUUID];

    if (data) {
      totalInitialBaggagePrice +=
        (data.initial_checked_bag?.service_amount || 0) +
        (data.initial_carry_on_bag?.service_amount || 0);
    }
  });

  const totalBaggageCount = Object.values(baggageCount).reduce(
    (acc, passengerMap) =>
      acc +
      Object.values(passengerMap).reduce(
        (sum, count) => sum + count,
        0
      ),
    0
  );

  return (
    <ScrollView style={{ padding: 20 }}>
      {/* HEADER */}
      <TouchableOpacity onPress={HandlecloseDrawer}>
        <Text style={{ fontSize: 18, marginBottom: 15 }}>{"< Back"}</Text>
      </TouchableOpacity>

      {/* FLIGHT TABS */}
      {getselectedFlight?.slices && (
        <View style={{ flexDirection: "row", marginBottom: 20 }}>
          {getselectedFlight.slices.map((slice, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setTabValue(index)}
              style={{
                padding: 10,
                backgroundColor: tabValue === index ? "black" : "#ddd",
                marginRight: 10,
                borderRadius: 6,
              }}
            >
              <Text style={{ color: tabValue === index ? "white" : "black" }}>
                {index === 0 ? "Departing" : "Return"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* PASSENGERS */}
      {GetViewPassengers?.map((passenger) => {
        const pId = passenger.uuid;
        const data = baggageOptions?.[pId];

        if (!data) return null;

        const checkedOptions =
          data.checked_bag_options?.filter(
            (b) => b.slices_index === tabValue
          ) || [];

        const carryOptions =
          data.carry_on_bag_options?.filter(
            (b) => b.slices_index === tabValue
          ) || [];

        return (
          <View key={pId} style={{ marginBottom: 30 }}>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              {passenger.given_name} {passenger.family_name}
            </Text>

            {[...checkedOptions, ...carryOptions].map((bag) => {
              const count = baggageCount?.[pId]?.[bag.uuid] || 0;

              return (
                <View
                  key={bag.uuid}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginVertical: 12,
                  }}
                >
                  <View>
                    <Text style={{ fontSize: 14 }}>
                      {bag.baggage_type} – £{bag.service_amount}
                    </Text>
                    <Text style={{ color: "#555" }}>
                      {bag.metadata?.maximum_weight_kg
                        ? `${bag.metadata.maximum_weight_kg} kg`
                        : ""}
                    </Text>
                  </View>

                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity
                      style={styles.btn}
                      onPress={() => handleDecrement(bag.uuid, pId)}
                    >
                      <Text>-</Text>
                    </TouchableOpacity>

                    <Text style={{ marginHorizontal: 12 }}>{count}</Text>

                    <TouchableOpacity
                      style={styles.btn}
                      onPress={() => handleIncrement(bag.uuid, pId)}
                    >
                      <Text>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>
        );
      })}

      {/* FOOTER */}
      <Text style={{ marginTop: 20, fontSize: 16 }}>
        Total Added Bags: {totalBaggageCount}
      </Text>

      <Text style={{ fontSize: 16 }}>
        Initial Included Amount: £{totalInitialBaggagePrice}
      </Text>
    </ScrollView>
  );
};

const styles = {
  btn: {
    width: 35,
    height: 35,
    borderWidth: 1,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
};

export default AddBaggageScreen;
