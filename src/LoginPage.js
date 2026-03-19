import React, { useState } from "react";
import { login } from "./apiService";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const data = await login(email, password);

      // store tokens
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);

      alert("Login successful");

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="card">

      <h2 className="form-title">Login</h2>

      <form onSubmit={handleSubmit} className="form">

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
          Login
        </button>

      </form>

    </div>
  );
}

export default Login;