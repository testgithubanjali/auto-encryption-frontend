// src/apiService.js

const BASE_URL = "http://localhost:8080";

// 🔐 LOGIN
export const login = async (email, password) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.message || "Login failed");
  }

  return data;
};

// 📝 SIGNUP (FIXED)
export const signup = async ({ email, password }) => {
  console.log("Sending signup:", { email, password });

  const response = await fetch(`${BASE_URL}/signup`, {
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

// 🔒 ENCRYPT
export const encryptText = async (text, secretKey) => {
  const token = localStorage.getItem("access_token");

  const response = await fetch(`${BASE_URL}/encrypt`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      text,
      secret_key: secretKey,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Encryption failed");
  }

  return data;
};

// 🔓 DECRYPT
export const decryptText = async (ciphertext, secretKey) => {
  const token = localStorage.getItem("access_token");

  const response = await fetch(`${BASE_URL}/decrypt`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      ciphertext,
      secret_key: secretKey,
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

  const res = await fetch(`${BASE_URL}/encode`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,   // ✅ FIX
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

  const res = await fetch(`${BASE_URL}/decode`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,   // ✅ FIX
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

  const response = await fetch(`${BASE_URL}/users`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch profile");
  }

  return data;
};



