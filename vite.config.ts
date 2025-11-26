// vite.config.ts

// 1. Import 'loadEnv' from vite, alongside defineConfig
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// 2. Change defineConfig to accept a function `({ mode }) => { ... }`
// This gives us the context needed to load the environment variables.
export default defineConfig(({ mode }) => {
  
  // 3. Call loadEnv inside the function to create the 'env' variable
  // It loads the .env file from the current directory.
  const env = loadEnv(mode, process.cwd(), '');

  // 4. Return your configuration object, now you can safely use the 'env' variable
  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        '/api': {
          // Use the variable from your .env file
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
          secure: false, 
        }
      },
      allowedHosts: [
        '.ngrok-free.app' 
      ]
    }
  }
})