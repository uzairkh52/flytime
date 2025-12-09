import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

// Redux actions (same as Next.js)
import {
  baggageSetup,
  setSegmentId,
} from "../../../store/slices/baggageSlice";

const ExtraServices = ({ getPassenger, selectedFlight }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // 🔥 This contains available_services just like Next.js
  const singleflight = useSelector(
    (state) => state.booking?.addCart?.raw_data
  );

  // STEP 1: Extract unique outbound & return baggage
  const extractBaggage = (flight) => {
    const baggageMap = new Map();

    flight?.slices?.forEach((slice, index) => {
      const direction = index === 0 ? "Outbound baggage" : "Return baggage";

      slice?.segments?.forEach((segment) => {
        segment?.passengers?.forEach((passenger) => {
          passenger?.baggages?.forEach((baggage) => {
            const key = `${baggage.type}-${baggage.formatted_type}-${direction}`;
            if (!baggageMap.has(key)) {
              baggageMap.set(key, { ...baggage, direction });
            }
          });
        });
      });
    });

    const unique = Array.from(baggageMap.values());

    return {
      outboundBaggages: unique.filter((b) => b.direction === "Outbound baggage"),
      returnBaggages: unique.filter((b) => b.direction === "Return baggage"),
    };
  };

  const { outboundBaggages, returnBaggages } = extractBaggage(selectedFlight);


  // STEP 2: Handle Add baggage click (FULL LOGIC MATCHES NEXT.JS)
  const handleAddBaggage = (segmentIds) => {
    dispatch(baggageSetup());       // same as baggage()
    dispatch(setSegmentId(segmentIds));
    navigation.navigate("AddBaggageScreen");
  };


  // STEP 3: Render baggage section
  const renderBaggageSection = (title, baggages, directionIndex) => {
    const slice = selectedFlight?.slices?.[directionIndex];
    const segmentIds = slice?.segments?.map((s) => s.id) || [];

    // ✔ MATCHING AVAILABLE SERVICES LIKE NEXT.JS
    const matchingServices =
      singleflight?.available_services?.filter((service) =>
        service.segment_ids?.some((id) => segmentIds.includes(id))
      ) || [];

    return (
      <View style={styles.sectionWrapper}>
        <View style={styles.headerRow}>
          <Text style={styles.sectionTitle}>{title}</Text>

          {/* Hide Add button for infants OR no matching services */}
          {getPassenger?.type !== "infant_without_seat" &&
            matchingServices.length > 0 && (
              <TouchableOpacity onPress={() => handleAddBaggage(segmentIds)}>
                <Text style={styles.addBtn}>Add</Text>
              </TouchableOpacity>
            )}
        </View>

        {/* Default free item */}
        <View style={styles.baggageItem}>
          <Text>1 x Handbag / Laptop bag</Text>
        </View>

        {/* Map real baggages */}
        {getPassenger?.type !== "infant_without_seat" &&
          baggages.map((baggage, index) => (
            <View key={index} style={styles.baggageItem}>
              <Text>
                {baggage.quantity} x{" "}
                {baggage.type === "personal"
                  ? "Handbag"
                  : baggage.type === "carry_on"
                  ? "Carry-on"
                  : baggage.type === "checked"
                  ? "Checked"
                  : "Other"}{" "}
                ({baggage.weight} kg)
              </Text>
            </View>
          ))}
      </View>
    );
  };


  return (
    <View style={styles.card}>
      {/* Passenger Info */}
      <View style={styles.userRow}>
        <View>
          <Text style={styles.userName}>
            {getPassenger?.given_name || "Guest"} {getPassenger?.family_name || ""}
          </Text>
          <Text style={styles.userType}>
            {getPassenger?.type === "infant_without_seat"
              ? "Infant"
              : getPassenger?.type === "child"
              ? "Child"
              : "Adult"}
          </Text>
        </View>
      </View>

      {/* Render Sections */}
      {outboundBaggages.length > 0 &&
        renderBaggageSection("Outbound Baggage", outboundBaggages, 0)}

      {returnBaggages.length > 0 &&
        renderBaggageSection("Return Baggage", returnBaggages, 1)}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 20,
  },
  userRow: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  userName: { fontSize: 16, fontWeight: "bold" },
  userType: { fontSize: 14, color: "#666" },
  sectionWrapper: { marginBottom: 16 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: { fontSize: 16, fontWeight: "bold" },
  addBtn: { fontSize: 14, color: "#007AFF" },
  baggageItem: { paddingVertical: 6 },
});

export default ExtraServices;
