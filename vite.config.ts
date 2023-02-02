// vite.config.js
import { defineConfig, loadEnv, ConfigEnv, UserConfigExport } from "vite";
import vue from "@vitejs/plugin-vue";
// npm install --save-dev @types/node
import { resolve } from "path";
// https://vitejs.dev/config/
const config = ({ command, mode }: ConfigEnv): UserConfigExport => {
  return defineConfig({
    publicDir: "public",
    // 别名
    resolve: {
      alias: [
        {
          find: "@",
          replacement: resolve(__dirname, "src"),
        },
        {
          find: "@views",
          replacement: resolve(__dirname, "src/views"),
        },
        {
          find: "@components",
          replacement: resolve(__dirname, "src/components"),
        },
        {
          find: "public",
          replacement: resolve(__dirname, "public"),
        },
      ],
    },
    plugins: [
      vue(),
    ], // 使用该插件
  });
};

export default config;
