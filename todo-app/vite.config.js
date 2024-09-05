import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
   plugins: [react()],
   build: {
      manifest: true,
      outDir: "public/build",
      rollupOptions: {
         input: "resources/js/app.jsx", // Updated path
      },
   },
   resolve: {
      alias: {
         "@": resolve(__dirname, "resources/js"),
      },
   },
});
