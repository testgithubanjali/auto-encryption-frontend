import React, { useState } from "react";
import { login } from "./apiService";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isLoggedIn = localStorage.getItem("access_token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await login(email, password);

      // ✅ check response properly
      if (!data.access_token) {
        alert("Invalid login response");
        return;
      }

      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      localStorage.setItem("session_id", data.session_id);
      alert("Login successful");
      window.location.reload();

    } catch (error) {
      console.error(error);
      alert(error.message || "Login failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
   localStorage.removeItem("session_id");
    alert("Logged out successfully");
    window.location.reload();
  };

  return (
    <div className="card">

      <h2 className="form-title">Login</h2>

      {!isLoggedIn ? (
        <form onSubmit={handleSubmit} className="form">

          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            id="password"
            name="password"
            autoComplete="current-password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">
            Login
          </button>

        </form>
      ) : (
        <>
          <p className="login-message">
            You are already logged in
          </p>

          <button 
            onClick={handleLogout}
            className="logout-btn"
          >
            Logout
          </button>
        </>
      )}

    </div>
  );
}

export default Login;