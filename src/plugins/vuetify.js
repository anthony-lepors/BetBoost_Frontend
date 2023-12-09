/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import '@core/scss/template/libs/vuetify/index.scss'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// Components
import defaults from './vuetify/defaults'
import { icons } from './vuetify/icons'
import theme from './vuetify/theme'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  defaults,
  icons,
  theme,
})
