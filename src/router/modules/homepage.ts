import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/homepage/HomePage.vue'; // 导入 HomePage.vue

const routes = [
	{
		path: '/', // 主页路径
		name: 'HomePage', // 路由名称
		component: HomePage, // 指定对应的组件
	},
	// 可以在此处继续添加其他路由配置
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

export default router;