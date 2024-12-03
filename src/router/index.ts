import { createRouter, createWebHistory } from 'vue-router';

// 使用 import.meta.glob 自动加载路由模块
const modules = import.meta.glob('./modules/*.ts', { eager: true }) as Record<
	string,
	any
>;

// 合并所有模块中的路由配置
const routes = Object.values(modules).reduce((acc, module) => {
	return acc.concat(module.routes || []); // 合并每个模块中的 routes 配置
}, []);

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes, // 将合并后的 routes 配置传入
});

export default router;
