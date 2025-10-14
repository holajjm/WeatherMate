import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import alias from "@rollup/plugin-alias";
import * as path from "path";

import VitePluginPrerenderSPA from "vite-plugin-prerender";
import puppeteerRenderer from "@prerenderer/renderer-puppeteer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePluginPrerenderSPA({
      // ✅ 정적 파일이 빌드되는 경로
      staticDir: path.resolve(__dirname, "dist"),

      // ✅ 미리 렌더링할 라우트 목록
      routes: ["/", "/community", "/location", "/mbti", "/user/mypage"],

      // ✅ Puppeteer를 통한 prerender 옵션
      renderer: new puppeteerRenderer({
        headless: true, // 브라우저 숨김 모드
        renderAfterDocumentEvent: "render-event" // 렌더 완료 시점 정의
      })
    })
  ],
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "src") },
      { find: "@assets", replacement: path.resolve(__dirname, "src/assets") },
      {
        find: "@components",
        replacement: path.resolve(__dirname, "src/components")
      },
      {
        find: "@constants",
        replacement: path.resolve(__dirname, "src/constants")
      },
      {
        find: "@features",
        replacement: path.resolve(__dirname, "src/features")
      },
      { find: "@hooks", replacement: path.resolve(__dirname, "src/hooks") },
      { find: "@pages", replacement: path.resolve(__dirname, "src/pages") },
      {
        find: "@community",
        replacement: path.resolve(__dirname, "src/community")
      },
      {
        find: "@location",
        replacement: path.resolve(__dirname, "src/location")
      },
      { find: "@main", replacement: path.resolve(__dirname, "src/main") },
      { find: "@Mbti", replacement: path.resolve(__dirname, "src/Mbti") },
      { find: "@user", replacement: path.resolve(__dirname, "src/user") },
      { find: "@recoil", replacement: path.resolve(__dirname, "src/recoil") },
      { find: "@store", replacement: path.resolve(__dirname, "src/store") },
      { find: "@types", replacement: path.resolve(__dirname, "src/types") }
    ]
  }
});
