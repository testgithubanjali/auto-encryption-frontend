// src/apiService.js

import { authFetch } from "./utils/auth";

const BASE_URL = "http://127.0.0.1:8080";


export const login = async (email, password) => {
  const response = await authFetch("http://127.0.0.1:8080/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Login failed");
  }

  return data;
};

export const signup = async ({ email, password }) => {
  console.log("Sending signup:", { email, password });

  const response = await authFetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("Signup error:", data);
    throw new Error(data.error || data.message || "Signup failed");
  }

  return data;
};

export const encryptText = async (text, keyId) => {
  
  const token = localStorage.getItem("access_token");
  console.log("TOKEN:", token);
  const sessionId = localStorage.getItem("session_id");
   console.log("SESSION ID:", sessionId); 
  const response = await authFetch(`${BASE_URL}/encrypt`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Session-ID": sessionId, 
    },
    body: JSON.stringify({
      text: text,
  secret_key: keyId 
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Encryption failed");
  }

  return data;
};


export const decryptText = async (ciphertext, decryptKey) => {
  const token = localStorage.getItem("access_token");
  console.log("TOKEN:", token);
  const sessionId = localStorage.getItem("session_id");
   console.log("SESSION ID:", sessionId); 
  const response = await authFetch(`${BASE_URL}/decrypt`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Session-ID": sessionId,
    },
    body: JSON.stringify({
      ciphertext,
       secret_key: decryptKey,
      
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Decryption failed");
  }

  return data;
};
export const encodeText = async (text) => {
  const token = localStorage.getItem("access_token");
  console.log("TOKEN:", token);
  const sessionId = localStorage.getItem("session_id");
   console.log("SESSION ID:", sessionId); 

  const res = await authFetch(`${BASE_URL}/encode`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, 
      "X-Session-ID": sessionId,   
    },
    body: JSON.stringify({ text }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Encoding failed");
  }

  return data;
};
export const decodeText = async (encoded) => {
  const token = localStorage.getItem("access_token");
  console.log("TOKEN:", token);
const sessionId = localStorage.getItem("session_id");
 console.log("SESSION ID:", sessionId); 
  const res = await authFetch(`${BASE_URL}/decode`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,   
      "X-Session-ID": sessionId, 
    },
    body: JSON.stringify({ encoded }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Decoding failed");
  }

  return data;
};

export const getProfile = async () => {
  const token = localStorage.getItem("access_token");
  console.log("TOKEN:", token);
  const sessionId = localStorage.getItem("session_id");
   console.log("SESSION ID:", sessionId); 
  const response = await authFetch(`${BASE_URL}/users`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Session-ID": sessionId, 
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch profile");
  }

  return data;
};



