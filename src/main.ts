import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/main.css'

//vuetify
import vuetify from "@/plugins/vuetify.ts";

//components
import App from './App.vue'

createApp(App)
    .use(vuetify)
    .use(createPinia())
    .mount('#app')