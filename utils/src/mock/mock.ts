import { answersType } from '../../interface.js'

export const mockStr = (answers: answersType) => {
    return (`${answers['is-ts'] ? `import { MockMethod } from 'vite-plugin-mock'` : ''}
const mock${answers['is-ts'] ? `: Array<MockMethod>` : ''} = [
    {
        url: '/api/test',
        method: 'get',
        response: () => {
            return {
                status: 200,
                message: 'success',
                data: 'hello world',
            }
        },
    },
]

export default mock
    
    `)
}

export const apiStr = () => {
    return `import req from '@/utils/request.js'

export const testApi = () => req({ url: '/api/test', method: 'get' })`
}
