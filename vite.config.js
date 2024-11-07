import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": "/src/components",
    },
  },
  test: {
    environment: 'jsdom',  
    setupFiles: ["./vitest.setup.js"],
    globals: true, 
    coverage: {
      reporter: ["text", "html"],
    }
  },
});
