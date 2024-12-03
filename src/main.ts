import { createApp } from 'vue';
import App from './App.vue';
import router from './router'

// Tailwind CSS
import './index.css';
import '@mdi/font/css/materialdesignicons.css';

// Vuetify 3
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({ components, directives });

createApp(App).use(vuetify).use(router).mount('#app');
