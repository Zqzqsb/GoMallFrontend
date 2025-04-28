import axios from 'axios';

// 直接使用相对路径，不依赖环境变量
// 这样无论是开发环境还是生产环境，都会使用相对路径，让反向代理处理
const BASE_URL = '/api';

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
	code: number; // 响应状态码
	message?: string; // 可选的响应消息
	user_id: number; // 用户ID
	token: string; // 认证token
}

export interface RegisterRequest {
	email: string;
	password: string;
	password_confirm: string;
}

export interface RegisterResponse {
	code?: number; // 可能的响应状态码
	message?: string; // 可能的响应消息
	user_id: number; // 与前端代码一致，使用user_id
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
export const register = async (
	data: RegisterRequest
): Promise<RegisterResponse> => {
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
