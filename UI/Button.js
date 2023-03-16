import { Pressable, Text, View, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/styles";

function Button({ children, onPress, mode, style }) {
    return (
        <View style={style}>
            <Pressable onPress={onPress}
                style={({ pressed }) => pressed && style.pressed}
            >
                <View style={[styles.button, mode === 'flat' && styles.flat]}>
                    <Text style={[styles.buttonText, mode === 'flat' && styles.flatText]}>{children}</Text>
                </View>
            </Pressable>
        </View>
    )
}

export default Button;

const styles = StyleSheet.create({
    button: {
        backgroundColor: GlobalStyles.colors.primary500,
        padding: 10,
        borderRadius: 4,
    },
    flat: {
        backgroundColor: 'transparent'
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    flatText: {
        color: GlobalStyles.colors.primary200,
    },
    pressed: {
        opacity: 0.75,
        backgroundColor: GlobalStyles.colors.primary100,
        borderRadius: 4,
    }

})