import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  //開發中 與產品路徑
  base: process.env.NODE_ENV === "production" ? "/react-todolist/" : "/",
  plugins: [react()],
});
