import React, { useState, useEffect } from "react";
import { encodeText, decodeText } from "./apiService";

function EncodingPage() {

  const [text, setText] = useState("");
  const [encoded, setEncoded] = useState("");
  const [decoded, setDecoded] = useState("");

  // 🔐 Check login on page load
  useEffect(() => {
    const token = localStorage.getItem("access_token");

    console.log("TOKEN ON LOAD:", token); // 🔍 DEBUG

    if (!token) {
      alert("Please login first");
      window.location.href = "/login";
    }
  }, []);

  const handleEncode = async () => {
    try {
      if (!text) {
        alert("Enter text first");
        return;
      }

      console.log("Encoding text:", text); // 🔍 DEBUG

      const data = await encodeText(text);

      console.log("ENCODE RESPONSE:", data); // 🔍 DEBUG

      setEncoded(data.encoded);
      setDecoded("");

    } catch (err) {
      console.error("Encode error:", err);
      alert(err.message || "Encoding failed");
    }
  };

  const handleDecode = async () => {
    try {
      if (!encoded) {
        alert("No encoded text found");
        return;
      }

      console.log("Decoding text:", encoded); // 🔍 DEBUG

      const data = await decodeText(encoded);

      console.log("DECODE RESPONSE:", data); // 🔍 DEBUG

      setDecoded(data.text);

    } catch (err) {
      console.error("Decode error:", err);
      alert(err.message || "Decoding failed");
    }
  };
return (
  
  <div className="encode-container">
    
    <div className="algo-select">
      <label>Supported Encoding :</label>

      <select>
        <option value="Base64">Base64</option>
      </select>
    </div>
    {/* 🔐 ENCODE */}
    <div className="encode-box">
      <h2>🔐 Encode Text</h2>

      <textarea
        placeholder="Enter text to encode..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button className="btn-blue" onClick={handleEncode}>
        Encode
      </button>

      <h3>Encoded Output</h3>

      <textarea value={encoded} readOnly />
    </div>

    {/* 🔓 DECODE */}
    <div className="encode-box">
      <h2>🔓 Decode Text</h2>

      <textarea
        placeholder="Paste encoded text..."
        value={encoded}
        onChange={(e) => setEncoded(e.target.value)}
      />

      <button className="btn-blue" onClick={handleDecode}>
        Decode
      </button>

      <h3>Decoded Output</h3>

      <textarea value={decoded} readOnly />
    </div>

  </div>
);
}

export default EncodingPage;