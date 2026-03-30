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
    <div className="card">

      <h2>File Encryption</h2>

      {/* 🔐 Encrypt Section */}
      <h3>Encrypt File</h3>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={uploadFile} style={{ marginTop: 10 }}>
        Encrypt & Download
      </button>

      {/* 🔓 Decrypt Section */}
      <h3 style={{ marginTop: 30 }}>Decrypt File</h3>
      <input
        type="file"
        accept=".enc"
        onChange={(e) => setEncFile(e.target.files[0])}
      />

      <button onClick={decryptFile} style={{ marginTop: 10 }}>
        Decrypt & Download
      </button>

    </div>
  );
}

export default FileEncryption;