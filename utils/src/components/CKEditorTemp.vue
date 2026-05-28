<template>
    <ckeditor :editor="editor" v-model="form.content" :config="editorConfig"></ckeditor>
</template>

<script lang="ts" setup>
import { useCkeditor } from '@/hooks/ckeditor'

const { editor, editorConfig } = useCkeditor()



</script>