import { useNavigate } from "react-router-dom"
import { useState } from "react";
import { signup } from "./network";

//Enum for user roles
const UserRole = {
    ADVISOR: 'advisor',
    REGULAR: 'regular',
};

export default function SignUp(){
    let navigate = useNavigate();
    const [user, setUser] = useState({fname: "", address: "", occupation: "", role: "", email: "", password:"", profileImg:""});
    const change = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    const loginHandle = async(e) => {
        if(e.target.value === "login"){
            navigate("/")
        }
    }

    return(
        <div>
            <label>Name : </label><input type="text" value={user.fname} onChange={change} name="fname" /> <br />
            <label>Address : </label><input type="text" value={user.address} onChange={change} name="address" /><br />
            <label>Occupation : </label><input type="text" value={user.occupation} onChange={change} name="occupation" /><br />
            <label>Role : </label>
            <select value={user.role} onChange={change} name="role">
                <option value={UserRole.ADVISOR}>Advisor</option>
                <option value={UserRole.REGULAR}>Regular</option>
            </select>
            
            <input type="text" value={user.role} onChange={change} name="role" /><br />
            <label>Email : </label><input type="text" value={user.email} onChange={change} name="email" /><br />
            <label>Password : </label><input type="password" value={user.password} onChange={change} name="password" /> <br />
            <label>Profile Pic : </label>
            <input 
                filename={user.profileImg}
                onChange={e => setUser({...user, profileImg: e.target.files[0]})}
                type="file"
                accept="image/*"
                ></input><br />
            <button onClick={loginHandle} value="login">Back to Login</button><button onClick={loginHandle} value="signup">Signup</button>
        </div>
    )
}