<template>
    <v-card class="glass-card mb-8 reveal-element">
        <v-card-item>
            <v-tabs v-model="activeTab" color="white" slider-color="white">
                <v-tab value="background">项目介绍</v-tab>
                <v-tab value="features">功能需求</v-tab>
            </v-tabs>
            
            <v-window v-model="activeTab">
                <v-window-item value="background">
                    <v-card-text class="mt-4">
                        <v-row>
                            <v-col cols="12" md="4">
                                <div class="feature-section h-100">
                                    <h3 class="text-h6 mb-2">项目背景</h3>
                                    <p>随着移动互联网的普及和消费者购物习惯的变化，社交电商呈现出蓬勃发展的趋势。
                                    抖音作为一款拥有庞大用户群体的短视频社交平台，具有巨大的电商潜力。
                                    通过搭建电商平台，抖音可以为用户提供更加丰富的购物体验，同时为商家提供新的销售渠道，
                                    实现用户、商家和平台的多赢局面。</p>
                                </div>
                            </v-col>
                            <v-col cols="12" md="4">
                                <div class="feature-section h-100">
                                    <h3 class="text-h6 mb-2">项目愿景</h3>
                                    <p>希望同学们可以通过完成这个项目切实实践课程中学到的知识点，包括但不限于Go语言编程，
                                    常用框架、数据库、对象存储，服务治理，服务上云等内容，同时对开发工作有更多的深入了解与认识，
                                    长远讲能对大家的个人技术成长或视野有启发。</p>
                                </div>
                            </v-col>
                            <v-col cols="12" md="4">
                                <div class="feature-section h-100">
                                    <h3 class="text-h6 mb-2">项目目标</h3>
                                    <p>打造一个抖音商城，为用户提供便捷、优质的购物环境，满足用户多样化的购物需求，
                                    打造一个具有影响力的社交电商平台，提升抖音在电商领域的市场竞争力。</p>
                                </div>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-window-item>
                
                <v-window-item value="features">
                    <v-card-text class="mt-4">
                        <v-row>
                            <v-col cols="12" md="3">
                                <div class="feature-section h-100">
                                    <h3 class="text-h6 mb-2">注册中心集成</h3>
                                    <ul class="feature-list">
                                        <li>服务注册与发现，支持Consul、Nacos、etcd等</li>
                                        <li>自动注册服务数据</li>
                                    </ul>
                                </div>
                            </v-col>
                            
                            <v-col cols="12" md="3">
                                <div class="feature-section h-100">
                                    <h3 class="text-h6 mb-2">身份认证</h3>
                                    <ul class="feature-list">
                                        <li>支持第三方登录验证框架（CasBin、Satoken等）</li>
                                        <li>可配置的认证白名单</li>
                                        <li>可配置的用户黑名单</li>
                                        <li>基于角色的权限控制</li>
                                        <li>动态权限更新</li>
                                    </ul>
                                </div>
                            </v-col>
                            
                            <v-col cols="12" md="3">
                                <div class="feature-section h-100">
                                    <h3 class="text-h6 mb-2">可观测性</h3>
                                    <ul class="feature-list">
                                        <li>详细的日志记录</li>
                                        <li>实时监控功能</li>
                                        <li>性能分析</li>
                                    </ul>
                                </div>
                            </v-col>
                            
                            <v-col cols="12" md="3">
                                <div class="feature-section h-100">
                                    <h3 class="text-h6 mb-2">高可用设计</h3>
                                    <ul class="feature-list">
                                        <li>服务容错能力</li>
                                        <li>自动服务降级</li>
                                        <li>智能流量控制</li>
                                    </ul>
                                </div>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-window-item>
            </v-window>
        </v-card-item>
    </v-card>
</template>

<script setup>
import { ref } from 'vue';

const activeTab = ref('background');
</script>

<style scoped>
.glass-card {
    background: rgba(42, 90, 158, 0.6) !important;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
}

.glass-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.2);
    background: rgba(42, 90, 158, 0.7) !important;
}

.feature-section {
    color: rgba(255, 255, 255, 1);
    padding: 24px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.05);
    transition: all 0.3s ease;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.feature-section:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
}

.feature-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
    flex-grow: 1;
}

.feature-list li {
    margin-bottom: 12px;
    padding-left: 20px;
    position: relative;
    color: rgba(255, 255, 255, 1);
    font-weight: 500;
    line-height: 1.5;
}

.feature-list li::before {
    content: "•";
    position: absolute;
    left: 0;
    color: rgba(255, 255, 255, 0.8);
}

:deep(.v-tab) {
    color: rgba(255, 255, 255, 0.9);
    text-transform: none;
    font-weight: 500;
    font-size: 1.1rem;
    height: 48px;
}

:deep(.v-tab--selected) {
    color: white;
    font-weight: 700;
}

:deep(.v-window) {
    background: transparent;
}

:deep(.text-body-1) {
    color: white !important;
    font-weight: 500;
    line-height: 1.6;
}

:deep(.text-h6) {
    color: white !important;
    font-weight: 700;
    margin-bottom: 16px;
    font-size: 1.25rem;
}

:deep(.v-card-text) {
    padding: 24px;
}

.reveal-element {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.8s ease;
}

.reveal-active {
    opacity: 1;
    transform: translateY(0);
}
</style>
