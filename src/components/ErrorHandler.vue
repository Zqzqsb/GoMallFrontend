<template>
  <div>
    <!-- 全局错误提示 -->
    <v-snackbar
      v-model="errorStore.showError"
      :timeout="isServerError ? -1 : 5000"
      :color="errorColor"
      location="top"
      class="error-snackbar"
    >
      <div class="d-flex align-center">
        <v-icon :icon="errorIcon" class="mr-2" />
        <div>
          <div class="font-weight-medium">{{ errorTitle }}</div>
          <div class="text-caption">{{ errorMessage }}</div>
        </div>
      </div>

      <template v-slot:actions>
        <v-btn
          v-if="isServerError || isNetworkError"
          variant="text"
          @click="reloadPage"
        >
          刷新页面
        </v-btn>
        <v-btn
          variant="text"
          @click="errorStore.clearError"
        >
          关闭
        </v-btn>
      </template>
    </v-snackbar>

    <!-- 严重错误遮罩层 -->
    <div v-if="showErrorOverlay" class="error-overlay">
      <v-card
        max-width="500"
        class="mx-auto pa-4 text-center error-card"
        elevation="5"
      >
        <v-card-item>
          <v-icon
            :icon="errorIcon"
            :color="errorColor"
            size="64"
            class="mb-4"
          ></v-icon>
          <v-card-title class="text-h5 mb-2">{{ errorTitle }}</v-card-title>
          <v-card-text>
            <p class="text-body-1 mb-4">
              {{ errorMessage }}
            </p>
            <p v-if="isServerError" class="text-body-2 text-grey">
              我们的技术团队已收到通知，正在加紧修复。请稍后再试。
            </p>
            <p v-else-if="isNetworkError" class="text-body-2 text-grey">
              请检查您的网络连接并刷新页面，或稍后再试。
            </p>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn
              color="primary"
              variant="elevated"
              @click="reloadPage"
              class="mr-2"
            >
              刷新页面
            </v-btn>
            <v-btn
              variant="outlined"
              @click="goToHomepage"
            >
              返回首页
            </v-btn>
          </v-card-actions>
        </v-card-item>
      </v-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useErrorStore } from '@/store/errorStore';
import { NetworkErrorType, errorEventBus } from '@/apis/httpClient';

const router = useRouter();
const errorStore = useErrorStore();

// 是否显示错误遮罩层
const showErrorOverlay = computed(() => {
  if (!errorStore.showError || !errorStore.currentError) return false;
  
  // 对于服务器错误和网络错误，显示全屏遮罩
  return errorStore.isServerError || errorStore.isNetworkError;
});

// 错误图标
const errorIcon = computed(() => {
  if (!errorStore.currentError) return 'mdi-alert-circle';
  
  switch (errorStore.currentError.type) {
    case NetworkErrorType.SERVER_ERROR:
      return 'mdi-server-off';
    case NetworkErrorType.NETWORK_ERROR:
      return 'mdi-wifi-off';
    case NetworkErrorType.TIMEOUT_ERROR:
      return 'mdi-timer-sand-empty';
    case NetworkErrorType.CLIENT_ERROR:
      return 'mdi-alert-circle';
    default:
      return 'mdi-alert-circle-outline';
  }
});

// 错误颜色
const errorColor = computed(() => {
  if (!errorStore.currentError) return 'error';

  if (errorStore.isServerError) return 'error';
  if (errorStore.isNetworkError) return 'warning';
  
  // 根据状态码选择颜色
  const status = errorStore.currentError.status;
  if (status) {
    if (status === 401 || status === 403) return 'orange-darken-2';
    if (status === 404) return 'blue-grey';
    if (status >= 400 && status < 500) return 'amber-darken-2';
  }
  
  return 'error';
});

// 错误标题
const errorTitle = computed(() => {
  if (!errorStore.currentError) return '发生错误';
  
  if (errorStore.isServerError) return '服务暂时不可用';
  if (errorStore.currentError.type === NetworkErrorType.NETWORK_ERROR) return '网络连接问题';
  if (errorStore.currentError.type === NetworkErrorType.TIMEOUT_ERROR) return '请求超时';
  
  const status = errorStore.currentError.status;
  if (status) {
    if (status === 401) return '未授权访问';
    if (status === 403) return '访问被拒绝';
    if (status === 404) return '资源不存在';
  }
  
  return '请求处理失败';
});

// 错误消息
const errorMessage = computed(() => {
  if (!errorStore.currentError) return '请稍后再试';
  
  // 优先使用错误消息
  return errorStore.currentError.message;
});

// 便捷引用
const isServerError = computed(() => errorStore.isServerError);
const isNetworkError = computed(() => errorStore.isNetworkError);

// 刷新页面
const reloadPage = () => {
  window.location.reload();
};

// 返回首页
const goToHomepage = () => {
  errorStore.clearError();
  router.push('/');
};

// 监听路由变化，清除非严重错误
watch(() => router.currentRoute.value.path, () => {
  if (errorStore.showError && !isServerError.value && !isNetworkError.value) {
    errorStore.clearError();
  }
});

// 错误事件监听
let unsubscribeErrorListener: (() => void) | null = null;

// 组件挂载时设置事件监听
onMounted(() => {
  // 订阅错误事件总线
  unsubscribeErrorListener = errorEventBus.onError((error) => {
    errorStore.setError(error);
  });
});

// 组件卸载时清理事件监听
onUnmounted(() => {
  if (unsubscribeErrorListener) {
    unsubscribeErrorListener();
    unsubscribeErrorListener = null;
  }
});
</script>

<style scoped>
.error-snackbar {
  z-index: 2000;
}

.error-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2001;
}

.error-card {
  animation: fadeIn 0.3s ease-out;
  max-width: 90vw;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
