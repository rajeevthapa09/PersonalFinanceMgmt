import {createBrowserRouter} from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

const loginRouter = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/signup",
        element: <Signup />
    },
    {
        path: "*",
        element: <div>404 error</div>
    }
])

export default loginRouter