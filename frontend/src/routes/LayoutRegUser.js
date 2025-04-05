import {createBrowserRouter} from "react-router-dom";
import Home from "../pages/Home"

const myrouter = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    }
    
])

export default myrouter