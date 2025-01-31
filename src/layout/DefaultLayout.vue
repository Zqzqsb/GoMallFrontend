<template>
	<div class="default-layout">
		<slot></slot>
		<footer class="simple-footer">
			<div class="text-center py-4">
				<p class="text-body-2 text-medium-emphasis">
					&copy; {{ new Date().getFullYear() }} TikTok E-Commerce. 
				</p>
			</div>
		</footer>
	</div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.default-layout {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
}

.simple-footer {
	margin-top: auto;
	background-color: #f5f5f5;
	border-top: 1px solid rgba(0, 0, 0, 0.05);
}
</style>
