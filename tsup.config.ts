import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/app-server.ts'],
  outDir: 'dist',
  format: 'esm',
  clean: true,
  bundle: true,
  platform: 'node'
});
