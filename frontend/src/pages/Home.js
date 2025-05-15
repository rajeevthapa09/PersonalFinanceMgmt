import { useNavigate } from "react-router-dom";
import "./../styles/global.css"
import { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

export default function Home() {
    let navigate = useNavigate();
    const { globalState, setGlobalState } = useContext(GlobalContext);

    const addBudget = () => {
        navigate("/addBudget")
    }

    const addIncome = () => {
        navigate("/addIncome")
    }

    const addExpense = () => {
        navigate("/addExpense")
    }

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userId");
        setGlobalState({ token: null, userEmail: null });
    }


    return (
        <div className="page-container">
            <p>Welcome, Rajeev! </p>
            <p>Here is your financial summary for April, 2025</p>
            <p>Income: $15,000</p>
            <p>Expense: $14,000</p>
            <p>Budget Left: $1,000</p>
            <button onClick={addExpense}>Add Expense</button>
            <button onClick={addIncome}>Add Income</button>
            <button onClick={addBudget}>Add Budget</button>
            <button onClick={logout}>Logout</button>


        </div>
    )
}