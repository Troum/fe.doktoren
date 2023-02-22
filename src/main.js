import App from './App.vue'
import {createApp} from 'vue'
import {registerPlugins} from '@/plugins'
import mitt from 'mitt';
import './assets/styles/main.scss'

const emitter = mitt();
const app = createApp(App)

registerPlugins(app)

app.provide('emitter', emitter)
app.mount('#app')
