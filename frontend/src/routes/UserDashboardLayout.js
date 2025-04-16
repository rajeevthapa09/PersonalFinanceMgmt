import {createBrowserRouter} from "react-router-dom";
import Home from "../pages/Home"
import AddBudget from "../pages/AddBudget";
import AddExpense from "../pages/AddExpense"
import AddIncome from "../pages/AddIncome";

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path:"/addBudget",
        element: <AddBudget />
    },
    {
        path:"/addIncome",
        element: <AddIncome />
    },
    {
        path:"/addExpense",
        element: <AddExpense />
    }
    
])

export default appRouter