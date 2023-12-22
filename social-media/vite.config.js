// todo-frontend/vite.config.js

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "../social-media-django-backend/socialMedia/socialMedia/static/", // Adjust the path as needed
    assetsDir: ".",
    emptyOutDir: true, // Add this line to prevent clearing files outside outDir
    rollupOptions: {
      input: "src/main.jsx", // Adjust based on your file structure
    },
    manifest: false, // Disable appending unique identifiers to filenames
  },
});
