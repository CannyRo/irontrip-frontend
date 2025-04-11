import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;
const api = axios.create({ baseURL: baseURL || "http://localhost:5005" });

api.interceptors.request.use((config) => {
  const storedToken = localStorage.getItem("authToken");
  if (storedToken) {
    config.headers.Authorization = `Bearer ${storedToken}`;
  }
  return config;
});

export async function signup(requestBody) {
  return api.post("/auth/signup", requestBody);
}

export async function login(requestBody) {
  return api.post("/auth/login", requestBody);
}

export async function verify() {
  return api.get("/auth/verify");
}

export function logout() {
  localStorage.removeItem("authToken");
}
