// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { resolve } from "node:path";
import { defineConfig } from "file:///Users/ss/Documents/projects/vue-subscription/node_modules/.pnpm/vite@4.1.4_@types+node@18.14.6/node_modules/vite/dist/node/index.js";
import dts from "file:///Users/ss/Documents/projects/vue-subscription/node_modules/.pnpm/vite-plugin-dts@2.1.0_pakyy5w5azqvyjtjjomilajlpy/node_modules/vite-plugin-dts/dist/index.mjs";
import vue from "file:///Users/ss/Documents/projects/vue-subscription/node_modules/.pnpm/@vitejs+plugin-vue@4.0.0_vite@4.1.4+vue@3.2.47/node_modules/@vitejs/plugin-vue/dist/index.mjs";
var __vite_injected_original_dirname = "/Users/ss/Documents/projects/vue-subscription";
var __vite_injected_original_import_meta_url = "file:///Users/ss/Documents/projects/vue-subscription/vite.config.ts";
var vite_config_default = defineConfig({
  build: {
    minify: "esbuild",
    lib: {
      entry: resolve(__vite_injected_original_dirname, "src/index.ts"),
      name: "vue-subscription",
      fileName: "vue-subscription"
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue"
        }
      }
    }
  },
  plugins: [vue(), dts()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvc3MvRG9jdW1lbnRzL3Byb2plY3RzL3Z1ZS1zdWJzY3JpcHRpb25cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9zcy9Eb2N1bWVudHMvcHJvamVjdHMvdnVlLXN1YnNjcmlwdGlvbi92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvc3MvRG9jdW1lbnRzL3Byb2plY3RzL3Z1ZS1zdWJzY3JpcHRpb24vdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICdub2RlOnVybCc7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAnbm9kZTpwYXRoJztcblxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgZHRzIGZyb20gJ3ZpdGUtcGx1Z2luLWR0cyc7XG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG5cdGJ1aWxkOiB7XG5cdFx0bWluaWZ5OiAnZXNidWlsZCcsXG5cdFx0bGliOiB7XG5cdFx0XHRlbnRyeTogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvaW5kZXgudHMnKSxcblx0XHRcdG5hbWU6ICd2dWUtc3Vic2NyaXB0aW9uJyxcblx0XHRcdGZpbGVOYW1lOiAndnVlLXN1YnNjcmlwdGlvbidcblx0XHR9LFxuXHRcdHJvbGx1cE9wdGlvbnM6IHtcblx0XHRcdGV4dGVybmFsOiBbJ3Z1ZSddLFxuXHRcdFx0b3V0cHV0OiB7XG5cdFx0XHRcdGdsb2JhbHM6IHtcblx0XHRcdFx0XHR2dWU6ICdWdWUnXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cdHBsdWdpbnM6IFt2dWUoKSwgZHRzKCldLFxuXHRyZXNvbHZlOiB7XG5cdFx0YWxpYXM6IHtcblx0XHRcdCdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpXG5cdFx0fVxuXHR9XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBeVQsU0FBUyxlQUFlLFdBQVc7QUFDNVYsU0FBUyxlQUFlO0FBRXhCLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixPQUFPLFNBQVM7QUFMaEIsSUFBTSxtQ0FBbUM7QUFBeUosSUFBTSwyQ0FBMkM7QUFPblAsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDM0IsT0FBTztBQUFBLElBQ04sUUFBUTtBQUFBLElBQ1IsS0FBSztBQUFBLE1BQ0osT0FBTyxRQUFRLGtDQUFXLGNBQWM7QUFBQSxNQUN4QyxNQUFNO0FBQUEsTUFDTixVQUFVO0FBQUEsSUFDWDtBQUFBLElBQ0EsZUFBZTtBQUFBLE1BQ2QsVUFBVSxDQUFDLEtBQUs7QUFBQSxNQUNoQixRQUFRO0FBQUEsUUFDUCxTQUFTO0FBQUEsVUFDUixLQUFLO0FBQUEsUUFDTjtBQUFBLE1BQ0Q7QUFBQSxJQUNEO0FBQUEsRUFDRDtBQUFBLEVBQ0EsU0FBUyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7QUFBQSxFQUN0QixTQUFTO0FBQUEsSUFDUixPQUFPO0FBQUEsTUFDTixLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLElBQ3JEO0FBQUEsRUFDRDtBQUNELENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
