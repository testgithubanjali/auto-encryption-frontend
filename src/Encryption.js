import React, { useState } from "react";
import { authFetch } from "./utils/auth";

function NotesEncryption() {

  const [text, setText] = useState("");
  const [encryptKey, setEncryptKey] = useState("");
  const [decryptKey, setDecryptKey] = useState("");
  const [encrypted, setEncrypted] = useState("");
  const [decrypted, setDecrypted] = useState("");

  const encryptText = async () => {
    if (!text || !encryptKey) {
      alert("Text and Key required");
      return;
    }

    const res = await authFetch("http://127.0.0.1:8080/encrypt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "X-Session-ID": localStorage.getItem("session_id"),
      },
      body: JSON.stringify({ text, secret_key: encryptKey }),
    });

    const data = await res.json();
    setEncrypted(data.ciphertext);
  };

  const decryptText = async () => {
    if (!encrypted || !decryptKey) {
      alert("Ciphertext and Key required");
      return;
    }

    const res = await authFetch("http://127.0.0.1:8080/decrypt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "X-Session-ID": localStorage.getItem("session_id"),
      },
      body: JSON.stringify({ ciphertext: encrypted, secret_key: decryptKey }),
    });

    const data = await res.json();
    setDecrypted(data.text);
  };
return (
  <div className="content">

    {/* 🔽 Dropdown (like your image) */}
    <div className="algo-select">
      <label>Supported Encryptions:</label>

      <select>
        <option value="AES">AES</option>
      </select>
    </div>

    {/* 🔐 AES UI */}
    <div className="aes-container">

      {/* LEFT */}
      <div className="aes-box">
        <h2>Text Encryption</h2>

        <label>Enter text</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <label>Secret Key</label>
        <input
          value={encryptKey}
          onChange={(e) => setEncryptKey(e.target.value)}
        />

        <button className="btn-orange small" onClick={encryptText}>
          Encrypt
        </button>

        <label>Encrypted Output</label>
        <textarea value={encrypted} readOnly />

        <button
          className="btn-copy"
          onClick={() => navigator.clipboard.writeText(encrypted)}
        >
          Copy
        </button>
      </div>

      {/* RIGHT */}
      <div className="aes-box">
        <h2>Text Decryption</h2>

        <label>Encrypted text</label>
        <textarea
          value={encrypted}
          onChange={(e) => setEncrypted(e.target.value)}
        />

        <label>Secret Key</label>
        <input
          value={decryptKey}
          onChange={(e) => setDecryptKey(e.target.value)}
        />

        <button className="btn-orange small" onClick={decryptText}>
          Decrypt
        </button>

        <label>Decrypted Output</label>
        <textarea value={decrypted} readOnly />

        <button
          className="btn-copy"
          onClick={() => navigator.clipboard.writeText(decrypted)}
        >
          Copy
        </button>
      </div>

    </div>

  </div>
);
}

export default NotesEncryption;