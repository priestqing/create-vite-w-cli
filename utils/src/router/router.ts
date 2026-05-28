import { answersType } from '../../interface.js'

const routerStr = (answers: answersType) => {
    return (`import { createRouter, createWebHistory } from 'vue-router'
${answers['is-ts'] ? 'import type { RouteRecordRaw } from \'vue-router\'' : ''}

//白名单 不会被路由守卫拦截
const whiteList = ['/', '/Login', '/Home']

const routes${answers['is-ts'] ? ': Array<RouteRecordRaw>' : ''} = [
    {
        path: '/',
        redirect: '/Home',
    },
    {
        path: '/Home',
        name: 'Home',
        component: () => import('@/pages/Home.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_APP_BASE_URL),
    routes,
})

router.beforeEach((to, _from) => {
    if (!whiteList.includes(to.path)) {
        // 这里判断store里是否存了路由信息 , 没有就用接口重新查  
        // next() 在  Vue Router 4 中已经被废弃了，官方更推荐直接 return 导航结果
        // old: next({ path: to.path, replace: true })
        // new: return { path: to.path, replace: true }
    }
    return true
})

export default router`)
}


export default routerStr