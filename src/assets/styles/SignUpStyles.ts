import { StyleSheet } from "react-native";
import { variable } from "./variable";

export const styles = StyleSheet.create({
  main: {
    flex:1,
  },
  Header: {
    paddingTop: 40,
    paddingBottom: 20,
  },
  Body: {
    borderWidth:3,
    backgroundColor:variable.white,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30, // if you want top-left too
    paddingVertical:40,
    height:"100%"
  },
  
  error: {
    color: "red",
    marginBottom: 8,
    fontSize: 13,
  },
  
});
