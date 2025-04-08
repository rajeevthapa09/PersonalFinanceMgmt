import { useNavigate } from "react-router-dom"
import { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import InputField from "../components/InputField";
import { login } from "../services/network";

export default function Login() {
    let navigate = useNavigate();
    const { state, setState } = useContext(GlobalContext);
    const [user, setUser] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            const response = await login(user);
            if (response.success) {
                console.log("login", response.data)
                localStorage.setItem("token", response.data.token);
                // localStorage.setItem("userEmail", response.data.email);
                // localStorage.setItem("userId", response.data.userId);
                // localStorage.setItem("userName", response.data.userName);

                // if(response.data.role === "regular"){
                //     console.log("i am regular")
                //     setState({...state, user: user.email, token: response.data.token, userId: response.data.userId, userName: response.data.userName});
                // }else{
                //     setState({...state, user: user.email, role: false, token: response.data.token, userId: response.data.userId, userName: response.data.userName});
                // }
            }
        }catch(error){
            console.error("Error logging in: ", error)
        }
        

    }

    const navigateToSignup = () => {
        navigate("/signup");
    }

    return (
        <div style={{ marginLeft: 100, marginRight: 100, textAlign: "center" }}>
            <p style={{ fontSize: 50 }}>FINT</p>
            <p style={{ fontSize: 10 }}>Master your Finance</p>
            <form onSubmit={handleLogin}>
                <InputField
                    label="Email"
                    name="email"
                    type="email"
                    value={user.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                />

                <InputField
                    label="Password"
                    name="password"
                    type="password"
                    value={user.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                />

                <button type="submit" value="Login">Login</button>
                <button onClick={navigateToSignup} value="Signup">Signup</button>
            </form>
        </div>
    )
}