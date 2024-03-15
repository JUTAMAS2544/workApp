// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    // ... your configuration
  })
  app.vueApp.use(vuetify)


  // Middleware
  // addRouteMiddleware('global-test', () => {
  //   console.log('this global middleware was added in TTTT')
  // }, { global: true })

  // addRouteMiddleware('demo-test', () => {
  //   console.log('this TEST middleware was added in OOO')
  // })
})
