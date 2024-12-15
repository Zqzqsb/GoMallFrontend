import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import VueRouter from 'unplugin-vue-router/vite';

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		VueRouter({
			// what files to include
			filePatterns: ['**/*'],

			// files to exclude from the scan
			exclude: [],

			// where to generate the types
			dts: './src/types/typed-router.d.ts',
		}),
		vue(),
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'), // 将 `@` 映射到 `src` 目录
		},
	},
	server: {
		proxy: {
			// 将以 /consul 开头的请求代理到 Consul API
			'/consul': {
				target: 'http://192.168.110.112:8500', // Consul 的地址
				changeOrigin: true, // 是否修改请求的源
				rewrite: (path) => path.replace(/^\/consul/, ''), // 重写路径
			},
		},
	},
});
