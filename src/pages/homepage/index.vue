<template>
	<HomepageLayout>
		<Banner />
		<v-main>
			<v-container class="fill-height pa-0">
				<v-row no-gutters>
					<v-col cols="12">
						<!-- Welcome Message -->
						<v-container>
							<v-row class="my-4">
								<v-col>
									<h1 class="text-h4">欢迎来到 GoMall</h1>
									<p class="text-subtitle-1">发现精选商品</p>
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
									<v-card class="mb-4">
										<v-img
											:src="product.image"
											height="200"
											cover
											class="bg-grey-lighten-2"
										></v-img>

										<v-card-title>{{
											product.name
										}}</v-card-title>

										<v-card-text>
											<div class="text-subtitle-1 mb-1">
												￥{{ product.price.toFixed(2) }}
											</div>
											<div class="text-body-2">
												{{ product.description }}
											</div>
										</v-card-text>

										<v-card-actions>
											<v-btn
												color="primary"
												variant="tonal"
												block
											>
												加入购物车
											</v-btn>
										</v-card-actions>
									</v-card>
								</v-col>
							</v-row>
						</v-container>
					</v-col>
				</v-row>
			</v-container>
		</v-main>
	</HomepageLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import HomepageLayout from '@/layout/HomepageLayout.vue';
import Banner from './Banner.vue';

// Mock products data
const mockProducts = ref([
	{
		id: 1,
		name: '无线耳机',
		price: 299.99,
		description: '高品质无线耳机，支持降噪功能',
		image: 'https://picsum.photos/id/1/500/300',
	},
	{
		id: 2,
		name: '智能手表',
		price: 599.99,
		description: '功能丰富的智能手表，支持健康监测',
		image: 'https://picsum.photos/id/2/500/300',
	},
	{
		id: 3,
		name: '笔记本电脑包',
		price: 149.99,
		description: '防水笔记本电脑包，多个收纳隔层',
		image: 'https://picsum.photos/id/3/500/300',
	},
	{
		id: 4,
		name: '咖啡机',
		price: 799.99,
		description: '可编程咖啡机，带保温功能',
		image: 'https://picsum.photos/id/4/500/300',
	},
]);
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
