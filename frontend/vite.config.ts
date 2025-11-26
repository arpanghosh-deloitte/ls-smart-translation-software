import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // ⬅️ You might need: npm install -D @types/node

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // 🛑 FORCE all libraries to use the SINGLE copy of React in your root folder
      react: path.resolve(__dirname, "./node_modules/react"),
      "react-dom": path.resolve(__dirname, "./node_modules/react-dom"),
    },
  },
});
