import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                nested: resolve(__dirname, 'public/work.html'),
                nested_2: resolve(__dirname, 'public/skills.html')
            }
        }
    }
})