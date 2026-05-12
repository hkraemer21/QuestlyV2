import '@/scss/app.scss';

import { createPopper } from '@popperjs/core';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index.js'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia).use(router)

app.mount('#app')
