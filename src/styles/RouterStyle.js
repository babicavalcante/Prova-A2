import { StyleSheet } from "react-native";
import { Global } from "./Global";

const RouterStyle = StyleSheet.create({
    headerStyle: {
        backgroundColor: Global.mainColor,
        borderBottomWidth: 2,
        borderBottomColor: Global.secondaryColor
    },

    headerStyleScreen: {
        backgroundColor: Global.mainColor
    },  

    headerTitleStyle: {
        color: Global.secondaryColor,
        fontSize: 25
    }
})

export { RouterStyle }