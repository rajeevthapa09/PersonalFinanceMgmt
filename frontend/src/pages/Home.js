import { useNavigate } from "react-router-dom";

export default function Home(){
    let navigate = useNavigate();

    const addBudget = () => {
        navigate("/addBudget")
    }
    return(
        <div>
            <p>Welcome, Rajeev! </p>
            <p>Here is your financial summary for April, 2025</p>
            <p>Income: $15,000</p>
            <p>Expense: $14,000</p>
            <p>Budget Left: $1,000</p>
            <button>Add Expense</button>
            <button>Add Income</button>
            <button onClick={addBudget}>Add Budget</button>
            <button>Logout</button>

            
        </div>
    )
}