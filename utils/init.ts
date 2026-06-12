import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { answersType } from './interface.js'
import viteStr from './config/vite.js'
import styleStr from './src/style.js'
import gitStr from './config/git.js'
import indexStr from './src/index.js'
import svgStr from './src/public/svg.js'
import appStr from './src/app.js'
import { tsconfigJsonStr, tsconfigNodeJsonStr, tsconfigAppJsonStr, viteEnvDtsStr } from './config/ts.js'
import mainStr from './src/main.js'
import packageStr from './config/package.js'
import { czConfig, fileCheckStr, eslintConfigStr, huskyConfig, styleLintStr, styleLintIgnoreStr } from './config/eslint.js'
import { postcssStr } from './config/tailwind.js'
import { prettierrcStr, prettierIgnoreStr } from './config/prettier.js'
import homeStr from './src/pages/home.js'
import routerStr from './src/router/router.js'
import axiosStr from './src/utils/axios.js'
import { apiStr, mockStr } from './src/mock/mock.js'
import styleSassStr from './src/plugins/element-plus.js'
import mittStr from './src/utils/mitt.js'
import mdStr from './config/md.js'
import { envStr, dts, pubConfig } from './config/env.js'
import piniaStr from './src/store/pinia.js';
import { permissionStr, menuStoreStr } from './src/utils/permission.js'
import { ideaProjectDefaultXmlStr, ideaStylelintStr, vscodeSettingsStr} from './config/project.js'
import aseStr from './src/utils/ase.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const templatePath = path.join(__dirname, 'templates')

