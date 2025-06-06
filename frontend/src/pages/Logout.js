import { useContext } from "react";
import GlobalContext from "./GlobalContext";

export default function Logout(){
    const {state, setState} = useContext(GlobalContext);
    const logOut = () => {
        localStorage.setItem("token", "");
        localStorage.setItem("userEmail", "");
        localStorage.setItem("userId", "");
        setState({...state, token: null, user: ""});
    }
    return(
        <div>
            <button onClick={logOut}>Logout</button>
        </div>
    )
}