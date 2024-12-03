<template>
	<div class="flex flex-col min-h-screen">
		<header class="h-[4rem]">
			<Banner />
		</header>
		<v-container class="flex flex-wrap">
			<ProductDisplay
				v-for="i in 6"
				:key="i"
				class="mx-auto"
				min-width="200"
			/>
		</v-container>
		<footer class="bg-indigo-600 text-white py-4">
			<Footer />
		</footer>
	</div>
</template>

<script setup lang="ts">
import Banner from './Banner.vue';
import Footer from './Footer.vue';
import ProductDisplay from './ProductDisplay.vue';
</script>

<style lang="css" scoped>
* {
	border: 1.5px solid rgba(255, 0, 0, 1);
	box-sizing: border-box;
}
</style>
