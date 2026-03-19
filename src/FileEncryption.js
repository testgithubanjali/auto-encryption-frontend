import React, { useState } from "react";

function FileEncryption() {

const [file, setFile] = useState(null);
const [filename, setFilename] = useState("");

const uploadFile = async () => {


if (!file) {
  alert("Please select a file first");
  return;
}

const formData = new FormData();
formData.append("file", file);

const res = await fetch("http://localhost:8080/encrypt-file", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`
  },
  body: formData
});

const data = await res.json();

console.log("Encrypted file:", data);

setFilename(data.path);


};

const downloadFile = async () => {


if (!filename) {
  alert("No encrypted file available");
  return;
}

const name = filename.split("/").pop();

const res = await fetch(`http://localhost:8080/decrypt-file/${name}`, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`
  }
});

const blob = await res.blob();

const url = window.URL.createObjectURL(blob);

const a = document.createElement("a");
a.href = url;
a.download = name;
a.click();


};

return ( <div className="card">


  <h2>File Encryption</h2>

  <input
    type="file"
    onChange={(e) => setFile(e.target.files[0])}
  />

  <div style={{marginTop:20}}>

    <button onClick={uploadFile}>
      Encrypt File
    </button>

    <button onClick={downloadFile} style={{marginLeft:10}}>
      Decrypt & Download
    </button>

  </div>

  {filename && (
    <p style={{marginTop:20}}>
      Encrypted File: {filename}
    </p>
  )}

</div>


);
}

export default FileEncryption;
