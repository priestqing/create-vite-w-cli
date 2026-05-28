import { answersType } from '../interface.js'

const mdStr = (answers: answersType) => {
    return _config(answers)
}

const _config = (answers: answersType) => {
    let configStr = ''

    configStr += `#### 欢迎使用
1. 首先使用 \`npm i\` 来安装依赖
2. 之后就可以 \`npm run dev\` 来运行项目
3. 如果选用了 \`eslint\`, 在git初始化之后请重新执行\`npm i\`来激活 \`husky\`

#### 接口地址说明
提供了多个方式获取接口地址
    1.public中写给 window.globalConfig变量的地址
        - /public/config.js
        - /global.d.ts
    2. env文件获取
        - / .env
    3. 默认地址 或不写地址使用网关获取
        - /src/utils/request.ts
        - /vite.config.ts
选取其中一个 删除其他即可

#### ts
有部分文件只提供了ts版本, 如果不需要ts 请自己删除

#### 其他说明`

    if (answers['w-ui'] == 'tdesign') {
        configStr += `
你选择了\`tdesign\` , 如果需要自定义主题, 请从 [主题配置](https://tdesign.tencent.com/vue-next/custom-theme) 自定义并下载主题, 在\`main.ts/js\`中引入该主题,并删除自动生成的文件`
    }

    if (answers['is-permission']) {
        configStr += `
你要使用这个权限的话, 在页面中引用 
    \`import vPermission from '@/utils/permission'\`
并在标签中添加 \`v-permission\`例如:
    \`<div v-permission="['add']">any</div>\``


    }

    if (answers['is-ckeditor']) {
        configStr += `
如果使用 ckeditor,  请自行在 /src/plugins/UploadAdapter.ts中修改上传接口`
    }

    return configStr
}


export default mdStr