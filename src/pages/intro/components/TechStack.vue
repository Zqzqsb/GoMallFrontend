<template>
	<div class="tech-stack reveal-element">
		<div class="carousel-container">
			<v-carousel
				v-model="activeSlide"
				cycle
				height="auto"
				hide-delimiter-background
				:show-arrows="false"
				:interval="6000"
				class="tech-carousel"
				@mouseenter="pauseCarousel"
				@mouseleave="resumeCarousel"
				hide-delimiters
				:continuous="false"
				:touch="false"
			>
				<v-carousel-item
					v-for="(stack, i) in techStacks"
					:key="i"
					:value="i"
				>
					<transition name="fade" mode="out-in">
						<v-card class="mx-auto h-100" max-width="1400">
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
											md="4"
											class="d-flex align-center px-3 py-2"
										>
											<div
												class="tech-item d-flex align-center"
											>
												<div class="tech-icon-wrapper">
													<v-icon
														size="32"
														color="white"
													>
														{{ tech.icon }}
													</v-icon>
												</div>
												<div class="tech-content">
													<div class="tech-name">
														{{ tech.name }}
													</div>
													<div
														class="tech-description"
													>
														{{ tech.description }}
													</div>
												</div>
											</div>
										</v-col>
									</v-row>
								</v-card-text>
							</v-card-item>
						</v-card>
					</transition>
				</v-carousel-item>
			</v-carousel>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const activeSlide = ref(0);
let intervalId = null;

const techStacks = [
	{
		title: '前端技术栈',
		description: '现代化的前端开发技术和框架',
		items: [
			{
				name: 'Vue 3',
				icon: 'mdi-vuejs',
				description: '渐进式 JavaScript 框架',
			},
			{
				name: 'Vuetify',
				icon: 'mdi-view-dashboard',
				description: '材料设计组件框架',
			},
			{
				name: 'TailwindCSS',
				icon: 'mdi-palette',
				description: '原子化 CSS 框架',
			},
			{
				name: 'Ant Design Vue',
				icon: 'mdi-alpha-a',
				description: '企业级 UI 组件库',
			},
			{
				name: 'Vite',
				icon: 'mdi-lightning-bolt',
				description: '下一代前端构建工具',
			},
			{
				name: 'TypeScript',
				icon: 'mdi-language-typescript',
				description: '类型安全的 JavaScript',
			},
		],
	},
	{
		title: '后端技术栈',
		description: '高性能的后端服务和中间件',
		items: [
			{
				name: 'Go',
				icon: 'mdi-language-go',
				description: '高性能编程语言',
			},
			{
				name: 'CWGO',
				icon: 'mdi-server',
				description: '微服务快速开发框架',
			},
			{
				name: 'Kitex',
				icon: 'mdi-connection',
				description: '高性能 RPC 框架',
			},
			{
				name: 'Hertz',
				icon: 'mdi-flash',
				description: 'HTTP 框架引擎',
			},
			{
				name: 'Consul',
				icon: 'mdi-cloud-search',
				description: '服务发现和配置',
			},
			{
				name: 'Casbin',
				icon: 'mdi-shield-check',
				description: '权限访问控制框架',
			},
		],
	},
	{
		title: '服务治理',
		description: '完整的微服务治理解决方案',
		items: [
			{
				name: 'OpenTelemetry',
				icon: 'mdi-chart-timeline',
				description: '分布式追踪系统',
			},
			{
				name: 'Prometheus',
				icon: 'mdi-chart-bar',
				description: '监控告警平台',
			},
			{
				name: 'Sentinel',
				icon: 'mdi-shield-half-full',
				description: '流量控制组件',
			},
			{
				name: 'ELK Stack',
				icon: 'mdi-file-search',
				description: '日志分析平台',
			},
			{
				name: 'Kong Gateway',
				icon: 'mdi-gate',
				description: 'API 网关服务',
			},
			{
				name: 'Apollo',
				icon: 'mdi-cog-sync',
				description: '配置中心服务',
			},
		],
	},
	{
		title: '数据存储与中间件',
		description: '可靠的数据存储和消息队列解决方案',
		items: [
			{
				name: 'MySQL',
				icon: 'mdi-database',
				description: '关系型数据库',
			},
			{
				name: 'Redis',
				icon: 'mdi-database-clock',
				description: '内存数据存储',
			},
			{
				name: 'Bitcask',
				icon: 'mdi-database-lock',
				description: '高性能键值存储',
			},
			{
				name: 'RocketMQ',
				icon: 'mdi-rocket',
				description: '分布式消息队列',
			},
			{
				name: 'MinIO',
				icon: 'mdi-folder-multiple',
				description: '对象存储服务',
			},
			{
				name: 'Elasticsearch',
				icon: 'mdi-magnify',
				description: '搜索引擎',
			},
		],
	},
];

const pauseCarousel = () => {
	if (intervalId) {
		clearInterval(intervalId);
		intervalId = null;
	}
};

const resumeCarousel = () => {
	pauseCarousel(); // 先清除可能存在的定时器
	intervalId = setInterval(() => {
		activeSlide.value = (activeSlide.value + 1) % techStacks.length;
	}, 6000);
};

onMounted(() => {
	resumeCarousel();
});

onUnmounted(() => {
	pauseCarousel();
});
</script>

<style scoped>
.tech-stack {
	position: relative;
	min-width: 800px;
	max-width: 1400px;
	margin: 0 auto;
}

.carousel-container {
	position: relative;
	overflow: hidden;
	padding: 24px;
	border-radius: 8px;
	background: rgba(255, 255, 255, 0.05);
}

.tech-item {
	width: 100%;
	height: 90px;
	padding: 16px;
	border-radius: 8px;
	background: rgba(255, 255, 255, 0.05);
	transition: all 0.3s ease;
	display: flex;
	align-items: center;
}

.tech-item:hover {
	background: rgba(255, 255, 255, 0.1);
	transform: translateY(-2px);
}

.tech-icon-wrapper {
	width: 48px;
	height: 48px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 16px;
	flex-shrink: 0;
}

.tech-content {
	flex-grow: 1;
	min-width: 0;
}

.tech-name {
	font-size: 1.1rem;
	font-weight: 700;
	color: white;
	margin-bottom: 4px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.tech-description {
	font-size: 0.875rem;
	color: rgba(255, 255, 255, 0.9);
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.tech-carousel {
	background: transparent;
}

:deep(.v-window__container) {
	height: auto !important;
}

:deep(.v-window-item) {
	height: auto !important;
	will-change: opacity;
	backface-visibility: hidden;
}

:deep(.v-window-item--active) {
	position: relative;
	overflow: hidden;
	contain: layout;
}

:deep(.v-card) {
	transform: translateZ(0);
	contain: content;
}

:deep(.v-card) {
	background: transparent !important;
	box-shadow: none !important;
}

:deep(.text-h4) {
	font-size: 1.75rem !important;
	font-weight: 700 !important;
	color: white !important;
}

:deep(.v-card-subtitle) {
	font-size: 1.1rem !important;
	color: rgba(255, 255, 255, 0.9) !important;
	margin-bottom: 24px !important;
}

:deep(.v-card-item) {
	padding: 16px 24px;
}

:deep(.v-row) {
	margin: 0 -12px;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

:deep(.v-carousel__controls) {
	background: transparent;
}
</style>
