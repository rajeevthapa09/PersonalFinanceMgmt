
import { useRef, useContext, useState, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import { getBudget, storeBudget } from "../services/network";

export default function AddExpense() {

    const getBudgetInfo = () => {
        const retBudget = getBudget()
    }

    useEffect(() => {

    }, [])

      
    return(
        <div className="page-container">
            <button>Go Back</button>
            <p>Select Date: </p>
            <select>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
            </select>
            <select>
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
                    <th>Estimated</th>
                    <th>Actual</th>
                    <th>Notes</th>
                </tr>
            </table>
        </div>
    )
}