<template>
    <v-app>
        <v-main class="auth-layout">
            <!-- 背景装饰 -->
            <div class="auth-background">
                <div class="auth-background-pattern"></div>
                <div class="auth-background-overlay"></div>
            </div>

            <!-- 主要内容区 -->
            <v-container fluid class="fill-height">
                <v-row no-gutters justify="center" align="center">
                    <!-- 左侧品牌区域 -->
                    <v-col cols="12" md="6" class="d-none d-md-flex brand-section">
                        <div class="brand-content text-center">
                            <v-img
                                src="@/assets/images/logo.png"
                                alt="Logo"
                                max-width="200"
                                class="mx-auto mb-8"
                            ></v-img>
                            <h1 class="text-h3 font-weight-bold mb-4 text-primary">
                                欢迎来到 GoMall
                            </h1>
                            <p class="text-body-1 text-medium-emphasis">
                                您的一站式购物平台
                            </p>
                        </div>
                    </v-col>

                    <!-- 右侧内容区域 -->
                    <v-col cols="12" md="6" class="auth-content">
                        <v-sheet
                            width="100%"
                            max-width="480"
                            class="mx-auto pa-8 auth-card"
                            rounded="lg"
                            elevation="4"
                        >
                            <slot></slot>
                        </v-sheet>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script setup lang="ts">
// 组件逻辑
</script>

<style scoped>
.auth-layout {
    position: relative;
    min-height: 100vh;
    background-color: rgb(245, 245, 245);
}

.auth-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 0;
}

.auth-background-pattern {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(45deg, #f3f3f3 25%, transparent 25%),
        linear-gradient(-45deg, #f3f3f3 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, #f3f3f3 75%),
        linear-gradient(-45deg, transparent 75%, #f3f3f3 75%);
    background-size: 20px 20px;
    background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
    opacity: 0.3;
}

.auth-background-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    opacity: 0.1;
}

.brand-section {
    position: relative;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
}

.brand-content {
    color: white;
    max-width: 400px;
}

.auth-content {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    min-height: 100vh;
    padding: 2rem;
}

.auth-card {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
}

@media (max-width: 959px) {
    .auth-content {
        min-height: 100vh;
    }
}
</style>
