// src/utils/isTokenExpired.ts
export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(Buffer.from(payload, "base64").toString("utf8"));

    const currentTime = Math.floor(Date.now() / 1000);

    return decoded.exp < currentTime;
  } catch (e) {
    console.log("❌ JWT decode failed:", e);
    return true; // If anything fails → treat as expired
  }
};
