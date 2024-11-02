export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2024-04-03',
  devtools: {enabled: true},
  modules: ['@nuxt/ui'],
  colorMode: {
    preference: 'light'
  },
  app: {
    head: {
      link: [
        {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Jost:wght@400;500;700&display=swap'}
      ]
    }
  },
})