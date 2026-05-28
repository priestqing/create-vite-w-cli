import { answersType } from '../interface.js'
const appStr = (answers: answersType) => {
    if (['vite-all', 'vite-all-mock'].includes(answers['w-template'])) {
        return (
            `<template>
    <router-view />
</template>`)
    }

    return (
        `<template>
    <div>
        <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" class="logo" alt="Vite logo" />
        </a>
    </div>
</template>

<style lang="scss" scoped>
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
}
.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
`)
}


export default appStr
