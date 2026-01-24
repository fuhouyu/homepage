import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import gzipPlugin from 'vite-plugin-compression';
import path from 'path';
import { createHtmlPlugin } from 'vite-plugin-html';

export default ({ mode }: { mode: string }) => {
  // 加载 .env.dev 文件
  const env = loadEnv(mode, process.cwd(), '');

  const isDev = mode === 'dev';

  const plugins = [
    react(),
    !isDev &&
      gzipPlugin({
        ext: '.gz',
        filter: /\.(js|css|html|svg)$/,
      }),
    createHtmlPlugin({
      inject: {
        data: {
          // 将环境变量映射给 HTML 模板
          VITE_SITE_NAME: env.VITE_SITE_NAME,
        },
      },
    }),
  ].filter(Boolean);

  return defineConfig({
    plugins,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: {
            'primary-color': '#1677ff',
          },
        },
        scss: {
          additionalData: '@use "@/styles/public" as *;', // 全局 SCSS
        },
      },
    },
    base: env.VITE_SECONDARY_PATH || '/',
    build: {
      minify: false,
      outDir: 'dist',
      assetsInlineLimit: 100 * 1024,
    },
  });
};
