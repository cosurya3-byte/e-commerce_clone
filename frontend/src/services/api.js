/* import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
});

// Automatically add the JWT token to every request if it exists
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API; */

import axios from "axios";

const API = axios.create({
  baseURL: "https://e-commerce-clone-vj0j.onrender.com/api",
});

// This automatically attaches the token to EVERY request you make via 'API'
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
