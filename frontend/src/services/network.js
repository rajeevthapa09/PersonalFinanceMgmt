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
    const url=`/api/expense/${expenseInfo.userEmail}`
    console.log("expenseInfo: ", expenseInfo, "token", localStorage.getItem("token"))

    try{
        const res = await axios.post(url, expenseInfo, {
            headers:{'Authorization': `Bearer ${localStorage.getItem("token")}`}
        })
        return res.data;
    }catch(error){
        console.log(error.message);
        return {success: false}
    }
}

export async function getExpense(date, userEmail){
    const url = `/api/expenses?date=${date}&email=${userEmail}`;
    console.log("url", url);
    try{
        const res = await axios.get(url, {
            headers:{'Authorization': `Bearer ${localStorage.getItem("token")}`}
        })
        console.log("network111", res.data)
        return res.data;

    }catch(error){
        console.log(error.message);
        return {success: false}
    }
}


export async function storeIncome(incomeInfo){
    const url=`/api/income/${incomeInfo.userEmail}`
    console.log("expenseInfo: ", incomeInfo, "token", localStorage.getItem("token"))

    try{
        const res = await axios.post(url, incomeInfo, {
            headers:{'Authorization': `Bearer ${localStorage.getItem("token")}`}
        })
        return res.data;
    }catch(error){
        console.log(error.message);
        return {success: false}
    }
}

export async function getIncome(date, userEmail){
    const url = `/api/income?date=${date}&email=${userEmail}`;
    console.log("url", url);
    try{
        const res = await axios.get(url, {
            headers:{'Authorization': `Bearer ${localStorage.getItem("token")}`}
        })
        console.log("network111", res.data)
        return res.data;

    }catch(error){
        console.log(error.message);
        return {success: false}
    }
}

export async function getFinancialSummary(info){
    const url = `/api/summary?date=${info.date}&email=${info.userEmail}`;
    console.log("url", url);
    try{
        const res = await axios.get(url, {
            headers:{'Authorization': `Bearer ${localStorage.getItem("token")}`}
        })
        console.log("network111", res.data)
        return res.data;

    }catch(error){
        console.log(error.message);
        return {success: false}
    }
}
