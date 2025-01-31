<template>
    <v-footer class="footer">
        <v-container>
            <v-row>
                <!-- Company Info -->
                <v-col cols="12" md="4" class="mb-6 mb-md-0">
                    <div class="d-flex align-center mb-4">
                        <v-img src="@/assets/images/logo.png" max-width="40" class="mr-2"></v-img>
                        <h3 class="text-h6 font-weight-bold mb-0">GoMall</h3>
                    </div>
                    <p class="text-body-2 text-medium-emphasis mb-4">
                        您的一站式购物平台，提供优质商品和卓越服务。
                    </p>
                    <div class="d-flex align-center">
                        <v-btn icon variant="text" color="primary" class="mr-2">
                            <v-icon>mdi-facebook</v-icon>
                        </v-btn>
                        <v-btn icon variant="text" color="primary" class="mr-2">
                            <v-icon>mdi-twitter</v-icon>
                        </v-btn>
                        <v-btn icon variant="text" color="primary" class="mr-2">
                            <v-icon>mdi-instagram</v-icon>
                        </v-btn>
                        <v-btn icon variant="text" color="primary">
                            <v-icon>mdi-linkedin</v-icon>
                        </v-btn>
                    </div>
                </v-col>

                <!-- Quick Links -->
                <v-col cols="12" sm="6" md="2" class="mb-6 mb-md-0">
                    <h4 class="text-subtitle-1 font-weight-bold mb-4">快速链接</h4>
                    <v-list density="compact" nav class="footer-list">
                        <v-list-item to="/about" density="compact">关于我们</v-list-item>
                        <v-list-item to="/products" density="compact">商品列表</v-list-item>
                        <v-list-item to="/categories" density="compact">商品分类</v-list-item>
                        <v-list-item to="/promotions" density="compact">优惠活动</v-list-item>
                    </v-list>
                </v-col>

                <!-- Customer Service -->
                <v-col cols="12" sm="6" md="3" class="mb-6 mb-md-0">
                    <h4 class="text-subtitle-1 font-weight-bold mb-4">客户服务</h4>
                    <v-list density="compact" nav class="footer-list">
                        <v-list-item to="/faq" density="compact">常见问题</v-list-item>
                        <v-list-item to="/shipping" density="compact">配送说明</v-list-item>
                        <v-list-item to="/returns" density="compact">退换货政策</v-list-item>
                        <v-list-item to="/contact" density="compact">联系我们</v-list-item>
                    </v-list>
                </v-col>

                <!-- Contact Info -->
                <v-col cols="12" md="3">
                    <h4 class="text-subtitle-1 font-weight-bold mb-4">联系方式</h4>
                    <div class="mb-3">
                        <div class="d-flex align-center mb-2">
                            <v-icon size="small" color="primary" class="mr-2">mdi-phone</v-icon>
                            <span class="text-body-2">400-123-4567</span>
                        </div>
                        <div class="d-flex align-center mb-2">
                            <v-icon size="small" color="primary" class="mr-2">mdi-email</v-icon>
                            <span class="text-body-2">support@gomall.com</span>
                        </div>
                        <div class="d-flex align-center">
                            <v-icon size="small" color="primary" class="mr-2">mdi-map-marker</v-icon>
                            <span class="text-body-2">上海市浦东新区张江高科技园区</span>
                        </div>
                    </div>
                    <!-- Newsletter Subscription -->
                    <v-text-field
                        density="compact"
                        variant="outlined"
                        placeholder="订阅我们的新闻"
                        append-inner-icon="mdi-send"
                        hide-details
                        class="newsletter-input"
                        @click:append-inner="subscribeNewsletter"
                    ></v-text-field>
                </v-col>
            </v-row>

            <!-- Bottom Bar -->
            <v-divider class="my-4"></v-divider>
            <div class="d-flex flex-column flex-md-row justify-space-between align-center text-center text-md-left">
                <div class="text-body-2 text-medium-emphasis mb-2 mb-md-0">
                    {{ new Date().getFullYear() }} GoMall. 保留所有权利。
                </div>
                <div class="d-flex flex-column flex-md-row">
                    <v-btn variant="text" to="/privacy" class="text-body-2 text-medium-emphasis mr-md-4">隐私政策</v-btn>
                    <v-btn variant="text" to="/terms" class="text-body-2 text-medium-emphasis mr-md-4">服务条款</v-btn>
                    <v-btn variant="text" to="/sitemap" class="text-body-2 text-medium-emphasis">网站地图</v-btn>
                </div>
            </div>
        </v-container>
    </v-footer>
</template>

<script setup lang="ts">
const subscribeNewsletter = () => {
    // 实现订阅逻辑
    console.log('Newsletter subscription');
};
</script>

<style scoped>
.footer {
    background-color: #f8f9fa;
    color: #2c3e50;
    padding: 48px 0 24px;
}

.footer-list {
    background-color: transparent;
    padding: 0;
}

:deep(.v-list-item) {
    min-height: 32px !important;
    color: #64748b;
    padding: 0;
}

:deep(.v-list-item:hover) {
    color: rgb(var(--v-theme-primary));
}

.newsletter-input {
    max-width: 300px;
}

:deep(.v-btn--variant-text) {
    opacity: 0.75;
}

:deep(.v-btn--variant-text:hover) {
    opacity: 1;
}
</style>
