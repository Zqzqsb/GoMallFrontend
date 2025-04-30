import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

// 直接使用相对路径，不依赖环境变量
// 这样无论是开发环境还是生产环境，都会使用相对路径，让反向代理处理
const BASE_URL = '/api';

// HTTP状态码对应的友好错误消息
const HTTP_ERROR_MESSAGES: Record<number, string> = {
  400: '请求参数错误，请检查输入',
  401: '未授权，请先登录',
  403: '没有权限访问该资源',
  404: '请求的资源不存在',
  409: '请求冲突，资源可能已存在',
  422: '请求格式正确，但含有语义错误',
  429: '请求过于频繁，请稍后再试',
  500: '服务器内部错误，请稍后再试',
  502: '网关错误，服务暂时不可用',
  503: '服务不可用，请稍后再试',
  504: '网关超时，请稍后再试'
};

// 网络错误类型
export enum NetworkErrorType {
  SERVER_ERROR = 'SERVER_ERROR',
  CLIENT_ERROR = 'CLIENT_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
  TIMEOUT_ERROR = 'TIMEOUT_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

// 错误响应接口
export interface ErrorResponse {
  type: NetworkErrorType;
  status?: number;
  message: string;
  details?: string;
  timestamp: number;
}

// 全局错误事件
export const errorEventBus = {
  // 存储回调函数
  callbacks: [] as ((error: ErrorResponse) => void)[],
  
  // 添加错误处理器
  onError(callback: (error: ErrorResponse) => void) {
    this.callbacks.push(callback);
    return () => {
      // 返回取消订阅函数
      const index = this.callbacks.indexOf(callback);
      if (index !== -1) {
        this.callbacks.splice(index, 1);
      }
    };
  },
  
  // 触发错误事件
  emitError(error: ErrorResponse) {
    this.callbacks.forEach(callback => callback(error));
  }
};

// 创建一个axios实例
const httpClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000, // 15秒超时
  withCredentials: true, // 启用跨域请求时携带凭证
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// 请求拦截器
httpClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 添加CSRF令牌
    const csrfToken = localStorage.getItem('csrfToken');
    if (csrfToken && config.headers) {
      config.headers['csrf'] = csrfToken;
    }
    
    // 添加认证令牌（如果存在）
    const authToken = localStorage.getItem('authToken');
    if (authToken && config.headers) {
      config.headers['Authorization'] = `Bearer ${authToken}`;
    }
    
    return config;
  },
  (error: AxiosError) => {
    // 请求错误处理
    console.error('Request configuration error:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
httpClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // 正常响应处理
    return response;
  },
  (error: AxiosError) => {
    let errorResponse: ErrorResponse = {
      type: NetworkErrorType.UNKNOWN_ERROR,
      message: '未知错误，请稍后重试',
      timestamp: Date.now()
    };
    
    if (error.response) {
      // 服务器返回了错误状态码
      const status = error.response.status;
      errorResponse.status = status;
      
      // 判断错误类型
      if (status >= 500) {
        errorResponse.type = NetworkErrorType.SERVER_ERROR;
      } else if (status >= 400) {
        errorResponse.type = NetworkErrorType.CLIENT_ERROR;
      }
      
      // 设置友好错误消息
      errorResponse.message = HTTP_ERROR_MESSAGES[status] || `请求失败 (${status})`;
      
      // 尝试提取服务器返回的详细错误信息
      try {
        const responseData = error.response.data as any;
        if (responseData && typeof responseData === 'object') {
          if (responseData.message && typeof responseData.message === 'string') {
            errorResponse.details = responseData.message;
          } else if (responseData.error && typeof responseData.error === 'string') {
            errorResponse.details = responseData.error;
          }
        }
      } catch (e) {
        console.error('Error parsing error response:', e);
      }
    } else if (error.request) {
      // 请求已发送但没有收到响应
      if (error.code === 'ECONNABORTED') {
        errorResponse.type = NetworkErrorType.TIMEOUT_ERROR;
        errorResponse.message = '请求超时，请检查网络连接';
      } else {
        errorResponse.type = NetworkErrorType.NETWORK_ERROR;
        errorResponse.message = '无法连接到服务器，请检查网络';
      }
    }
    
    // 通过事件总线广播错误
    errorEventBus.emitError(errorResponse);
    
    return Promise.reject(errorResponse);
  }
);

export default httpClient;
