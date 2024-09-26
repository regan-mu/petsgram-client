import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { ACCESS_TOKEN } from "../constants";

const API: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});


API.interceptors.request.use((config: InternalAxiosRequestConfig) => {
        const token: string | null = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    },
    error => Promise.reject(error)
);

export default API;