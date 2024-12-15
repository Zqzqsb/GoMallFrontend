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
			<div class="text-subtitle-1 text-medium-emphasis mb-6">Account</div>

			<!-- Login Form -->
			<v-form v-model="valid" @submit.prevent="submitLogin">
				<!-- Email Input -->
				<v-text-field
					v-model="email"
					:rules="[emailRules as any]"
					density="compact"
					placeholder="Email address"
					prepend-inner-icon="mdi-email-outline"
					variant="outlined"
					required
				></v-text-field>

				<!-- Password Section -->
				<div
					class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between mb-2"
				>
					Password
					<a
						class="text-caption text-decoration-none text-blue"
						href="#"
						rel="noopener noreferrer"
						target="_blank"
					>
						Forgot login password?
					</a>
				</div>

				<!-- Password Input -->
				<v-text-field
					v-model="password"
					:append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
					:type="visible ? 'text' : 'password'"
					density="compact"
					placeholder="Enter your password"
					prepend-inner-icon="mdi-lock-outline"
					variant="outlined"
					@click:append-inner="togglePasswordVisibility"
					required
				></v-text-field>

				<!-- Warning Message -->
				<v-card class="mb-12" color="surface-variant" variant="tonal">
					<v-card-text class="text-medium-emphasis text-caption">
						Warning: After 3 consecutive failed login attempts, your
						account will be temporarily locked for three hours. If
						you must login now, you can also click "Forgot login
						password?" below to reset the login password.
					</v-card-text>
				</v-card>

				<!-- Login Button -->
				<v-btn
					type="submit"
					class="mb-8"
					color="blue"
					size="large"
					variant="tonal"
					block
				>
					Log In
				</v-btn>
			</v-form>

			<!-- Sign Up Link -->
			<v-card-text class="text-center">
				<a
					class="text-blue text-decoration-none"
					href="#"
					rel="noopener noreferrer"
					target="_blank"
				>
					Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
				</a>
			</v-card-text>
		</v-card>
	</div>
</template>

<script setup lang="ts">
import { login } from '@/apis/auth';
import { ref } from 'vue';

// Reactive data for email and password
const email = ref('');
const password = ref('');
const valid = ref(false); // Form validity check
const visible = ref(false); // Toggle password visibility

// Validation rules
const emailRules = [
	(v) => !!v || 'Email is required',
	(v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
];

// Toggle visibility for password input
const togglePasswordVisibility = () => {
	visible.value = !visible.value;
};

// Submit login function
const submitLogin = async () => {
	if (valid.value) {
		try {
			const response = await login({
				email: email.value,
				password: password.value,
			});
			console.log('Response:', response);
			// Handle the response from the login API
			if (response.user_id > 0) {
				// Redirect to the next page or show a success message
				console.log('Login successful');
			} else {
				// Handle login failure (e.g., show error message)
				console.error('Login failed');
			}
		} catch (error) {
			console.error('Error logging in:', error);
		}
	} else {
		console.log('Form is not valid');
	}
};
</script>
