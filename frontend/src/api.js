import axios from 'axios';

const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api/',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: false
});

// Add request interceptor
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    console.log('API Request:', req.method, req.url, req.data);
    return req;
}, (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
});

// Add response interceptor
API.interceptors.response.use((response) => {
    console.log('API Response:', response.status, response.data);
    return response;
}, (error) => {
    console.error('API Response Error:', error.response?.status, error.response?.data || error.message);
    return Promise.reject(error);
});

export default API;
