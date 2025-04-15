import {createBrowserRouter} from "react-router-dom";
import Home from "../pages/Home"
import AddBudget from "../pages/AddBudget";

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path:"/addBudget",
        element: <AddBudget />
    }
    
])

export default appRouter