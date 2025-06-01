
import { useRef, useContext, useState, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import { getBudget, storeBudget } from "../services/network";

export default function AddExpense() {
    const { globalState } = useContext(GlobalContext);

    const [budget, setBudget] = useState([{ category: "", estimated: "" }])
    const [expense, setExpense] = useState([{ actual: "", notes: "" }])

    const refYear = useRef();
    const refMonth = useRef()

    const getBudgetInfo = async () => {
        const retBudget = await getBudget(`${refYear.current.value}-${refMonth.current.value}`, globalState.userEmail);
        setBudget(retBudget.data.items)
    }

    useEffect(() => {
        getBudgetInfo()
    }, [])


    return (
        <div className="page-container">
            <button>Go Back</button>
            <p>Select Date: </p>
            <select defaultValue={new Date().getFullYear()} ref={refYear}>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
            </select>
            <select defaultValue={new Date().getMonth() + 1} ref={refMonth}>
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

            <table>
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Estimated</th>
                        <th>Actual</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {budget.map((budgetItem, index) =>
                        <tr key={index}>
                            <td><input value={budgetItem.category} disabled /></td>
                            <td><input value={budgetItem.estimated} disabled /></td>
                            <td><input value={expense[index].actual} /></td>
                            <td><input value={expense[index].notes} /></td>
                        </tr>
                    )
                    }
                </tbody>
            </table>
        </div>
    )
}