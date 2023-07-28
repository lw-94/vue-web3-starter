import { createApp } from 'vue'

import VueCountdown from '@chenfengyuan/vue-countdown'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/css/main.less'
import 'virtual:uno.css'
import 'element-plus/es/components/message/style/css'

import env from '@/../env.yaml'

const mode = import.meta.env.MODE
const config = env[mode]
window.config = config

const app = createApp(App)
app.use(createPinia())
app.use(router)

app.component(VueCountdown.name, VueCountdown)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
