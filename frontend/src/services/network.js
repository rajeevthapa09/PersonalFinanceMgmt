import axios from 'axios'
axios.defaults.baseURL = "http://localhost:3001";


export async function signup(user) {
    const url = "/signup";

    
    try {
        const res = await axios.post(url, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return res.data;
    } catch (error) {
        console.log(error.message);
        return null;
    }
}