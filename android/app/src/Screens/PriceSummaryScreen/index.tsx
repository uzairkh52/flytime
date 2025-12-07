import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";


import { RootState } from "../../store/store";
import { setpriceSummary } from "../../store/slices/PaymentSlice";
import { currencySymbols } from "../../utils/util";
import { useNavigation } from "@react-navigation/native";
import { mainStyle } from "../../assets/styles/component/mainStyle";




const PriceSummaryScreen = () => {
  const dispatch = useDispatch();

  const scrollRef = useRef(null);

  const priceSummary = useSelector((state:RootState) => state.payment.priceSummary);

  console.log("priceSummary", priceSummary);
  
  const OrderDetail = useSelector((state:RootState) => state?.payment?.OrderConfirm);
  const paymentSuccess = useSelector(
    (state:RootState) => state.payment.PaymentFormSuccess
  );
  
  
  const flightOrder = OrderDetail?.flight_order?.selected_offer;
//   const hotelOrder = OrderDetail?.hotel_order?.selected_hotel_offer?.hotel;
  
const slices = flightOrder?.slices || [];
const firstSeg = slices[0]?.segments?.[0];
const isRoundTrip = slices.length > 1;

//   // route
const route = `${firstSeg?.origin?.city_name} - ${firstSeg?.destination?.city_name}`;


  const departureDate = new Date(firstSeg?.departing_at).toLocaleDateString(
    "en-GB",
    { day: "2-digit", month: "short" }
  );

  const returnArrival = isRoundTrip
    ? new Date(slices[1]?.segments?.at(-1)?.arriving_at).toLocaleDateString(
        "en-GB",
        { day: "2-digit", month: "short" }
      )
    : null;

  const date = isRoundTrip
    ? `${departureDate} - ${returnArrival}`
    : departureDate;

//   // passenger count
//   const hotelAdults = hotelOrder?.rooms?.[0]?.rates?.[0]?.adults;
//   const hotelChildren = hotelOrder?.rooms?.[0]?.rates?.[0]?.children;

  const flightAdults =
    flightOrder?.passengers?.filter((p) => p.type === "adult").length || 0;

  const flightChildren =
    flightOrder?.passengers?.filter((p) => p.type === "child").length || 0;

  const flightInfant = flightOrder?.passengers?.filter(
   (p) => p.type === "infant_without_seat"
   ).length || 0;

// hotelAdults || 
  const numAdults = flightAdults || 0;
  const numChildren = flightChildren + flightInfant || 0;

  console.log("OrderDetail_111", date);
//   // scroll effect
//   useEffect(() => {
//     if (priceSummary && scrollRef.current) {
//       scrollRef.current.scrollTo({ y: 400, animated: true });
//     }
//   }, [priceSummary]);

  const openPriceSummary = () => {
   dispatch(setpriceSummary(true));
  };

  const navigation = useNavigation();
  const handlePayment = () => {
   navigation.navigate("PaymentScreen");
   
   //  dispatch(PaymentSessionStart());
   //  dispatch(OrderSuccessPayment());
  };

  return (
    <View>
      <View style={[ mainStyle.displayFlex, mainStyle.flexRow, mainStyle.justifyContentBetween ]}>
        <Text>When ready, go to the trip</Text>
        <View  h={20}  style={[mainStyle.flexRow, mainStyle.alignItemsCenter, mainStyle.gap]}>
         <Text onPress={openPriceSummary} style={styles.link}>
            price summary 
         </Text>
            {/* <MaterialDesignIcons name="chevron-down" /> */}
        </View>
      </View>
      {priceSummary && (
        <View style={styles.card}>
          <Text style={styles.title}>Trip price summary</Text>
          {flightOrder && (
            <>
              <Text style={styles.rowLabel}>
                Flight {flightOrder?.slices?.[0]?.origin?.iata_code} -{' '}
                {flightOrder?.slices?.[0]?.destination?.iata_code} | {date} |{' '}
                {isRoundTrip ? 'Return' : 'One-way'} |{' '}
                {numAdults > 0 &&
                  `${numAdults} ${numAdults === 1 ? 'adult' : 'adults'}`}{' '}
                {numChildren > 0 &&
                  `${numChildren} ${numChildren === 1 ? 'child' : 'children'}`}
              </Text>
              <Text>
                {currencySymbols[flightOrder?.tax_currency]}
                {
                  OrderDetail?.amount_calculations
                    ?.flight_total_amount_plus_markup_and_all_services
                }
              </Text>
              <View style={styles.row}>
                <Text>Airline fees</Text>
                <Text style={styles.amount}>
                  {currencySymbols[flightOrder?.tax_currency]}
                  {Math.round(flightOrder?.base_amount)}
                </Text>
              </View>

              {/* Taxes */}
              <View style={styles.row}>
                <Text>Taxes, fees & surcharges</Text>
                <Text style={styles.amount}>
                  {currencySymbols[flightOrder?.tax_currency]}
                  {Math.round(flightOrder?.tax_amount)}
                </Text>
              </View>
              {OrderDetail?.amount_calculations
                ?.baggages_total_amount_plus_markup > 0 && (
                <View style={styles.row}>
                  <Text>Extra baggage</Text>
                  <Text style={styles.amount}>
                    {currencySymbols[flightOrder?.tax_currency]}
                    {Math.round(
                      OrderDetail?.amount_calculations
                        ?.baggages_total_amount_plus_markup
                    )}
                  </Text>
                </View>
              )}
              {/* Admin Fee */}
              <View style={styles.row}>
                <Text>Admin Fee</Text>
                <Text style={styles.amount}>
                  {currencySymbols[flightOrder?.tax_currency]}
                  {flightOrder?.markup_amount_rounded || "-"}
                </Text>
              </View>
              <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total trip price</Text>
            <Text style={styles.totalAmount}>
              {
                currencySymbols[
                  OrderDetail?.hotel_order?.payment_currency ||
                    OrderDetail?.flight_order?.payment_currency
                ]
              }
              {Math.round(
                OrderDetail?.amount_calculations
                  ?.total_amount_plus_markup_and_all_services
              )}
            </Text>
          </View>

          {/* Button */}
          <TouchableOpacity
            style={[
              styles.button,
              paymentSuccess && { backgroundColor: "#ccc" },
            ]}
            disabled={paymentSuccess}
            onPress={handlePayment}
          >
            <Text >Proceed to payment</Text>
          </TouchableOpacity>
            </>
          )}
        </View>
      )}
    </View>
  );
};

export default PriceSummaryScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  text: {
    fontSize: 14,
    marginBottom: 10,
  },
  link: {
    color: "#1539CF",
    fontWeight: "bold",
  },
  card: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 10,
    elevation: 3,
  },
  title: { fontWeight: "bold", fontSize: 16, marginBottom: 12 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  rowLabel: { fontSize: 14, maxWidth: "70%" },
  amount: { fontWeight: "bold" },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  totalLabel: { fontWeight: "bold", fontSize: 16 },
  totalAmount: { fontWeight: "bold", fontSize: 16 },
  button: {
    backgroundColor: "#1539CF",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: { textAlign: "center", color: "white", fontSize: 16 },
  hotelTitle: { fontWeight: "bold", marginTop: 10 },
});
