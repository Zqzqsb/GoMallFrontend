<template>
    <div class="d-flex align-center gap-4 reveal-element">
        <v-carousel
            v-model="activeSlide"
            cycle
            height="300"
            hide-delimiter-background
            :show-arrows="false"
            interval="5000"
            class="tech-carousel flex-grow-1"
            @mouseenter="pauseCarousel"
            @mouseleave="resumeCarousel"
            hide-delimiters
            :touch="false"
        >
            <v-carousel-item
                v-for="(stack, i) in techStacks"
                :key="i"
                transition="fade-transition"
                reverse-transition="fade-transition"
            >
                <v-card class="mx-auto tech-card h-100" max-width="800">
                    <v-card-item>
                        <v-card-title class="text-h4 mb-4 text-white">
                            {{ stack.title }}
                        </v-card-title>
                        <v-card-subtitle class="text-h6 mb-4">
                            {{ stack.description }}
                        </v-card-subtitle>
                        <v-card-text>
                            <v-row>
                                <v-col
                                    v-for="(tech, index) in stack.items"
                                    :key="index"
                                    cols="12"
                                    sm="6"
                                    class="d-flex align-center"
                                >
                                    <v-icon color="white" class="mr-2">
                                        {{ tech.icon }}
                                    </v-icon>
                                    <div>
                                        <div class="text-h6 text-white">{{ tech.name }}</div>
                                        <div class="text-body-2">{{ tech.description }}</div>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card-item>
                </v-card>
            </v-carousel-item>
        </v-carousel>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const activeSlide = ref(0);
const carouselInterval = ref(null);

const techStacks = [
    {
        title: '后端技术栈',
        description: '高性能微服务架构',
        items: [
            { icon: 'mdi-language-go', name: 'Go', description: '高性能后端开发语言' },
            { icon: 'mdi-server', name: 'Hertz & Kitex', description: '高性能 RPC 框架' },
            { icon: 'mdi-database', name: 'GORM & Redis', description: '数据持久化解决方案' },
            { icon: 'mdi-cloud-sync', name: 'Consul', description: '服务注册与发现' }
        ]
    },
    {
        title: '前端技术栈',
        description: '现代化的用户界面',
        items: [
            { icon: 'mdi-vuejs', name: 'Vue 3', description: '渐进式 JavaScript 框架' },
            { icon: 'mdi-language-typescript', name: 'TypeScript', description: '类型安全的开发体验' },
            { icon: 'mdi-material-design', name: 'Vuetify', description: 'Material Design 组件库' },
            { icon: 'mdi-flash', name: 'Vite', description: '下一代前端构建工具' }
        ]
    },
    {
        title: '微服务治理',
        description: '完整的服务治理方案',
        items: [
            { icon: 'mdi-eye-outline', name: 'OpenTelemetry', description: '分布式追踪系统' },
            { icon: 'mdi-shield-check', name: 'Sentinel', description: '服务容错保护' },
            { icon: 'mdi-scale-balance', name: 'Load Balancing', description: '智能负载均衡' },
            { icon: 'mdi-chart-line', name: 'Monitoring', description: '服务监控告警' }
        ]
    }
];

const pauseCarousel = () => {
    if (carouselInterval.value) {
        clearInterval(carouselInterval.value);
    }
};

const resumeCarousel = () => {
    carouselInterval.value = setInterval(() => {
        activeSlide.value = (activeSlide.value + 1) % techStacks.length;
    }, 5000);
};

onMounted(() => {
    resumeCarousel();
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-element').forEach(el => {
        observer.observe(el);
    });
});

onUnmounted(() => {
    if (carouselInterval.value) {
        clearInterval(carouselInterval.value);
    }
});
</script>

<style scoped>
.tech-carousel {
    background: transparent;
}

.tech-card {
    background: rgba(42, 90, 158, 0.6);
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.1);
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

:deep(.fade-transition-enter-active),
:deep(.fade-transition-leave-active) {
    transition: opacity 0.5s ease;
}

:deep(.fade-transition-enter-from),
:deep(.fade-transition-leave-to) {
    opacity: 0;
}

:deep(.v-card-title) {
    font-weight: 700;
    color: white !important;
}

:deep(.v-card-subtitle) {
    color: rgba(255, 255, 255, 0.9) !important;
    font-weight: 500;
}

:deep(.v-card-text) {
    color: rgba(255, 255, 255, 1) !important;
    font-weight: 500;
}

:deep(.text-h6) {
    font-weight: 700;
}

:deep(.text-body-2) {
    font-weight: 500;
}
</style>
