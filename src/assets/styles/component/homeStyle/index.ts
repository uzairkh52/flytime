// assets/styles/theme.js

import { FONT_WEIGHT_MAPPINGS } from "react-native-reanimated/lib/typescript/common";
import { variable } from "../../variable";
import { StyleSheet } from "react-native";


export const homeStyle = StyleSheet.create({
    main: {
        flex: 1,
    },
    Header: {
        paddingTop:80,
        paddingBottom: 24,
    },
    Body: {
        
    },
    formGroup: {
        position:"relative",
    },
    label: {
        position:"absolute",
        zIndex:1,
        padding:15,
    },
    formControl: {
        color:variable.white,
        textAlignVertical:"top",
        padding: 15,
        height: 154,
        backgroundColor: "#585858",
        borderWidth:1,
        borderColor:"#DDDDDD",
        borderRadius: 20,
        alignItems:"flex-start",
        justifyContent:"flex-start",
    },



});

