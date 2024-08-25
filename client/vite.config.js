import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  server: { port: 3000 },
  optimizeDeps: {
    include: [
      '@mui/material/styled',
      '@mui/material/Tooltip'
    ],
  },

  server:{port:3000},
  optimizeDeps: {
    include: [
 
      '@mui/material/styled', 
      '@mui/material/Tooltip'
    ],
  },

})

