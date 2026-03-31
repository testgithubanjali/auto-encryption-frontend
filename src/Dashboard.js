import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="card">

      <h2 style={{ marginBottom: "10px" }}>
        Welcome to Encryption App 🔐
      </h2>

      <p style={{ color: "#666", marginBottom: "20px" }}>
        Choose what you want to do
      </p>

      <div className="dashboard-grid">

        <div className="dash-box" onClick={() => navigate("/profile")}>
          <div className="icon">👤</div>
          <p>Profile</p>
        </div>

        <div className="dash-box" onClick={() => navigate("/Encryption")}>
          <div className="icon">🔐</div>
          <p>Encryption</p>
        </div>

        <div className="dash-box" onClick={() => navigate("/files")}>
          <div className="icon">📁</div>
          <p>File Encryption</p>
        </div>

        <div className="dash-box" onClick={() => navigate("/encoding")}>
          <div className="icon">🔄</div>
          <p>Encoding</p>
        </div>

      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        style={{
          marginTop: "25px",
          background: "#ef4444",
        }}
      >
        Logout
      </button>

    </div>
  );
}

export default Dashboard;