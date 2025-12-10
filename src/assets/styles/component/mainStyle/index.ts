// assets/styles/theme.js

import { FONT_WEIGHT_MAPPINGS } from "react-native-reanimated/lib/typescript/common";
import { variable } from "../../variable";
import { StyleSheet } from "react-native";


export const mainStyle = StyleSheet.create({
  basecolor: { color: variable.basecolor },
  Basecolor1: { color: variable.basecolor1 },
  Basecolor1Bg: { backgroundColor: variable.basecolor1 },
  basecolor1Light: { color: variable.basecolor1Light },
  basecolor1Dark: { color: variable.basecolor1Dark },
  basecolor1Sky: { color: variable.basecolor1Sky },
  basecolor1Dark2: { color: variable.basecolor1Dark2 },
  basecolorDark: { color: variable.basecolorDark },
  basecolor1Blue: { color: variable.basecolor1Blue },
  basecolor1Light2: { color: variable.basecolor1Light2 },
  basecolor150: { color: variable.basecolor150 },

  bc1Light: { color: variable.bc1Light },
  bc1Lighter: { color: variable.bc1Lighter },
  bc1Lightest: { color: variable.bc1Lightest },
  bc1Lightester: { color: variable.bc1Lightester },
  bc1Dark: { color: variable.bc1Dark },
  bc1Darker: { color: variable.bc1Darker },
  bc1Darkest: { color: variable.bc1Darkest },

  basecolor2: { color: variable.basecolor2 },
  basecolor3: { color: variable.basecolor3 },

  // Background colors
  whiteBg: { backgroundColor: variable.white },
  basecolor1LightBg: { backgroundColor: variable.basecolor1Light },
  basecolor1DarkBg: { backgroundColor: variable.basecolor1Dark },
  basecolor1SkyBg: { backgroundColor: variable.basecolor1Sky },
  basecolor1Dark2Bg: { backgroundColor: variable.basecolor1Dark2 },
  basecolorDarkBg: { backgroundColor: variable.basecolorDark },
  basecolor1BlueBg: { backgroundColor: variable.basecolor1Blue },
  basecolor1Light2Bg: { backgroundColor: variable.basecolor1Light2 },
  basecolor150Bg: { backgroundColor: variable.basecolor150 },

  bc1LightBg: { backgroundColor: variable.bc1Light },
  bc1LighterBg: { backgroundColor: variable.bc1Lighter },
  bc1LightestBg: { backgroundColor: variable.bc1Lightest },
  bc1LightesterBg: { backgroundColor: variable.bc1Lightester },
  bc1DarkBg: { backgroundColor: variable.bc1Dark },
  bc1DarkerBg: { backgroundColor: variable.bc1Darker },
  bc1DarkestBg: { backgroundColor: variable.bc1Darkest },

  basecolor2Bg: { backgroundColor: variable.basecolor2 },
  basecolor3Bg: { backgroundColor: variable.basecolor3 },

  // Other colors
  darkgray: { color: variable.darkgray },
  lightgray: { color: variable.lightgray },
  lightgrayBg: { backgroundColor: variable.lightgray },
  black: { color: variable.black },
  white: { color: variable.white },
  red: { color: variable.red },
  blue: { color: variable.blue },
  cyan: { color: variable.cyan },
  container: {
    paddingHorizontal: 15,
  },
  Capitalize: {
    textTransform:"capitalize",
  },

  hr: {
    borderBottomColor: variable.lightgray1, // line color
    borderBottomWidth: 1,       // line thickness
    marginVertical: 10,         // space above and below
  },
  center: {
    textAlign: 'center'
  },
  left: {
    textAlign: 'left'
  },
  right: {
    textAlign: 'right'
  },
  mb20: {
    marginBottom: 20,
  },
  mb10: {
    marginBottom: 10,
  },
  mb50: {
    marginBottom: 50,
  },

  // Font Families
  regular: { fontFamily: variable.font.regular },
  medium: { fontFamily: variable.font.medium },
  exbold: { fontWeight: "700", },

  // Base Sizes
  size10: { fontSize: variable.font.size10 },
  size12: { fontSize: variable.font.size12 },
  size14: { fontSize: variable.font.size14 },
  size16: { fontSize: variable.font.size16 },
  size18: { fontSize: variable.font.size18 },
  size20: { fontSize: variable.font.size20 },
  size24: { fontSize: variable.font.size24 },
  size30: { fontSize: variable.font.size30 },

  // Headings (h1–h6)
  p: {
    fontFamily: variable.font.regular,
    fontSize: variable.font.size16,
    lineHeight: 25,
  },
  h1: {
    fontWeight:variable.bold,
    fontSize: variable.font.size24,
  },
  h2: {
    fontWeight: variable.bold,
    fontFamily: variable.font.bold,
    fontSize: variable.font.size20,
    flexDirection: 'row',
    flexWrap: 'wrap',

  },
  h3: {
    fontWeight: variable.bold,
    fontFamily: variable.font.medium,
    fontSize: variable.font.size20,
  },
  h4: {
    fontWeight: variable.bold,
    fontFamily: variable.font.medium,
    fontSize: variable.font.size18,
  },
  h5: {
    fontWeight: variable.bold,
    fontFamily: variable.font.regular,
    fontSize: variable.font.size16,
  },
  h6: {
    fontWeight: variable.bold,
    fontFamily: variable.font.regular,
    fontSize: variable.font.size14,
  },


  paragraph: {
    lineHeight: 25,
    fontFamily: variable.secondaryFont,
    fontSize: 16,
  },

  // Flex utilities
  displayFlex: { flex: 1 },
  justifyContentCenter: { justifyContent: "center" },
  justifyContentStart: { justifyContent: "flex-start" },
  justifyContentEnd: { justifyContent: "flex-end" },
  justifyContentBetween: { justifyContent: "space-between" },

  alignItemsCenter: { alignItems: "center" },
  alignItemsStart: { alignItems: "flex-start" },
  alignItemsEnd: { alignItems: "flex-end" },

  flexRow: { flexDirection: "row" },
  flexColumn: { flexDirection: "column" },
  flex1: { flex: 1 },
  gap6: { gap: 6 },
  gap10: { gap: 10 },
  Row: { borderWidth: 1 },
  w100: { width: "100%" },

  // Buttons
  BtnSeeDetail: {
    color: variable.basecolor1,
    alignItems: "center",
    flexDirection: "column",

  },

  Btn: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 28,
    fontWeight: "500",
  },

  // Sizes

  BtnX: {
    paddingHorizontal: 40,
    fontSize: 12,
    height:50,
  },
  Btnsm: {
    paddingVertical: 6,
    paddingHorizontal: 20,
    fontSize: 12,
  },
  Btnmd: {
    paddingVertical: 10,
    paddingHorizontal: 28,

    fontSize: 14,
    fontWeight: "700",
  },
  Btnlg: {
    paddingVertical: 15,
    paddingHorizontal: 36,

    fontSize: 16,
    fontWeight: "700",
  },

  // Button Colors
  BtnPrimary: {
    borderRadius: 200,
    backgroundColor: variable.basecolor1,
    color: "#fff",
  },
  BtnSecondary: {
    backgroundColor: "#A6A6A6",
    color: "#fff",
  },
  green: {
    backgroundColor: "#32CD32",
    color: "#111",
  },
  gray: {
    backgroundColor: "#e0e0e0",
    color: "#333",
  },
  whiteBtn: {
    backgroundColor: "#fff",
    color: variable.basecolor1,
    borderWidth: 1,
    borderColor: "#E2ECEF",
  },
  black50: {
    color: 'rgba(0,0,0,0.5)',
  },
  blackBtn: {
    backgroundColor: "#333",
    color: "#fff",
  },

  Btnborder: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: variable.basecolor1,
    borderRadius: 200,
  },

  BtnRound: {
    borderRadius: 100,
  },

  BtnGray: {
    backgroundColor: "#ddd",
    color: "#777",
    opacity: 0.7,
    borderRadius: 200,
  },
  BtnDisabled: {
    backgroundColor: "#ccc",
    color: "#777",
    opacity: 0.7,
    borderRadius: 200,
    // pointerEvent:"disabled,"
  },

  BtnPrimaryText: {
    fontWeight: "500",
    fontSize: 18,
    textAlign: "center",
    color: variable.white
  },
  BtnBorderText: {
    fontWeight: "400",
    fontSize: 18,
    textAlign: "center",
    color: variable.basecolor1
  },
  py10 : {
    paddingVertical:10,
  },
  formGroup: {
    marginBottom:15,
  },
  formControl: {
  backgroundColor: "#fff",   // must be opaque
  padding: 12,
  borderRadius: 12,
  height: 50,
  paddingHorizontal: 20,

  borderWidth:1,
  borderColor:variable.lightgray2
},





});

