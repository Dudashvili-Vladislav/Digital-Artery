import { defineConfig } from 'vite'

import path from 'path'
import { ViteAliases } from 'vite-aliases'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        ViteAliases()
    ],
    define: {
        'process.env': {}
    },
    global: {},
    server: {

        proxy: {
            '/api/': 'process.env.VITE_DEV_API_URL'
        }

    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),

        },
    },


})

