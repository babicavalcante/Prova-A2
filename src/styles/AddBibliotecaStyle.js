import { StyleSheet } from "react-native";
import { Global } from "./Global";

const AddBibliotecaStyle = StyleSheet.create({
    botao: {
        padding: 5,
        borderWidth: 2,
        borderColor: Global.secondaryColor,
        borderRadius: 6
    },

    TextBotao: {
        color: Global.secondaryColor,
        fontWeight: Global.weight
    }
})

export default AddBibliotecaStyle