import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn'
import { MyCustomUploadAdapterPlugin } from '@/plugins/UploadAdapter'

export const useCkeditor = () => {
    return {
        editor,
        editorConfig
    }
}

const editor = ClassicEditor
const editorConfig = {
    language: 'zh-cn',
    extraPlugins: [MyCustomUploadAdapterPlugin],
    mediaEmbed: {
        extraProviders: [
            {
                name: 'bilibili',
                url: /^\/\/player\.bilibili\.com\/player\.html\?aid=\S+$/,
                html: (match: any) => `<iframe src="${match}" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" style="width: 100%; height: 500px;"></iframe>`
            },
            {
                name: 'mp4',
                url: /^https?:\/\/\S+\.mp4$/,
                html: (match: any) => `<video controls><source src="${match}" type="video/mp4"></video>`
            },
            {
                name: 'mp3',
                url: /^https?:\/\/\S+\.mp3$/,
                html: (match: any) => `<audio controls><source src="${match}" type="audio/mpeg"></audio>`
            }
        ]
    }
}