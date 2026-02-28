import '@fontsource-variable/jost'
import 'floating-vue/dist/style.css'
import './style.css'

import FloatingVue from 'floating-vue'
import { createApp } from 'vue'

import App from './App.vue'

FloatingVue.options.themes['bare'] = {
    $extend: 'dropdown',
    $resetCss: true
}

createApp(App).mount('#app')
