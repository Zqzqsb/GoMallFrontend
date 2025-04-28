<template>
	<v-app-bar scroll-behavior="elevate" app>
		<vue3-lottie :animation-data="lottie1" :height="60" :width="60">
		</vue3-lottie>
		<v-app-bar-title>GoMall商城</v-app-bar-title>
		<v-spacer></v-spacer>

		<v-text-field
			v-model="search"
			:loading="loading"
			density="compact"
			variant="outlined"
			label="搜索商品"
			append-inner-icon="mdi-magnify"
			single-line
			hide-details
			@click:append-inner="searchProducts"
			class="mx-2"
			style="max-width: 300px"
		></v-text-field>

		<v-btn
			color="primary"
			variant="text"
			class="ml-2 hidden-sm-and-down"
			to="/intro"
			prepend-icon="mdi-information"
		>
			项目介绍
		</v-btn>

		<v-btn icon class="ml-2" @click="goToCart">
			<v-badge
				:content="cartItemCount"
				:model-value="cartItemCount > 0"
				color="primary"
			>
				<v-icon>mdi-cart</v-icon>
			</v-badge>
		</v-btn>

		<!-- User Menu -->
		<v-menu v-model="menu" :close-on-content-click="false">
			<template v-slot:activator="{ props }">
				<v-btn
					icon
					v-bind="props"
					:color="isLoggedIn ? 'primary' : undefined"
					class="ml-2"
				>
					<v-avatar
						v-if="isLoggedIn && userAvatar"
						size="32"
						class="user-avatar"
					>
						<v-img :src="userAvatar" alt="用户头像"></v-img>
					</v-avatar>
					<v-avatar
						v-else-if="isLoggedIn"
						size="32"
						color="primary"
						class="user-avatar"
					>
						<span class="text-white">{{ userNameInitial }}</span>
					</v-avatar>
					<v-icon v-else>mdi-account-circle</v-icon>
				</v-btn>
			</template>

			<v-card min-width="200" class="user-menu-card">
				<v-list>
					<v-list-item v-if="isLoggedIn">
						<template v-slot:prepend>
							<v-avatar size="32" color="primary">
								<v-img
									v-if="userAvatar"
									:src="userAvatar"
									alt="用户头像"
								></v-img>
								<span v-else class="text-white">{{
									userNameInitial
								}}</span>
							</v-avatar>
						</template>
						<v-list-item-title>{{ userName }}</v-list-item-title>
					</v-list-item>

					<v-divider v-if="isLoggedIn"></v-divider>

					<template v-if="isLoggedIn">
						<v-list-item
							prepend-icon="mdi-account"
							title="个人中心"
							to="/profile"
						></v-list-item>
						<v-list-item
							prepend-icon="mdi-history"
							title="我的订单"
							to="/orders"
						></v-list-item>
						<v-list-item
							prepend-icon="mdi-heart"
							title="我的收藏"
							to="/favorites"
						></v-list-item>
						<v-divider></v-divider>
						<v-list-item
							prepend-icon="mdi-logout"
							title="退出登录"
							@click="handleLogout"
						></v-list-item>
					</template>

					<template v-else>
						<v-list-item
							prepend-icon="mdi-login"
							title="登录"
							to="/login"
							@click="menu = false"
						></v-list-item>
						<v-list-item
							prepend-icon="mdi-account-plus"
							title="注册"
							to="/login?mode=register"
							@click="menu = false"
						></v-list-item>
					</template>
				</v-list>
			</v-card>
		</v-menu>
	</v-app-bar>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { Vue3Lottie } from 'vue3-lottie';
import lottie1 from '@/assets/images/lotties/shop.json';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cart';

const router = useRouter();
const authStore = useAuthStore();
const cartStore = useCartStore();

// 基本状态
const search = ref('');
const loading = ref(false);
const menu = ref(false);

// 从Pinia获取用户信息
const isLoggedIn = computed(() => authStore.isAuthenticated);
const userName = computed(() => authStore.user?.name || '用户');
const userNameInitial = computed(() => userName.value.charAt(0).toUpperCase());
const userAvatar = computed(() => authStore.user?.avatar || '');

// 从Pinia获取购物车信息
const cartItemCount = computed(() => cartStore.itemCount);

// 搜索商品
const searchProducts = () => {
	if (!search.value.trim()) return;

	loading.value = true;

	// 模拟搜索延迟
	setTimeout(() => {
		loading.value = false;
		router.push({
			path: '/products',
			query: { keyword: search.value },
		});
		search.value = '';
	}, 500);
};

// 跳转到购物车
const goToCart = () => {
	router.push('/cart');
};

// 退出登录
const handleLogout = () => {
	authStore.logout();
	menu.value = false;
	router.push('/');
};
</script>

<style scoped>
.user-avatar {
	transition: transform 0.3s, box-shadow 0.3s;
}

.user-avatar:hover {
	transform: scale(1.05);
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.user-menu-card {
	overflow: hidden;
	transition: transform 0.2s, box-shadow 0.2s;
}

.user-menu-card:hover {
	transform: translateY(-2px);
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* 增加响应式样式 */
@media (max-width: 600px) {
	.v-text-field {
		max-width: 150px !important;
	}
}
</style>
