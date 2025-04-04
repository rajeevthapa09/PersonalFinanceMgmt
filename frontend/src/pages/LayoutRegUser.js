import {createBrowserRouter} from "react-router-dom";
import Home from "./Home"

const myrouter = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    }
    
])

export default myrouter