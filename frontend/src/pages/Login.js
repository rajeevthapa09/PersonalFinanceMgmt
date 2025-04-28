import { useNavigate } from "react-router-dom"
import { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import InputField from "../components/InputField";
import { login } from "../services/network";
import "./../styles/global.css"

export default function Login() {
    let navigate = useNavigate();
    const { state, setState } = useContext(GlobalContext);
    const [loginData, setLoginData] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value })
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            const response = await login(loginData);
            if (response.success) {
                console.log("login", response.data)
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("userEmail", response.data.email);
                setState({...state, user: loginData.email, token: response.data.token});
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
        <div className="page-container">
            <p className="header-title">FINT</p>
            <p className="header-subtitle">Master your Finance</p>
            <form onSubmit={handleLogin}>
                <InputField
                    label="Email"
                    name="email"
                    type="email"
                    value={loginData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                />

                <InputField
                    label="Password"
                    name="password"
                    type="password"
                    value={loginData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                />

                <button type="submit" value="Login">Login</button>
                <button onClick={navigateToSignup} value="Signup">Signup</button>
            </form>
        </div>
    )
}