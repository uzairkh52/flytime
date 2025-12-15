// src/utils/isTokenExpired.ts

import { jwtDecode } from "jwt-decode";


interface JwtPayload {
  exp: number;
}

export const isTokenExpired = (token: string): boolean => {
  if (!token) return true;

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    if (!decoded.exp) return true;
    return Date.now() >= decoded.exp * 1000;
  } catch (error) {
    console.log("JWT decode failed", error);
    return true;
  }
};
