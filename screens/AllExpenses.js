
import { useContext } from "react";
import ExpensesOutput from "../components/ExpenseOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";

function AllExpenses() {
    const expenseCtx = useContext(ExpensesContext)

    return (
        <ExpensesOutput expenses={expenseCtx.expenses} expensesPeriod="Total" />
    );
}

export default AllExpenses;
