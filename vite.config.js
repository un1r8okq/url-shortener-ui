import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const proxyOptions =  {
  target: 'http://localhost:8080',
  xfwd: true,
  changeOrigin: true,
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '^/api/.+': proxyOptions,
      '^/s/.+': proxyOptions,
      '^/login/.+': proxyOptions,
      '^/oauth2/.+': proxyOptions,
    },
  },
});
