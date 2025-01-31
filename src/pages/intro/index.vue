<template>
    <v-app>
        <div class="intro-page">
            <!-- 背景动画 -->
            <div class="intro-background">
                <div class="animated-gradient"></div>
            </div>

            <!-- 顶部导航 -->
            <v-app-bar flat color="transparent" class="intro-header">
                <v-btn
                    color="white"
                    variant="text"
                    to="/homepage"
                    prepend-icon="mdi-arrow-left"
                >
                    返回首页
                </v-btn>
            </v-app-bar>

            <!-- 主要内容 -->
            <v-main>
                <v-container class="fill-height">
                    <v-row justify="center" align="center">
                        <v-col cols="12" md="10" lg="8">
                            <!-- 项目标题 -->
                            <div class="text-center mb-16 project-title">
                                <h1 class="text-h2 font-weight-bold text-white mb-4">
                                    TikTok E-Commerce
                                </h1>
                                <div class="text-h5 text-white text-opacity-70">
                                    字节跳动青训营电商项目
                                </div>
                            </div>

                            <!-- 项目信息卡片 -->
                            <v-row>
                                <v-col cols="12" md="6">
                                    <v-card
                                        class="info-card mb-6"
                                        elevation="8"
                                        theme="dark"
                                    >
                                        <v-card-title class="text-h5 font-weight-bold">
                                            <v-icon color="primary" class="mr-2">mdi-lightbulb</v-icon>
                                            项目愿景
                                        </v-card-title>
                                        <v-card-text class="text-body-1">
                                            通过实践课程中学习的知识点，包括Go语言编程、常用框架、数据库、对象存储，服务治理，服务上云等内容，深入了解开发工作，促进个人技术成长。
                                        </v-card-text>
                                    </v-card>

                                    <v-card
                                        class="info-card mb-6"
                                        elevation="8"
                                        theme="dark"
                                    >
                                        <v-card-title class="text-h5 font-weight-bold">
                                            <v-icon color="primary" class="mr-2">mdi-target</v-icon>
                                            项目目标
                                        </v-card-title>
                                        <v-card-text class="text-body-1">
                                            打造一个具有影响力的社交电商平台，为用户提供便捷、优质的购物环境，满足用户多样化的购物需求，提升抖音在电商领域的市场竞争力。
                                        </v-card-text>
                                    </v-card>
                                </v-col>

                                <v-col cols="12" md="6">
                                    <v-card
                                        class="info-card mb-6"
                                        elevation="8"
                                        theme="dark"
                                    >
                                        <v-card-title class="text-h5 font-weight-bold">
                                            <v-icon color="primary" class="mr-2">mdi-code-tags</v-icon>
                                            技术栈
                                        </v-card-title>
                                        <v-card-text>
                                            <v-chip-group>
                                                <v-chip
                                                    v-for="tech in techStack"
                                                    :key="tech"
                                                    color="primary"
                                                    variant="outlined"
                                                    class="ma-1"
                                                >
                                                    {{ tech }}
                                                </v-chip>
                                            </v-chip-group>
                                        </v-card-text>
                                    </v-card>

                                    <v-card
                                        class="info-card"
                                        elevation="8"
                                        theme="dark"
                                    >
                                        <v-card-title class="text-h5 font-weight-bold">
                                            <v-icon color="primary" class="mr-2">mdi-feature-search</v-icon>
                                            核心功能
                                        </v-card-title>
                                        <v-card-text>
                                            <v-list density="compact" theme="dark">
                                                <v-list-item
                                                    v-for="(feature, index) in features"
                                                    :key="index"
                                                    :prepend-icon="feature.icon"
                                                >
                                                    {{ feature.text }}
                                                </v-list-item>
                                            </v-list>
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-container>
            </v-main>
        </div>
    </v-app>
</template>

<script setup lang="ts">
const techStack = [
    'Go', 'Hertz', 'Kitex', 'Consul', 'OpenTelemetry',
    'Gorm', 'Redis', 'Vue 3', 'Vuetify', 'TypeScript'
];

const features = [
    { icon: 'mdi-account-check', text: '用户认证与授权' },
    { icon: 'mdi-eye', text: '服务可观测性' },
    { icon: 'mdi-shield-check', text: '容错与限流机制' },
    { icon: 'mdi-store', text: '商品管理' },
    { icon: 'mdi-cart', text: '购物车功能' },
    { icon: 'mdi-cash-register', text: '订单处理' }
];
</script>

<style scoped>
.intro-page {
    position: relative;
    min-height: 100vh;
    overflow: hidden;
}

.intro-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    background: linear-gradient(45deg, #1a237e, #0d47a1);
}

.animated-gradient {
    position: absolute;
    width: 200%;
    height: 200%;
    top: -50%;
    left: -50%;
    background: radial-gradient(circle at center,
            rgba(255, 255, 255, 0.1) 0%,
            transparent 50%);
    animation: rotate 30s linear infinite;
}

.intro-header {
    position: relative;
    z-index: 1;
}

.project-title {
    position: relative;
}

.project-title::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, #64b5f6, #2196f3);
    border-radius: 2px;
}

.info-card {
    background: rgba(255, 255, 255, 0.1) !important;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: transform 0.3s ease;
}

.info-card:hover {
    transform: translateY(-5px);
}

@keyframes rotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

:deep(.v-card-title) {
    font-size: 1.5rem !important;
}

:deep(.v-list-item) {
    min-height: 40px;
}
</style>
