import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import legacy from "@vitejs/plugin-legacy";
const VuetifyPlugin = require("vite-plugin-vuetify");

// https://vitejs.dev/config/
export default defineConfig({
  base: "/kegel-timer/",
  plugins: [
    vue(),
    VuetifyPlugin(),
    legacy({
      targets: ["> 5%", "last 2 iOS major versions"],
    }),
  ],
});
