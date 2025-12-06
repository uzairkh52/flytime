// assets/styles/theme.js

import { variable } from "../../variable";


export const mainStyle = {
  basecolor: { color: variable.basecolor },
  Basecolor1: { color: variable.basecolor1 },
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
  blackText: { color: variable.black },
  whiteText: { color: variable.white },
  red: { color: variable.red },
  blue: { color: variable.blue },
  cyan: { color: variable.cyan },
  container: {
    paddingHorizontal: 15,
  },
  
 hr: {
    borderBottomColor: variable.lightgray1, // line color
    borderBottomWidth: 1,       // line thickness
    marginVertical: 10,         // space above and below
  },
font: {
  // Font Families
  regular: { fontFamily: variable.font.regular },
  medium: { fontFamily: variable.font.medium },
  bold: { fontFamily: variable.font.bold },

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
  h1: {
    fontFamily: variable.font.bold,
    fontSize: variable.font.size30,
  },
  h2: {
    fontFamily: variable.font.bold,
    fontSize: variable.font.size20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    
  },
  h3: {
    fontFamily: variable.font.medium,
    fontSize: variable.font.size20,
  },
  h4: {
    fontFamily: variable.font.medium,
    fontSize: variable.font.size18,
  },
  h5: {
    fontFamily: variable.font.regular,
    fontSize: variable.font.size16,
  },
  h6: {
    fontFamily: variable.font.regular,
    fontSize: variable.font.size14,
  },
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

  Row: { borderWidth: 1 },
  w100: { width: "100%" },

  // Buttons
  BtnSeeDetail: {
    color: variable.basecolor1,
    alignItems:"center",
    flexDirection:"column",

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
    paddingVertical: 9,
    paddingHorizontal: 40,
    fontSize: 12,
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
    paddingVertical: 12,
    paddingHorizontal: 36,
    
    fontSize: 16,
    fontWeight: "700",
  },

  // Button Colors
  BtnPrimary: {
    borderRadius:200,
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
  },

  BtnRound: {
    borderRadius: 100,
  },

  BtnDisabled: {
    backgroundColor: "#ccc",
    color: "#777",
    opacity: 0.7,
    // pointerEvent:"disabled,"
  },

  BtnText: {
    fontWeight: "600",
    fontSize: 14,
    textAlign: "center",
  },

  mixins: variable.mixins,
};
