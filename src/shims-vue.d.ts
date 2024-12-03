declare module '*.json' {
	const value: any;
	export default value;
}

declare module '*.vue' {
	import { DefineComponent } from 'vue';
	const component: DefineComponent<{}, {}, any>;
	export default component;
}

declare module '@/utils' {
	// 导出相应的类型或内容
	export * from './utils';
}
