import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
	state: () => ({
		isAuthenticated: false, // 登录状态
		user: null, // 用户信息
	}),
	actions: {
		login(user) {
			this.isAuthenticated = true;
			this.user = user; // 登录时保存用户信息
		},
		logout() {
			this.isAuthenticated = false;
			this.user = null; // 退出登录时清空用户信息
		},
	},
});
