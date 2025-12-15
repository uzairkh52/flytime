// assets/styles/theme.js

import { FONT_WEIGHT_MAPPINGS } from "react-native-reanimated/lib/typescript/common";
import { variable } from "../../variable";
import { StyleSheet } from "react-native";


export const homeStyle = StyleSheet.create({
    BsendBtn:  {
        borderRadius:100,
        width:32,
        height:32,
        position:"absolute",
        bottom:15,
        right:15,
    },
    arrow: {
        fontSize:15,
    },
    main: {
        flex: 1,
    },
    Header: {
        paddingTop:0,
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

    // discover
    card: {
        width: "100%",         // fixed width
        height: 116,        // fixed height
        borderRadius: 15,   // card radius
        overflow: "hidden", // must be hidden for radius to work
        borderWidth: 1,
        borderColor: "rgba(221, 221, 221, 0)",
        backgroundColor:"#fff",
        position:"relative",
        

    },

    // IMAGE INSIDE CARD
    circle: {
        width: "100%",
        height: 120,
        
        
    },
    cardText: {
        position:"absolute",
        bottom:0,
        zIndex:2,
        paddingHorizontal:15,
    }



});

