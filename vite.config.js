import { defineConfig } from 'vite'
import { searchForWorkspaceRoot } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({

    define: {
        'process.env': {}
    },
    global: {},
    server: {

        proxy: {
            '/api/': 'process.env.VITE_DEV_API_URL'
        }
    }
})