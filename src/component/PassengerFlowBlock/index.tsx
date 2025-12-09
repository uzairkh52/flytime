import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { mainStyle } from '../../assets/styles/component/mainStyle';
import PassengerInfo from './PassengerInfo';
import PriceSummaryScreen from '../../Screens/PriceSummaryScreen';


// import LoadingArea from "../../LoadingArea";
// import PassengerInfo from "../../Checkout/PassengerInfo";
// import PriceSummary from "../../Checkout/PriceSummary";
// import PaymentDrawer from "../../Checkout/PaymentDrawer";
// import PaymentAddCardDrawer from "../../Checkout/PaymentAddCardDrawer";
// import PaymentSuccess from "../../Checkout/PaymentSuccess";

// import { setFilledPass } from "@/src/store/slices/passengerDrawerSlice";

const PassengerFlowBlock = ({
  aiMessage,
  //   filledPassenger,
  //   orderDetail,
  //   paymentSuccess,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  //   const allPassengerFill = useSelector(
  //     (state: RootState) => state.passengerDrawer.allPassengerFill
  //   );
  const GetViewPassengers = useSelector(
    (state: RootState) => state?.passengerFlight?.ViewPassengers,
  );
  console.log('GetViewPassengers22', aiMessage?.passengerFlowRes?.status);

  const AllFiledPass = useSelector(
    (state: RootState) => state?.passengerFlight?.allPassengerFill,
  );
  console.log('FiledPass_00', AllFiledPass);
  console.log("aiMessage_passengerFlowRes", aiMessage?.passengerFlowRes?.status);
  

  //   const passengerProfile = useSelector(
  //     (state: RootState) => state.passengerDrawer.passProfile
  //   );

  // 🚀 Activate continue button when all passengers filled
  //   useEffect(() => {
  //     if ((!passengerProfile || passengerProfile.length === 0) && allPassengerFill) {
  //       dispatch(setFilledPass(true));
  //     }
  //   }, [passengerProfile, allPassengerFill, dispatch]);

  return (
    <>
      {/* Passenger Flow Loading */}
      {/* {aiMessage?.ai?.passengerFlowRes?.isloading && (
        <View style={{ marginVertical: 12 }}>
          <LoadingArea />
        </View>
      )} */}

      {/* Passenger Info */}
      {aiMessage?.passengerFlowRes?.status &&
        Array.isArray(GetViewPassengers) &&
        GetViewPassengers.length > 0 && (
          <PassengerInfo getdata={GetViewPassengers} />
        )}

      {/* Payment Flow */}
      {AllFiledPass && aiMessage?.passengerFlowRes?.status && (
        <>
          <PriceSummaryScreen />
        </>
      )}

      
    </>
  );
};

export default PassengerFlowBlock;
