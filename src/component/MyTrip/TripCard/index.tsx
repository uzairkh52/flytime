// components/TripCard.js
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import dayjs from "dayjs";
import { useNavigation } from "@react-navigation/native";
import { SvgUri } from "react-native-svg";
import { Button, Card } from "react-native-paper";
import { mainStyle } from "../../../assets/styles/component/mainStyle";
import { tripStyles } from "../../../assets/styles/component/MyTripStyle";

interface TripDataProps {
  tripData: any;
}

const TripCard: React.FC<TripDataProps> = ({ tripData }) => {
  const [expanded, setExpanded] = useState(false);
  const navigation = useNavigation();

  const forHotel = tripData?.details?.hotel?.selected_hotel_offer;
  const forFlight = tripData?.details?.flight?.selected_offer;

  // -----------------------------
  // FLIGHT INFO
  // -----------------------------
  const slices = forFlight?.slices || [];
  const firstSeg = slices[0]?.segments?.[0];
  const lastSeg = slices[0]?.segments?.at(-1);

  const isRoundTrip = slices.length > 1;

  const route =
    firstSeg &&
    `${firstSeg?.origin?.city_name} - ${firstSeg?.destination?.city_name}`;

  const routeCode =
    firstSeg &&
    `${firstSeg?.origin?.iata_code} → ${firstSeg?.destination?.iata_code}`;

  const passengers = `${forFlight?.passengers?.length || 0} passenger${
    (forFlight?.passengers?.length || 0) > 1 ? "s" : ""
  }`;

  const flightLogo =
    forFlight?.owner?.logo_symbol_url ||
    "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png";

  const departureDate = firstSeg?.departing_at
    ? dayjs(firstSeg?.departing_at).format("DD MMM YYYY")
    : "";

  const returnArrival = isRoundTrip
    ? dayjs(slices[1]?.segments?.at(-1)?.arriving_at).format("DD MMM YYYY")
    : null;

  const date = isRoundTrip ? `${departureDate} - ${returnArrival}` : departureDate;

  const depTime = firstSeg
    ? dayjs(firstSeg?.departing_at).format("hh:mm A")
    : "";

  const arrTime = lastSeg
    ? dayjs(lastSeg?.arriving_at).format("hh:mm A")
    : "";

  const flightNumber = firstSeg?.operating_carrier_flight_number || "";

  const stops = (slices[0]?.segments?.length || 1) - 1;
  const stopText = stops === 0 ? "Non-stop" : `${stops} Stop`;

  // -----------------------------
  // HOTEL INFO
  // -----------------------------
  const hotelImages =
    forHotel?.hotel?.content?.images?.slice(0, 3) || [];

  const hotelName = forHotel?.hotel?.content?.name?.content;
  const hotelCity = forHotel?.hotel?.content?.address?.city_name;
  const hotelRating = forHotel?.hotel?.content?.rating;
  const roomType = forHotel?.rooms?.[0]?.room_type || "Room";
  const hotelGuests = `${forHotel?.hotel?.rooms[0]?.rates?.[0].adults} adults | ${forHotel?.hotel?.rooms[0]?.rates?.[0].children} Childs`;
  const hotelRooms = forHotel?.hotel?.rooms.length;
  console.log("hotelRooms", forHotel?.hotel?.rooms[0]?.rates?.[0].children);
  

  // -----------------------------
  // DESCRIPTION
  // -----------------------------
  const description = forFlight
    ? `You're all set to fly with ${forFlight?.owner?.name}. Departure from ${firstSeg?.origin?.name} to ${firstSeg?.destination?.name}.`
    : forHotel?.hotel?.content?.description?.content || "";

  const maxLength = 80;
  const shouldTruncate = description.length > maxLength;
  const displayText = expanded ? description : description.slice(0, maxLength);

  const status =
    tripData?.details?.flight?.order_status === "confirmed"
      ? "Confirmed"
      : "Pending";

  const handleViewTrip = () => {
    navigation.navigate("TripDetail", { uuid: tripData?.uuid });
  };

  return (
    <Card style={[mainStyle.whiteBg, mainStyle.mb10]}>
      <Card.Content>
        {/* Status */}
        <View style={tripStyles.statusContainer}>
          <Text style={tripStyles.statusText}>{status}</Text>
        </View>

        {/* FLIGHT TITLE */}
        {forFlight && (
          <>
            <Text style={tripStyles.routeText}>
              {route} {isRoundTrip ? "Round-trip" : "One-way"}
            </Text>
            
            <View style={[mainStyle.displayFlex, mainStyle.justifyContentBetween, mainStyle.flexRow ]}>
                <Text style={tripStyles.dateText}>
                {date} | {passengers} | {stopText} | Flight no {flightNumber}
                </Text>


            </View>
          </>
        )}

        {/* HOTEL TITLE */}
        {forHotel && (
          <>
            <Text style={tripStyles.routeText}>{hotelName}</Text>

            <Text style={tripStyles.subRouteText}>{hotelCity}</Text>

            {hotelRating && (
              <Text style={tripStyles.subRouteText}>
                ⭐ {hotelRating?.value || hotelRating} / 5
              </Text>
            )}

            <Text style={tripStyles.dateText}>
              {dayjs(forHotel?.hotel?.checkIn, "DD-MM-YYYY").format("DD MMM")} -{" "}
              {dayjs(forHotel?.hotel?.checkOut, "DD-MM-YYYY").format("DD MMM")}
            </Text>

            <Text style={tripStyles.subRouteText}>
              {roomType} • {hotelRooms} Room(s) • {hotelGuests}
            </Text>
          </>
        )}

        {/* IMAGES */}
        <View style={[mainStyle.flexRow, mainStyle.justifyContentCenter, mainStyle.gap10, mainStyle.py10]}>
          {forFlight ? (
            <SvgUri uri={flightLogo} width={140} height={40} />
          ) : (
            hotelImages.map((img, index) => (
              <Image
                key={index}
                source={{
                  uri: img?.url_320 || "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png",
                }}
                style={tripStyles.hotelImage}
              />
            ))
          )}
        </View>

        {/* DESCRIPTION */}
        <Text style={tripStyles.descriptionText}>
          {displayText}
          {shouldTruncate && !expanded && "..."}
        </Text>

        {shouldTruncate && (
          <TouchableOpacity onPress={() => setExpanded(!expanded)}>
            <Text style={[mainStyle.basecolor, mainStyle.p]}>
              {expanded ? "Read less" : "Read more"}
            </Text>
          </TouchableOpacity>
        )}

        {/* VIEW BUTTON */}
        <Button style={mainStyle.BtnPrimary} mode="contained" onPress={handleViewTrip}>
          View trip
        </Button>
      </Card.Content>
    </Card>
  );
};

export default TripCard;
