const API_BASE = "http://localhost:8080";

// SIGNUP
export async function signup(email, password) {
  const res = await fetch(`${API_BASE}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password
    })
  });

  return res.json();
}

// LOGIN
export async function login(email, password) {
  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password
    })
  });

  return res.json();
}

// GET USER PROFILE
export async function getProfile() {

  const token = localStorage.getItem("token");

  const res = await fetch(`${API_BASE}/users`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  // if server returned a non-2xx status, try to surface the error message
  if (!res.ok) {
    let msg;
    try {
      const data = await res.json();
      msg = data.error || JSON.stringify(data);
    } catch (e) {
      msg = await res.text();
    }
    throw new Error(msg || `Request failed with status ${res.status}`);
  }

  // attempt parsing JSON; if body is empty (e.g. 204) return null
  try {
    return await res.json();
  } catch (e) {
    return null;
  }
}