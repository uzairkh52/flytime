import { createSlice } from "@reduxjs/toolkit";
import {
  setOrderUuid,
  setViewPassengers
} from "./passengerDrawerSlice";

import {
  sendMessage,
  setMessage,
  setSystemMessage
} from "./sendMessageSlice";

import {
  setChatscroll,
  setIsBuilderDialog
} from "./Base/baseSlice";

import {
  setRoomDrawer,
  setSelectedhotelCode,
  setSelectedhotelKey
} from "./HotelSlice";
import api from "../config/api";

const initialState = {
  flightDetail: null,
  isLoading: false,
  isLoadingSelect: false,
//   setError: null,
  selectedFlightId: null,
  selectedFlight: null,

//   // booking
  selectOfferKey: null,
  selectedFlightKey: null,
  offerkeyforDetail: null,

//   // UI states
  isPanelOpen: false,
//   hotelDrawer: false,
//   BaggageDrawer: false,

//   // baggage
//   baggageOptions: {},
//   selectedBaggage: [],
//   baggageError: null,

//   // data
  singleFlightData: null,
  addCart: null,
//   getListCart: null,
  getCartDetail: null,

//   // flags
  cartError: false,
//   cartErrorDialog: false,
  isCartSuccess: false,
    cartTotalPrice: null,
  cartType: null,
//   flightUnavailable: false,
};

const bookingflightsSlice = createSlice({
  name: "Booking",
  initialState,
  reducers: {
    setIsCartSuccess: (state, action) => {
      state.isCartSuccess = action.payload;
    },
    setSelectOfferKey: (state, action) => {
      console.log("setSelectOfferKey_action", action);
      
      state.selectOfferKey = action.payload;
    },
    setCartTotalPrice: (state, action) => {
      state.cartTotalPrice = action.payload;
    },
   //  setFlightUnavailable: (state, action) => {
   //    state.flightUnavailable = action.payload;
   //  },
    setSelectedFlight: (state, action) => {
      state.selectedFlight = action.payload;
    },
    setCartErrorDialog: (state, action) => {
      state.cartErrorDialog = action.payload;
    },
    setCartError: (state, action) => {
      state.cartError = action.payload;
    },
   //  setHotelDrawer: (state, action) => {
   //    state.hotelDrawer = action.payload;
   //  },

    setIsLoadingSelect: (state, action) => {
      state.isLoadingSelect = action.payload;
    },
    setisPanelOpen: (state, action) => {
      state.isPanelOpen = action.payload;
    },

   //  setGetListCart: (state, action) => {
   //    state.getListCart = action.payload;
   //  },
    setGetCartDetail: (state, action) => {
      state.getCartDetail = action.payload;
    },

    setAddCart: (state, action) => {
      state.addCart = action.payload;
    },

    setOfferkeyforDetail: (state, action) => {
      state.offerkeyforDetail = action.payload;
    },

    setSingleFlightData: (state, action) => {
      state.singleFlightData = action.payload;
    },

    setSelectedFlightKey: (state, action) => {
      state.selectedFlightKey = action.payload;
    },

    setflightDetail: (state, action) => {
      state.flightDetail = action.payload;
      state.selectedFlightId = action?.payload?.id;
    },

    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setCartType:(state, action) => {
      state.cartType = action.payload;
    },
    resetBookingState: () => ({ ...initialState }),
  },
});

// export const fetchflightDetail = (flightId) => (dispatch) => {
//   dispatch(setLoading(true));

//   api
//     .get(`/api/v1/search/single/result/${flightId}`)
//     .then((res) => {
//       dispatch(setflightDetail(res.data));
//     })
//     .finally(() => {
//       dispatch(setLoading(false));
//     });
// };

// export const bookFlight = () => (dispatch, getState) => {
//   const FlightId = getState().booking.selectedFlightId;

//   dispatch(setLoading(true));

