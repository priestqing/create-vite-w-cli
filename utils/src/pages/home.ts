import { answersType } from '../../interface.js'

const homeStr = (answers: answersType) => {
    return (`<script setup ${answers['is-ts'] ? 'lang="ts"' : ''}>
import { ref } from 'vue'
import { testApi } from '@/apis/index${answers['is-ts'] ? '' : '.js'}'

const value = ref('hello')

testApi().then((res) => {
    value.value = res.data.data
})
</script>

<template>
    <h1>{{ value }}</h1>
</template>

<style lang="scss" scoped>

</style>
`)
}

export default homeStr