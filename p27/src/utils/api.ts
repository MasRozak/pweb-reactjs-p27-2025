// src/utils/api.ts
import axios from 'axios';
import { getToken, removeAuthData } from './token'; // (File ini sudah kamu punya)

const api = axios.create({
  baseURL: 'http://localhost:8080', // Base URL backend-mu
});

// Interceptor untuk MENYISIPKAN token ke setiap request
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor untuk MENANGANI token expired
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Jika token expired (401), otomatis logout
    if (error.response && error.response.status === 401) {
      removeAuthData(); // Hapus token
      window.location.href = '/login'; // Redirect ke login
    }
    return Promise.reject(error);
  }
);

export default api;