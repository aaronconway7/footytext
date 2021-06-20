import range from 'lodash/range'

const meta = {
    title: `footytext`,
    description: `Read football news, view past and present English Premier League tables and check live scores in a nostalgic teletext/ceefax recreation!`,
    image: `/screenshot.png`,
}

export default {
    // Target: https://go.nuxtjs.dev/config-target
    target: 'static',

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: meta.title,
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                hid: 'description',
                name: 'description',
                content: meta.description,
            },
            {
                hid: 'twitter:title',
                name: 'twitter:title',
                content: meta.title,
            },
            {
                hid: 'twitter:description',
                name: 'twitter:description',
                content: meta.description,
            },
            {
                hid: 'twitter:image',
                name: 'twitter:image',
                content: meta.image,
            },
            {
                hid: 'twitter:image:alt',
                name: 'twitter:image:alt',
                content: meta.title,
            },
            {
                hid: 'og:title',
                property: 'og:title',
                content: meta.title,
            },
            {
                hid: 'og:description',
                property: 'og:description',
                content: meta.description,
            },
            {
                hid: 'og:image',
                property: 'og:image',
                content: meta.image,
            },
            {
                hid: 'og:image:secure_url',
                property: 'og:image:secure_url',
                content: meta.image,
            },
            {
                hid: 'og:image:alt',
                property: 'og:image:alt',
                content: meta.title,
            },
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: ['@/assets/css/teletext.css'],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: ['@nuxtjs/dotenv'],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/pwa
        '@nuxtjs/pwa',
        '@nuxt/http',
        '@nuxtjs/dayjs',
    ],

    // PWA module configuration: https://go.nuxtjs.dev/pwa
    pwa: {
        manifest: {
            lang: 'en',
        },
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},

    generate: {
        routes: [
            ...range(1992, new Date().getFullYear()).map((y) => `/pl/${y}`),
        ],
        fallback: true,
    },
}
