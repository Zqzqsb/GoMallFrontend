<template>
	<AuthLayout>
		<v-fade-transition>
			<div class="pa-8">
				<!-- Title Section -->
				<div class="text-center mb-8">
					<h1 class="text-h3 font-weight-bold mb-4">
						{{ isLogin ? '欢迎回来' : '创建账号' }}
					</h1>
					<p class="text-h6 text-medium-emphasis">
						{{
							isLogin
								? '请登录您的账号'
								: '填写以下信息创建您的账号'
						}}
					</p>
				</div>

				<!-- Login/Register Form -->
				<v-form v-model="valid" @submit.prevent="handleSubmit">
					<!-- Email Input -->
					<v-text-field
						v-model="email"
						:rules="emailRules"
						label="邮箱地址"
						placeholder="your.email@example.com"
						prepend-inner-icon="mdi-email-outline"
						variant="outlined"
						class="mb-6"
						:error-messages="emailError"
						@update:modelValue="emailError = ''"
						hide-details="auto"
						required
					></v-text-field>

					<!-- Password Input -->
					<v-text-field
						v-model="password"
						:rules="passwordRules"
						:append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
						:type="visible ? 'text' : 'password'"
						label="密码"
						placeholder="8-20位，包含大小写字母、数字和特殊字符"
						prepend-inner-icon="mdi-lock-outline"
						variant="outlined"
						class="mb-6"
						:error-messages="passwordError"
						@update:modelValue="passwordError = ''"
						@click:append-inner="togglePasswordVisibility"
						hide-details="auto"
						required
					></v-text-field>

					<!-- Confirm Password (Register only) -->
					<v-text-field
						v-if="!isLogin"
						v-model="passwordConfirm"
						:rules="[...passwordRules, passwordMatchRule]"
						:append-inner-icon="
							visibleConfirm ? 'mdi-eye-off' : 'mdi-eye'
						"
						:type="visibleConfirm ? 'text' : 'password'"
						label="确认密码"
						placeholder="再次输入密码"
						prepend-inner-icon="mdi-lock-outline"
						variant="outlined"
						class="mb-6"
						:error-messages="confirmError"
						@update:modelValue="confirmError = ''"
						@click:append-inner="togglePasswordConfirmVisibility"
						hide-details="auto"
						required
					></v-text-field>

					<!-- Error Alert -->
					<v-alert
						v-if="error"
						type="error"
						variant="tonal"
						class="mb-6"
						closable
						@click:close="error = ''"
					>
						<div class="text-subtitle-1 font-weight-medium">
							{{ error }}
						</div>
						<div v-if="errorDetails" class="text-body-2 mt-2">
							{{ errorDetails }}
						</div>
					</v-alert>

					<!-- Success Alert -->
					<v-alert
						v-if="success"
						type="success"
						variant="tonal"
						class="mb-6"
						closable
						@click:close="success = ''"
					>
						{{ success }}
					</v-alert>

					<!-- Submit Button -->
					<v-btn
						type="submit"
						color="primary"
						size="x-large"
						block
						:loading="loading"
						class="mb-6"
						height="56"
					>
						{{ isLogin ? '登录' : '注册' }}
					</v-btn>

					<!-- Toggle Login/Register -->
					<div class="text-center">
						<v-btn
							variant="text"
							color="primary"
							size="large"
							class="text-body-1"
							@click="toggleMode"
						>
							{{
								isLogin
									? '还没有账号？立即注册'
									: '已有账号？立即登录'
							}}
						</v-btn>
					</div>
				</v-form>
			</div>
		</v-fade-transition>
	</AuthLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import AuthLayout from '@/layout/AuthLayout.vue';
import { login, register } from '@/apis/auth';
import { useAuthStore } from '@/store/authStore';

const router = useRouter();
const authStore = useAuthStore();

// Form state
const valid = ref(false);
const loading = ref(false);
const error = ref('');
const errorDetails = ref('');
const success = ref('');
const isLogin = ref(true);

// Form fields
const email = ref('');
const password = ref('');
const passwordConfirm = ref('');
const emailError = ref('');
const passwordError = ref('');
const confirmError = ref('');

// Password visibility
const visible = ref(false);
const visibleConfirm = ref(false);

// Validation rules
const emailRules = [
	(v: string) => {
		if (!v) {
			emailError.value = '请输入邮箱地址';
			return false;
		}
		if (!/.+@.+\..+/.test(v)) {
			emailError.value = '请输入有效的邮箱地址';
			return false;
		}
		return true;
	},
];

