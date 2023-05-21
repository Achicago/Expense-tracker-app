import axios from "axios";

export function storeExpense(expenseData) {
    axios.post('https://react-native-course-1f4d5-default-rtdb.firebaseio.com/expenses.json',
        expenseData
    );
}

