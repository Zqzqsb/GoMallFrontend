<template>
	<div class="homepage-container">
		<Banner />
		<v-main class="homepage-content">
			<ProductDisplay />
		</v-main>
		<Footer />
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Banner from './Banner.vue';
import ProductDisplay from './ProductDisplay.vue';
import Footer from './Footer.vue';
</script>

<style scoped>
.homepage-container {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
}

.homepage-content {
	flex: 1 0 auto;
	padding-top: 24px;
}
</style>
