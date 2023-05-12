import { Text, TextInput, View } from "react-native";

function Input({ label, textInputConfig }) {
    return (
        <View>
            <Text> {label}</Text>
            <TextInput {...textInputConfig} />
        </View>
    );
    // Cyfa________@Inc1.
}

export default Input;