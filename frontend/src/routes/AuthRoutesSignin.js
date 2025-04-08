import {createBrowserRouter} from "react-router-dom";
import Signup from "../pages/Signup"
import Login from "../pages/Login";

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