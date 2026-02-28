import { createApp } from 'vue';
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query';
import 'floating-vue/dist/style.css';
import './style.css';
import App from './App.vue';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
            gcTime: Infinity,
        },
    },
});

createApp(App).use(VueQueryPlugin, { queryClient }).mount('#app');
