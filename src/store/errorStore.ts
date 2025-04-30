import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { ErrorResponse, NetworkErrorType, errorEventBus } from '@/apis/httpClient';

export const useErrorStore = defineStore('error', () => {
  // 当前错误
  const currentError = ref<ErrorResponse | null>(null);
  
  // 是否显示错误提示
  const showError = ref(false);
  
  // 错误历史记录（最多保存10条）
  const errorHistory = ref<ErrorResponse[]>([]);
  
  // 计算属性：错误是否为服务器错误
  const isServerError = computed(() => 
    currentError.value?.type === NetworkErrorType.SERVER_ERROR ||
    currentError.value?.status === 500 ||
    currentError.value?.status === 502 ||
    currentError.value?.status === 503 ||
    currentError.value?.status === 504
  );
  
  // 计算属性：错误是否为网络连接问题
  const isNetworkError = computed(() => 
    currentError.value?.type === NetworkErrorType.NETWORK_ERROR ||
    currentError.value?.type === NetworkErrorType.TIMEOUT_ERROR
  );
  
  // 计算属性：是否为认证相关错误
  const isAuthError = computed(() => 
    currentError.value?.status === 401 ||
    currentError.value?.status === 403
  );
  
  // 设置错误
  function setError(error: ErrorResponse) {
    currentError.value = error;
    showError.value = true;
    
    // 添加到历史记录
    errorHistory.value.unshift(error);
    // 只保留最近10条记录
    if (errorHistory.value.length > 10) {
      errorHistory.value = errorHistory.value.slice(0, 10);
    }
    
    // 5秒后自动关闭非严重错误提示
    if (!isServerError.value && !isNetworkError.value) {
      setTimeout(() => {
        showError.value = false;
      }, 5000);
    }
  }
  
  // 清除当前错误
  function clearError() {
    currentError.value = null;
    showError.value = false;
  }
  
  // 清除错误历史记录
  function clearErrorHistory() {
    errorHistory.value = [];
  }
  
  return {
    currentError,
    showError,
    errorHistory,
    isServerError,
    isNetworkError,
    isAuthError,
    setError,
    clearError,
    clearErrorHistory
  };
});
