import { answersType } from '../interface.js'

const viteStr = (answers: answersType) => {
    return (
        `import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { compression } from 'vite-plugin-compression2'
import checkFile from './vite-plugins/check-filename-plugins'
import legacy from '@vitejs/plugin-legacy'
import Inspector from 'unplugin-vue-inspector/vite'
import svgLoader from 'vite-svg-loader'
${_configImport(answers)}
import { config } from 'dotenv'

config()

export default defineConfig({
    base : process.env.VITE_APP_BASE_URL || '/',
    //如果走Nginx的网关 就开启server,接口地址不写ip只写接口, 否则就把server删掉
    // server: {
    // \tproxy: {
    // \t\t"/api/webskt/": {
    // \t\t\ttarget: "ws://192.168.66.181:16920/",
    // \t\t\tws: true,
    // \t\t\theaders: {
    // \t\t\t\tReferer: "ws://192.168.66.181:16920",
    // \t\t\t},
    // \t\t},
    // \t\t"/api": {
    // \t\t\ttarget: "http://192.168.66.181:16920/",
    // \t\t\tchangeOrigin: true,
    // \t\t},
    // \t\t"/api/warn/": {
    // \t\t\ttarget: "ws://192.168.66.181:16920/",
    // \t\t\tws: true,
    // \t\t},
    // \t},
    // },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    plugins : [
        vue(),
        Inspector({
            launchEditor : process.env.RUN_MODE // 'code' -> 'vscode'
        }),
        vueJsx(),
        legacy({
            targets: ['defaults', 'not IE 11'],
        //  polyfills: ['es.promise.finally', 'es/map', 'es/set'],
        //  modernPolyfills: [
        //      'es.promise.finally'
        //  ],
        //  renderLegacyChunks: false,
        }),
        checkFile(),
        ${_usePlugins(answers)}
        compression({
        //   threshold: 1024000
        }),
        svgLoader(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [
                ElementPlusResolver({
                    importStyle: 'sass',
                }),
            ],
        }),
    ],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: \`@use "@/style.scss" as *;\`,
            },
        },
    },
    build: {
        sourcemap: false,
        emptyOutDir: true,
        chunkSizeWarningLimit: 1500,
        // rollupOptions: {
        // \toutput: {
        // \t\tmanualChunks(id) {
        // \t\t},
        // \t},
        // },
    },
})

`
    )
}


const _configImport = (answers: answersType) => {
    let configStr = ''
    if (answers['w-template'] == 'vite-all-mock') {
        configStr += `import { viteMockServe } from 'vite-plugin-mock'`
    }

    if (answers['w-ui'] == 'element-plus') {
        configStr += `
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'`
    }

    if (answers['is-tailwindcss']){
        configStr += `
import tailwindcss from '@tailwindcss/vite'`
    }

    return configStr
}

const _usePlugins = (answers: answersType) => {
    let configStr = ''
    if (answers['is-tailwindcss']){
        configStr += `
        tailwindcss(),`
    }
    return configStr
}


const _configPlugins = (answers: answersType) => {
    let configStr = ''
    if (answers['w-template'] == 'vite-all-mock') {
        configStr += `viteMockServe({
			mockPath: './src/mock/',
			logger: false,
			supportTs: false,
		}),`
    }

    if (answers['w-ui'] == 'element-plus') {
        configStr += `
        AutoImport({
			resolvers: [ElementPlusResolver()],
		}),
		Components({
			resolvers: [
				ElementPlusResolver({
					importStyle: 'sass',
				}),
			],
		}),`
    }


    return configStr
}

const _configOther = (answers: answersType) => {
    let configStr = ''

    if (answers['w-ui'] == 'element-plus') {
        configStr += `css: {
        preprocessorOptions: {
            scss: {
                additionalData: \`@use "@/style.scss" as *;\`,
            },
        },
    },`
    }

    return configStr
}




export default viteStr