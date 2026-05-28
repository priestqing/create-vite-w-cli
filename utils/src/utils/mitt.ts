const mittStr = () => {
    return `import mitt from 'mitt'
import type { Emitter } from 'mitt'

type CustomEmitter = Emitter<Record<string, unknown>> & {
    getTemplateId: () => string
}

const bus: CustomEmitter = mitt() as CustomEmitter


let templateId = ''

bus.on('setTemplateId', (data) => {
    templateId = data as string
})

bus.getTemplateId = () => templateId

export default bus


//use

// A.vue
// import bus from '@/utils/mitt'
// const clickA = () => {
//     alert('clickA')
// }
// bus.on('clickA' , clickA)


// B.vue
// import bus from '@/utils/mitt'
// const clickB = () => {
//     alert('clickB')
//     bus.emit('clickA')
// }

`
}

export default mittStr