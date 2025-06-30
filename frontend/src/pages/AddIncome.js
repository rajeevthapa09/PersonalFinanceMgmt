
import { useRef, useContext, useState, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import { storeIncome, getIncome } from "../services/network";
import "./../styles/global.css"

export default function AddBudget() {

    const { globalState, setGlobalState } = useContext(GlobalContext);

    const [incomeItems, setIncomeItems] = useState([{ category: "", amount: "", notes: "" }]);
    const [errors, setError] = useState([]);
    const [categories, setCategories] = useState(["Wages"]);
    const [customRow, setCustomRow] = useState([])


    const refYear = useRef();
    const refMonth = useRef();

    let navigate = useNavigate();

    const goBack = () => {
        navigate("/")
    }

    const addNewIncomeRow = () => {
        setIncomeItems((prev) => [...prev, { category: "", amount: "", notes: "" }])
    }

    const updateIncome = (rowIndex, field, value) => {
        const copyIncome = [...incomeItems];
        copyIncome[rowIndex][field] = value;
        if (field === "category" && value === "Others" && !customRow.includes(rowIndex)) {
            setCustomRow((prev) => ([...prev, rowIndex]));
        }
        setIncomeItems(copyIncome);
    }


    const viewIncome = async () => {
        try {
            const response = await getIncome(`${refYear.current.value}-${refMonth.current.value}`, globalState.userEmail)
            if (response.data) {
                const items = response.data.incomeItems;
                const customIndexes = items.map((item, index) => !categories.includes(item.category) ? index : null).filter(index => index !== null);
                console.log("income itesms", items, "custom indeas", customIndexes)
                setIncomeItems(items);
                setCustomRow(customIndexes); // restore custom field UI

            } else {
                setIncomeItems([{ category: "", amount: "", notes: "" }])
                setCustomRow([]); // reset
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        viewIncome();
    }, [])

    const handleSubmit = async () => {
        let errorList = [];

        for (let i = 0; i < incomeItems.length; i++) {
            const errorRow = {};
            if (incomeItems[i].category.trim() === "") {
                errorRow.category = true;
            }
            if (incomeItems[i].amount.trim() === "" || isNaN(incomeItems[i].amount)) {
                errorRow.amount = true
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
        }
        if (hasError) {
            alert("Please fix the highlighted fields before submitting.");
            return;
        }

        const incomeInfo = {
            incomeItems: incomeItems,
            date: `${refYear.current.value}-${refMonth.current.value}`,
            userEmail: globalState.userEmail,
            sum: sum
        }
        const ret = await storeIncome(incomeInfo);
        if (ret.success) {
            alert("successfully submitted");
        }
    }
    const sum = incomeItems.reduce((total, item) => {
        const val = parseFloat(item.amount);
        return total + (isNaN(val) ? 0 : val);
    }, 0);

    return (
        <div className="page-container">
            <button onClick={goBack}>Go back</button>
            <p>Income</p>
            <label>Select Date: </label>
            <select defaultValue={new Date().getFullYear()} ref={refYear} onChange={viewIncome}>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
            </select>
            <select defaultValue={new Date().getMonth() + 1} ref={refMonth} onChange={viewIncome}>
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
                        <th>Amount</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {incomeItems.map((row, index) => (
                        <tr key={index}>
                            <td>
                                <select value={customRow.includes(index) ? "Others" : row.category} onChange={(e) => updateIncome(index, "category", e.target.value)} style={{ border: errors[index]?.category ? "2px solid red" : "2px solid #ccc" }}>
                                    <option value="">Select categories</option>
                                    {categories.map((cat, idx) =>
                                        <option key={idx} value={cat}>{cat}</option>
                                    )}
                                    <option value="Others">Others</option>
                                </select>
                                {customRow.includes(index) && <input placeholder="Enter custom category" value={row.category === "Others" ? "" : row.category} type="text" onChange={(e) => { updateIncome(index, "category", e.target.value) }} style={{ marginTop: "4px", border: errors[index]?.category ? "2px solid red" : "2px solid #ccc" }} />}

                            </td>
                            <td><input value={row.amount} type="text" onChange={(e) => updateIncome(index, "amount", e.target.value)} /></td>
                            <td><input value={row.notes} type="text" onChange={(e) => updateIncome(index, "notes", e.target.value)} style={{ border: "2px solid #ccc" }} /></td>
                            <td>{index === incomeItems.length - 1 && (<button onClick={addNewIncomeRow}>+</button>)}</td>
                        </tr>
                    ))}
                </tbody>
                <tr>
                    <td>Sum:</td>
                    <td>{sum}</td>
                </tr>
            </table>

            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}