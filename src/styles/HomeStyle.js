import { StyleSheet } from "react-native";
import { Global } from "./Global";

const HomeStyle = StyleSheet.create({
    Accordion: {
        backgroundColor: Global.mainColor,
        paddingLeft: 0,
        borderBottomWidth: 2,
        borderBottomColor: Global.secondaryColor
    },

    AccordionTitle: {
        color: Global.secondaryColor,
        fontWeight: Global.weight,
        fontSize: 20,
        letterSpacing: 2
    },

    AccordionInterno: {
        // paddingLeft: Global.espacoPadrao, paddingRight: 10
        // paddingHorizontal: 10
    },

    tableHeader: {
        backgroundColor: Global.mainColor
    },

    TableInside: {
        color: Global.secondaryColor,
        // textAlign: 'center',
        fontWeight: Global.weight,
        letterSpacing: 2
    },

    tableRow: {
        backgroundColor: Global.secondaryColor
    },

    TableRowInside: {
        color: Global.mainColor,
    },

    TableRowInsideOther: {
        justifyContent: 'center',
    }
})

export { HomeStyle }