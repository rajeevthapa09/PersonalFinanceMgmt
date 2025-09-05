import { Link } from "react-router-dom";
import "./../styles/global.css";
import { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

export default function Navbar() {
    const { globalState, setGlobalState } = useContext(GlobalContext);
    const logOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
        setGlobalState({ token: null, userEmail: null, userName: null });
    }
    return (
        <nav className="navbar">
            <div className="nav-left">
                <Link to="/">Home</Link>
                <Link to="/addBudget">Add Budget</Link>
                <Link to="/addExpense">Add Expense</Link>
                <Link to="/addIncome">Add Income</Link>
                <Link to="/profile">Profile</Link>
            </div>
            <div className="nav-right">
                <Link to="/" onClick={logOut}>
                    Logout
                </Link>
            </div>
        </nav>
    );
}