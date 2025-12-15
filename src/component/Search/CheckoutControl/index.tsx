import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";


import { AppDispatch } from "../../../store/store";
import { currencySymbols } from "../../../utils/util";
import { mainStyle } from "../../../assets/styles/component/mainStyle";
import { getPassPofile, PassengerForm } from "../../../store/slices/passengerFlightSlice";


const CheckoutControl = () => {
   const dispatch = useDispatch<AppDispatch>();
   const {cartTotalPrice, cartType, getCartDetail, isCartSuccess} = useSelector((state:any) => state.booking);
   const passenger = useSelector((state:any) => state?.passengerFlight.SelectPassenger);
   console.log("passenger_000", passenger);
   
   
   
  

  
  const CartItems = getCartDetail?.items || [];
  const CartFlight = CartItems[0];
  console.log("cartTotalPrice", getCartDetail);
  
  
//   const issystemmessage = useSelector(
//     (state) => state.sendMessage?.systemMessage
//   );

//   const orderSuccess = useSelector((state) => state.payment?.OrderConfirm);

  const handleBookFlight = () => {
   //  dispatch(setIsBuilderDialog(false));
   //  dispatch(setChatscroll(true));
    dispatch(PassengerForm());
   //  dispatch(getPassPofile());
  };

  return (
    <View style={styles.row}>
      <View style={styles.innerBox}>
        {/* If flight is already paid */}
        {/* {orderSuccess?.flight_order ? (
          <View style={styles.paidBox}>
            <Text style={styles.boldText}>
              Paid •{" "}
              {currencySymbols[CartData?.tax_currency] ||
                CartData?.tax_currency}
              {Math.round(CartData?.total_price)}
            </Text>
          </View>
        ) :  */}
        
        {isCartSuccess ? (
          <>
            <TouchableOpacity
              onPress={handleBookFlight}
              style={[mainStyle.BtnX, mainStyle.BtnPrimary, mainStyle.Btn, ]}
            >
              <Text style={[mainStyle.BtnText, mainStyle.white]}>
                Checkout •{' '}
                {/* {currencySymbols[CartFlight?.currency] ||
                CartFlight?.currency}
              {Math.round(CartTotalPrice)} */}
              {Math.round(getCartDetail?.total_price)}
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={[styles.btn, styles.disabledBtn]} disabled>
            <Text style={styles.boldText}>No selection</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  
  innerBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 100,
    gap: 15,
  },

  btn: {
    borderRadius: 50,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  primaryBtn: {
    backgroundColor: "#1539CF",
  },

  disabledBtn: {
    backgroundColor: "#d5d7df",
    opacity: 0.7,
  },

  paidBox: {
    backgroundColor: "#e5ebff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 50,
  },

  boldText: {
    fontWeight: "800",
    color: "#000",
    textTransform: "capitalize",
  },
});

export default CheckoutControl;
