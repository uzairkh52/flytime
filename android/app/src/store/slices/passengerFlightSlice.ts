import { createSlice } from "@reduxjs/toolkit";
import { API_ENDPOINTS } from "../config/apiEndpoints";
import api from "../config/api";
import { setCloseDrawer, setIsCartSuccess } from "./BookingflightSlice";

import dayjs from "dayjs";
import { setMessage } from "./sendMessageSlice";
import { fetchOrderDetail } from "./PaymentSlice";


const initialState ={
  captainSuccess: false,
  formSuccess: false,
  isOpen: false,
  countries: [],
  OfferId: null,
  OrderUuid: null,
  genericOrderUuid: null,
  ViewPassengers: [],
  PassengerUUID: null,
  PassengerData: null,
  PassFormData: null,
  isLoading: false,
  filledPassengerUUIDs: [],
  isPassengerDrawer: false,
  PassengerFormError: null,
  isFormLoading: false,
  PassengerType: null,
  passProfile: null,
  allPassengerFill:false,
  captainParams: null,
  passProfileDrawer: false,
  selectedProfilePass: null,
  IsPassengerflow: null,
  IsorderSetup: null,
  isPassengerLoading: false,
  SeeDetailButton: "Chat",
  filledPass: false,
  SelectPassenger: null,
  selectPassProfile: null,
  unSelectPassProfile: null,
  addNewPassactive: false,
  PassengerPassport: null,
};
const passengerFlightSlice = createSlice({
  name: "passengerFlight",
  initialState,
  reducers: {
  
    setAddNewPassactive: (state, action) => {
      state.addNewPassactive = action.payload;
    },
    setAddFilledPassenger: (state, action) => {
      if (action.payload === null ) {
        state.filledPassengerUUIDs = []
      } else if (!state.filledPassengerUUIDs.includes(action.payload)) {
        state.filledPassengerUUIDs.push(action.payload);
      }
    },
    setUnSelectPassProfile: (state, action) => {
      state.unSelectPassProfile = action.payload;
    },
    setSelectPassProfile: (state, action) => {
      state.selectPassProfile = action.payload;
    },
    setFilledPass: (state, action) => {
      state.filledPass = action.payload;
    },
    setSeeDetailButton: (state, action) => {
      state.SeeDetailButton = action.payload;
    },
    setIsPassengerflow: (state, action) => {
      state.IsPassengerflow = action.payload;
    },
    setSelectedProfilePass: (state, action)=> {
      state.selectedProfilePass = action.payload
    },
    setPassProfileDrawer: (state, action)=> {
      state.passProfileDrawer = action.payload;
    },
    setCaptainParams: (state, action)=> {
      
      
      state.captainParams = action.payload
    },
    setAllPassengerFill: (state, action)=> {
      
      
      state.allPassengerFill = action.payload
    },
    setPassProfile: (state, action)=> {
      state.passProfile = action.payload;
    },
    setSelectPassenger: (state, action)=> {
      state.SelectPassenger = action.payload
    },
    setPassengerType: (state, action)=> {
      state.PassengerType = action.payload
    },
    setPassengerAge: (state, action)=> {
      state.PassengerAge = action.payload
    },
    setPassengerPassport: (state, action)=> {
      state.PassengerPassport = action.payload
    },
    setPassengerIndex: (state, action)=> {
      state.PassengerIndex = action.payload
    },
    setCaptainSuccess: (state, action) => {
      state.captainSuccess = action.payload;
    },
    setFormSuccess: (state, action) => {
      state.formSuccess = action.payload;
    },
    markPassengerAsFilled: (state, action) => {
      if (!state.filledPassengerUUIDs.includes(action.payload)) {
        state.filledPassengerUUIDs.push(action.payload);
      }
    },
    setisPassengerDrawer: (state, action) => {
      state.isPassengerDrawer = action.payload;
    },
    bookFlight: (state, action) => {
      state.passengerDetails = action.payload;
    },
    setCountries: (state, action) => {
      state.countries = action.payload;
    },
    setOfferId: (state, action) => {
      state.OfferId = action.payload;
    },
    setOrderUuid: (state, action) => {
      state.OrderUuid = action.payload;
    },
    setGenericOrderUuid: (state, action) => {
      state.genericOrderUuid = action.payload;
    },
    setViewPassengers: (state, action) => {
      state.ViewPassengers = action.payload || []; // Ensure always an array
    },
    setPassengerUUID: (state, action) => {
      state.PassengerUUID = action.payload;
    },
    setPassengerData: (state, action) => {
      state.PassengerData = action.payload;
    },
    setLoading: (state, action) => {
      
      

      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.isLoading = action.payload;
    },
    setPassFormData: (state, action) => {
      state.PassFormData = action.payload;
    },
    setisLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    
    setIsFormLoading: (state) => {
      state.isFormLoading = false;
    },
    setPassengerFormError: (state, action) => {
      state.PassengerFormError = action.payload;
    },
    resetPassengerFlightState: () => ({ ...initialState }),
  },
});

