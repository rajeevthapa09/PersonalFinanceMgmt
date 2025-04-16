
import { useRef, useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";

export default function AddIncome() {

    const { state, setState } = useContext(GlobalContext);

    const [budget, setBudget] = useState({
        wages: { expected: "", actual: "", notes: "" },
        otherIncome: { expected: "", actual: "", notes: "" },
        rent: { expected: "", actual: "", notes: "" },
        groceries: { expected: "", actual: "", notes: "" },
        limit: ""
    });

    const updateBudget = (category, type, value) => {
        setBudget((prev) => ({ ...prev, [category]: { ...prev[category], [type]: value } }))
    }

    let navigate = useNavigate();

    const goBack = () => {
        navigate("/")
    }

    const refYear = useRef();
    const refMonth = useRef();

    return (
        <div>
            <button onClick={goBack}>Go back</button>
            <label>Select Date: </label>
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
                <tr>
                    <th>Category</th>
                    <th>Expected</th>
                    <th>Actual</th>
                    <th>Notes</th>
                </tr>
                <tr>
                    <td>Wages</td>
                    <td><input value={budget.wages.expected} type="text" onChange={(e) => updateBudget("wages", "expected", e.target.value)} /></td>
                    <td><input value={budget.wages.actual} type="text" onChange={(e) => updateBudget("wages", "actual", e.target.value)} /></td>
                    <td><input value={budget.wages.notes} type="text" onChange={(e) => updateBudget("wages", "notes", e.target.value)} /></td>
                </tr>
                <tr>
                    <td>Other Income</td>
                    <td><input value={budget.otherIncome.expected} type="text" onChange={(e) => updateBudget("otherIncome", "expected", e.target.value)} /></td>
                    <td><input value={budget.otherIncome.actual} type="text" onChange={(e) => updateBudget("otherIncome", "actual", e.target.value)} /></td>
                    <td><input value={budget.otherIncome.notes} type="text" onChange={(e) => updateBudget("otherIncome", "notes", e.target.value)} /></td>
                </tr>
                <tr>
                    <td>Rent/Mortgage</td>
                    <td><input value={budget.rent.expected} type="text" onChange={(e) => updateBudget("rent", "expected", e.target.value)} /></td>
                    <td><input value={budget.rent.actual} type="text" onChange={(e) => updateBudget("rent", "actual", e.target.value)} /></td>
                    <td><input value={budget.rent.notes} type="text" onChange={(e) => updateBudget("rent", "notes", e.target.value)} /></td>
                </tr>
                <tr>
                    <td>Groceries</td>
                    <td><input value={budget.groceries.expected} type="text" onChange={(e) => updateBudget("groceries", "expected", e.target.value)} /></td>
                    <td><input value={budget.groceries.actual} type="text" onChange={(e) => updateBudget("groceries", "actual", e.target.value)} /></td>
                    <td><input value={budget.groceries.notes} type="text" onChange={(e) => updateBudget("groceries", "notes", e.target.value)} /></td>
                </tr>
            </table>
            <button>Add New Category</button>
            <button>Submit</button>
        </div>
    )
}