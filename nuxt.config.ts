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
        staticFilename: '[publicPath]/[name][ext]',
        domains: ['injecto.tech'],
        format: ['webp', 'jpg', 'png'],
        dir: 'public',
        quality: 80,
        preload: true,
        screens: {
            xs: 320,
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280,
            xxl: 1536
        }
    },
})