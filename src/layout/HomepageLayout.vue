<template>
    <div class="homepage-layout">
        <slot></slot>
        <Footer />
    </div>
</template>

<script setup lang="ts">
import Footer from '@/pages/homepage/Footer.vue';
</script>

<style scoped>
.homepage-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}
</style>
