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
      targets: ["Chrome >= 49", "iOS >= 10"],
      // polyfills: ["full/observable", "full/object", "full/array"],
      // additionalLegacyPolyfills: ["resize-observer-polyfill"],
    }),
  ],
});
