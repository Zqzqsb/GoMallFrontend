<template>
    <v-app>
        <v-main class="auth-layout">
            <!-- 背景装饰 -->
            <div class="auth-background">
                <div class="auth-background-pattern"></div>
                <div class="auth-background-overlay"></div>
            </div>

            <!-- 主要内容区 -->
            <v-container fluid class="fill-height pa-0">
                <v-row no-gutters class="fill-height">
                    <!-- 左侧品牌区域 -->
                    <v-col cols="12" md="6" class="d-none d-md-flex brand-section">
                        <div class="brand-content">
                            <v-img
                                src="@/assets/images/logo.png"
                                alt="Logo"
                                max-width="200"
                                class="mb-8"
                            ></v-img>
                            <h1 class="text-h3 font-weight-bold mb-4 text-white">
                                欢迎来到 GoMall
                            </h1>
                            <p class="text-h6 text-white text-opacity-75 mb-8">
                                您的一站式购物平台
                            </p>
                            <v-btn
                                color="white"
                                variant="outlined"
                                size="x-large"
                                to="/homepage"
                                class="browse-btn"
                                prepend-icon="mdi-shopping"
                            >
                                随便逛逛
                                <v-icon end icon="mdi-arrow-right" class="ml-2"></v-icon>
                            </v-btn>
                        </div>
                    </v-col>

                    <!-- 右侧内容区域 -->
                    <v-col cols="12" md="6" class="auth-content">
                        <v-sheet
                            width="100%"
                            max-width="480"
                            class="mx-auto auth-card"
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
// No script needed
</script>

<style scoped>
.auth-layout {
    position: relative;
    min-height: 100vh;
    background-color: rgb(245, 245, 245);
    overflow: hidden;
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
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
}

.brand-content {
    max-width: 400px;
    text-align: left;
    padding: 0 3rem;
}

.auth-content {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: transparent;
}

.auth-card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    margin: 2rem;
}

.browse-btn {
    border-width: 2px;
    letter-spacing: 1px;
    text-transform: none;
    font-weight: 500;
    transition: all 0.3s ease;
}

.browse-btn:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateX(5px);
}

@media (max-width: 959px) {
    .auth-content {
        background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    }
    
    .auth-card {
        margin: 1rem;
    }
}
</style>
