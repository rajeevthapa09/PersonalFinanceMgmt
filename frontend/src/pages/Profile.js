
import { useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import Navbar from "../components/NavBar";

export default function Profile() {


    const { globalState } = useContext(GlobalContext);
    return (
    <div className="page-container">
      <Navbar />
      <div className="profile-container">
        <h2 className="page-title">Profile</h2>

        {/* Profile Image */}
        <div className="profile-image-section">
          <img
            src={globalState.userImage || "/default-avatar.png"}
            alt="Profile"
            className="profile-image"
          />
          <button className="btn-secondary">Change Photo</button>
        </div>

        {/* Profile Info */}
        <div className="profile-info">
          <div className="profile-row">
            <span className="profile-label">Name:</span>
            <span className="profile-value">{globalState.userName}</span>
          </div>
          <div className="profile-row">
            <span className="profile-label">Email:</span>
            <span className="profile-value">{globalState.userEmail}</span>
          </div>
        </div>

        {/* Change Password */}
        <div className="profile-password">
          <h3>Change Password</h3>
          <input type="password" placeholder="New Password" />
          <input type="password" placeholder="Confirm New Password" />
          <button className="btn-primary">Update Password</button>
        </div>
      </div>
    </div>
  );
}