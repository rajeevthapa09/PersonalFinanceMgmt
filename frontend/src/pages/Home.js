import { useNavigate } from "react-router-dom";
import "./../styles/global.css"
import { useContext, useEffect, useRef, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import { getFinancialSummary } from "../services/network";
import Navbar from "../components/NavBar";

export default function Home() {
    let navigate = useNavigate();
    const { globalState, setGlobalState } = useContext(GlobalContext);
    const [summary, setSummary] = useState({ income: "", expense: "", budget: "" })

    const refYear = useRef();
    const refMonth = useRef();

    const addBudget = () => {
        navigate("/addBudget")
    }

    const addIncome = () => {
        navigate("/addIncome")
    }

    const addExpense = () => {
        navigate("/addExpense")
    }

    const viewSummary = async () => {
        const retSummary = await getFinancialSummary({ date: `${refYear.current.value}-${refMonth.current.value}`, userEmail: globalState.userEmail });
        if (retSummary.data) {
            console.log("retSummary: ", retSummary);
            setSummary({ ...summary, income: retSummary.data.income, expense: retSummary.data.expense, budget: retSummary.data.budget })
        }

    }

    useEffect(() => {
        viewSummary();
    }, [])

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
        setGlobalState({ token: null, userEmail: null, userName: null });
    }


    return (
        <div className="page-container">

            <Navbar />
            <h2 style={{ color: "#444", marginBottom: "1rem" }}>Dashboard</h2>
            <p>Welcome, {globalState.userName || "User"}! </p>
            <p>Here is your financial summary for:
                <select defaultValue={new Date().getFullYear()} ref={refYear} onChange={viewSummary} style={{ width: "10%", marginLeft: "10px" }}>
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                </select>
                <select defaultValue={new Date().getMonth() + 1} ref={refMonth} onChange={viewSummary} style={{ width: "10%" }}>
                    <option value="1">January</option>
                    <option value="2">Febuary</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                </select>
            </p>

            <div className="summary-box">
                <p>Income: ${summary.income}</p>
                <p>Expense: ${summary.expense}</p>
                <p>Budget: ${summary.budget}</p>
            </div>

            <button onClick={logout}>Logout</button>


        </div>
    )
}