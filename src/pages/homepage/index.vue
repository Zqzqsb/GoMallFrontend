<template>
	<v-app>
		<!-- Navigation Bar -->
		<v-app-bar color="primary">
			<v-app-bar-title>GoMall</v-app-bar-title>
			<v-spacer></v-spacer>
			<v-btn icon @click="handleLogout">
				<v-icon>mdi-logout</v-icon>
			</v-btn>
		</v-app-bar>

		<v-main>
			<v-container>
				<!-- Welcome Message -->
				<v-row class="my-4">
					<v-col>
						<h1 class="text-h4">Welcome to GoMall</h1>
						<p class="text-subtitle-1">Discover our featured products</p>
					</v-col>
				</v-row>

				<!-- Featured Products -->
				<v-row>
					<v-col
						v-for="product in mockProducts"
						:key="product.id"
						cols="12"
						sm="6"
						md="4"
						lg="3"
					>
						<v-card>
							<v-img
								:src="product.image"
								height="200"
								cover
								class="bg-grey-lighten-2"
							></v-img>

							<v-card-title>{{ product.name }}</v-card-title>

							<v-card-text>
								<div class="text-subtitle-1 mb-1">
									${{ product.price.toFixed(2) }}
								</div>
								<div class="text-body-2">{{ product.description }}</div>
							</v-card-text>

							<v-card-actions>
								<v-btn color="primary" variant="tonal" block>
									Add to Cart
								</v-btn>
							</v-card-actions>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
		</v-main>
	</v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { logout } from '@/apis/auth';

const router = useRouter();

// Mock products data
const mockProducts = ref([
	{
		id: 1,
		name: 'Wireless Earbuds',
		price: 99.99,
		description: 'High-quality wireless earbuds with noise cancellation',
		image: 'https://picsum.photos/id/1/500/300',
	},
	{
		id: 2,
		name: 'Smart Watch',
		price: 199.99,
		description: 'Feature-rich smartwatch with health tracking',
		image: 'https://picsum.photos/id/2/500/300',
	},
	{
		id: 3,
		name: 'Laptop Backpack',
		price: 49.99,
		description: 'Water-resistant laptop backpack with multiple compartments',
		image: 'https://picsum.photos/id/3/500/300',
	},
	{
		id: 4,
		name: 'Coffee Maker',
		price: 79.99,
		description: 'Programmable coffee maker with thermal carafe',
		image: 'https://picsum.photos/id/4/500/300',
	},
]);

// Handle logout
const handleLogout = async () => {
	try {
		await logout();
		router.push('/login');
	} catch (error) {
		console.error('Logout failed:', error);
	}
};
</script>
