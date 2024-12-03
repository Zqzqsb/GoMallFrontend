import { createApp } from 'vue';
import App from './App.vue';

// Tailwind CSS
import './index.css';

// Vuetify 3
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({ components, directives });

createApp(App).use(vuetify).mount('#app');
