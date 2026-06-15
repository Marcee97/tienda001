import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host:true,
    allowedHosts: "all",
     historyApiFallback: true
  }
})


// 192.168.0.221