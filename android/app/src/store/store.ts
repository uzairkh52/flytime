import { configureStore } from '@reduxjs/toolkit';
import baseReducer from './slices/baseSlice';
import signupbaseReducer from './slices/signupSlice';
import loginReducer from './slices/loginSlice';
import sendMessageReducer from './slices/sendMessageSlice';
import bookingflightsReducer from "./slices/BookingflightSlice";
import passengerFlightReducer from "./slices/passengerFlightSlice";
import baggageReducer from "./slices/baggageSlice";
import paymentReducer from "./slices/PaymentSlice";




export const store = configureStore({
  reducer: {
    base: baseReducer,
    signup: signupbaseReducer,
    login: loginReducer,
    sendMessage :sendMessageReducer,
    booking: bookingflightsReducer,
    passengerFlight : passengerFlightReducer,
    baggage : baggageReducer,
    payment : paymentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
