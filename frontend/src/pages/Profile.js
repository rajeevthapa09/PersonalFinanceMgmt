
import { useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import Navbar from "../components/NavBar";

export default function Profile() {


    const { globalState } = useContext(GlobalContext);
    console.log ("gllo", globalState)
    return (
        <div className="page-container">
            <Navbar />
            <h2 className="page-title">Profile</h2>
            Name: <input value={globalState.userName} /> <br />
            Email: <input value={globalState.userEmail} /> <br />
            Change Password: <input value="" /> <br />
            Image: <input value="" /> <br />
        </div>
    )
}