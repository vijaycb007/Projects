import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    watch: {
      ignored: ["**/db.json"],
    },
  },
  build: {
    // Directs the build output to Spring Boot's static resources folder
    outDir: "../resources/static",
    emptyOutDir: true, // Clears the folder before writing new files
  },
});
