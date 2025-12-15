// src/api/api.ts
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "./config";
import { isTokenExpired } from "../../utils/isTokenExpired";
import { Logout } from "../slices/loginSlice";
import { store } from "../store";

const api = axios.create({
  baseURL: BASE_URL, // "https://demo.milesfactory.com"
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

const REFRESH_URL = "/api/v1/refresh/"; // ✅ fixed URL

api.interceptors.request.use(async (config: any) => {
  // Skip auth endpoints
  const skipUrls = ["/login/", "/logout/", REFRESH_URL];
  if (skipUrls.some((url) => config.url?.includes(url))) {
    return config;
  }

  const accessToken = await AsyncStorage.getItem("access_token");
  const refreshToken = await AsyncStorage.getItem("refresh_token");

  if (accessToken && !isTokenExpired(accessToken)) {
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  }

  if (accessToken && isTokenExpired(accessToken)) {
    if (!refreshToken) {
      await AsyncStorage.multiRemove(["access_token", "refresh_token"]);
      store.dispatch(Logout());
      return Promise.reject("No refresh token");
    }

    if (!isRefreshing) {
      isRefreshing = true;

      try {
        const res = await axios.post(`${BASE_URL}${REFRESH_URL}`, {
          refresh: refreshToken,
        });

        const newAccessToken = res.data.access;
        const newRefreshToken = res.data.refresh;

        await AsyncStorage.setItem("access_token", newAccessToken);
        if (newRefreshToken) {
          await AsyncStorage.setItem("refresh_token", newRefreshToken);
        }

        isRefreshing = false;
        processQueue(null, newAccessToken);

        config.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(config); // 🔥 retry original request

      } catch (error: any) {
        isRefreshing = false;
        processQueue(error, null);

        if (error?.response?.status === 401) {
          await AsyncStorage.multiRemove(["access_token", "refresh_token"]);
          store.dispatch(Logout());
        }

        return Promise.reject(error);
      }
    }

    return new Promise((resolve, reject) => {
      failedQueue.push({
        resolve: (token: string) => {
          config.headers.Authorization = `Bearer ${token}`;
          resolve(api(config)); // retry request after refresh
        },
        reject,
      });
    });
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default api;
