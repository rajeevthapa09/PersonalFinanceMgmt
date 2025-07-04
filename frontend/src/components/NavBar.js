import { Link } from "react-router-dom";
import "./../styles/global.css";

export default function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/">Home</Link>
            <Link to="/addBudget">Add Budget</Link>
            <Link to="/addExpense">Add Expense</Link>
            <Link to="/addIncome">Add Income</Link>
        </nav>
    );
}