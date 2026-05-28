export const envStr = () => {
    return `
    VITE_SERVER_URL = "http://localhost:5173"
    VITE_APP_BASE_URL = '/'
    `
}

export const dts = () => {
    return `declare global {
        interface Window {
            globalConfig: {
                VITE_SERVER_URL: string;
            };
        }
    }
    export { };`
}

export const pubConfig = () => {
    return `const VITE_SERVER_URL = 'http://localhost:5173'
window.globalConfig = {
    VITE_SERVER_URL
}`
}