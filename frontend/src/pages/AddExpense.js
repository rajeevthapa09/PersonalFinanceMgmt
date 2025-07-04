
import { useRef, useContext, useState, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import { getBudget, storeExpense, getExpense } from "../services/network";

export default function AddExpense() {
    const { globalState } = useContext(GlobalContext);

    const [budget, setBudget] = useState([{ category: "", estimated: "" }])
    const [expense, setExpense] = useState([{ actual: "", notes: "" }])

    const refYear = useRef();
    const refMonth = useRef()

    const getBudgetInfo = async () => {
        const retBudget = await getBudget(`${refYear.current.value}-${refMonth.current.value}`, globalState.userEmail);
        if (retBudget.data) {
            setBudget(retBudget.data.items)
            setExpense(retBudget.data.items.map(() => ({ actual: "", notes: "" })))
        } else {
            setBudget([{ category: "", estimated: "" }])
            setExpense([{ actual: "", notes: "" }])
        }

    }

    const getExpenseInfo = async () => {
        const retExpense = await getExpense(`${refYear.current.value}-${refMonth.current.value}`, globalState.userEmail);
        console.log("retExpense: ", retExpense)
        if (retExpense.data) {
            setExpense(retExpense.data.expenseItems)
        }
    }

    const populateData = () => {
        getBudgetInfo();
        getExpenseInfo();
    }

    useEffect(() => {
        getBudgetInfo();
        getExpenseInfo();
    }, [])

    const updateExpense = (index, name, value) => {
        const copyExpense = [...expense];
        copyExpense[index] = { ...copyExpense[index], [name]: value }
        setExpense(copyExpense);
    }

    const handleSubmit = async () => {
        const expenseInfo = {
            date: `${refYear.current.value}-${refMonth.current.value}`,
            userEmail: globalState.userEmail,
            expenseItems: expense,
            sum: sumExpense
        }

        const res = await storeExpense(expenseInfo);
        if (res.success) {
            alert("Expense saved successfully")
        } else {
            alert("Error saving expense.")
        }
    }

    let navigate = useNavigate();
    const goBack = () => {
        navigate("/")
    }

    const sumExpense = expense.reduce((total, item) => {
        const val = parseFloat(item.actual);
        return total + (isNaN(val) ? 0 : val);
    }, 0);

    const sumBudget = budget.reduce((total, item) => {
        const val = parseFloat(item.estimated);
        return total + (isNaN(val) ? 0 : val);
    }, 0);

    return (
        <div className="page-container">

            <Navbar />
            <h2 className="header-title">Expense</h2>
            <p>Select Date: </p>
            <select defaultValue={new Date().getFullYear()} ref={refYear} onChange={populateData}>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
            </select>
            <select defaultValue={new Date().getMonth() + 1} ref={refMonth} onChange={populateData}>
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
                    {budget[0].category !== "" ?
                        budget.map((budgetItem, index) =>
                            <tr key={index}>
                                <td><input value={budgetItem.category} disabled /></td>
                                <td><input value={budgetItem.estimated} disabled /></td>
                                <td><input value={expense[index].actual} onChange={(e) => updateExpense(index, "actual", e.target.value)} name="actual" /></td>
                                <td><input value={expense[index].notes} onChange={(e) => updateExpense(index, "notes", e.target.value)} name="notes" /></td>
                            </tr>
                        )
                        :
                        <tr>
                            <td colSpan="4">
                                <p style={{ color: "red" }}>**please fill in budget page first</p>
                            </td>
                        </tr>
                    }

                </tbody>
                <tr className="sum-row">
                    <td>Sum:</td>
                    <td>{sumBudget}</td>
                    <td>{sumExpense}</td>
                </tr>
            </table>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}