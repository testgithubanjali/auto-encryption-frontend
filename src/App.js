import { Routes, Route, Navigate } from "react-router-dom";

import Signup from "./Signup";
import Login from "./LoginPage";
import Profile from "./Profile";
import FileEncryption from "./FileEncryption";
import Encryption from "./Encryption";
import Encoding from "./encoding";
import Dashboard from "./Dashboard";

import "./App.css";

// ✅ Protected Route
function PrivateRoute({ children }) {
  const isLoggedIn = !!localStorage.getItem("access_token");
  return isLoggedIn ? children : <Navigate to="/login" />;
}

function App() {
  const isLoggedIn = !!localStorage.getItem("access_token");

  return (
    <div className="app">

      {/* Title */}
      <h1 className="title">Encryption and Decryption</h1>

      <div className="page">
        <Routes>

          {/* Default */}
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Public */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
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

          <Route
            path="/files"
            element={
              <PrivateRoute>
                <FileEncryption />
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

        </Routes>
      </div>

    </div>
  );
}

export default App;