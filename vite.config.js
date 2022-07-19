import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
const VuetifyPlugin  = require("vite-plugin-vuetify");

// https://vitejs.dev/config/
export default defineConfig({
  base: "/kegel-timer",
  plugins: [
    vue(), 
    VuetifyPlugin()
  ],
});
