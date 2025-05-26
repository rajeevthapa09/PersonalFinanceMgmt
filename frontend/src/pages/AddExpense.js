
import { useRef, useContext, useState, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import { getBudget, storeBudget } from "../services/network";

export default function AddExpense() {

      
    return(
        <div className="page-container">
            <button>Go Back</button>
            <p>Select Date: </p>
            <select>
                <option>2025</option>
                <option>2024</option>
                <option>2023</option>
                <option>2022</option>
                <option>2021</option>
            </select>
            <select>
                <option>January</option>
                <option>Febuary</option>
                <option>March</option>
                <option>April</option>
                <option>May</option>
                <option>June</option>
                <option>July</option>
                <option>August</option>
                <option>September</option>
                <option>October</option>
                <option>November</option>
                <option>December</option>
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