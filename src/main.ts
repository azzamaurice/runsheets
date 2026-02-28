import { createApp } from 'vue'
import FloatingVue from 'floating-vue'
import '@fontsource-variable/jost'
import 'floating-vue/dist/style.css'
import './style.css'
import App from './App.vue'

FloatingVue.options.themes['bare'] = {
    $extend: 'dropdown',
    $resetCss: true
}

createApp(App).mount('#app')