export const __init = (answers: answersType) => {
    const projectName = answers['project-name']
    fs.mkdirSync(projectName)
    fs.mkdirSync(`${projectName}/public`)
    fs.mkdirSync(`${projectName}/src`)
    fs.mkdirSync(`${projectName}/src/assets`)
    fs.mkdirSync(`${projectName}/src/components`)
    fs.mkdirSync(`${projectName}/src/pages`)
    fs.mkdirSync(`${projectName}/src/utils`)
    fs.mkdirSync(`${projectName}/src/router`)
    fs.mkdirSync(`${projectName}/src/apis`)
    fs.mkdirSync(`${projectName}/src/store`)
    fs.mkdirSync(`${projectName}/src/hooks`)
    fs.mkdirSync(`${projectName}/src/plugins`)
    fs.mkdirSync(`${projectName}/src/assets/icons-svg`)
    fs.mkdirSync(`${projectName}/vite-plugins`)
    fs.mkdirSync(`${projectName}/.idea`)
    fs.mkdirSync(`${projectName}/.vscode`)

    fs.writeFileSync(`${projectName}/public/vite.svg`, svgStr())
    fs.writeFileSync(`${projectName}/src/App.vue`, appStr(answers))
    fs.writeFileSync(`${projectName}/src/style.css`, styleStr())
    fs.writeFileSync(`${projectName}/index.html`, indexStr(answers['is-ts']))
    fs.writeFileSync(`${projectName}/package.json`, packageStr(answers))
    fs.writeFileSync(`${projectName}/.gitignore`, gitStr())
    fs.writeFileSync(`${projectName}/README.md`, mdStr(answers))
    fs.writeFileSync(`${projectName}/.env`, envStr())
    fs.writeFileSync(`${projectName}/global.d.ts`, dts())
    fs.writeFileSync(`${projectName}/public/config.js`, pubConfig())
    fs.writeFileSync(`${projectName}/vite-plugins/check-filename-plugins.${answers['is-ts'] ? 'ts' : 'js'}`, fileCheckStr())
    fs.writeFileSync(`${projectName}/vite-plugins/setup-husky.cjs`, huskyConfig())
    if (answers['is-ts']) {
        fs.writeFileSync(`${projectName}/vite.config.ts`, viteStr(answers))
        fs.writeFileSync(`${projectName}/src/main.ts`, mainStr(answers))
        fs.writeFileSync(`${projectName}/src/vite-env.d.ts`, viteEnvDtsStr())
        fs.writeFileSync(`${projectName}/tsconfig.json`, tsconfigJsonStr())
        fs.writeFileSync(`${projectName}/tsconfig.node.json`, tsconfigNodeJsonStr(answers))
        fs.writeFileSync(`${projectName}/tsconfig.app.json`, tsconfigAppJsonStr(answers))
    } else {
        fs.writeFileSync(`${projectName}/vite.config.js`, viteStr(answers))
        fs.writeFileSync(`${projectName}/src/main.js`, mainStr(answers))
    }

    if (answers['is-eslint']) {
        fs.writeFileSync(`${projectName}/cz.config.cjs`, czConfig())
        fs.writeFileSync(`${projectName}/eslint.config.${answers['is-ts'] ? 'ts' : 'js'}`, eslintConfigStr())
        fs.writeFileSync(`${projectName}/stylelint.config.cjs`, styleLintStr())
        fs.writeFileSync(`${projectName}/.stylelintignore`, styleLintIgnoreStr())

        fs.mkdirSync(`${projectName}/.idea/inspectionProfiles`)
        fs.mkdirSync(`${projectName}/.idea/stylesheetLinters`)
        fs.writeFileSync(`${projectName}/.idea/inspectionProfiles/Project_Default.xml`, ideaProjectDefaultXmlStr())
        fs.writeFileSync(`${projectName}/.idea/stylesheetLinters/stylelint.xml`, ideaStylelintStr())
        fs.writeFileSync(`${projectName}/.vscode/settings.json`, vscodeSettingsStr())
    }

    if (answers['is-tailwindcss']) {
        fs.writeFileSync(`${projectName}/postcss.config.cjs`, postcssStr())
        // fs.writeFileSync(`${projectName}/tailwind.config.cjs`, tailwindStr())
    }

    if (answers['is-prettier']) {
        fs.writeFileSync(`${projectName}/.prettierrc`, prettierrcStr())
        fs.writeFileSync(`${projectName}/.prettierignore`, prettierIgnoreStr())
    }

    if (['vite-all', 'vite-all-mock'].includes(answers['w-template'])) {
        const fileType = answers['is-ts'] ? 'ts' : 'js'

        fs.writeFileSync(`${projectName}/src/router/index.${fileType}`, routerStr(answers))
        fs.writeFileSync(`${projectName}/src/utils/ase.ts`, aseStr())
        fs.writeFileSync(`${projectName}/src/utils/request.${fileType}`, axiosStr(answers))
        fs.writeFileSync(`${projectName}/src/utils/mitt.${fileType}`, mittStr())
        fs.writeFileSync(`${projectName}/src/store/state.${fileType}`, piniaStr())

        fs.writeFileSync(`${projectName}/src/apis/index.${fileType}`, apiStr())
        fs.writeFileSync(`${projectName}/src/pages/Home.vue`, homeStr(answers))
        if (answers['w-template'] == 'vite-all-mock') {
            fs.mkdirSync(`${projectName}/src/mock`)
            fs.writeFileSync(`${projectName}/src/mock/index.${fileType}`, mockStr(answers))
        }
    }

    if (answers['w-ui'] == 'element-plus') {
        fs.writeFileSync(`${projectName}/src/style.scss`, styleSassStr())
    }

    if (answers['is-permission']) {
        const fileType = answers['is-ts'] ? 'ts' : 'js'
        fs.writeFileSync(`${projectName}/src/utils/permission.${fileType}`, permissionStr())
        fs.writeFileSync(`${projectName}/src/store/menu.${fileType}`, menuStoreStr())
    }

    if (answers['is-leaflet']) {
        //复制 src/components/Map.vue到 ${projectName}/src/components
        const sourceFile = path.join(__dirname, 'src/components/Map.vue')
        fs.copyFileSync(sourceFile, `${projectName}/src/components/Map.vue`)
    }

    if (answers['is-codemirror']) {
        //复制 src/components/CodeMirrorEdit.vue到 ${projectName}/src/components
        const sourceFile = path.join(__dirname, 'src/components/CodeMirrorEdit.vue')
        fs.copyFileSync(sourceFile, `${projectName}/src/components/CodeMirrorEdit.vue`)
    }

    if (answers['is-ckeditor']) {
        //复制 src/components/CKEditorTemp.vue到 ${projectName}/src/components
        const sourceFile = path.join(__dirname, 'src/components/CKEditorTemp.vue')
        fs.copyFileSync(sourceFile, `${projectName}/src/components/CKEditorTemp.vue`)

        const sourceFileHooks = path.join(__dirname, 'src/hooks/ckeditor.ts')
        fs.copyFileSync(sourceFileHooks, `${projectName}/src/hooks/ckeditor.ts`)

        const sourceFilePlugin = path.join(__dirname, 'src/plugins/UploadAdapter.ts')
        fs.copyFileSync(sourceFilePlugin, `${projectName}/src/plugins/UploadAdapter.ts`)
    }

    // agents
    fs.cpSync(templatePath, projectName, {
        recursive: true,
        force: true
    })

}
