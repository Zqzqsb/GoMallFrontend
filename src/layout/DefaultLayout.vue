<template>
	<div class="default-layout">
		<slot></slot>
		<!-- 渲染子页面内容 -->
		<Footer />
	</div>
</template>

<script setup lang="ts">
import Footer from '@/pages/homepage/Footer.vue';
</script>

<style scoped>
.default-layout {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
}
</style>
