<template>
	<v-app>
		<component :is="layout">
			<router-view />
		</component>
	</v-app>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import DefaultLayout from '@/layout/DefaultLayout.vue'; // 默认布局

const route = useRoute(); // 获取当前路由信息
const layout = route.meta.layout || DefaultLayout; // 获取当前路由的布局组件，如果没有指定使用 DefaultLayout
</script>
