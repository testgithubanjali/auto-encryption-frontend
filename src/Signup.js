import React, { useState, useEffect } from "react";
import { signup } from "./apiService";
import { useNavigate } from "react-router-dom";

function Signup() {
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

      await signup({ email, password });

      alert("Signup successful");

      navigate("/login");

    } catch (err) {
      console.error(err);
      alert(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2 className="form-title">Signup</h2>

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
          placeholder="Create password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Signup"}
        </button>

      </form>

      <p style={{ marginTop: "15px" }}>
        Already have an account?{" "}
        <span
          style={{ color: "#3b82f6", cursor: "pointer", fontWeight: "500" }}
          onClick={() => navigate("/login")}
        >
          Login
        </span>
      </p>
    </div>
  );
}

export default Signup;