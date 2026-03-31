import React, { useState } from "react";
import { getProfile } from "./apiService";

function Profile() {

  const [user, setUser] = useState(null);

  const loadProfile = async () => {
    const data = await getProfile();

    if (data.error) {
      alert(data.error);
      return;
    }

    setUser(data.user);
  };

  return (
    <div className="card">

      <h2>User Profile</h2>

      <button className="profile-btn" onClick={loadProfile}>
        Load Profile
      </button>

      {user && (
  <div className="profile-box">

    <div className="profile-row">
      <span className="label">User ID:</span>
      <span className="value">{user.id}</span>
    </div>

    <div className="profile-row">
      <span className="label">Email:</span>
      <span className="value">{user.email}</span>
    </div>

  </div>
)}

    </div>
  );
}

export default Profile;