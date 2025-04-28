<template>
  <v-app-bar
    color="white"
    elevation="1"
    border
  >
    <template v-slot:prepend>
      <router-link to="/" class="text-decoration-none">
        <div class="d-flex align-center">
          <v-img
            src="/logo.png"
            alt="GoMall Logo"
            width="36"
            height="36"
            class="mr-2"
          />
          <span class="text-h6 font-weight-bold text-primary">GoMall</span>
        </div>
      </router-link>
    </template>

    <!-- 导航区域 -->
    <div class="ml-4">
      <v-btn
        variant="text"
        to="/products"
        class="text-body-1"
      >
        全部商品
      </v-btn>
      <v-btn
        variant="text"
        to="/products?category=电子产品"
        class="text-body-1"
      >
        电子产品
      </v-btn>
      <v-btn
        variant="text"
        to="/products?category=服装"
        class="text-body-1"
      >
        服装
      </v-btn>
      <v-btn
        variant="text"
        to="/products?category=家居"
        class="text-body-1"
      >
        家居
      </v-btn>
    </div>

    <v-spacer></v-spacer>

    <!-- 搜索框 -->
    <v-text-field
      v-model="searchQuery"
      density="compact"
      variant="solo"
      hide-details
      prepend-inner-icon="mdi-magnify"
      placeholder="搜索商品"
      class="header-search mx-4"
      single-line
      @keyup.enter="handleSearch"
    ></v-text-field>

    <!-- 用户菜单 -->
    <div class="d-flex align-center">
      <!-- 购物车按钮 -->
      <div class="cart-wrapper">
        <v-btn
          variant="text"
          icon="mdi-cart-outline"
          :badge="cartItemCount > 0 ? cartItemCount.toString() : undefined"
          :badge-color="cartItemCount > 0 ? 'primary' : undefined"
          to="/cart"
          class="mx-2"
        ></v-btn>
        
        <!-- 购物车悬浮提示 -->
        <div class="cart-tooltip" v-if="lastAddedItem">
          <div class="cart-tooltip-header">
            <v-icon icon="mdi-check-circle" color="success" size="small" class="mr-1"></v-icon>
            <span>已加入购物车</span>
          </div>
          <div class="cart-tooltip-content">
            <v-img
              :src="lastAddedItem.imageUrl"
              width="50"
              height="50"
              class="rounded mr-2"
            ></v-img>
            <div class="flex-grow-1">
              <div class="text-subtitle-2 text-truncate">{{ lastAddedItem.productName }}</div>
              <div class="text-caption">数量: {{ lastAddedItem.quantity }}</div>
            </div>
          </div>
          <div class="cart-tooltip-footer">
            <v-btn
              variant="text"
              to="/cart"
              size="small"
              color="primary"
              class="px-2"
            >
              查看购物车
            </v-btn>
          </div>
        </div>
      </div>

      <!-- 已登录状态 -->
      <div v-if="isLoggedIn">
        <v-menu
          v-model="userMenu"
          :close-on-content-click="false"
          location="bottom end"
          offset="5"
        >
          <template v-slot:activator="{ props }">
            <v-btn
              class="ml-2"
              v-bind="props"
              variant="text"
            >
              <v-avatar
                :image="userAvatar || undefined"
                color="primary"
                size="32"
                class="mr-2 user-avatar"
                :class="{'animated-avatar': showAvatarAnimation}"
              >
                <span class="text-white">{{ userNameInitial }}</span>
              </v-avatar>
              <span>{{ userName }}</span>
              <v-icon icon="mdi-chevron-down" size="small" class="ml-1"></v-icon>
            </v-btn>
          </template>

          <v-card min-width="200" class="user-menu-card">
            <v-list>
              <v-list-item prepend-icon="mdi-account" title="个人中心" to="/profile"></v-list-item>
              <v-list-item prepend-icon="mdi-history" title="我的订单" to="/orders"></v-list-item>
              <v-list-item prepend-icon="mdi-heart" title="我的收藏" to="/favorites"></v-list-item>
              <v-divider></v-divider>
              <v-list-item prepend-icon="mdi-logout" title="退出登录" @click="handleLogout"></v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </div>

      <!-- 未登录状态 -->
      <div v-else>
        <v-btn
          variant="outlined"
          to="/login"
          color="primary"
          class="login-btn ml-2"
          prepend-icon="mdi-account-outline"
        >
          登录/注册
        </v-btn>
      </div>
    </div>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref, computed, watch, onBeforeUnmount, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cart';

