import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import path from 'path';

export default defineConfig({
    plugins: [
        legacy({
            targets: ['defaults', 'not IE 11'], // Legacy browser support
        }),
        viteStaticCopy({
            targets: [
                { src: 'node_modules/scratch-blocks/media', dest: 'media' },
                { src: 'node_modules/scratch-storage/dist/web', dest: '' },
                { src: 'node_modules/scratch-render/dist/web', dest: '' },
                { src: 'node_modules/@turbowarp/scratch-svg-renderer/dist/web', dest: '' },
                { src: 'src/playground', dest: '' },
            ],
        }),
    ],
    build: {
        rollupOptions: {
            input: {
                'scratch-vm': './src/index.js',
                'benchmark': './src/playground/benchmark',
                'video-sensing-extension-debug': './src/extensions/scratch3_video_sensing/debug',
            },
            output: {
                entryFileNames: '[name].js',
                chunkFileNames: '[name].js',
                assetFileNames: '[name].[ext]',
                dir: 'dist',
                format: 'es', // Use ES module format for multiple entry points
            },
        },
        outDir: 'dist',
        sourcemap: true,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    server: {
        host: '0.0.0.0',
        port: process.env.PORT || 8073,
    },
});