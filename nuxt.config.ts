// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: true,
  
  css: ['~/assets/css/main.css'],
  
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/icon'
  ],
  
  colorMode: {
    preference: 'light',
    fallback: 'light'
  },
  
  typescript: {
    typeCheck: false,
    tsConfig: {
      compilerOptions: {
        types: ['@types/node'],
        lib: ['ES2022', 'DOM', 'DOM.Iterable', 'WebWorker']
      }
    }
  },
  
  app: {
    head: {
      title: 'NS-CAPS - 누수탐지 전문가 플랫폼',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '누수탐지 전문가와 고객을 연결하는 플랫폼' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  runtimeConfig: {
    public: {
      apiBase: '/api'
    }
  }
})