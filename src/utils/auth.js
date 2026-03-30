export const authFetch = async (url, options = {}) => {

  const token = localStorage.getItem("access_token");
  const sessionId = localStorage.getItem("session_id");

  console.log("AUTH FETCH TOKEN:", token);
  console.log("AUTH FETCH SESSION:", sessionId);

  const res = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
      "X-Session-ID": sessionId,
    },
  });

  console.log("STATUS:", res.status);

  if (res.status === 401) {
    console.log(" AUTO LOGOUT TRIGGERED");

    localStorage.clear(); // better

    alert("Session expired. Please login again.");

    window.location.href = "/"; 

    return null;
  }

  return res;
};