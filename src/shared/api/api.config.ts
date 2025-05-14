import axios from "axios";

export const apiInstance = axios.create({
  baseURL: `${import.meta.env.PROD ? "http://188.68.221.127" : "http://localhost:8080"}/api`,
  withCredentials: true,
});

const refreshToken = async () => {
  return await apiInstance.post("/auth/refresh");
};

apiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = { ...error.config };
    if (error.response?.status === 401 && !originalRequest._retry) {
      try {
        originalRequest._retry = true;
        await refreshToken();
        return apiInstance.request(originalRequest);
      } catch {
        throw error;
      }
    }
    throw error;
  },
);
