import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "./config"; //

import { isTokenExpired } from "../../utils/isTokenExpired";
import { Logout } from "../slices/loginSlice";
import { store } from "../store";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });

  failedQueue = [];
};

// ----------------------- REQUEST INTERCEPTOR -----------------------
api.interceptors.request.use(async (config) => {
  const accessToken = await AsyncStorage.getItem("access_token");
  const refreshToken = await AsyncStorage.getItem("refresh_token");

  // Access token valid → set Authorization header
  if (accessToken && !isTokenExpired(accessToken)) {
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  }

  // Access token expired → refresh process
  if (accessToken && isTokenExpired(accessToken)) {
    if (!refreshToken) {
      await AsyncStorage.multiRemove(["access_token", "refresh_token"]);
      store.dispatch(Logout());
      return Promise.reject("No refresh token found");
    }

    if (!isRefreshing) {
      isRefreshing = true;

      try {
        const response = await axios.post(
          `${BASE_URL}/v1/refresh/`,
          { refresh: refreshToken }
        );

        const newAccessToken = response.data.access;
        const newRefreshToken = response.data.refresh;

        await AsyncStorage.setItem("access_token", newAccessToken);
        if (newRefreshToken)
          await AsyncStorage.setItem("refresh_token", newRefreshToken);

        isRefreshing = false;
        processQueue(null, newAccessToken);

        config.headers.Authorization = `Bearer ${newAccessToken}`;
        return config;

      } catch (error) {
        await AsyncStorage.multiRemove(["access_token", "refresh_token"]);

        isRefreshing = false;
        processQueue(error, null);

        store.dispatch(Logout());
        return Promise.reject(error);
      }
    }

    // Queue requests during refresh
    return new Promise((resolve, reject) => {
      failedQueue.push({
        resolve: (token: string) => {
          config.headers.Authorization = `Bearer ${token}`;
          resolve(config);
        },
        reject,
      });
    });
  }

  return config;
});

// ----------------------- RESPONSE INTERCEPTOR -----------------------
api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default api;
