import axios from 'axios'
axios.defaults.baseURL = "http://localhost:3001";


export async function signup(userData) {
    const url = "/signup";

    console.log("formdata ", userData);
    try {
        const res = await axios.post(url, userData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log("res data ", res.data)
        return res.data;
    } catch (error) {
        console.log(error.message);
        return null;
    }
}

export async function login(userData){
    const url="/login";
    console.log("userdata", userData);
    try{
        const res = await axios.post(url, userData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return res.data;
    }catch (error){
        console.log(error.message);
        return null;
    }
}

export async function storeBudget(budgetInfo, userEmail){
    const url=`/api/budgets/${userEmail}`;
    console.log("url", url)
    try{
        const res = await axios.post(url, budgetInfo, {
            headers:{'Authorization': `Bearer ${localStorage.getItem("token")}`}
        });
        console.log("res.data", res.data)
        return res.data;
    }catch (error){
        console.log(error.message);
        return {success: false}
    }
}

export async function getBudget(date, userEmail){
    const url = `/api/budgets?date=${date}&email=${userEmail}`;
    console.log("url", url);
    try{
        const res = await axios.get(url, {
            headers:{'Authorization': `Bearer ${localStorage.getItem("token")}`}
        })
        console.log("network", res.data)
        return res.data;

    }catch(error){
        console.log(error.message);
        return {success: false}
    }
}

export async function storeExpense(expenseInfo){
    const url=`/api/expense?email=${expenseInfo.userEmail}`
    console.log("expenseInfo: ", expenseInfo)

    try{
        const res = await axios.post(url, {
            headers:{'Authorization': `Bearer ${localStorage.getItem("token")}`}
        })
        return res.data;
    }catch(error){
        console.log(error.message);
        return {success: false}
    }
}
