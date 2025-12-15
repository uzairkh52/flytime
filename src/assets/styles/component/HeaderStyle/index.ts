// assets/styles/theme.js

import { FONT_WEIGHT_MAPPINGS } from "react-native-reanimated/lib/typescript/common";
import { variable } from "../../variable";
import { StyleSheet } from "react-native";


export const headerStyle = StyleSheet.create({
    Thumbnail: {
        backgroundColor:variable.white,
        borderRadius:100,
        width:30,
        height:30,
    },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  userBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutBtn: {
    backgroundColor: "#f00",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  logoutText: {
    color: "#fff",
    fontSize: 14,
  },
  loginBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  userIcon: {
    width: 24,
    height: 24,
  },
  loginText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  
  



});


  