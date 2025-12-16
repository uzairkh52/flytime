import { StyleSheet } from "react-native";
import { variable } from "../../variable";

export const ChatStyle = StyleSheet.create({
    main: {
        
        flex:1,
        backgroundColor:"#fff",
    },
    MessageBody: {
        backgroundColor:variable.white,
    },
    formGroup: {
            position:"relative",
        },
        label: {
            position:"absolute",
            zIndex:1,
            paddingHorizontal:20,
            paddingVertical:20,
        },
        formControl: {
            color:variable.white,
            textAlignVertical:"top",
            paddingHorizontal:20,
            paddingVertical:20,
            height: 70,
            backgroundColor: "#585858",
            borderWidth:1,
            borderColor:"#DDDDDD",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            alignItems:"flex-start",
            justifyContent:"flex-start",
        },
    
})