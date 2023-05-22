import { useContext, useEffect } from "react";
import ExpensesOutput from "../components/ExpenseOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";


function RecentExpenses() {
    const expenseCtx = useContext(ExpensesContext);

    // const [fetchedExpenses, setFetchExpenses] = useState([]);

    useEffect(() => {
        async function getExpenses() {
            const expenses = await fetchExpenses();
            expenseCtx.setExpenses(expenses);
            // setFetchExpenses(expenses);
        }

        getExpenses();

    }, [])

    const recentExpenses = expenseCtx.expenses.filter((expense) => {
        // const recentExpenses = fetchedExpenses.filter((expense) => {
        const today = new Date()
        const date7DaysAgo = getDateMinusDays(today, 7);

        return (expense.date > date7DaysAgo) && (expense.date <= today);
    })
    return (
        <ExpensesOutput
            expenses={recentExpenses}
            expensesPeriod='Last 7 Days'
            fallbackText="No expenses registered for the last 7 days"
        />
    );
}

export default RecentExpenses;