export const NationalitData = () => (dispatch) => {
  api
    .get(API_ENDPOINTS.BOOKING.COUNTRIES)
    .then((response) => {
      dispatch(setCountries(response.data));
    })
    .catch(() => {});
};

export const PassengerForm = () => (dispatch, getState) => {
  const state = getState();
  // const offerIdGet = state?.getMessages.topOfferUrl;
  const offerIdSend = state?.sendMessage?.allOfferUUIDSend;
  const allOfferId = offerIdSend 
  // || offerIdGet;
  const Passtype = getState();
  
  const threadUuid = state?.sendMessage?.threadUuid;

  if (!allOfferId) return;

  const CartDetails = state?.booking?.getCartDetail?.items;
  
  const bookingSetupUrl = `/api/v1/setup/flight/${allOfferId}/order/thread/${threadUuid}`;
  console.log("bookingSetupUrl_00", bookingSetupUrl);
  
  dispatch(setisLoading(true))
  dispatch(
    setMessage({ ai: { passengerFlowRes: { status: false, isloading: true } } }) 
    // loading and status set in chat for pasenger flow
  );
  api.post(bookingSetupUrl)
    .then((response) => {
      console.log("pass_response", response);
      const OrderUUId = response?.data?.order_uuid || null;
      dispatch(setOrderUuid(OrderUUId));
      dispatch(setGenericOrderUuid(response.data.generic_order_uuid))

      
      
      
      // // dispatch(setIsPassengerflow(true))
      dispatch(
        setMessage({ ai: { passengerFlowRes: { status: true, isloading: false } } })
        // loading and status set in chat for pasenger flow
      )
      if (OrderUUId) {
        dispatch(ViewPassengers());
      }
    })
    .catch((error) => {
      console.error("error_passenger", error);
    }).finally (()=> {
        dispatch(
          setMessage({ ai: { passengerFlowRes: { status: true, isloading: false } } })
          // loading and status set in chat for pasenger flow
        )
    });
};

export const ViewPassengers = () => (dispatch, getState) => {
  
  const state = getState();
  const orderUuid = state.passengerFlight?.OrderUuid;
  console.log("orderUuid", orderUuid);
  

  if (!orderUuid) return;
  const viewPassengerUrl = `/api/v1/order/${orderUuid}/passengers`;
  dispatch(setLoading(true))
  api
    .get(viewPassengerUrl)
    .then((response) => {
      dispatch(setViewPassengers(response?.data || []));
      dispatch(setisLoading(false))
    })
    .catch((error) => {
      console.error("fetchViewPassengers error", error);
    });
};


