import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { getAccessToken, getRefreshToken, setTokens, clearTokens } from "./auth";

const api = axios.create({
  baseURL: "https://nexlearn.noviindusdemosites.in/",
});

api.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = getAccessToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refresh = getRefreshToken();
        const res = await axios.post("https://nexlearn.noviindusdemosites.in/auth/refresh", {
          refresh_token: refresh,
        });
        const { access_token, refresh_token } = res.data as {
          access_token: string;
          refresh_token: string;
        };
        setTokens(access_token, refresh_token);
        if (originalRequest.headers)
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return api(originalRequest);
      } catch (err) {
        clearTokens();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
