export const permissionStr = () => {
    return `import { Directive, DirectiveBinding, ref, watch } from "vue"
import { menuStore } from "@/store/menu"

const store = menuStore()
const permission = ref<string[]>([])

permission.value = store.permission
watch(
    () => store.permission,
    async () => {
        permission.value = store.permission
    }
)

const vPermission: Directive = (el: HTMLElement, binding: DirectiveBinding<string[]>) => {
    if (binding.value.length > 0 && permission.value?.indexOf(binding.value[0]) == -1) el.parentNode && el.parentNode.removeChild(el)
}

export default vPermission


//use
// import vPermission from '@/utils/permission'
// <div v-permission="['add']">any</div>
        
`
}

export const menuStoreStr = () => {
    return `import { defineStore } from "pinia"
export interface menuType {
    id: string,
    name: string,
    url: string,
    icon: string | null | undefined
}
export const menuStore = defineStore("menuStore", {
    state: () => {
        return {
            menuInfo: {
                name: "",
                id: "",
                url: "",
            },
            //这里要根据具体权限来控制
            permission: ["add"] as string[],
        }
    },
    getters: {},
    actions: {
        updatePermission(code: string) {
            return new Promise((resolve) => {
                //这里调用接口获取权限
                code
                //这里要根据具体权限来控制
                this.permission = ["add"]
                resolve(true)
            })
        },
    },
    persist: {
        key: "menuStore",
        storage: sessionStorage,
    },
})
    `
}
