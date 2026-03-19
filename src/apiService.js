import React, { useState } from "react";
import { encryptText, decryptText } from "./apiService";

function Notes() {

const [text, setText] = useState("");
const [encryptKey, setEncryptKey] = useState("");
const [decryptKey, setDecryptKey] = useState("");

const [encrypted, setEncrypted] = useState("");
const [cipherInput, setCipherInput] = useState("");

const [decrypted, setDecrypted] = useState("");

const handleEncrypt = async () => {


if (!text) {
  alert("Enter text to encrypt");
  return;
}

try {

  const data = await encryptText(text, encryptKey);

  setEncrypted(data.ciphertext);

  // IMPORTANT: do NOT auto-fill decrypt input
  // setCipherInput(data.ciphertext);  ❌ removed

} catch (err) {
  console.error("Encryption failed:", err);
}

};

const handleDecrypt = async () => {


if (!cipherInput) {
  alert("Enter encrypted text first");
  return;
}

try {

  const data = await decryptText(cipherInput, decryptKey);

  setDecrypted(data.text);

} catch (err) {
  console.error("Decryption failed:", err);
}


};

return (


<div className="encrypt-wrapper">

  <div className="encrypt-left">

    <h2>Text Encryption</h2>

    <textarea
      placeholder="Enter any text to be encrypted"
      value={text}
      onChange={(e) => setText(e.target.value)}
    />

    <input
      placeholder="Enter Secret Key"
      value={encryptKey}
      onChange={(e) => setEncryptKey(e.target.value)}
    />

    <button onClick={handleEncrypt}>
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
      placeholder="Enter encrypted text"
      value={cipherInput}
      onChange={(e) => setCipherInput(e.target.value)}
    />

    <input
      placeholder="Enter Secret Key"
      value={decryptKey}
      onChange={(e) => setDecryptKey(e.target.value)}
    />

    <button onClick={handleDecrypt}>
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

export default Notes;
