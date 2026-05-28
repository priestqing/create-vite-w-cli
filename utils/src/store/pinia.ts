
const piniaStr = () => {
    return `import { defineStore } from 'pinia'

export const countStore = defineStore('countStore', {
    state: () => {
        return {
            count: {
                value: 0,
            },
        }
    },
    getters: {},
    actions: {
        increment() {
            this.count.value++
        },
    },
    persist: {
        key: 'countStore',
        storage: window.sessionStorage,
    },
})


// use
// import { countStore } from "@/store/state"
// const store = countStore()

// const count = ref(store.count.value)
// const increment = () => {
// 	store.increment()
// 	count.value = store.count.value
// }

`
}


export default piniaStr