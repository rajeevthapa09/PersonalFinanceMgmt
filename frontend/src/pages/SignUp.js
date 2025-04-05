import { useNavigate } from "react-router-dom"
import { useState } from "react";
import InputField from "../components/InputField";

//Enum for user roles
const UserRole = {
    ADVISOR: 'advisor',
    REGULAR: 'regular',
};

export default function SignUp() {
    let navigate = useNavigate();
    const [user, setUser] = useState({ fname: "", address: "", occupation: "", role: "", email: "", password: "", profileImg: "" });
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const handleNavigation = (e) => {
        e.preventDefault();
        //more
    }

    const handleNavigateToLogin = (e) => {
        //pending
    }

    return (
        <div>
            <form onSubmit={handleNavigation}>
                <InputField
                    label="Name"
                    name="fname"
                    value={user.fname}
                    onChange={handleChange}
                />

                <InputField
                    label="Address"
                    name="address"
                    value={user.address}
                    onChange={handleChange}
                />

                <InputField
                    label="Occupation"
                    name="occupation"
                    value={user.occupation}
                    onChange={handleChange}
                />

                <div style={{ marginBottom: 10 }}>
                    <label htmlFor="role">Role: </label>
                    <select
                        id="role"
                        name="role"
                        value={user.role}
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
                    value={user.email}
                    onChange={handleChange}
                />

                <InputField
                    label="Password"
                    name="password"
                    type="password"
                    value={user.password}
                    onChange={handleChange}
                />

                <div style={{ marginBottom: 10 }}>
                    <label htmlFor="profileImg">Profile Picture: </label>
                    <input
                        id="profileImg"
                        type="file"
                        accept="image/*"
                        onChange={e => setUser({...user, profileImg: e.target.files[0]})}
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