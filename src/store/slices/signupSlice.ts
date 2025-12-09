import { createSlice } from "@reduxjs/toolkit";
import api from "../config/api";
import { API_ENDPOINTS } from "../config/apiEndpoints";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser } from "./loginSlice";

const initialState = {
  SignupUser: null,
  isLoading: false,
  error: null,

  firstNameError: "",
  lastNameError: "",
  emailError: "",
  passwordError: "",

  SignupPopup: false,
  registerPopup: false,
  UserPopup: false,
};

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    setUserPopup: (state, action) => {
      state.UserPopup = action.payload;
    },

    setRegisterPopup: (state, action) => {
      state.registerPopup = action.payload;
    },

    setSignupPopup: (state, action) => {
      state.SignupPopup = action.payload;
    },

    setIsSignupUser: (state, action) => {
      state.SignupUser = action.payload;

      // clear all errors
      state.firstNameError = "";
      state.lastNameError = "";
      state.emailError = "";
      state.passwordError = "";
    },

    setFirstNameError: (state, action) => {
      state.firstNameError = action.payload;
    },
    setLastNameError: (state, action) => {
      state.lastNameError = action.payload;
    },
    setEmailError: (state, action) => {
      state.emailError = action.payload;
    },
    setPasswordError: (state, action) => {
      state.passwordError = action.payload;
    },

    logoutUser: (state) => {
      state.user = null;

      // Remove tokens from AsyncStorage
      AsyncStorage.removeItem("set-user");
      AsyncStorage.removeItem("access_token");
      AsyncStorage.removeItem("refresh_token");
    },

    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

// 🚀 THUNK – Signup + Auto Login
export const SignUpUser = (params: any) => async (dispatch) => {
   
   try {
      dispatch(setIsLoading(true));
      
      const res = await api.post(API_ENDPOINTS.AUTH.SIGNUP, params);
      
      console.log("ress_params_00", res);
    if (res.status === 201) {
      // save user to phone storage
      await AsyncStorage.setItem(
        "set-user",
        JSON.stringify({
          email: params.email,
          password: params.password,
          first_name: params.first_name,
          last_name: params.last_name,
        })
      );

      dispatch(setSignupPopup(false));

      // Auto Login
      setTimeout(() => {
        dispatch(loginUser({ username: params.email, password: params.password }));
      }, 500);
    }
  } catch (error) {
    const errors = error?.response?.data?.errors || {};

    dispatch(setFirstNameError(errors.first_name?.[0] || ""));
    dispatch(setLastNameError(errors.last_name?.[0] || ""));
    dispatch(setEmailError(errors.email?.[0] || ""));
    dispatch(setPasswordError(errors.password?.[0] || ""));
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const {
  setIsSignupUser,
  setFirstNameError,
  setLastNameError,
  setEmailError,
  setPasswordError,
  logoutUser,
  setIsLoading,
  setSignupPopup,
  setRegisterPopup,
  setUserPopup,
} = signupSlice.actions;

export default signupSlice.reducer;
