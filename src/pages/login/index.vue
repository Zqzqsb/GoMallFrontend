<template>
	<div class="mt-10">
		<!-- Card for the login form -->
		<v-card
			class="mx-auto pa-12 pb-8"
			elevation="8"
			max-width="448"
			rounded="lg"
		>
			<!-- Title Section -->
			<div class="text-subtitle-1 text-medium-emphasis mb-6">
				{{ isLogin ? 'Login' : 'Register' }}
			</div>

			<!-- Login/Register Form -->
			<v-form v-model="valid" @submit.prevent="handleSubmit">
				<!-- Email Input -->
				<v-text-field
					v-model="email"
					:rules="emailRules"
					density="compact"
					placeholder="Email address"
					prepend-inner-icon="mdi-email-outline"
					variant="outlined"
					required
				></v-text-field>

				<!-- Password Input -->
				<v-text-field
					v-model="password"
					:rules="passwordRules"
					:append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
					:type="visible ? 'text' : 'password'"
					density="compact"
					placeholder="Enter your password"
					prepend-inner-icon="mdi-lock-outline"
					variant="outlined"
					@click:append-inner="togglePasswordVisibility"
					required
				></v-text-field>

				<!-- Confirm Password (Register only) -->
				<v-text-field
					v-if="!isLogin"
					v-model="passwordConfirm"
					:rules="[...passwordRules, passwordMatchRule]"
					:append-inner-icon="visibleConfirm ? 'mdi-eye-off' : 'mdi-eye'"
					:type="visibleConfirm ? 'text' : 'password'"
					density="compact"
					placeholder="Confirm your password"
					prepend-inner-icon="mdi-lock-outline"
					variant="outlined"
					@click:append-inner="togglePasswordConfirmVisibility"
					required
				></v-text-field>

				<!-- Error Alert -->
				<v-alert
					v-if="error"
					type="error"
					variant="tonal"
					class="mb-4"
					closable
					@click:close="error = ''"
				>
					{{ error }}
				</v-alert>

				<!-- Success Alert -->
				<v-alert
					v-if="success"
					type="success"
					variant="tonal"
					class="mb-4"
					closable
					@click:close="success = ''"
				>
					{{ success }}
				</v-alert>

				<!-- Submit Button -->
				<v-btn
					type="submit"
					class="mb-8"
					color="blue"
					size="large"
					variant="tonal"
					block
					:loading="loading"
				>
					{{ isLogin ? 'Log In' : 'Register' }}
				</v-btn>
			</v-form>

			<!-- Toggle Login/Register -->
			<v-card-text class="text-center">
				<a
					class="text-blue text-decoration-none"
					href="#"
					@click.prevent="toggleMode"
				>
					{{ isLogin ? 'Create an account' : 'Already have an account? Login' }}
					<v-icon icon="mdi-chevron-right"></v-icon>
				</a>
			</v-card-text>
		</v-card>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { login, register, getCsrfToken } from '@/apis/auth';

const router = useRouter();

// Form data
const email = ref('');
const password = ref('');
const passwordConfirm = ref('');
const valid = ref(false);
const visible = ref(false);
const visibleConfirm = ref(false);
const loading = ref(false);
const error = ref('');
const success = ref('');
const isLogin = ref(true);

// Validation rules
const emailRules = [
	(v: string) => !!v || 'Email is required',
	(v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
];

const passwordRules = [
	(v: string) => !!v || 'Password is required',
	(v: string) =>
		/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(v) ||
		'Password must contain at least 8 characters, one letter, one number and one special character',
];

const passwordMatchRule = (v: string) =>
	v === password.value || 'Passwords must match';

// Toggle password visibility
const togglePasswordVisibility = () => {
	visible.value = !visible.value;
};

const togglePasswordConfirmVisibility = () => {
	visibleConfirm.value = !visibleConfirm.value;
};

// Toggle between login and register modes
const toggleMode = () => {
	isLogin.value = !isLogin.value;
	error.value = '';
	success.value = '';
};

// Handle form submission
const handleSubmit = async () => {
	if (!valid.value) {
		error.value = 'Please fix the form errors before submitting';
		return;
	}

	loading.value = true;
	error.value = '';
	success.value = '';

	try {
		if (isLogin.value) {
			await login({
				email: email.value,
				password: password.value,
			});
			success.value = 'Login successful!';
			setTimeout(() => {
				router.push('/homepage');
			}, 1500);
		} else {
			await register({
				email: email.value,
				password: password.value,
				password_confirm: passwordConfirm.value,
			});
			success.value = 'Registration successful! Please login.';
			setTimeout(() => {
				isLogin.value = true;
				password.value = '';
				passwordConfirm.value = '';
			}, 1500);
		}
	} catch (err: any) {
		error.value =
			err.response?.data?.message ||
			'An error occurred. Please try again later.';
	} finally {
		loading.value = false;
	}
};

// Get CSRF token on component mount
onMounted(async () => {
	try {
		await getCsrfToken();
	} catch (err) {
		error.value = 'Failed to initialize security token. Please refresh the page.';
	}
});
</script>
