// assets/styles/theme.js

export const variable = {
  /* ============================================================
     COLORS  (Converted from SCSS)
  ============================================================ */

  // Primary color 1
  basecolor: "#69707B",
  homeInputButton: 32,

  basecolor1Light: "#F3FBF8",
  basecolor1Dark: "#D8F5F3",
  basecolor1Sky: "#B3EDEE",
  basecolor1Dark2: "#0B1729",
  basecolorDark: "#0B1729",
  basecolor1Blue: "#004AAD",
  basecolor1Light2: "#F2FCFC",
  basecolor1: "#00C4CC",
  basecolor150: "rgba(0, 196, 204, 0.6)",

  bc1Light: "#a49bb1",
  bc1Lighter: "#dfe8f4",
  bc1Lightest: "#ecf1f9",
  bc1Lightester: "#f3fcff",
  bc1Dark: "#483366",
  bc1Darker: "#2c1849",
  bc1Darkest: "#1e1230",

  // Primary color 2
  yellow: "#cdea1a",
  basecolor2: "#e7003f",
  bc2Light: "#69ce82",
  bc2Lighter: "#cdd7c9",
  bc2Lightest: "#f2f4e9",
  bc2Dark: "#334c22",
  bc2Darker: "#203412",
  bc2Darkest: "#142b04",

  // Primary color 3
  basecolor3: "#bad709",
  bc3Dark: "#888888",

  // Neutral colors
  bfColor: "#000000",
  hdColor: "#bad709",
  sbhdColor: "#00C4CC",

  link: "#00C4CC",
  linkHover: "#009499",

  gray: "#7E7F7F",
  black50: "rgba(0,0,0,0.5)",

  darkgray: "#0B1729",
  lightgray: "#F2F2F7",
  lightgray1: "#B3B3B3",
  lightgray2: "#D3D3D3",
  lightgray3: "#F0F5F5",
  lightgray4: "#EEEEEE",

  bluedark2: "#d9d9d9",
  bluelight: "#94a1a8",
  bluelighter: "#c0c8cd",
  bluelightest: "#ebeff2",
  bluedark: "#4c5960",
  bluedarker: "#2e373c",
  bluedarkest: "#0d1920",

  black: "#000",
  white: "#fff",
  lime: "#b0eb00",
  red: "#bf2d48",
  brightRed: "#e4294c",
  blue: "#005aff",
  darkBlue: "#0041b8",
  cyan: "#1fe9ec",
  darkCyan: "#00a6a9",
  
  secondaryFont: "Open Sans",
  /* ============================================================
     FONTS
  ============================================================ */
  font: {
    regular: "System",
    medium: "System",
    bold: "System",

    size10: 10,
    size12: 12,
    size14: 14,
    size16: 16,
    size18: 18,
    size20: 20,
    size24: 24,
    size30: 30,
  },
  

  /* ============================================================
     MIXINS  (SCSS Equivalent)
  ============================================================ */

  mixins: {
    padding: (v, h = v) => ({
      paddingVertical: v,
      paddingHorizontal: h,
    }),

    margin: (v, h = v) => ({
      marginVertical: v,
      marginHorizontal: h,
    }),

    radius: (r) => ({
      borderRadius: r,
    }),

    size: (w, h = w) => ({
      width: w,
      height: h,
    }),

    shadow: {
      elevation: 5,
      shadowColor: "#000",
      shadowOpacity: 0.15,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 2 },
    },

    flexRow: {
      flexDirection: "row",
    },

    flexCol: {
      flexDirection: "column",
    },

    center: {
      justifyContent: "center",
      alignItems: "center",
    },
  },
};
