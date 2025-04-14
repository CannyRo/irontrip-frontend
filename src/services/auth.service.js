import api from "./api"; 

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
