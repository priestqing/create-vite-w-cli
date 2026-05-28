<template>
    <Codemirror v-model="form.ymlConfig" :style="{ height: '400px', width: '100%' }" indent-with-tab :tab-size="2" :extensions="extensions" />
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { Codemirror } from 'vue-codemirror'
import { yaml } from '@codemirror/legacy-modes/mode/yaml'
import { oneDark } from '@codemirror/theme-one-dark'
import { StreamLanguage } from '@codemirror/language'


const extensions = [StreamLanguage.define(yaml), oneDark]



const form = reactive({
    ymlConfig: '',
})
</script>