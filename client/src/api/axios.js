import axios from "axios";

const instance = axios.create({
  baseURL: "http://13.127.127.131:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      console.error("Authentication error:", error);
    }
    return Promise.reject(error);
  }
);

export default instance;
