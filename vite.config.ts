import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const serverSettings =
    mode === "production" ? {
    server: {
      port: 80,
      host: true,
      watch: {
        usePolling: true,
      },
    }
  } : {};

  return {
    plugins: [react()],
    resolve: {
      alias: {
        app: "/src/app",
        pages: "/src/pages",
        widgets: "/src/widgets",
        features: "/src/features",
        entities: "/src/entities",
        shared: "/src/shared",
      },
    },
    ...serverSettings,
  };
});
