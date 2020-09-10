export default {
  
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      '@/assets/js/jquery-3.5.1.min.js',
      '@/assets/js/bootstrap.bundle.min.js'
    ]
  },

  router:{
    middleware:[
      'clearValidationErrors'
    ]
  },

  /*
  ** Global CSS
  */
  css: [
    '@/assets/css/boxicons.min.css',
    'vuesax/dist/vuesax.css',
    // CSS file in the project
    '@/assets/css/bootstrap.min.css',
    '@/assets/css/main.css'
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '@/plugins/vuesax',
    '@/plugins/mixins/validation',
    '@/plugins/mixins/user',
    '@/plugins/axios',

  ],
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/auth/login', method: 'post', propertyName: 'token' },
          logout: { url: '/auth/logout', method: 'get' },
          user: { url: '/my', method: 'get', propertyName: 'data' }
        },
         tokenRequired: true,
         tokenType: 'bearer',
         globalToken: true,
        // autoFetchUser: true
      }
    },
    redirect:{
      login: '/auth/login',
      home: '/'
    },
    plugins: [
      '~/plugins/auth'
    ]
  },
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: 'http://127.0.0.1:8000/api'
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
 extractCSS: true,
  build: {
  }
}
