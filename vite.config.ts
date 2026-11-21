import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import gzipPlugin from 'vite-plugin-compression';
import path from 'path';
import { createHtmlPlugin } from 'vite-plugin-html';

export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const isDev = mode === 'dev';

  const plugins = [
    tailwindcss(),
    react(),
    !isDev &&
      gzipPlugin({
        ext: '.gz',
        filter: /\.(js|css|html|svg)$/,
      }),
    createHtmlPlugin({
      inject: {
        data: {
          VITE_SITE_NAME: env.VITE_SITE_NAME || '',
          VITE_SITE_DES: env.VITE_SITE_DES || '',
          VITE_SITE_KEYWORDS: env.VITE_SITE_KEYWORDS || '',
          VITE_SITE_AUTHOR: env.VITE_SITE_AUTHOR || '',
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
    base: env.VITE_SECONDARY_PATH || '/',
    build: {
      minify: true,
      outDir: 'dist',
      assetsInlineLimit: 100 * 1024,
    },
  });
};