export const PassengerFormFlight = (params) => async (dispatch, getState) => {  
  
  dispatch(setIsFormLoading(true));
  
  const state = getState();
  // ///////////////
  // const GetViewPassengers = state?.passengerDrawer?.ViewPassengers;
  
  const filledPassengerUUIDs = state.passengerFlight.filledPassengerUUIDs;
  console.log("filledPassengerUUIDs", filledPassengerUUIDs);

  console.log("state_00", state);
  
  
  
  
  
  
  
  // if (filledPassengerUUIDs.length === GetViewPassengers.length) {
  //   dispatch(setAllPassengerFill(true));
  // }
  // //////////////
  const orderUuid = state.passengerFlight?.OrderUuid;
  const passengerUuid = state.passengerFlight?.SelectPassenger?.uuid;
  
  
  
  const SubmitUrl = `/api/v1/order/${orderUuid}/passenger/${passengerUuid}`;
  console.log("SubmitUrl", SubmitUrl);
  
  
  
  

  api
    .post(SubmitUrl, params)
    .then((formResponse) => {

      const formData = formResponse.data;

      console.log("formResponse", formResponse);
      
      dispatch(setPassFormData(formData));
      dispatch(markPassengerAsFilled(passengerUuid));

      
      dispatch(setSelectPassProfile(null));
      

      
      
      const allPassengers = state.passengerFlight?.ViewPassengers || [];
      const filledPassengerUuids =
        state.passengerFlight?.filledPassengerUUIDs || [];

      const nextPassenger = allPassengers.find(
        (p) => !filledPassengerUuids.includes(p.uuid)
        
      );

      if (nextPassenger) {
        dispatch(setPassengerUUID(nextPassenger.uuid));
      }

      setTimeout(() => {
        dispatch(ViewPassengers());
        // dispatch(getPassPofile())
      }, 1000);
      dispatch(setisPassengerDrawer(false));
      
    })
    .catch((error) => {
      const responseErrors = error.response?.data;
      dispatch(setPassengerFormError(responseErrors));
      
      
    })
    .finally(() => {
      
      dispatch(setIsFormLoading(false));
    });
};

export const passengerCaptain = (params) => (dispatch, getState) => {  
  
  const state = getState();
  const captainParams = state.passengerFlight?.captainParams;
  const orderUuid = state.passengerFlight?.OrderUuid;
  const getFillPass = state.passengerFlight.allPassengerFill;
  const addNewPassactive = state.passengerFlight.addNewPassactive;
  
  
  
  
  
  if (getFillPass || addNewPassactive) {
    const getParams = {
      email: captainParams.email,
      phone_number: captainParams.phone_number,
      region: captainParams.region,
    };
    
    
    setTimeout(() => {
      api
        .post(`/api/v1/order/${orderUuid}/captain`, captainParams)
        .then((cap_res) => {
          console.log("cap_res_00", cap_res);
          
          dispatch(fetchOrderDetail()); // for order detail API call
          dispatch(setAddNewPassactive(false));
          dispatch(setIsCartSuccess(false));
        })
        .catch((err) => {
          console.error("captain_api_error", err?.message);
          dispatch(setError(err?.message))
        });
    }, 3000);
  }
  
};


export const getPassPofile = () => (dispatch, getState) => {
  api
    .get(`/api/v1/user/passenger/profiles`)
    .then((profile_res) => {
      
      
      dispatch(ViewPassengers());
      dispatch(setPassProfile(profile_res.data))
    })
    .catch((error) => {
      console.error(error);
    });
};

export const PassengerProfileDrawer = ()=> ()=> {
  

}



export const {
  setLoading,
  setError,
  bookFlight,
  setCountries,
  setOfferId,
  setOrderUuid,
  setViewPassengers,
  setPassengerUUID,
  setPassengerData,
  setPassFormData,
  setisLoading,
  markPassengerAsFilled,
  setPassengerFormError,
  setIsFormLoading,
  setCaptainSuccess,
  setFormSuccess,
  setPassengerType,
  setPassengerAge,
  setPassProfile,
  setAllPassengerFill,
  setCaptainParams,
  setPassProfileDrawer,
  setSelectedProfilePass,
  setPassengerIndex,
  setPassengerPassport,
  setSelectPassenger,
  setIsPassengerflow,
  setisPassengerLoading,
  setSeeDetailButton,
  setisPassengerDrawer,
  setGenericOrderUuid,
  resetPassengerFlightState,
  setFilledPass,
  setSelectPassProfile,
  setUnSelectPassProfile,
  setAddFilledPassenger,
  setAddNewPassactive
} = passengerFlightSlice.actions;

export default passengerFlightSlice.reducer;
