import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import AddBudget from "../pages/AddBudget";
import AddIncome from "../pages/AddIncome";
import AddExpense from "../pages/AddExpense";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Profile from "../pages/Profile";

const AppRoutes = (isAuthenticated) =>
  createBrowserRouter([
    {
      path: "/",
      element: isAuthenticated ? <Home /> : <Login />
    },
    {
      path: "/addBudget",
      element: isAuthenticated ? <AddBudget /> : <Login />
    },
    {
      path: "/addIncome",
      element: isAuthenticated ? <AddIncome /> : <Login />
    },
    {
      path: "/addExpense",
      element: isAuthenticated ? <AddExpense /> : <Login />
    },
    {
      path: "/profile",
      element: isAuthenticated ? <Profile /> : <Login />
    },
    {
      path: "/signup",
      element: <Signup />
    },
    {
      path: "*",
      element: <div>404 Not Found</div>
    }
  ]);

export default AppRoutes;
