import React, { useState } from "react";
import { authFetch } from "./utils/auth";

function FileEncryption() {

  const [file, setFile] = useState(null);
  const [encFile, setEncFile] = useState(null);

  // 🔐 Encrypt & Download
  const uploadFile = async () => {

    if (!file) {
      alert("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const res = await authFetch("http://127.0.0.1:8080/encrypt-file", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      alert("Encryption failed");
      return;
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = file.name + ".enc";

    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  // 🔓 Decrypt uploaded .enc file
  const decryptFile = async () => {

    if (!encFile) {
      alert("Please select encrypted file (.enc)");
      return;
    }

    const formData = new FormData();
    formData.append("file", encFile);

    const res = await authFetch("http://127.0.0.1:8080/decrypt-file", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      alert("Decryption failed");
      return;
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const originalName = encFile.name.replace(".enc", "");

    const a = document.createElement("a");
    a.href = url;
    a.download = originalName;

    document.body.appendChild(a);
    a.click();
    a.remove();
  };
return (
  <div className="file-main">

     <div className="algo-select">
      <label>Supported Encryptions:</label>

      <select>
        <option value="AES">AES</option>
      </select>
    </div>
    <div className="file-box">
      <h2>🔐 Encrypt File</h2>

      <label>Choose File</label>

      <div className="file-row">
        <label className="file-btn">
          Choose File
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>

        <span className="file-name">
          {file ? file.name : "No file selected"}
        </span>
      </div>

      <button className="btn-orange" onClick={uploadFile}>
        Encrypt & Download
      </button>
    </div>

    {/* 🔓 DECRYPT */}
    <div className="file-box">
      <h2>🔓 Decrypt File</h2>

      <label>Choose File</label>

      <div className="file-row">
        <label className="file-btn">
          Choose File
          <input
            type="file"
            accept=".enc"
            onChange={(e) => setEncFile(e.target.files[0])}
          />
        </label>

        <span className="file-name">
          {encFile ? encFile.name : "No file selected"}
        </span>
      </div>

      <button className="btn-orange" onClick={decryptFile}>
        Decrypt & Download
      </button>
    </div>

  </div>
);
}

export default FileEncryption;