import React, { useState } from "react";

function NotesEncryption() {

  const [text, setText] = useState("");
  const [encryptKey, setEncryptKey] = useState("");
  const [decryptKey, setDecryptKey] = useState("");
  const [encrypted, setEncrypted] = useState("");
  const [decrypted, setDecrypted] = useState("");

  // 🔐 ENCRYPT
  const encryptText = async () => {
    try {
      const res = await fetch("http://localhost:8080/encrypt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        },
        body: JSON.stringify({
          text: text,
          secret_key: encryptKey   // ✅ FIXED
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Encryption failed");
        return;
      }

      setEncrypted(data.ciphertext);

    } catch (err) {
      console.error(err);
      alert("Encryption error");
    }
  };

  // 🔓 DECRYPT
  const decryptText = async () => {
    try {
      const res = await fetch("http://localhost:8080/decrypt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        },
        body: JSON.stringify({
          ciphertext: encrypted,
          secret_key: decryptKey   // ✅ FIXED
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Decryption failed");
        return;
      }

      setDecrypted(data.text);

    } catch (err) {
      console.error(err);
      alert("Decryption error");
    }
  };

  return (
    <div className="encrypt-wrapper">

      {/* LEFT SIDE */}
      <div className="encrypt-left">

        <h2>Text Encryption</h2>

        <textarea
          placeholder="Enter any text to be encrypted"
          value={text}
          onChange={(e)=>setText(e.target.value)}
        />

        <input
          placeholder="Enter Secret Key"
          value={encryptKey}
          onChange={(e)=>setEncryptKey(e.target.value)}
        />

        <button onClick={encryptText}>
          Encrypt
        </button>

        <h3>Encrypted Output</h3>

        <textarea
          value={encrypted}
          readOnly
        />

      </div>

      {/* RIGHT SIDE */}
      <div className="encrypt-right">

        <h2>Text Decryption</h2>

        <textarea
          value={encrypted}
          readOnly
        />

        <input
          placeholder="Enter Secret Key"
          value={decryptKey}
          onChange={(e)=>setDecryptKey(e.target.value)}
        />

        <button onClick={decryptText}>
          Decrypt
        </button>

        <h3>Decrypted Text</h3>

        <textarea
          value={decrypted}
          readOnly
        />

      </div>

    </div>
  );
}

export default NotesEncryption;