import axios, { AxiosRequestConfig } from 'axios';
import { getServiceUrl } from './serviceDiscovery';

/**
 * 动态服务请求
 * @param serviceName 服务名称，例如 "auth-service"
 * @param endpoint 服务接口路径，例如 "/login"
 * @param options 请求配置
 * @returns {Promise<any>} 响应数据
 */
export async function requestWithDiscovery(
	serviceName: string,
	endpoint: string,
	options: AxiosRequestConfig = {}
): Promise<any> {
	try {
		const serviceUrl = await getServiceUrl(serviceName); // 动态获取服务地址
		const url = `${serviceUrl}${endpoint}`; // 构造完整请求 URL
		const response = await axios({ url, ...options });
		return response.data;
	} catch (error) {
		console.error(
			`Error making request to ${serviceName}${endpoint}:`,
			error
		);
		throw error;
	}
}
