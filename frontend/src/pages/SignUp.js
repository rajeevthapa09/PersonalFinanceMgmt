import { useNavigate } from "react-router-dom"
import { useState } from "react";
import InputField from "../components/InputField";
import { signup } from "../services/network";

//Enum for user roles
const UserRole = {
    ADVISOR: 'advisor',
    REGULAR: 'regular',
};

export default function Signup() {
    let navigate = useNavigate();
    const [formData, setformData] = useState({ fname: "", address: "", occupation: "", role: "", email: "", password: "", profileImg: "" });
    const handleChange = (e) => {
        setformData({ ...formData, [e.target.name]: e.target.value });
    }

    const submitSignupForm = async(e) => {
        e.preventDefault();
        try {
            const response = await signup(formData);
            console.log("user added: ", response.data);
            alert("signup successful")
        } catch (err) {
            console.error("Error adding user: ", err);
            alert("Signup failed");
        }
    }

    const handleNavigateToLogin = (e) => {
        navigate("/")
    }

    return (
        <div>
            <form onSubmit={submitSignupForm}>
                <InputField
                    label="Name"
                    name="fname"
                    value={formData.fname}
                    onChange={handleChange}
                />

                <InputField
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                />

                <InputField
                    label="Occupation"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                />

                <div style={{ marginBottom: 10 }}>
                    <label htmlFor="role">Role: </label>
                    <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                    >
                        <option value={UserRole.ADVISOR}>Advisor</option>
                        <option value={UserRole.REGULAR}>Regular</option>
                    </select>
                </div>

                <InputField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <InputField
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <div style={{ marginBottom: 10 }}>
                    <label htmlFor="profileImg">Profile Picture: </label>
                    <input
                        id="profileImg"
                        type="file"
                        accept="image/*"
                        onChange={e => setformData({ ...formData, profileImg: e.target.files[0] })}
                    />
                </div>

                <div style={{ marginTop: 20 }}>
                    <button type="submit" style={{ marginRight: 10 }}>
                        Signup
                    </button>
                    <button type="button" onClick={handleNavigateToLogin}>
                        Back to Login
                    </button>
                </div>
            </form>
        </div>
    )
}