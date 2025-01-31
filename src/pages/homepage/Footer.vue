<template>
    <v-footer class="footer flex-shrink-0">
        <v-container class="py-2">
            <v-row dense>
                <!-- Company Info -->
                <v-col cols="12" md="4" class="mb-2 mb-md-0">
                    <div class="d-flex align-center mb-2">
                        <v-img src="@/assets/images/logo.png" max-width="32" class="mr-2"></v-img>
                        <h3 class="text-subtitle-1 font-weight-bold mb-0">GoMall</h3>
                    </div>
                    <p class="text-caption text-medium-emphasis mb-2">
                        您的一站式购物平台，提供优质商品和卓越服务。
                    </p>
                    <div class="d-flex align-center">
                        <v-btn icon="mdi-facebook" variant="text" density="compact" color="primary" class="mr-2"></v-btn>
                        <v-btn icon="mdi-twitter" variant="text" density="compact" color="primary" class="mr-2"></v-btn>
                        <v-btn icon="mdi-instagram" variant="text" density="compact" color="primary" class="mr-2"></v-btn>
                        <v-btn icon="mdi-linkedin" variant="text" density="compact" color="primary"></v-btn>
                    </div>
                </v-col>

                <!-- Quick Links -->
                <v-col cols="12" sm="6" md="2" class="mb-2 mb-md-0">
                    <h4 class="text-subtitle-2 font-weight-bold mb-2">快速链接</h4>
                    <v-list density="compact" nav class="footer-list pa-0">
                        <v-list-item to="/about" density="compact" class="px-0">关于我们</v-list-item>
                        <v-list-item to="/products" density="compact" class="px-0">商品列表</v-list-item>
                        <v-list-item to="/categories" density="compact" class="px-0">商品分类</v-list-item>
                        <v-list-item to="/promotions" density="compact" class="px-0">优惠活动</v-list-item>
                    </v-list>
                </v-col>

                <!-- Customer Service -->
                <v-col cols="12" sm="6" md="3" class="mb-2 mb-md-0">
                    <h4 class="text-subtitle-2 font-weight-bold mb-2">客户服务</h4>
                    <v-list density="compact" nav class="footer-list pa-0">
                        <v-list-item to="/faq" density="compact" class="px-0">常见问题</v-list-item>
                        <v-list-item to="/shipping" density="compact" class="px-0">配送说明</v-list-item>
                        <v-list-item to="/returns" density="compact" class="px-0">退换货政策</v-list-item>
                        <v-list-item to="/contact" density="compact" class="px-0">联系我们</v-list-item>
                    </v-list>
                </v-col>

                <!-- Newsletter -->
                <v-col cols="12" md="3">
                    <h4 class="text-subtitle-2 font-weight-bold mb-2">订阅我们</h4>
                    <p class="text-caption text-medium-emphasis mb-2">
                        订阅我们的新闻，获取最新优惠信息
                    </p>
                    <v-text-field
                        density="compact"
                        placeholder="您的邮箱地址"
                        append-inner-icon="mdi-send"
                        variant="outlined"
                        hide-details
                        @click:append-inner="subscribeNewsletter"
                    ></v-text-field>
                </v-col>
            </v-row>

            <!-- Copyright -->
            <v-divider class="my-2"></v-divider>
            <div class="d-flex flex-column flex-md-row justify-space-between align-center text-center text-md-left">
                <div class="text-caption text-medium-emphasis">
                    {{ new Date().getFullYear() }} GoMall. 保留所有权利。
                </div>
                <div class="d-flex flex-column flex-md-row mt-2 mt-md-0">
                    <v-btn
                        v-for="(link, index) in ['隐私政策', '服务条款', '网站地图']"
                        :key="index"
                        variant="text"
                        density="compact"
                        class="text-caption px-2"
                    >
                        {{ link }}
                    </v-btn>
                </div>
            </div>
        </v-container>
    </v-footer>
</template>

<script setup lang="ts">
const subscribeNewsletter = () => {
    // TODO: Implement newsletter subscription
    console.log('Newsletter subscription clicked');
};
</script>

<style scoped>
.footer {
    background-color: #f8f9fa;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.footer-list {
    background-color: transparent !important;
}

:deep(.v-list-item) {
    min-height: 32px !important;
}

:deep(.v-btn) {
    text-transform: none;
}
</style>
