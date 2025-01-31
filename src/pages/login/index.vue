<template>
    <AuthLayout>
        <div class="text-center mb-8">
            <h2 class="text-h4 font-weight-bold mb-2">
                {{ isLogin ? '欢迎回来' : '创建账号' }}
            </h2>
            <p class="text-body-1 text-medium-emphasis">
                {{ isLogin ? '请登录您的账号' : '填写以下信息创建您的账号' }}
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
                hide-details
                class="mb-4"
                required
            ></v-text-field>

            <!-- Password Input -->
            <v-text-field
                v-model="password"
                :rules="passwordRules"
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'"
                label="密码"
                placeholder="输入您的密码"
                prepend-inner-icon="mdi-lock-outline"
                variant="outlined"
                hide-details
                class="mb-4"
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
                label="确认密码"
                placeholder="再次输入密码"
                prepend-inner-icon="mdi-lock-outline"
                variant="outlined"
                hide-details
                class="mb-4"
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
                color="primary"
                size="large"
                block
                :loading="loading"
                class="mb-4"
            >
                {{ isLogin ? '登录' : '注册' }}
            </v-btn>

            <!-- Toggle Login/Register -->
            <div class="text-center">
                <v-btn
                    variant="text"
                    color="primary"
                    @click="toggleMode"
                >
                    {{ isLogin ? '还没有账号？立即注册' : '已有账号？立即登录' }}
                </v-btn>
            </div>
        </v-form>
    </AuthLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AuthLayout from '@/layout/auth.vue';
import { login, register } from '@/apis/auth';

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
    (v: string) => !!v || '请输入邮箱地址',
    (v: string) => /.+@.+\..+/.test(v) || '请输入有效的邮箱地址',
];

const passwordRules = [
    (v: string) => !!v || '请输入密码',
    (v: string) =>
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(v) ||
        '密码必须包含至少8个字符，包括字母、数字和特殊字符',
];

const passwordMatchRule = (v: string) =>
    v === password.value || '两次输入的密码不一致';

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
        error.value = '请修正表单中的错误后再提交';
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
            success.value = '登录成功！';
            setTimeout(() => {
                router.push('/homepage');
            }, 1500);
        } else {
            await register({
                email: email.value,
                password: password.value,
                password_confirm: passwordConfirm.value,
            });
            success.value = '注册成功！请登录。';
            setTimeout(() => {
                isLogin.value = true;
                password.value = '';
                passwordConfirm.value = '';
            }, 1500);
        }
    } catch (err: any) {
        error.value =
            err.response?.data?.message ||
            '发生错误，请稍后重试。';
    } finally {
        loading.value = false;
    }
};
</script>
