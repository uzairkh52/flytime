import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { FlightDetailStyle } from "../../../../../../assets/styles/component/FlightDetailStyle";
import { mainStyle } from "../../../../../../assets/styles/component/mainStyle";

const FromAndToDetail = ({ getdata, logo, flightType, sliceLength }) => {
  const [toggle, setToggle] = useState({});
  const toggleDetails = (key) => setToggle((prev) => ({ ...prev, [key]: !prev[key] }));
  const showDetails = !toggle[flightType];

  const getStopDetails = (segmentData) => {
    let stops = 0;
    let airports = [];

    if (segmentData?.segments) {
      stops = segmentData.segments.length - 1;
      airports = segmentData.segments.slice(0, -1).map((s) => s.destination.iata_code);
    }

    return stops > 0 ? `${stops} stop${stops > 1 ? "s" : ""} (${airports.join(" - ")})` : "";
  };

  const firstSegment = getdata?.segments?.[0];
  const lastSegment = getdata?.segments?.[getdata?.segments?.length - 1];

  return (
    <View style={FlightDetailStyle.detailsSection}>
      {/* Header Toggle */}
      {getdata?.segments?.length > 1 && (
        <View style={FlightDetailStyle.header}>
          {sliceLength > 1 && <Text style={FlightDetailStyle.headerText}>{flightType}</Text>}
          <TouchableOpacity onPress={() => toggleDetails(flightType)}>
            <View style={FlightDetailStyle.toggleBox}>
              <Text style={FlightDetailStyle.toggleText}>
                {showDetails ? "Show details" : "Hide details"}
              </Text>
              <Text style={FlightDetailStyle.toggleIcon}>
                {showDetails ? "▼" : "▲"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}

      {/* Flight Details */}
      {showDetails && firstSegment && lastSegment && (
        <View style={FlightDetailStyle.fromAndToBody}>
          {/* FROM */}
          <View style={FlightDetailStyle.fromAndToRow}>
            <Text style={FlightDetailStyle.Col1}>
              {new Date(firstSegment.departing_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })}
            </Text>
            <Text style={FlightDetailStyle.Col2}>
              {firstSegment.origin.iata_code} ({firstSegment.origin.city_name})
            </Text>
            <Text style={FlightDetailStyle.Col3}>
              {new Date(firstSegment.departing_at).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "2-digit" })}
            </Text>
          </View>

          {/* Duration + Stops */}
          <View style={FlightDetailStyle.durationRow}>
            <Text style={FlightDetailStyle.Col1}>Duration</Text>
            <Text style={FlightDetailStyle.Col2}>
              {firstSegment.duration} {getStopDetails(getdata) ? `• ${getStopDetails(getdata)}` : ""}
            </Text>
            <Text style={FlightDetailStyle.Col3}></Text>
          </View>

          {/* TO */}
          <View style={FlightDetailStyle.fromAndToRow}>
            <Text style={FlightDetailStyle.Col1}>
              {new Date(lastSegment.arriving_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })}
            </Text>
            <Text style={FlightDetailStyle.Col2}>
              {lastSegment.destination.iata_code} ({lastSegment.destination.city_name})
            </Text>
            <Text style={FlightDetailStyle.Col3}>
              {new Date(lastSegment.arriving_at).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "2-digit" })}
            </Text>
          </View>
        </View>
      )}

      {/* Layovers / Multi Segment */}
      {!showDetails &&
        getdata?.segments?.map((segment, index) => (
          <View key={index} style={FlightDetailStyle.fromAndToBody}>
            {segment?.stop_duration && (
              <View style={FlightDetailStyle.LayoverSection}>
                <Text>
                  ⏱ {segment.stop_duration} layover in {segment.origin.city_name} ({segment.origin.iata_country_code})
                </Text>
              </View>
            )}
          </View>
        ))}

      <View style={mainStyle.hr}></View>

      {/* Baggage Info */}
      <View style={FlightDetailStyle.baggageBox}>
        <Text style={FlightDetailStyle.bagTitle}>Included in this ticket</Text>
        {(() => {
          const bagMap = new Map();
          getdata?.segments?.forEach((seg) =>
            seg?.passengers?.forEach((p) =>
              p?.baggages?.forEach((b) => {
                const key = `${b.type}-${b.formatted_type}`;
                if (!bagMap.has(key)) bagMap.set(key, b);
              })
            )
          );
          return [...bagMap.values()].map((bag, i) => (
            <View style={FlightDetailStyle.bagRow} key={i}>
              <Text>{bag.quantity} {bag.formatted_type}</Text>
            </View>
          ));
        })()}
      </View>

      {/* Airline Logo / Emissions */}
      <View style={FlightDetailStyle.emissionBox}>
        {logo && (
          <Image source={{ uri: logo }} style={FlightDetailStyle.airlineLogo} resizeMode="contain" />
        )}
        <Text style={FlightDetailStyle.emissionText}>
          Emissions estimate: {getdata?.total_emissions_kg} kg CO₂e
        </Text>
      </View>
    </View>
  );
};

export default FromAndToDetail;
