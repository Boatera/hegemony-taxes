import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import VueDevTools from 'vite-plugin-vue-devtools';
import { VitePWA } from 'vite-plugin-pwa';
import { ViteEjsPlugin } from 'vite-plugin-ejs';

// https://vitejs.dev/config/
export default defineConfig({
    base: '/hegemony-taxes/',

    define: {
        __APP_VERSION__: JSON.stringify(require('./package.json').version),
        __APP_REPO__: JSON.stringify(require('./package.json').repository.url),
        __APP_URL__: JSON.stringify(require('./package.json').homepage),
    },

    plugins: [
        vue(),
        vueJsx(),
        VueDevTools(),
        ViteEjsPlugin(),
        VitePWA({
            registerType: 'autoUpdate',
            workbox: {
                cleanupOutdatedCaches: true,
                skipWaiting: true,
                clientsClaim: true,
            },
            includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'icons/*.svg', 'fonts/*'],
            manifest: {
                name: 'Hegemony Taxes',
                short_name: 'Taxes',
                description: 'Simplify tax payments in Hegemony',
                theme_color: '#35464D',
                icons: [
                    {
                        src: 'android-chrome-192x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                    },
                    {
                        src: 'android-chrome-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                    },
                    {
                        src: 'android-chrome-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any',
                    },
                    {
                        src: 'android-chrome-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'maskable',
                    },
                ],
            },
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
});