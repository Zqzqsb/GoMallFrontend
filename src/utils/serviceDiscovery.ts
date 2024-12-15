import axios from 'axios';

const serviceCache: Record<string, string> = {};

/**
 * 动态获取服务地址
 * @param serviceName 服务名称，例如 "auth-service"
 * @returns {Promise<string>} 服务地址，例如 "http://127.0.0.1:8080"
 */
export async function getServiceUrl(serviceName: string): Promise<string> {
	console.log('serviceName:', serviceName);
	if (serviceCache[serviceName]) {
		return serviceCache[serviceName];
	}

	try {
		const response = await axios.get(
			`/consul/v1/catalog/service/${serviceName}`
		); // Consul 服务发现接口
		if (response.status === 200 && response.data.length > 0) {
			const serviceUrl = `http://${response.data[0].ServiceAddress}:${response.data[0].ServicePort}`;
			serviceCache[serviceName] = serviceUrl;
			return serviceUrl;
		} else {
			throw new Error(`Service URL for ${serviceName} not found`);
		}
	} catch (error) {
		console.error(`Error fetching service URL for ${serviceName}:`, error);
		throw error;
	}
}

/**
 * 清除缓存的服务地址（适用于服务地址失效场景）
 * @param serviceName 服务名称
 */
export function clearServiceCache(serviceName: string) {
	delete serviceCache[serviceName];
}
