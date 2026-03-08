import React from "react";
import Signup from "./Signup";
import Login from "./LoginPage";
import Profile from "./Profile";
import "./App.css";

function App() {
  return (
    <div className="container">
      <h1 className="title">Auto Encryption API</h1>

      <div className="card">
        <Signup />
      </div>

      <div className="card">
        <Login />
      </div>

      <div className="card">
        <Profile />
      </div>
    </div>
  );
}

export default App;