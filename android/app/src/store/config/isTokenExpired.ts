// ../../utils/isTokenExpired.ts
import { jwtDecode } from 'jwt-decode';

/**
 * Checks if a JWT is expired.
 * @param token The JWT string.
 * @returns True if the token is expired or invalid, false otherwise.
 */
export const isTokenExpired = (token: string): boolean => {
  if (!token) {
    return true;
  }
  try {
    // Decode the token payload
    const decodedToken = jwtDecode(token);
    
    // Get expiration time (exp) in seconds
    const expirationTime = decodedToken.exp;

    if (!expirationTime) {
        return true; // No expiration claim found
    }

    // Current time in seconds
    const currentTime = Date.now() / 1000;
    
    // Check if current time is past expiration time
    return currentTime > expirationTime;
    
  } catch (error) {
    // Log error but return true to prevent failed requests from being sent
    console.error("JWT decoding failed, forcing token expiration:", error);
    return true; 
  }
};