// src/api/axiosInstance.ts
import axios from 'axios';
import { getToken } from '../utils/token'; // (Kamu akan buat file ini)

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 10000,
});

// Interceptor untuk otomatis menyisipkan token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;