
import { useRef, useContext, useState, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import { storeBudget, getBudget } from "../services/network";

export default function AddBudget() {

    const { state, setState } = useContext(GlobalContext);

    const [budgetItems, setBudgetRows] = useState([{ category: "", estimated: "", notes: "" }]);
    const [errors, setError] = useState([]);

    const refYear = useRef();
    const refMonth = useRef();

    let navigate = useNavigate();

    const goBack = () => {
        navigate("/")
    }

    const addNewBudgetRow = () => {
        setBudgetRows((prev) => [...prev, { category: "", estimated: "", notes: "" }])
    }

    const updateBudget = (row, field, value) => {
        const copyBudget = [...budgetItems];
        copyBudget[row][field] = value;
        setBudgetRows(copyBudget);
    }



    useEffect(() => {
        const viewBudget = async () => {
            try {
                const ret = await getBudget(`${refYear.current.value}-${refMonth.current.value}`)
                console.log("rettt", ret)
                if (ret.data) {
                    setBudgetRows(ret.data.items);
                } else {
                    setBudgetRows([{ category: "", estimated: "", notes: "" }])
                }

            } catch (error) {
                console.log(error);
            }
        }
        viewBudget();
    }, [])

    const handleSubmit = async () => {
        let errorList = [];

        for (let i = 0; i < budgetItems.length; i++) {
            const errorRow = {};
            if (budgetItems[i].category.trim() === "") {
                errorRow.category = true;
            }
            if (budgetItems[i].estimated.trim() === "" || isNaN(budgetItems[i].estimated)) {
                errorRow.estimated = true
            }
            errorList.push(errorRow);
        }
        setError(errorList);

        let hasError = false;

        for (let i = 0; i < errorList.length; i++) {
            for (let key in errorList[i]) {
                if (errorList[i][key]) {
                    hasError = true;
                    break;
                }
            }
            if (hasError) {
                alert("Please fix the highlighted fields before submitting.");
                break;
            }
        }

        const ret = await storeBudget({ items: budgetItems, date: `${refYear.current.value}-${refMonth.current.value}` });
        if (ret.success) {
            alert("successfully submitted");
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
                    {budgetItems.map((row, index) => (
                        <tr>
                            <td><input value={row["category"]} type="text" onChange={(e) => updateBudget(index, "category", e.target.value)} style={{ border: errors[index]?.category ? "2px solid red" : "2px solid #ccc" }} /></td>
                            <td><input value={row["estimated"]} type="text" onChange={(e) => updateBudget(index, "estimated", e.target.value)} style={{ border: errors[index]?.estimated ? "2px solid red" : "2px solid #ccc" }} /></td>
                            <td><input value={row["notes"]} type="text" onChange={(e) => updateBudget(index, "notes", e.target.value)} /></td>
                            <td>{index === budgetItems.length - 1 && (<button onClick={addNewBudgetRow}>+</button>)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}