// 定义类型
interface LastAddedItem {
  productName: string;
  quantity: number;
  imageUrl: string;
}

const router = useRouter();
const authStore = useAuthStore();
const cartStore = useCartStore();

// 状态
const searchQuery = ref('');
const userMenu = ref(false);
let cartTooltipTimer: number | null = null;
const showAvatarAnimation = ref(false);

// 计算属性
const isLoggedIn = computed(() => authStore.isAuthenticated);
const userName = computed(() => authStore.user?.name || '用户');
const userNameInitial = computed(() => {
  return userName.value ? userName.value.charAt(0).toUpperCase() : 'U';
});
const userAvatar = computed(() => authStore.user?.avatar);
const cartItemCount = computed(() => cartStore.itemCount);
const lastAddedItem = computed(() => cartStore.lastAddedItem as LastAddedItem | null);

// 监听最后添加的商品，显示提示
watch(lastAddedItem, (newValue) => {
  if (newValue) {
    // 清除之前的定时器
    if (cartTooltipTimer) {
      clearTimeout(cartTooltipTimer);
    }
    
    // 设置新的定时器，3秒后隐藏提示
    cartTooltipTimer = window.setTimeout(() => {
      cartStore.clearLastAddedItem();
    }, 3000);
  }
});

// 监听登录状态变化，显示头像动画
watch(isLoggedIn, (newValue, oldValue) => {
  if (newValue && !oldValue) {
    showAvatarAnimation.value = true;
    
    setTimeout(() => {
      showAvatarAnimation.value = false;
    }, 2000);
  }
});

// 处理搜索
const handleSearch = () => {
  if (!searchQuery.value.trim()) return;
  
  router.push({
    path: '/products',
    query: { keyword: searchQuery.value }
  });
  
  searchQuery.value = '';
};

// 处理退出登录
const handleLogout = () => {
  authStore.logout();
  userMenu.value = false;
  router.push('/');
};

// 组件卸载前清除定时器
onBeforeUnmount(() => {
  if (cartTooltipTimer) {
    clearTimeout(cartTooltipTimer);
  }
});

// 模拟登录状态（仅用于演示）
onMounted(() => {
  // 如果需要模拟登录状态，可以取消下面的注释
  /*
  if (!authStore.isAuthenticated) {
    authStore.login({
      id: 1,
      name: '张三',
      email: 'zhangsan@example.com',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    });
  }
  */
});
</script>

<style scoped>
.header-search {
  max-width: 300px;
}

.cart-wrapper {
  position: relative;
}

.cart-tooltip {
  position: absolute;
  top: 100%;
  right: 0;
  width: 250px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
  margin-top: 8px;
  overflow: hidden;
  animation: fadeIn 0.2s ease-in-out;
}

.cart-tooltip-header {
  padding: 8px 12px;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
}

.cart-tooltip-content {
  padding: 12px;
  display: flex;
  align-items: center;
}

.cart-tooltip-footer {
  display: flex;
  justify-content: flex-end;
  padding: 8px 12px;
  background-color: #f5f5f5;
}

/* 用户头像动画 */
.animated-avatar {
  animation: pulse 1.5s ease-in-out;
}

/* 用户菜单卡片效果 */
.user-menu-card {
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

.user-menu-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* 登录按钮效果 */
.login-btn {
  transition: transform 0.2s, box-shadow 0.2s;
  overflow: hidden;
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(25, 118, 210, 0.3);
}

.login-btn::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px;
  height: 5px;
  background: rgba(255, 255, 255, 0.7);
  opacity: 0;
  border-radius: 100%;
  transform: scale(1, 1) translate(-50%);
  transform-origin: 50% 50%;
}

.login-btn:hover::after {
  animation: ripple 1s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(25, 118, 210, 0.7);
  }
  
  70% {
    transform: scale(1.1);
    box-shadow: 0 0 0 10px rgba(25, 118, 210, 0);
  }
  
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(25, 118, 210, 0);
  }
}

@keyframes ripple {
  0% {
    transform: scale(0, 0);
    opacity: 0.5;
  }
  20% {
    transform: scale(25, 25);
    opacity: 0.3;
  }
  100% {
    opacity: 0;
    transform: scale(40, 40);
  }
}
</style>
