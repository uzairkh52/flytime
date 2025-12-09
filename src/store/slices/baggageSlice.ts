import { createSlice } from "@reduxjs/toolkit";
import api from "../config/api";

// import { fetchOrderDetail, OrderConfirm } from "./PaymentSlice";

const initialState = {
  flightDetail: null,
  setLoading: null,
  setError: null,
  selectedFlightId: null,
  
  setSelectFlightKey: null,
  OpenDrawer: false,
  CloseDrawer: false,
  BookingSetupUrl: null,
  selectedFlightKey: null, //Store selected flight key
  BaggageDrawer: false,
  baggageOptions: {}, // ← add this line
  selectedBaggage: [], // add in initialState
  baggageError: null,
  addSelectedBaggage: null,
  baggageAddData: null,
  SegmentId: null,
};
// for selectflightDetail button
const baggageSlice = createSlice({
  name: "Baggage",
  initialState,

  reducers: {
    setSegmentId: (state, action)=> {
      state.SegmentId = action.payload
    },
    setbaggageAddData: (state, action)=> {
      state.baggageAddData = action.payload
    },
    setBaggageError: (state, action)=> {
      state.baggageError = action.payload;
    },
    setAddSelectedBaggage: (state, action) => {
      
      state.addSelectedBaggage = action.payload
      
    },
    setBaggageOptions: (state, action) => {
      
      
      state.baggageOptions = action.payload;

      // If you want to extract a specific uuid (like the first one):
      const firstOption = action.payload?.[0];
      if (firstOption?.uuid) {
        state.baggageUuid = firstOption.uuid; // ← Save the uuid in state
      }
    },
    setBaggageDrawer:(state, action)=> {
      state.BaggageDrawer = action.payload;
      
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.isLoading = action.payload;
    },
   //  setOpenDrawer: (state, action) => {
   //    state.setSelectFlightKey = action.payload;
   //  },
    //  select booking end
    //  start booking get flight and pass detaiul
    setCloseDrawer: (state, action) => {
      state.setSelectFlightKey = action.payload;
    },
    resetBaggageState: () => ({ ...initialState }),
    
  },
});



// booking flo

export const baggageSetup = () => (dispatch, getState) => {
  // {{BASE_URL}}/api/v1/passenger/order/f04e7c0d-3546-40f4-8140-cfbf13d98f99/baggage-options
  // const getPassenger =  `${/api/v1/passenger/order/f04e7c0d-3546-40f4-8140-cfbf13d98f99/baggage-options}`
  const state = getState();

  const orderUuid = state.passengerFlight?.OrderUuid;
  console.log("baggae_orderUuid", orderUuid);
  
  

  const url = `/api/v1/passenger/order/${orderUuid}/baggage-options`;
  api.get(url).then((res) => {
    dispatch(setBaggageOptions(res?.data)); // dispatch to store the baggage options
    console.log("baggae_response", res?.data);


    // {{BASE_URL}}/api/v1/passenger/baggage/7c26a8e9-68a7-4070-89fe-bf8537ea9238/add
  }).catch((err)=> {
    console.log("baggageError", err);
    
  }).finally(()=> {
    console.log("success");
    
  });

  // Extract only the UUID from the URL
};
// for add baggage
export const addBaggage = (uuid) => (dispatch, getState) => {
  const state = getState();
  const selectedBaggagesUUID = state?.bagage?.addSelectedBaggage;

  const addUrl = `/api/v1/passenger/baggage/${uuid}/add`;
  
  api
    .post(addUrl)
    .then((res) => {
      console.log("addbaggage_res", res);
      
      
      dispatch(setbaggageAddData(res.data));
      dispatch(baggage());
      
      dispatch(fetchOrderDetail()); // for order detail API call
    })
    .catch((error) => {
      
      dispatch(setbaggageAddData(error.response.data));
    });
};
// for add baggage
export const removeBaggage = (uuid) => (dispatch, getState) => {
  const state = getState();
  const selectedBaggagesUUID = state?.bagage?.addSelectedBaggage;
  

  const removeUrl = `/api/v1/passenger/baggage/${uuid}/remove`;
  

  api
    .post(removeUrl)
    .then((res) => {
      console.log("removebaggage_res", res);

      
      dispatch(setbaggageAddData(res.data)); // Update store with new baggage state
      
      dispatch(baggage());
      dispatch(fetchOrderDetail()); // for order detail API call
    })
    .catch((error) => {
      
      dispatch(setbaggageAddData(error.response?.data || { detail: "Error removing baggage" }));
    });
};


export const {
  setLoading,
  setError,
  setSelectFlightKey,
  setCloseDrawer,
  setOpenDrawer,
  setBaggageDrawer, // for baggae drawer
  setBaggageOptions,
  setAddSelectedBaggage,
  setBaggageError,
  setbaggageAddData,
  setSegmentId,
  resetBaggageState,
} = baggageSlice.actions; //action exporting here
export default baggageSlice.reducer;
