import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';
import type { Plugin } from 'vite';

const faviconCacheBust = (): Plugin => ({
    name: 'favicon-cache-bust',
    transformIndexHtml: (html: string): string =>
        html.replace(/(href="\/favicon\.svg)(")/g, `$1?v=${Date.now()}$2`),
});

export default defineConfig({
    plugins: [vue(), tailwindcss(), faviconCacheBust()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
});
