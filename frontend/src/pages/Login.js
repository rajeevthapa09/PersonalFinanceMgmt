import { useNavigate } from "react-router-dom"
import { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import InputField from "../components/InputField";

export default function Login() {
    let navigate = useNavigate();
    const { state, setState } = useContext(GlobalContext);
    const [user, setUser] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleLogin = async (e) => {
        //pending
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