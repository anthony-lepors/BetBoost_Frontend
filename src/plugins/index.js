/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import pinia from '../store'
import router from '../router'
import VueGtag from "vue-gtag"
// import VueHead from 'vue-head'
import { createHead } from '@unhead/vue'


export function registerPlugins (app) {
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(createHead())
    .use(VueGtag, {
      config: { id: "G-S17E08ED1G" },
    })
}
