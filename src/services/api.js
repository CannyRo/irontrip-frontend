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

export default api;
