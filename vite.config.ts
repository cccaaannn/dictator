import { defineConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikReact } from "@builder.io/qwik-react/vite";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        qwikVite({
            csr: true,
        }),
        qwikReact()
    ],
    resolve: {
        alias: [{ find: '@', replacement: '/src' }],
    },
    base: process.env.NODE_ENV === "production" ? "/dictator/" : "/"
});
