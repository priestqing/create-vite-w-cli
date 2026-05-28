import { answersType } from '../interface.js'

const mainStr = (answers: answersType) => {
    return (`import { createApp } from 'vue'
${_configImport(answers)}
import '@/style.css'
import App from '@/App.vue'

const app = createApp(App)
${_configAppUse(answers)}
app.mount('#app')
    
`)
}


const _configImport = (answers: answersType) => {
    let configStr = ''
    if (['vite-all', 'vite-all-mock'].includes(answers['w-template'])) {
        configStr += `
import router from '@/router/index.js'
import { createPinia } from 'pinia'
import piniaPersistedstate from 'pinia-plugin-persistedstate'`
    }

    if (answers['w-ui'] == 'element-plus') {
        configStr += `
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'   
import zhCn from 'element-plus/es/locale/lang/zh-cn' 
import 'element-plus/dist/index.css'`
    }

    if (answers['w-ui'] == 'tdesign') {
        configStr += `
import TDesign from 'tdesign-vue-next'
import 'tdesign-vue-next/es/style/index.css'`
    }

    if (answers['w-ui'] == 'tdesign-mobile') {
        configStr += `
import TDesign from 'tdesign-mobile-vue'
import 'tdesign-mobile-vue/es/style/index.css'`
    }

    if (answers['is-ckeditor']) {
        configStr += `
import CKEditor from '@ckeditor/ckeditor5-vue';`
    }

    return configStr
}

const _configAppUse = (answers: answersType) => {
    let configStr = ''
    if (['vite-all', 'vite-all-mock'].includes(answers['w-template'])) {
        configStr += `
app.use(router)

const pinia = createPinia()
pinia.use(piniaPersistedstate)
app.use(pinia)`
    }

    if (answers['w-ui'] == 'element-plus') {
        configStr += `
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(ElementPlus, { locale: zhCn })`
    }

    if (answers['w-ui'] == 'tdesign' || answers['w-ui'] == 'tdesign-mobile') {
        configStr += `
app.use(TDesign)`
    }

    if (answers['is-ckeditor']) {
        configStr += `
app.use(CKEditor)`
    }

    return configStr
}







export default mainStr
