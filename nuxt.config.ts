import tailwindcss from '@tailwindcss/vite'
// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2025-04-08',
  devtools: { enabled: true },
  modules: [
    '@nuxt/image',
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@nuxt/icon',
    '@nuxt/fonts'
  ],
  css: ['~/assets/css/main.css'],
  ui: {
    colorMode: true,
  },
  i18n: {
    defaultLocale: 'zh',
    locales: [
      {
        code: 'zh',
        name: '中文',
        file: 'zh.json',
      }, {
        code: 'en',
        name: 'English',
        file: 'en.json',
      }
    ],
  },
  app: {
    head: {
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.png',
        },
      ],
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    // options
  },
})
