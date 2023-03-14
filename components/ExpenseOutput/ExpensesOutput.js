import { FlatList, Text, View } from "react-native";

function ExpensesOutput({ expenses }) {
    return (
        <View>

            <FlatList
                data={expenses}
                renderItem={(itemData)}
            />
        </View>
    )
}

export default ExpensesOutput;
