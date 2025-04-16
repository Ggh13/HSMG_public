import axios from "axios";
import { handleUnauthorized } from "./authManager/authManager";

export const API_URL = 'http://localhost:8081/api'


const api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 500) {
        handleUnauthorized(); // Используем handleUnauthorized
      }
      return Promise.reject(error);
    }
  );

export default api;