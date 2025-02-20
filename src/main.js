import { createApp } from 'vue';
import { createPinia, setActivePinia } from 'pinia';
import router from './router';
import App from './App.vue';
import ElementPlus from 'element-plus';
import Http from './api/http';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import 'element-plus/dist/index.css';
import '@/assets/css/index.scss';

const app = createApp(App);
app.config.globalProperties.$api = Http;

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

const pinia = createPinia();
app.use(router);
app.use(pinia);
app.use(ElementPlus);
// setActivePinia(pinia);

app.mount('#app');
