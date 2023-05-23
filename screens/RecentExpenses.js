import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpenseOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import ErrorOverlay from "../UI/ErrorOverlay";
import LoadingOverlay from "../UI/LoadingOverlay";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";


function RecentExpenses() {
    const [isFetching, setIsFetching] = useState(true)
    const [error, setError] = useState();

    const expenseCtx = useContext(ExpensesContext);

    // const [fetchedExpenses, setFetchExpenses] = useState([]);

    useEffect(() => {
        async function getExpenses() {

            try {
                const expenses = await fetchExpenses();
                expenseCtx.setExpenses(expenses);
            } catch (error) {
                setError('Could not fetch Expenses!');
            }
            setIsFetching(false);
            // setFetchExpenses(expenses);
        }

        getExpenses();

    }, []);

    function errorHandler() {
        setError(null);
    }

    if (error && !isFetching) {
        return (
            <ErrorOverlay
                message={error}
                onConfirm={errorHandler}
            />
        );
    }

    if (isFetching) return <LoadingOverlay />;

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



