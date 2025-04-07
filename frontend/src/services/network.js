import axios from 'axios'
axios.defaults.baseURL = "http://localhost:3001";


export async function signup(userData) {
    const url = "/signup";

    const formData = new FormData();
    for (const key in userData) {
        formData.append(key, userData[key]);
    }
    try {
        const res = await axios.post(url, formData, {
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
