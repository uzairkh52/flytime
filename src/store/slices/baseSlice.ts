import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../config/api';
import { Alert } from 'react-native';

interface BaseState {
  value: number;
  currentUser: any;
  isloading: any;
  TripData: any;
  TripDetailData: any;
}

const initialState: BaseState = {
  value: 0,
  currentUser: null,
  inputLabelTexts: [
    "Where do you want to go today?",
    "Explore one destination at a time.",
    "Adventure is waiting for you!",
  ],

  inputValue: "",
  isloading: false,
  TripDetailData: null,
};

export const baseSlice = createSlice({
  name: 'base',
  initialState,
  reducers: {
    setTripDetailData: (state, action) => {
      state.TripDetailData = action.payload;
    },
    setTripData: (state, action) => {
      state.TripData = action.payload;
    },
    seIsloading: (state, action) => {
      state.isloading = action.payload;
    },
    increment: (state) => {
      state.value += 1;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
      setInputValue: (state, action) => {
      state.inputValue = action.payload;
    },
    clearInputValue: (state) => {
      state.inputValue = "";
    },
    setInputLabelTexts: (state, action) => {
      state.inputLabelTexts = action.payload;
    },
  },
});

// my trips

export const MyTrip = () => async (dispatch: any) => {
  dispatch(seIsloading(true));

  try {
    const res = await api.get("/api/v1/my/trips"); // ✅ match Django

    console.log("mytrip_res", res);
    
    dispatch(setTripData(res.data));
  } catch (error: any) {
    console.log("myTripError", error.response?.status, error.response?.data);
    Alert.alert("Error", "Failed to load trips");
  } finally {
    dispatch(seIsloading(false));
  }
};

// baseSlice.js or wherever you define your thunks
export const TripDetail = (uuid) => (dispatch, getState) => {
  dispatch(seIsloading(true));

  api
    .get(`api/v1/my/trip/${uuid}/details`)
    .then((res) => {
      dispatch(setTripDetailData(res.data));
      
    })
    .catch((error) => {
      console.log("Trip detail fetch error:", error);
    })
    .finally(() => {
      dispatch(seIsloading(false));
    });
};

export const {setTripData, setTripDetailData, seIsloading, clearInputValue, setInputValue, increment, decrement, incrementByAmount } = baseSlice.actions;
export default baseSlice.reducer;
