
import { useRef, useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";

export default function AddBudget() {

    const { state, setState } = useContext(GlobalContext);

    const [budgetRows, setBudgetRows] = useState([]);


    // const updateBudget = (category, type, value) => {
    //     setBudget((prev) => ({ ...prev, [category]: { ...prev[category], [type]: value } }))
    // }

    const refYear = useRef();
    const refMonth = useRef();

    let navigate = useNavigate();

    const goBack = () => {
        navigate("/")
    }

    const addNewCategory = () => {
        setBudgetRows((prev) => [...prev, { category: "", estimated: "", notes: "" }])
    }

    const updateBudget = (row, field, value) => {
        const copyBudget = [...budgetRows];
        copyBudget[row][field] = value;
        setBudgetRows(copyBudget);
    }

    const handleSubmit = () => {

        for (let i = 0; i < budgetRows.length; i++) {
            if (budgetRows[i].category.trim() === "" || budgetRows[i].estimated === ""){
                alert("Please fill out all fields");
                return;
            }

            if(isNaN(budgetRows[i].estimated)){
                alert("Please enter valid input");
                return;
            }

        }
    }

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
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Estimated</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {budgetRows.map((row, index) => (
                        <tr>
                            <td><input value={row["category"]} type="text" onChange={(e) => updateBudget(index, "category", e.target.value)} /></td>
                            <td><input value={row["estimated"]} type="text" onChange={(e) => updateBudget(index, "estimated", e.target.value)} /></td>
                            <td><input value={row["notes"]} type="text" onChange={(e) => updateBudget(index, "notes", e.target.value)} /></td>
                            <td>{index === budgetRows.length - 1 && (<button onClick={addNewCategory}>+</button>)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button onSubmit={handleSubmit}>Submit</button>
        </div>
    )
}