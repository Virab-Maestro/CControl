import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/main.css'

//vuetify
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

//components
import App from './App.vue'

const vuetify = createVuetify({
    components,
    directives,
})

createApp(App).use(vuetify).use(createPinia()).mount('#app')