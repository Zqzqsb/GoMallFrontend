import axios from 'axios';

const BASE_URL = 'http://192.168.110.112:8888';

// Initialize axios instance with base configuration
const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // Enable sending cookies
});

// Add request interceptor to include CSRF token
api.interceptors.request.use((config) => {
    const csrfToken = localStorage.getItem('csrfToken');
    if (csrfToken) {
        config.headers['csrf'] = csrfToken;
    }
    return config;
});

// Interface definitions
export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    user_id: number;
    token: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    password_confirm: string;
}

export interface RegisterResponse {
    userId: number;
}

// Get CSRF token
export const getCsrfToken = async (): Promise<string> => {
    try {
        const response = await api.get('/hello');
        const token = response.data.RespBody;
        localStorage.setItem('csrfToken', token);
        return token;
    } catch (error) {
        console.error('Failed to get CSRF token:', error);
        throw error;
    }
};

// Login API
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
    try {
        const response = await api.post('/login', data);
        return response.data;
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
};

// Register API
export const register = async (data: RegisterRequest): Promise<RegisterResponse> => {
    try {
        const response = await api.post('/register', data);
        return response.data;
    } catch (error) {
        console.error('Registration failed:', error);
        throw error;
    }
};

// Logout function - clears the JWT cookie
export const logout = async (): Promise<void> => {
    document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    localStorage.removeItem('csrfToken');
};
