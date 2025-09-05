import { useContext } from "react";
import GlobalContext from "./GlobalContext";

export default function Logout(){
    const { globalState, setGlobalState } = useContext(GlobalContext);
    const logOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
        setGlobalState({ token: null, userEmail: null, userName: null });
    }
    return(
        <div>
            <button onClick={logOut}>Logout</button>
        </div>
    )
}