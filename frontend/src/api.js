import axios from 'axios';

const API = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: false,
    timeout: 10000 // 10 second timeout
});

// Maximum number of retries for failed requests
const MAX_RETRIES = 2;

// Add request interceptor
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    
    // Initialize retry count for all requests
    if (req._retryCount === undefined) {
        req._retryCount = 0;
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
}, async (error) => {
    const originalRequest = error.config;
    
    // Ensure _retryCount is initialized
    if (originalRequest._retryCount === undefined) {
        originalRequest._retryCount = 0;
    }
    
    // Network errors or server down
    if (error.message === 'Network Error' || !error.response) {
        console.error('Network Error: Unable to connect to API server');
        
        // Check if we should retry
        if (originalRequest._retryCount < MAX_RETRIES) {
            originalRequest._retryCount += 1;
            
            console.log(`Retrying request (${originalRequest._retryCount}/${MAX_RETRIES})...`);
            
            // Wait a bit before retrying (exponential backoff)
            await new Promise(resolve => setTimeout(resolve, 1000 * originalRequest._retryCount));
            
            return API(originalRequest);
        }
    }
    
    // Handle token expiration
    if (error.response && error.response.status === 401 && originalRequest.url !== 'auth/token/refresh/') {
        const refreshToken = localStorage.getItem('refresh');
        
        if (refreshToken && !originalRequest._retry) {
            originalRequest._retry = true;
            
            try {
                const res = await API.post('auth/token/refresh/', { refresh: refreshToken });
                
                if (res.status === 200) {
                    localStorage.setItem('token', res.data.access);
                    
                    // Update header and retry
                    API.defaults.headers.common['Authorization'] = `Bearer ${res.data.access}`;
                    originalRequest.headers['Authorization'] = `Bearer ${res.data.access}`;
                    
                    return API(originalRequest);
                }
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
                // Clear tokens if refresh fails
                localStorage.removeItem('token');
                localStorage.removeItem('refresh');
                localStorage.removeItem('user');
                
                // Redirect to login
                if (window.location.pathname !== '/login') {
                    window.location.href = '/login';
                }
            }
        }
    }
    
    // Handle specific error statuses
    if (error.response) {
        switch (error.response.status) {
            case 404:
                console.error('Resource not found:', originalRequest.url);
                break;
            case 403:
                console.error('Access forbidden:', originalRequest.url);
                break;
            case 500:
                console.error('Server error for:', originalRequest.url);
                break;
            default:
                console.error(`Error ${error.response.status} for:`, originalRequest.url);
        }
    }
    
    console.error('API Response Error:', error.response?.status, error.response?.data || error.message);
    return Promise.reject(error);
});

export default API;
