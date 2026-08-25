import axios from "axios";

const configuredApiUrl = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");
const apiBaseUrl = configuredApiUrl.endsWith("/api/v1")
  ? configuredApiUrl
  : `${configuredApiUrl}/api/v1`;

const api = axios.create({
  baseURL: apiBaseUrl,
});

api.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem("userInfo");
  if (userInfo) {
    const { token } = JSON.parse(userInfo);
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;