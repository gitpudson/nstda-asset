import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

//How To Deploy A React Vite App To Github Pages (Simple)
//https://www.youtube.com/watch?v=hn1IkJk24ow


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/nstda-asset'
})
