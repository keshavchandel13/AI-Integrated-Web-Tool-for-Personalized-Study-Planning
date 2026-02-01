import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
});

api.interceptors.request.use(
  (config) => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const user = JSON.parse(storedUser);
      const token = user.access_token;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      console.log("JWT expired → logging out");

      localStorage.removeItem("user");
      window.location.href = "/";
    }

    return Promise.reject(err);
  }
);

export default api;
