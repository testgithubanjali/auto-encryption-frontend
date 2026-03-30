import React, { useState } from "react";
import { authFetch } from "./utils/auth";

function NotesEncryption() {

  const [text, setText] = useState("");
  const [encryptKey, setEncryptKey] = useState("");
const [decryptKey, setDecryptKey] = useState("");
  const [encrypted, setEncrypted] = useState("");
  const [decrypted, setDecrypted] = useState("");

  // 🔐 ENCRYPT
  const encryptText = async () => {
  if (!text || !encryptKey) {
    alert("Text and Key ID are required");
    return;
  }

  try {
    console.log("Sending:", { text, encryptKey });

    const res = await authFetch("http://127.0.0.1:8080/encrypt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "X-Session-ID": localStorage.getItem("session_id"),
      },
      body: JSON.stringify({
        text: text,
      secret_key: encryptKey ,   
      }),
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
  
  const decryptText = async () => {
      if (!encrypted || !decryptKey) {
    alert("Ciphertext and Secret Key are required");
    return;
  }
    try {
      const res = await authFetch("http://127.0.0.1:8080/decrypt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
           "X-Session-ID": localStorage.getItem("session_id") 
        },
        body: JSON.stringify({
          ciphertext: encrypted,
          secret_key: decryptKey  ,
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
  onChange={(e) => setEncryptKey(e.target.value)}
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

      
      <div className="encrypt-right">

        <h2>Text Decryption</h2>

        <textarea
          value={encrypted}
          readOnly
        />

        <input
  placeholder="Enter Secret Key"
  value={decryptKey}
  onChange={(e) => setDecryptKey(e.target.value)}
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