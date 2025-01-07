export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2024-04-03',
  devtools: {enabled: true},
  modules: ['@nuxt/ui', '@pinia/nuxt'],
  colorMode: {
    preference: 'light'
  },
  app: {
    head: {
      link: [
        {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Jost:wght@400;500;700&display=swap'}
      ]
    },
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    },
    baseURL: process.env.NODE_ENV === 'development' ? '' : '/fyp-frontend/',
  },
  nitro: {
    preset: 'github_pages'
  },
  runtimeConfig: {
    public: {
      isDev: process.env.NODE_ENV === 'development',
    },
  },
})