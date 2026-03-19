import { Routes, Route, Link } from "react-router-dom";

import Signup from "./Signup";
import Login from "./LoginPage";
import Profile from "./Profile";
import FileEncryption from "./FileEncryption";
import Notes from "./Notes";

import "./App.css";

function App() {
  return (
    <div className="app">

      <h1 className="title">Auto Encryption API</h1>

      <nav className="navbar">
        <Link to="/signup">Signup</Link>
        <Link to="/login">Login</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/notes">Notes</Link>
        <Link to="/files">File Encryption</Link>
        
      </nav>

      <div className="page">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          
           <Route path="/files" element={<FileEncryption />} />
            <Route path="/notes" element={<Notes />} />
        </Routes>
      </div>

    </div>
  );
}

export default App;