import { answersType } from '../../interface.js'

const axiosStr = (answers: answersType) => {
    return (`${_configImport(answers)}

const serverURL = 'http://localhost:5173' //mock服务 或者远程服务的地址

// const serverURL = import.meta.env.VITE_SERVER_URL //env环境变量的地址
// const serverURL = window.globalConfig.VITE_SERVER_URL //public全局变量的地址(打包后也可以随意更换地址)

const service = axios.create({
    baseURL: serverURL,
    timeout: 5000
})

${_configLoaing(answers)}

service.interceptors.request.use((config${answers['is-ts'] ? ': InternalAxiosRequestConfig' : ''}) => {
    // 处理 URL 中的占位符
    const mapList = { ...config.params, ...config.data }
    const deleteList: string[] = []
    for (const i in mapList) {
        if (config.url?.includes(${`\`{\${i}}\``})) {
            config.url = config.url.replace(${`\`{\${i}}\``}, mapList[i].toString())
            deleteList.push(i)
        }
    }
    deleteList.forEach((i) => {
        config.params && delete config.params[i]
        config.data && delete config.data[i]
    })

    // data数据转为json字符串
    if (['GET', 'POST', 'PUT', 'DELETE'].includes(config.method?.toUpperCase() || 'GET') && config.url !== '/login' && !(config.data instanceof FormData)) {
        config.data = JSON.stringify(config.data)
    }

    // 设置默认 Content-Type
    config.headers['Content-Type'] = config.headers['Content-Type'] || 'application/json;charset=utf-8'

    // 显示加载遮罩
    if (config.method && ['POST', 'PUT', 'DELETE'].includes(config.method.toUpperCase())) {
        ${_configLoadingShow(answers)}
    }
    return config
})

// 响应拦截器
service.interceptors.response.use(
    (res: AxiosResponse) => {
        if (res.config.method?.toUpperCase() && ['POST', 'PUT', 'DELETE'].includes(res.config.method?.toUpperCase())) {
            //这里是一个加载请求的遮罩放置的位置 - 关闭
            ${_configLoadingHide(answers)}
        }
        if ((res.status === 200 && res.data.code !== 0) || res.status !== 200) {
            if (res.request.responseType !== 'blob') {
                ${_configMessageError(answers, `\`\${res.data.msg}\${(res.data.data === 'null' || res.data.data == null) ? '' : ${`\`,\${res.data.data}\``}}\``)}
            }
            if (res.data.code === 401) {
                router.replace('/Login').then(() => {})
            }
            return Promise.reject(res)
        }
        return res
    },
    (error) => {
        if (error.method?.toUpperCase() && ['POST', 'PUT', 'DELETE'].includes(error.method?.toUpperCase())) {
            //这里是一个加载请求的遮罩放置的位置 - 关闭
            ${_configLoadingHide(answers)}
        }
        if (error?.response?.status === 401) {
            router.replace('/Login').then(() => {})
        } else if (error?.response?.status === 404) {
            ${_configMessageError(answers, `\`接口地址有误\``)}
        }
        else if (error) {
            ${_configMessageError(answers, `\`\${error.msg || '服务器错误'}\``)}
        }
        return Promise.reject(error)
    },
)

export default service
    
    `)
}


const _configImport = (answers: answersType) => {
    let configStr = ''
    configStr += `import axios from 'axios'`
    if (answers['is-ts']) {
        configStr += `
import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios'`
    }

    if (answers['w-ui'] == 'element-plus') {
        configStr += `
import { ElMessage, ElLoading } from 'element-plus'`
    }

    if (answers['w-ui'] == 'tdesign') {
        configStr += `
import { LoadingPlugin as loadingPlugin, MessagePlugin } from 'tdesign-vue-next';`
    }

    configStr += `
import router from '@/router/index'`

    return configStr
}

const _configLoaing = (answers: answersType) => {
    let configStr = ''

    if (answers['w-ui'] == 'element-plus') {
        configStr += `
let loading: ReturnType<typeof ElLoading.service> | null = null
const loadingShow = () => {
    loading = ElLoading.service({
        lock: true,
        text: 'loading...',
    })
}

const loadingHide = () => {
    if (loading)
        loading.close()
}`
    }

    return configStr
}


const _configLoadingShow = (answers: answersType) => {
    if (answers['w-ui'] == 'element-plus') {
        return `loadingShow()`
    } else if (answers['w-ui'] == 'tdesign') {
        return `loadingPlugin(true)`
    } else {
        return ''
    }
}

const _configLoadingHide = (answers: answersType) => {
    if (answers['w-ui'] == 'element-plus') {
        return `loadingHide()`
    } else if (answers['w-ui'] == 'tdesign') {
        return `loadingPlugin(false)`
    } else {
        return ''
    }
}

const _configMessageError = (answers: answersType, msg: string) => {
    if (answers['w-ui'] == 'element-plus') {
        return `ElMessage.error(${msg})`
    } else if (answers['w-ui'] == 'tdesign') {
        return `MessagePlugin.error({ content: ${msg} })`
    } else {
        return ''
    }
}

export default axiosStr