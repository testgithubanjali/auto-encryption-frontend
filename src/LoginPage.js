import React, { useState, useEffect } from "react";
import { login } from "./apiService";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ✅ Auto redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const data = await login(email, password);

      if (!data || !data.access_token) {
        alert("Invalid login response");
        return;
      }

      // ✅ Store tokens
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      localStorage.setItem("session_id", data.session_id);

      navigate("/dashboard");

    } catch (error) {
      console.error(error);
      alert(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2 className="form-title">Login</h2>

      <form onSubmit={handleSubmit} className="form">

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

<button type="submit" className="btn-blue" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>        
      

      </form>

      <p style={{ marginTop: "15px" }}>
        Don't have an account?{" "}
        <span
          style={{ color: "#3b82f6", cursor: "pointer", fontWeight: "500" }}
          onClick={() => navigate("/signup")}
        >
          Signup
        </span>
      </p>
    </div>
  );
}

export default Login;