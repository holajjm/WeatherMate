import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import alias from "@rollup/plugin-alias";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "src") },
      { find: "@assets", replacement: path.resolve(__dirname, "src/assets") },
      {
        find: "@components",
        replacement: path.resolve(__dirname, "src/components"),
      },
      {
        find: "@constants",
        replacement: path.resolve(__dirname, "src/constants"),
      },
      {
        find: "@features",
        replacement: path.resolve(__dirname, "src/features"),
      },
      { find: "@hooks", replacement: path.resolve(__dirname, "src/hooks") },
      { find: "@pages", replacement: path.resolve(__dirname, "src/pages") },
      { find: "@community", replacement: path.resolve(__dirname, "src/community") },
      { find: "@location", replacement: path.resolve(__dirname, "src/location") },
      { find: "@main", replacement: path.resolve(__dirname, "src/main") },
      { find: "@Mbti", replacement: path.resolve(__dirname, "src/Mbti") },
      { find: "@user", replacement: path.resolve(__dirname, "src/user") },
      { find: "@recoil", replacement: path.resolve(__dirname, "src/recoil") },
      { find: "@store", replacement: path.resolve(__dirname, "src/store") },
      { find: "@types", replacement: path.resolve(__dirname, "src/types") },
    ],
  },
});
