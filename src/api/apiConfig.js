import axios from "axios";
import { DASHBOARD_URL } from "../constants/siteData";
import { AUTH_TOKEN_STORAGE_KEY } from "../constants/auth";

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").replace(
  /\/+$/,
  "",
);

if (!API_BASE_URL) {
  throw new Error("Missing VITE_API_BASE_URL. Set it in your .env.");
}

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      const hadToken = Boolean(localStorage.getItem(AUTH_TOKEN_STORAGE_KEY));
      const requiresAuth = Boolean(error.config?.meta?.requiresAuth);
      localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);

      if (hadToken && requiresAuth) {
        window.location.href = `${DASHBOARD_URL}/sign-in`;
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;
