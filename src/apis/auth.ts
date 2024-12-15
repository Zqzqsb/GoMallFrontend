import { requestWithDiscovery } from '@/utils/httpWithDiscovery';
// 定义登录请求数据结构
export interface LoginRequest {
	email: string;
	password: string;
}

// 定义登录响应数据结构
export interface LoginResponse {
	user_id: number;
	token: string;
}

// 登录 API（使用服务发现）
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
	return requestWithDiscovery('user-service', '/login', {
		method: 'POST',
		data,
	});
};

// 定义注册请求数据结构
export interface RegisterRequest {
	email: string;
	password: string;
	passwordConfirm: string;
}

// 定义注册响应数据结构
export interface RegisterResponse {
	userId: number;
}

// 注册 API（使用服务发现）
export const register = async (
	data: RegisterRequest
): Promise<RegisterResponse> => {
	return requestWithDiscovery('user-service', '/register', {
		method: 'POST',
		data,
	});
};
