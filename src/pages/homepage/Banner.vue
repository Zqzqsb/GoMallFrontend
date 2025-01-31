<template>
	<v-app-bar scroll-behavior="elevate">
		<vue3-lottie :animation-data="lottie1" :height="180" :width="120">
		</vue3-lottie>
		<v-app-bar-title>商场主页</v-app-bar-title>
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
			@click:append-inner="onClick"
		></v-text-field>

		<v-btn
			color="primary"
			variant="text"
			class="ml-4"
			to="/intro"
			prepend-icon="mdi-information"
		>
			项目介绍
		</v-btn>

		<v-btn icon class="ml-4" @click="goToCart">
			<v-badge
				:content="cartItemCount"
				:model-value="cartItemCount > 0"
				color="error"
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
				>
					<v-avatar v-if="isLoggedIn && userAvatar" size="32">
						<v-img :src="userAvatar" alt="用户头像"></v-img>
					</v-avatar>
					<v-icon v-else>mdi-account-circle</v-icon>
				</v-btn>
			</template>

			<v-card min-width="200">
				<v-list>
					<v-list-item v-if="isLoggedIn">
						<template v-slot:prepend>
							<v-avatar size="32">
								<v-img
									:src="userAvatar || '/default-avatar.png'"
									alt="用户头像"
								></v-img>
							</v-avatar>
						</template>
						<v-list-item-title>{{ userName }}</v-list-item-title>
					</v-list-item>

					<v-divider v-if="isLoggedIn"></v-divider>

					<template v-if="isLoggedIn">
						<v-list-item
							prepend-icon="mdi-account-circle"
							title="个人中心"
							@click="goToProfile"
						></v-list-item>
						<v-list-item
							prepend-icon="mdi-cart"
							title="我的订单"
							@click="goToOrders"
						></v-list-item>
						<v-list-item
							prepend-icon="mdi-cog"
							title="设置"
							@click="goToSettings"
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
							@click="goToLogin"
						></v-list-item>
						<v-list-item
							prepend-icon="mdi-account-plus"
							title="注册"
							@click="goToRegister"
						></v-list-item>
					</template>
				</v-list>
			</v-card>
		</v-menu>
	</v-app-bar>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Vue3Lottie } from 'vue3-lottie';
import { logout } from '@/apis/auth';
import lottie1 from '@/assets/images/lotties/shop.json';

const router = useRouter();
const search = ref('');
const loading = ref(false);
const menu = ref(false);
const cartItemCount = ref(0);
const isLoggedIn = ref(false);
const userAvatar = ref('');
const userName = ref('');

const onClick = () => {
    loading.value = true;
    setTimeout(() => {
        loading.value = false;
    }, 2000);
};

const goToCart = () => {
    router.push('/cart');
};

const goToProfile = () => {
    router.push('/profile');
};

const goToOrders = () => {
    router.push('/orders');
};

const goToSettings = () => {
    router.push('/settings');
};

const handleLogout = async () => {
    try {
        await logout();
        isLoggedIn.value = false;
        menu.value = false;
        router.push('/login');
    } catch (error) {
        console.error('退出登录失败:', error);
    }
};

const goToLogin = () => {
    router.push('/login');
    menu.value = false;
};

const goToRegister = () => {
    router.push('/login?mode=register');
    menu.value = false;
};
</script>

<style scoped>
.v-text-field {
    max-width: 300px;
}
</style>
