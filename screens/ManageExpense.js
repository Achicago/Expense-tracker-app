import { useContext, useLayoutEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import Button from "../UI/Button";
import IconButton from "../UI/IconButton";


function ManageExpense({ route, navigation }) {

    const expensesCtx = useContext(ExpensesContext);

    const editedExpenseId = route.params?.expenseId; // Safest way to drill into object that might be undefined.
    const isEditing = !!editedExpenseId; //Convert a value into a boulean

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        })
    },
        [navigation, isEditing]
    )

    function deleteExpenseHandler() {
        expensesCtx.deleteExpense(editedExpenseId)
        navigation.goBack();
    }

    function cancelHandler() {
        navigation.goBack();
    }

    function confirmHandler() {
        if (isEditing) {
            expensesCtx.updateExpense(
                editedExpenseId,
                {
                    description: 'Test!!!',
                    amount: 29.99,
                    date: new Date('2023-05-19'),
                }
            );
        } else {
            expensesCtx.addExpense(
                {
                    description: 'Test',
                    amount: 19.99,
                    date: new Date('2023-05-19'),
                }
            );
        }
        navigation.goBack();
    }

    return (
        <View style={styles.container} >
            <View style={styles.buttons}>
                <Button style={styles.button} mode='flat' onPress={cancelHandler}>Cancel</Button>
                <Button style={styles.button} onPress={confirmHandler}> {isEditing ? 'Update' : 'Add'} </Button>
            </View>
            {isEditing &&
                <View style={styles.deleteContainer}>
                    <IconButton
                        icon='trash'
                        size={36}
                        color={GlobalStyles.colors.error500}
                        onPress={deleteExpenseHandler}
                    />
                </View>
            }
        </View>
    );
}

export default ManageExpense;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: "center",
    },
})


