import axios, { AxiosResponse } from 'axios';

const baseapi = 'http://localhost:8888';
// 定义登录请求的数据结构
export interface LoginRequest {
	email: string;
	password: string;
}

// 定义登录响应的数据结构
export interface LoginResponse {
	user_id: number;
}

// 创建一个登录 API 函数
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
	try {
		// 向后端发起 POST 请求
		const response: AxiosResponse<LoginResponse> = await axios.post(
			baseapi + '/login',
			data
		);

		// 返回响应的数据
		return response.data;
	} catch (error: any) {
		// 错误处理
		if (axios.isAxiosError(error)) {
			// 如果是 Axios 错误，打印错误信息
			console.error('Error with Axios request:', error.message);
		} else {
			// 如果是其他类型的错误，打印错误信息
			console.error('Unknown error:', error);
		}

		throw new Error('Login failed');
	}
};

export interface RegisterRequest {
	email: string;
	password: string;
	passwordConfirm: string;
}

export interface RegisterResponse {
	userId: number;
}

// Register function to call the registration API
export const register = async (
	data: RegisterRequest
): Promise<RegisterResponse> => {
	try {
		const response = await axios.post<RegisterResponse>(
			baseapi + '/register',
			data
		);
		return response.data;
	} catch (error: any) {
		// 错误处理
		if (axios.isAxiosError(error)) {
			// 如果是 Axios 错误，打印错误信息
			console.error('Error with Axios request:', error.message);
		} else {
			// 如果是其他类型的错误，打印错误信息
			console.error('Unknown error:', error);
		}

		throw new Error('Login failed');
	}
};
