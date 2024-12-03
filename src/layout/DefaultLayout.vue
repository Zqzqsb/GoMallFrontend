<template>
	<div class="default-layout">
		<slot></slot>
		<!-- 渲染子页面内容 -->
		<footer class="bg-green-500 text-white py-4">
			<p>&copy; 2024 Your Company</p>
		</footer>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped>
.default-layout {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
}

footer {
	margin-top: auto; /* 确保 footer 固定在底部 */
}
</style>
