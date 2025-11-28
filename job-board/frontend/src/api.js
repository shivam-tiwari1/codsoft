const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export async function request(path, method = "GET", body = null, isForm = false) {
  const headers = {};
  if (!isForm) headers['Content-Type'] = 'application/json';
  const token = localStorage.getItem('token');
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: isForm ? body : (body ? JSON.stringify(body) : null)
  });
  return res.json();
}
