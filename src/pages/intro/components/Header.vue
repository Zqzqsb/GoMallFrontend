<template>
    <div class="text-center mb-8 reveal-element">
        <h1 class="text-h2 font-weight-bold mb-4 text-white">TikTok E-Commerce</h1>
        <p class="text-h5 text-medium-emphasis mb-6">
            字节跳动青训营电商项目
        </p>
        <div class="d-flex justify-center gap-4">
            <v-btn
                prepend-icon="mdi-github"
                variant="outlined"
                size="large"
                href="https://github.com/Zqzqsb/GoMallFrontend"
                target="_blank"
                class="glass-button px-6"
            >
                前端仓库
                <v-icon end class="ml-2">mdi-open-in-new</v-icon>
            </v-btn>
            <v-btn
                prepend-icon="mdi-github"
                variant="outlined"
                size="large"
                href="https://github.com/Zqzqsb/GoMall"
                target="_blank"
                class="glass-button px-6"
            >
                后端仓库
                <v-icon end class="ml-2">mdi-open-in-new</v-icon>
            </v-btn>
        </div>
    </div>
</template>

<style scoped>
.glass-button {
    background: rgba(17, 34, 64, 0.6);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: white;
    transition: all 0.3s ease;
}

.glass-button:hover {
    background: rgba(17, 34, 64, 0.8);
    transform: translateY(-2px);
}

.reveal-element {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.8s ease;
}

.reveal-active {
    opacity: 1;
    transform: translateY(0);
}
</style>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-element').forEach(el => {
        observer.observe(el);
    });
});
</script>
