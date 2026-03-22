import React, { useState } from "react";
import { signup } from "./apiService";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup({ email, password });
      alert("Signup successful");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
   <div className="card">

      <h2 className="form-title">Signup</h2>

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
          Signup
        </button>

      </form>

    </div>
  );
}

export default Signup;