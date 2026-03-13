import React, { useState } from "react";
import { signup } from "./apiService";

function Signup() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await signup(email, password);

    alert(JSON.stringify(data));
  };

  return (
    <div className="card">

      <h2>Signup</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
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