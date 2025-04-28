<template>
  <div class="app-layout">
    <!-- 头部导航 -->
    <AppHeader />
    
    <!-- 主内容区 -->
    <v-main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </v-main>
    
    <!-- 页脚 -->
    <v-footer
      app
      color="white"
      border
      class="py-4"
    >
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <div class="d-flex align-center mb-4">
              <v-img
                src="/logo.png"
                alt="GoMall Logo"
                width="36"
                height="36"
                class="mr-2"
              />
              <span class="text-h6 font-weight-bold text-primary">GoMall</span>
            </div>
            <div class="text-body-2 text-grey">
              GoMall是一款现代化的电子商务平台，提供丰富的商品选择和流畅的购物体验。
            </div>
          </v-col>
          
          <v-col cols="12" md="2">
            <div class="text-subtitle-1 font-weight-bold mb-3">关于我们</div>
            <div class="d-flex flex-column">
              <a href="#" class="text-decoration-none text-body-2 mb-2">公司简介</a>
              <a href="#" class="text-decoration-none text-body-2 mb-2">联系我们</a>
              <a href="#" class="text-decoration-none text-body-2 mb-2">招贤纳士</a>
              <a href="#" class="text-decoration-none text-body-2 mb-2">隐私政策</a>
            </div>
          </v-col>
          
          <v-col cols="12" md="2">
            <div class="text-subtitle-1 font-weight-bold mb-3">客户服务</div>
            <div class="d-flex flex-column">
              <a href="#" class="text-decoration-none text-body-2 mb-2">帮助中心</a>
              <a href="#" class="text-decoration-none text-body-2 mb-2">配送方式</a>
              <a href="#" class="text-decoration-none text-body-2 mb-2">支付方式</a>
              <a href="#" class="text-decoration-none text-body-2 mb-2">售后服务</a>
            </div>
          </v-col>
          
          <v-col cols="12" md="4">
            <div class="text-subtitle-1 font-weight-bold mb-3">联系我们</div>
            <div class="d-flex align-center mb-2">
              <v-icon icon="mdi-phone" size="small" class="mr-2"></v-icon>
              <span class="text-body-2">客服热线: 400-123-4567</span>
            </div>
            <div class="d-flex align-center mb-2">
              <v-icon icon="mdi-email" size="small" class="mr-2"></v-icon>
              <span class="text-body-2">邮箱: support@gomall.com</span>
            </div>
            <div class="d-flex align-center mb-4">
              <v-icon icon="mdi-map-marker" size="small" class="mr-2"></v-icon>
              <span class="text-body-2">地址: 广东省深圳市南山区科技园南区</span>
            </div>
            
            <div class="d-flex">
              <v-btn icon="mdi-wechat" variant="text" color="primary" class="mr-2"></v-btn>
              <v-btn icon="mdi-qqchat" variant="text" color="primary" class="mr-2"></v-btn>
              <v-btn icon="mdi-sina-weibo" variant="text" color="primary" class="mr-2"></v-btn>
              <v-btn icon="mdi-instagram" variant="text" color="primary"></v-btn>
            </div>
          </v-col>
        </v-row>
        
        <v-divider class="my-4"></v-divider>
        
        <div class="text-center text-body-2 text-grey">
          &copy; {{ new Date().getFullYear() }} GoMall. All rights reserved.
        </div>
      </v-container>
    </v-footer>
    
    <!-- 返回顶部按钮 -->
    <v-btn
      v-show="showBackToTop"
      icon="mdi-arrow-up"
      color="primary"
      size="large"
      elevation="3"
      @click="scrollToTop"
      class="back-to-top"
    ></v-btn>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import AppHeader from './AppHeader.vue';

const showBackToTop = ref(false);

// 监听滚动事件，控制返回顶部按钮的显示
const handleScroll = () => {
  showBackToTop.value = window.scrollY > 300;
};

// 返回顶部
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.back-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 99;
}
</style>
