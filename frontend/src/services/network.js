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
