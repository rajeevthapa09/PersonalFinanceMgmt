import {createBrowserRouter} from "react-router-dom";
import SignUp from "../pages/SignUp"
import Login from "../pages/Login";

const loginRouter = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/signup",
        element: <SignUp />
    },
    {
        path: "*",
        element: <div>404 error</div>
    }
])

export default loginRouter