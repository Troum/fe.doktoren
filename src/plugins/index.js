/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import {loadFonts} from './webfontloader'
import vuetify from './vuetify'
import pinia from '../store'
import router from '../router'
import pluralizator from "@/plugins/pluralizator";
import worker from "@/plugins/worker";
export function registerPlugins(app) {
  loadFonts().then(r => {
  })
  app
    .use(vuetify)
    .use(pinia)
    .use(router)
    .use(pluralizator)
    .use(worker)
}
