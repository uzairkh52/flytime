import { StyleSheet } from "react-native";
import { variable } from "./variable";

export const styles = StyleSheet.create({
  Header: {
    paddingVertical: 20
  },
  Body: {
    backgroundColor:variable.white,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30, // if you want top-left too
    overflow:"hidden",
    
    paddingVertical:40,
  },
  
  error: {
    color: "red",
    marginBottom: 8,
    fontSize: 13,
  },
  
});
