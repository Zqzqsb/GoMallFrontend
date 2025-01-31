<template>
    <div class="intro-page">
        <!-- 背景动画 -->
        <Background />

        <v-container class="fill-height">
            <v-row class="fill-height" align="center" justify="center">
                <v-col cols="12" md="12" lg="11" xl="10">
                    <!-- 项目标题和仓库链接 -->
                    <Header />
                    
                    <!-- 项目介绍和功能需求 -->
                    <div class="d-flex gap-4 mb-8">
                        <ProjectInfo class="flex-grow-1" />
                    </div>
                    
                    <!-- 技术栈轮播和进入按钮 -->
                    <div class="d-flex align-center gap-6">
                        <TechStack class="flex-grow-1" />
                        <EnterButton class="flex-shrink-0" />
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script setup>
import Background from './components/Background.vue';
import Header from './components/Header.vue';
import ProjectInfo from './components/ProjectInfo.vue';
import TechStack from './components/TechStack.vue';
import EnterButton from './components/EnterButton.vue';
</script>

<style scoped>
.intro-page {
    position: relative;
    min-height: 100vh;
    background: #1a365d;
    overflow-x: hidden;
}

.v-container {
    position: relative;
    z-index: 1;
    max-width: 2000px;
    padding-left: 24px;
    padding-right: 24px;
}

:deep(.v-btn) {
    text-transform: none;
    font-weight: 700;
    color: white;
}
</style>
