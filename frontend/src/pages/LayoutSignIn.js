import {createBrowserRouter} from "react-router-dom";
import SignUp from "./SignUp"
import Login from "./Login";

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