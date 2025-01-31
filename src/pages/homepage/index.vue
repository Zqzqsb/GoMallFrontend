<template>
	<HomepageLayout>
		<Banner />
		<v-main>
			<ProductDisplay />
		</v-main>
	</HomepageLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import HomepageLayout from '@/layout/HomepageLayout.vue';
import Banner from './Banner.vue';
import ProductDisplay from './ProductDisplay.vue';
</script>

<style scoped>
.homepage {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
}

.v-main {
	flex: 1 0 auto;
}
</style>
