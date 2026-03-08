import React, { useState } from "react";
import { getProfile } from "./apiService";

function Profile() {
  const [user, setUser] = useState(null);

  const loadProfile = async () => {
  try {
    const token = localStorage.getItem("token");
    console.log("Token being sent:", token);

    if (!token) {
      alert("Please login first");
      return;
    }

    const data = await getProfile(token);
    setUser(data.user);
  } catch (error) {
    console.error("Error loading profile:", error);
  }
};

  return (
    <>
      <h2>User Profile</h2>

      <button onClick={loadProfile}>Load Profile</button>

      {user && (
        <div className="profile">
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      )}
    </>
  );
}

export default Profile;