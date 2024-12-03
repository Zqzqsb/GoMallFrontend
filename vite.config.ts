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
});
