<template>
  <div>
    <v-dialog v-model="showLoginError" persistent max-width="500">
      <v-card class="login-error-card">
        <v-card-item>
          <div class="d-flex flex-column align-center pa-4">
            <v-avatar color="error" size="64" class="mb-4">
              <v-icon icon="mdi-account-lock" size="32" color="white"></v-icon>
            </v-avatar>
            
            <v-card-title class="text-h5 mb-2 text-center">登录服务暂时不可用</v-card-title>
            
            <v-card-text class="text-center">
              <p class="text-body-1 mb-3">抱歉，登录系统目前遇到了问题，我们正在紧急修复中。</p>
              <p class="text-body-2 mb-4 text-grey-darken-1">
                您仍然可以浏览商城的大部分功能，但暂时无法登录或注册新账户。
              </p>
              
              <v-alert
                type="info"
                variant="tonal"
                class="mb-4 text-left"
                icon="mdi-information-outline"
                density="compact"
              >
                服务预计恢复时间：{{ expectedRecoveryTime }}
              </v-alert>
            </v-card-text>
            
            <v-card-actions class="d-flex flex-column gap-2">
              <v-btn 
                color="primary" 
                variant="elevated" 
                prepend-icon="mdi-reload" 
                block
                @click="retryLoginService"
                :loading="isRetrying"
              >
                重试登录
              </v-btn>
              
              <v-btn
                variant="tonal"
                color="secondary"
                block
                @click="continueAnyway"
                class="mt-2"
              >
                以游客身份继续
              </v-btn>
              
              <v-btn 
                variant="text" 
                block
                @click="redirectToHelp"
                class="mt-2"
              >
                查看帮助与常见问题
              </v-btn>
            </v-card-actions>
          </div>
        </v-card-item>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { checkAuthServiceStatus } from '@/apis/auth';

const router = useRouter();
const showLoginError = ref(false);
const isRetrying = ref(false);
const retryCount = ref(0);
const lastErrorTime = ref(Date.now());

// 预计恢复时间（当前时间+30分钟）
const expectedRecoveryTime = computed(() => {
  const recoveryDate = new Date(lastErrorTime.value + 30 * 60 * 1000);
  return recoveryDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
});

// 检测登录服务故障
const detectLoginServiceFailure = async (): Promise<boolean> => {
  // 使用auth API提供的服务状态检查
  const isLoginServiceAvailable = await checkAuthServiceStatus();
  
  if (!isLoginServiceAvailable) {
    lastErrorTime.value = Date.now();
    showLoginError.value = true;
    return false;
  }
  
  return true;
};

// 重试登录服务
const retryLoginService = async () => {
  isRetrying.value = true;
  retryCount.value++;
  
  try {
    const isAvailable = await checkAuthServiceStatus();
    
    if (isAvailable) {
      showLoginError.value = false;
      // 成功后重定向到登录页
      router.push('/login');
    } else {
      // 如果失败次数过多，建议用户稍后再试
      if (retryCount.value >= 3) {
        // 可以在这里显示额外提示
      }
    }
  } catch (error) {
    console.error('Retry login service failed:', error);
  } finally {
    isRetrying.value = false;
  }
};

// 继续以游客身份浏览
const continueAnyway = () => {
  showLoginError.value = false;
  // 可以设置一个本地标记，表示用户选择了游客模式
  localStorage.setItem('guestMode', 'true');
  // 重定向到首页
  router.push('/');
};

// 重定向到帮助页面
const redirectToHelp = () => {
  router.push('/help/login-issues');
};

// 使用defineExpose暴露方法和属性，而不是使用export
defineExpose({
  detectLoginServiceFailure,
  showLoginError
});
</script>

<style scoped>
.login-error-card {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  animation: fadeInUp 0.4s ease-out;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