//   api
//     .get(`/api/v1/search/single/result/${FlightId}`)
//     .then((res) => dispatch(setSingleFlightData(res.data)))
//     .catch((err) => console.log(err))
//     .finally(() => dispatch(setLoading(false)));
// };

// // Add to Cart
export const AddToCart = (params: any) => async (dispatch, getState) => {
  dispatch(setSystemMessage(null));

  const uuid = getState()?.sendMessage?.threadUuid;
  const selectedOfferKey = getState()?.booking?.selectOfferKey;

  dispatch(setIsLoadingSelect(true));
  dispatch(setLoading(true));

  try {
    const res = await api.post(`/api/v1/cart/add`, params);

    dispatch(setAddCart(res.data));

    const systemMessage = res.data?.system_message;
    if (systemMessage) {
      dispatch(sendMessage(systemMessage));
    }

    dispatch(setflightDetail(res.data.raw_data));
    dispatch(CartDetail());
    dispatch(setIsCartSuccess(true));
    dispatch(setSelectedFlightKey(selectedOfferKey));
    
  } catch (error) {
    console.log("AddToCart_error", error?.response?.data?.error);

    const message = error?.response?.data?.error;
    if (message?.includes("Requested offer is no longer available")) {
      dispatch(setCartError(true));
      dispatch(setCartErrorDialog(true));
    }
  } finally {
    dispatch(setIsLoadingSelect(false));
    dispatch(setLoading(false));
  }
};

// // Cart Detail
export const CartDetail = () => async (dispatch, getState) => {
  console.log("cart_detail_res2");

  const uuid = getState()?.sendMessage?.threadUuid;

  dispatch(setLoading(true));

  try {
    const res = await api.get(`/api/v1/cart/${uuid}`);

    console.log("cart_detail_res", res);
    
    dispatch(setGetCartDetail(res.data));

    const items = res.data?.items || [];

    const hasFlight = items.some((x) => x.offer_type === "flight");
    const hasHotel = items.some((x) => x.offer_type === "hotel");

    dispatch(setIsCartSuccess(items.length > 0));

    
    if (hasFlight) dispatch(setCartType("flight"));
    else if (hasHotel) dispatch(setCartType("hotel"));
    else dispatch(setCartType(null));
  } catch (e) {
    console.log("CartDetail Error", e.message);
  } finally {
    dispatch(setLoading(false));
  }
};

// // Delete Cart Item
// export const DeleteCart = (threadUuid, itemUuid) => async (dispatch) => {
//   dispatch(setLoading(true));

//   try {
//     const res = await api.delete(
//       `api/v1/cart/${threadUuid}/items/${itemUuid}`
//     );

//     dispatch(setGetCartDetail(res.data));
//     dispatch(setIsCartSuccess(false));

//     dispatch(setSelectedhotelCode(null));
//     dispatch(setSelectedhotelKey(null));
//     dispatch(setSelectedFlightKey(null));
//     dispatch(setflightDetail(null));
//     dispatch(setViewPassengers([]));
//     dispatch(setOrderUuid(null));
//     dispatch(setMessage({ ai: { passengerFlowRes: false } }));
//     dispatch(setSingleFlightData(null));
//     dispatch(setOfferkeyforDetail(null));
//   } catch (error) {
//     console.log("DeleteCart error:", error.message);
//   } finally {
//     dispatch(setLoading(false));
//   }
// };

export const {
  setflightDetail,
  setSelectedFlight,
  setLoading,
  setSelectedFlightKey,
//   setError,
  setisPanelOpen,
  setGetCartDetail,
  setAddCart,
//   setGetListCart,
  setSingleFlightData,
  setOfferkeyforDetail,
//   setHotelDrawer,
  setCartError,
  setCartErrorDialog,
//   setFlightUnavailable,
  setCartType,
//   resetBookingState,
  setCartTotalPrice,
  setSelectOfferKey,
  setIsCartSuccess,
  setIsLoadingSelect
} = bookingflightsSlice.actions;

export default bookingflightsSlice.reducer;