const passwordRules = [
	(v: string) => {
		if (!v) {
			passwordError.value = '请输入密码';
			return false;
		}

		// 检查密码长度（8-20位）
		if (v.length < 8 || v.length > 20) {
			passwordError.value = '密码长度必须在8-20位之间';
			return false;
		}

		// 检查是否包含至少一个大写字母
		if (!/[A-Z]/.test(v)) {
			passwordError.value = '密码必须包含至少一个大写字母';
			return false;
		}

		// 检查是否包含至少一个小写字母
		if (!/[a-z]/.test(v)) {
			passwordError.value = '密码必须包含至少一个小写字母';
			return false;
		}

		// 检查是否包含至少一个数字
		if (!/\d/.test(v)) {
			passwordError.value = '密码必须包含至少一个数字';
			return false;
		}

		// 检查是否包含至少一个特殊字符
		if (!/[!@#$%^&*(),.?":{}|<>]/.test(v)) {
			passwordError.value =
				'密码必须包含至少一个特殊字符 (!@#$%^&*(),.?":{}|<>)';
			return false;
		}

		// 检查是否包含连续的重复字符
		if (/(.)\1{2,}/.test(v)) {
			passwordError.value = '密码不能包含连续重复的字符';
			return false;
		}

		// 检查是否包含常见的键盘连续字符
		const commonSequences = ['qwerty', 'asdfgh', '123456', 'abcdef'];
		if (commonSequences.some((seq) => v.toLowerCase().includes(seq))) {
			passwordError.value = '密码不能包含连续的键盘字符';
			return false;
		}

		return true;
	},
];

const passwordMatchRule = (v: string) => {
	if (v !== password.value) {
		confirmError.value = '两次输入的密码不一致';
		return false;
	}
	return true;
};

// Toggle password visibility
const togglePasswordVisibility = () => {
	visible.value = !visible.value;
};

const togglePasswordConfirmVisibility = () => {
	visibleConfirm.value = !visibleConfirm.value;
};

// Toggle between login and register
const toggleMode = () => {
	isLogin.value = !isLogin.value;
	error.value = '';
	success.value = '';
	email.value = '';
	password.value = '';
	passwordConfirm.value = '';
	emailError.value = '';
	passwordError.value = '';
	confirmError.value = '';
};

// Handle form submission
const handleSubmit = async () => {
	// 清除所有错误信息
	emailError.value = '';
	passwordError.value = '';
	confirmError.value = '';
	error.value = '';

	// 手动验证表单
	const isEmailValid = emailRules[0](email.value);
	const isPasswordValid = passwordRules.every(
		(rule) => rule(password.value) === true
	);

	if (!isLogin.value) {
		const isPasswordConfirmValid = passwordMatchRule(passwordConfirm.value);
		if (!isEmailValid || !isPasswordValid || !isPasswordConfirmValid) {
			return;
		}
	} else {
		if (!isEmailValid || !isPasswordValid) {
			return;
		}
	}

	loading.value = true;
	success.value = '';

	try {
		if (isLogin.value) {
			const response = await login({
				email: email.value,
				password: password.value,
			});

			// 检查响应中是否包含必要的数据
			if (!response || !response.code || response.code !== 200 || !response.token) {
				throw new Error('登录失败：无效的响应数据');
			}

			// 保存 token 到 localStorage 或 pinia store
			localStorage.setItem('token', response.token);

			// 更新 Pinia 状态管理中的用户信息
			authStore.login({
				id: response.user_id || 1,
				email: email.value,
				name: email.value.split('@')[0],
				avatar: null,
			});

			success.value = '登录成功！';
			error.value = '';
			errorDetails.value = '';

			// 使用过渡动画跳转
			await router.push({
				path: '/homepage',
				query: { transition: 'slide-fade' },
			});
		} else {
			const response = await register({
				email: email.value,
				password: password.value,
				password_confirm: passwordConfirm.value,
			});

			// 检查响应中是否包含必要的数据
			if (!response || !response.user_id) {
				throw new Error('注册失败：无效的响应数据');
			}

			success.value = '注册成功！请登录。';
			error.value = '';
			errorDetails.value = '';
			setTimeout(() => {
				isLogin.value = true;
				password.value = '';
				passwordConfirm.value = '';
			}, 1500);
		}
	} catch (err: any) {
		console.error('Error:', err);
		success.value = '';

		// 改进错误处理逻辑，优先使用后端返回的错误信息
		if (err.response && err.response.data) {
			// 如果后端返回的是字符串错误信息
			if (typeof err.response.data === 'string') {
				const errorMsg = err.response.data;

				// 处理特定的错误消息，转换为更友好的中文提示
				if (errorMsg.includes('邮箱已被注册')) {
					error.value = '该邮箱已被注册，请使用其他邮箱或直接登录';
				} else if (errorMsg.includes('Registration failed')) {
					error.value =
						'注册失败: ' +
						errorMsg.replace('Registration failed:', '').trim();
				} else {
					error.value = errorMsg;
				}
			}
			// 如果后端返回的是对象，包含 message 字段
			else if (err.response.data.message) {
				error.value = err.response.data.message;
			}
			// 其他情况
			else {
				error.value = `服务器响应异常 (${err.response.status})`;
			}
		} else {
			error.value = err.message || '未知错误';
		}

		return;
	} finally {
		loading.value = false;
	}
};
</script>

<style scoped>
:deep(.v-field) {
	font-size: 1.1rem;
}

:deep(.v-label) {
	font-size: 1.1rem;
}

:deep(.v-btn) {
	text-transform: none;
	font-size: 1.1rem;
}

:deep(.v-alert) {
	font-size: 1.1rem;
}

/* 路由过渡动画 */
.slide-fade-enter-active,
.slide-fade-leave-active {
	transition: all 0.3s ease;
}

.slide-fade-enter-from {
	transform: translateX(-20px);
	opacity: 0;
}

.slide-fade-leave-to {
	transform: translateX(20px);
	opacity: 0;
}

.v-alert {
	white-space: pre-line;
}
</style>
