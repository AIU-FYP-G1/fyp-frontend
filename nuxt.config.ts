export default defineNuxtConfig({
    ssr: false,
    compatibilityDate: '2024-04-03',
    devtools: {enabled: true},
    modules: ['@nuxt/ui', '@pinia/nuxt', '@nuxt/image'],
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
        baseURL: '',
    },
    nitro: {
        preset: 'github_pages'
    },
    runtimeConfig: {
        public: {
            isDev: process.env.NODE_ENV === 'development',
        },
    },
    image: {
        provider: 'static',
        staticFilename: '/images/[name][ext]',
    },
})