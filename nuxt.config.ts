import { fileURLToPath } from 'url'
import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  srcDir: 'src',
  serverMiddleware: [
    { path: '/api', handler: '~/server/server.ts' },
    { path: '/api/**', handler: '~/server/server.ts' },
  ],
  alias: {
    configs: fileURLToPath(new URL('./src/server/configs', import.meta.url)),
    controllers: fileURLToPath(new URL('./src/server/controllers', import.meta.url)),
    exceptions: fileURLToPath(new URL('./src/server/exceptions', import.meta.url)),
    helpers: fileURLToPath(new URL('./src/server/helpers', import.meta.url)),
    middlewares: fileURLToPath(new URL('./src/server/middlewares', import.meta.url)),
    interfaces: fileURLToPath(new URL('./src/server/interfaces', import.meta.url)),
    models: fileURLToPath(new URL('./src/server/models', import.meta.url)),
    routes: fileURLToPath(new URL('./src/server/routes', import.meta.url)),
    services: fileURLToPath(new URL('./src/server/services', import.meta.url)),
    utils: fileURLToPath(new URL('./src/server/utils', import.meta.url)),
  },
  runtimeConfig: {
    dbUrl: process.env.DB_URL,
    dbName: process.env.DB_NAME,
  },

  nitro: {
    plugins: ['~/server/helpers/mongoose.helper.ts'],
  },
})