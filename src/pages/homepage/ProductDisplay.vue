<template>
	<div class="product-display">
		<!-- Welcome Message -->
		<v-container>
			<v-row class="my-4">
				<v-col>
					<h1 class="text-h4">欢迎来到 GoMall</h1>
					<p class="text-subtitle-1">发现精选商品</p>
				</v-col>
			</v-row>

			<!-- Products Grid -->
			<v-row>
				<v-col
					v-for="product in displayedProducts"
					:key="product.id"
					cols="12"
					sm="6"
					md="4"
					lg="3"
				>
					<v-card class="mb-4 product-card" elevation="2" hover>
						<v-img
							:src="product.image"
							height="200"
							cover
							class="bg-grey-lighten-2"
						>
							<template v-slot:placeholder>
								<v-row
									class="fill-height ma-0"
									align="center"
									justify="center"
								>
									<v-progress-circular
										indeterminate
										color="primary"
									></v-progress-circular>
								</v-row>
							</template>
						</v-img>

						<v-card-title class="text-truncate">{{
							product.name
						}}</v-card-title>

						<v-card-text>
							<div
								class="text-subtitle-1 font-weight-bold primary--text mb-1"
							>
								￥{{ product.price.toFixed(2) }}
							</div>
							<div class="text-body-2 text-truncate-2">
								{{ product.description }}
							</div>
						</v-card-text>

						<v-card-actions>
							<v-btn
								color="primary"
								variant="tonal"
								block
								:loading="product.loading"
								@click="addToCart(product)"
							>
								加入购物车
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-col>
			</v-row>

			<!-- Pagination -->
			<v-row class="mt-4">
				<v-col class="d-flex justify-center">
					<v-pagination
						v-model="currentPage"
						:length="totalPages"
						:total-visible="7"
						rounded="circle"
					></v-pagination>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// Mock products data with more items
const products = ref(
	Array.from({ length: 32 }, (_, i) => ({
		id: i + 1,
		name: `商品 ${i + 1}`,
		price: Math.floor(Math.random() * 900 + 100),
		description: `这是商品 ${
			i + 1
		} 的详细描述，包含了产品的主要特点和优势。`,
		image: `https://picsum.photos/id/${(i % 10) + 1}/500/300`,
		loading: false,
	}))
);

// Pagination
const itemsPerPage = 8;
const currentPage = ref(1);

const totalPages = computed(() =>
	Math.ceil(products.value.length / itemsPerPage)
);

const displayedProducts = computed(() => {
	const start = (currentPage.value - 1) * itemsPerPage;
	const end = start + itemsPerPage;
	return products.value.slice(start, end);
});

// Add to cart functionality
const addToCart = async (product: any) => {
	product.loading = true;
	try {
		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 1000));
		// TODO: Implement actual add to cart logic
		console.log('Added to cart:', product.name);
	} finally {
		product.loading = false;
	}
};
</script>

<style scoped>
.product-display {
	min-height: calc(
		100vh - 64px - 200px
	); /* Adjust based on header and footer height */
}

.product-card {
	transition: transform 0.2s, box-shadow 0.2s;
}

.product-card:hover {
	transform: translateY(-4px);
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) !important;
}

.text-truncate-2 {
	display: -webkit-box;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>
