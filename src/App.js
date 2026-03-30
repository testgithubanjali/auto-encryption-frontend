import { Routes, Route, Link, Navigate } from "react-router-dom";

import Signup from "./Signup";
import Login from "./LoginPage";
import Profile from "./Profile";
import FileEncryption from "./FileEncryption";
import Encryption from "./Encryption";
import Encoding from "./encoding";

import "./App.css";

// ✅ Protected Route Component
function PrivateRoute({ children }) {
  const isLoggedIn = !!localStorage.getItem("access_token");
  return isLoggedIn ? children : <Navigate to="/login" />;
}

function App() {
  const isLoggedIn = !!localStorage.getItem("access_token");

  return (
    <div className="app">

      <h1 className="title">Encryption and Decryption</h1>

      <nav className="navbar">

        {!isLoggedIn ? (
          <>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </>
        ) : (
          <>
            <Link to="/profile">Profile</Link>
            <Link to="/Encryption">Encryption</Link>
            <Link to="/files">File Encryption</Link>
            <Link to="/encoding">Encoding</Link>
          </>
        )}

      </nav>

      <div className="page">
        <Routes>

          {/* Default route */}
          <Route path="/" element={<Navigate to={isLoggedIn ? "/profile" : "/login"} />} />

          {/* Public routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Protected routes */}
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />

          <Route
            path="/encoding"
            element={
              <PrivateRoute>
                <Encoding />
              </PrivateRoute>
            }
          />

          <Route
            path="/files"
            element={
              <PrivateRoute>
                <FileEncryption />
              </PrivateRoute>
            }
          />

          <Route
            path="/Encryption"
            element={
              <PrivateRoute>
                <Encryption />
              </PrivateRoute>
            }
          />

        </Routes>
      </div>

    </div>
  );
}

export default App;