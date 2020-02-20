const pkg = require('./package')
const base = '/api'
module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  env: {
    // proxyUrl: 'http://192.168.100.242:8080/app/mock/65/api'
    proxyUrl: base
    // baseUrl: base
  },
  head: {
    title: '智慧网咖后台管理',
    script: [
      { src: 'https://gw.alipayobjects.com/os/antv/pkg/_antv.g2-3.5.1/dist/g2.min.js' },
      { src: 'https://gw.alipayobjects.com/os/antv/pkg/_antv.data-set-0.10.1/dist/data-set.min.js' }
    ],
    meta: [{
      charset: 'utf-8'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    },
    {
      hid: 'description',
      name: 'description',
      content: pkg.description
    }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },
  server: {
    port: 8800, // default: 3000
    host: '192.168.96.182' // default: localhost,
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },

  /*
   ** Global CSS
   */
  css: [
    './assets/style/reset.css',
    'element-ui/lib/theme-chalk/index.css',
    '~/static/common.css',
    '~/static/fonts/iconfont.css',
    'assets/main.css'
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{
    src: '~plugins/before',
    ssr: false
  },
  {
    src: '~/plugins/global.js',
    ssr: true
  },
  {
    src: '~/static/fonts/iconfont.js',
    ssr: false
  },
  '@/plugins/element-ui'
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/style-resources'
  ],

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    presets: ['es2015', 'stage-0'],
    styleResources: {},
    transpile: [/^element-ui/],
    extend(config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
