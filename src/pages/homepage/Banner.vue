<template>
	<v-app-bar scroll-behavior="elevate">
		<vue3-lottie :animation-data="lottie1" :height="180" :width="120">
		</vue3-lottie>
		<v-app-bar-title>商场主页</v-app-bar-title>
		<v-spacer></v-spacer>

		<v-text-field
			:loading="loading"
			:search="search"
			append-inner-icon="mdi-magnify"
			density="compact"
			label="Search Products"
			variant="solo"
			hide-details
			single-line
			@click:append-inner="onClick"
			max-width="300"
		></v-text-field>
		<v-btn icon>
			<v-icon>mdi-account</v-icon>
		</v-btn>
		<v-btn class="bg-blue-400 rounded-lg" variant="elevated" to="/login">  Login </v-btn>
	</v-app-bar>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Vue3Lottie } from 'vue3-lottie';
import lottie1 from '@/assets/images/lotties/shop.json';

const search = ref('');
const loading = ref(false);
const onClick = () => {
	loading.value = true;
	setTimeout(() => {
		loading.value = false;
	}, 2000);
};
</script>
