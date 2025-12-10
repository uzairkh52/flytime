import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../config/api";
import { API_ENDPOINTS } from "../config/apiEndpoints";

import { setIsSignupUser, setRegisterPopup } from "./signupSlice";
import { Alert } from "react-native";

interface LoginState {
  loginUser: any;
  isLoading: boolean;
  LoginError: any;
  LoginPopup: boolean;
  LoginCloseDrawer: boolean;
  IsUser: any;
  loginState: boolean;
  emailError : any,
  passwordError: any;
  LogoutUser: any;
}

const initialState: LoginState = {
  loginUser: null,
  isLoading: false,
  LoginError: null,
  LoginPopup: false,
  LoginCloseDrawer: false,
  IsUser: null,
  loginState: false,
  emailError : null,
  passwordError: null,
  LogoutUser: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setPasswordError: (state, action)=> {
      state.passwordError = action.payload
    },
    setLoginState: (state, action) => {
      state.loginState = action.payload;
    },
    setIsUser: (state, action) => {
      state.IsUser = action.payload;
    },
    setLoginUser: (state, action) => {
      state.loginUser = action.payload;
      state.LoginError = null;
    },
    setLoginError: (state, action) => {
      state.LoginError = action.payload;
    },
    setLogoutUser: (state) => {
      state.loginUser = null;
      state.IsUser = null;
      state.LogoutUser = null;
    },
    setEmailError: (state, action)=> {
      state.emailError = action.payload
    },
    setisLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setLoginPopup: (state, action) => {
      state.LoginPopup = action.payload;
    },
    setLoginCloseDrawer: (state) => {
      state.LoginPopup = false;
    },
  },
});

export const loginUser = (params: any) => async (dispatch: any) => {
  dispatch(setisLoading(true));
  
  console.log("login_111", API_ENDPOINTS.AUTH.LOGIN);
  
  try {
    const res = await api.post(API_ENDPOINTS.AUTH.LOGIN, params);
    console.log("login_00", res);

    if (res.status === 200) {
      dispatch(
        setLoginUser({ user: res.data, status: res.status })
      );
      dispatch(setLoginPopup(false));
      dispatch(setLoginState(true));
      // dispatch(setMobileNaveDrawer(false));

      const { username, first_name, last_name, access, refresh } = res.data;

      // Store info in AsyncStorage
      await AsyncStorage.setItem(
        "set-user",
        JSON.stringify({ email: username, first_name, last_name })
      );
      await AsyncStorage.setItem("access_token", access);
      await AsyncStorage.setItem("refresh_token", refresh);
    }
  } catch (error: any) {
    const LoginError = {
      email: error?.response?.data?.username?.[0] ?? "",
      password: error?.response?.data?.password?.[0] ?? "",
      other: error?.response?.data?.detail ?? "Login failed",
    };
    console.log("login_error:", LoginError);
    dispatch(setLoginError(LoginError));
  } finally {
    dispatch(setisLoading(false));
  }
};

// Logout
export const Logout = () => async (dispatch: any) => {
  try {
    const refreshToken = await AsyncStorage.getItem("refresh_token");
    console.log("refreshToken", refreshToken);
    
    if (refreshToken) {
      const res = await api.post("/api/v1/logout/", { refresh: refreshToken });
      console.log("logout_res", res);
    }
  } catch (err) {
    console.error("Logout failed:", err);
  } finally {
    console.log("logout_res_finally");
    dispatch(setLogoutUser());
    // dispatch(setCurrentUser(null));
    dispatch(setIsSignupUser(null));
    dispatch(setLoginState(false));
    // dispatch(setMobileNaveDrawer(false));
    await AsyncStorage.multiRemove([
      "access_token",
      "refresh_token",
      "set-user",
    ]);
  }
};

// Example: Google login
export const googleLoginUser = (code: string) => async (dispatch: any) => {
  dispatch(setisLoading(true));
  try {
    const res = await api.post("/api/auth/google/", { code });

    if (res.status === 200) {
      const { user, access, refresh } = res.data;

      dispatch(setLoginUser({ user: res.data, status: res.status }));
      dispatch(setLoginState(true));
      // dispatch(setMobileNaveDrawer(false));
      dispatch(setRegisterPopup(false));

      await AsyncStorage.setItem(
        "set-user",
        JSON.stringify({
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
        })
      );
      await AsyncStorage.setItem("access_token", access);
      await AsyncStorage.setItem("refresh_token", refresh);
    }
  } catch (error: any) {
    dispatch(
      setLoginError({
        other: error?.response?.data?.detail || "Google login failed",
      })
    );
  } finally {
    dispatch(setisLoading(false));
  }
};

export const {
  setLoginPopup,
  setLoginCloseDrawer,
  setLoginUser,
  setLogoutUser,
  setLoginError,
  setisLoading,
  setIsUser,
  setLoginState,
  setEmailError,
  setPasswordError
} = loginSlice.actions;

export default loginSlice.reducer;
