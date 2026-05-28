#!/usr/bin/env ts-node
import inquirer from 'inquirer'
import ora from 'ora'
import chalk from 'chalk'
import path from 'path'
import fs from 'fs'
import minimist from 'minimist'
import { fileURLToPath } from 'url'
import { __init } from './utils/init.js'
import { answersType } from './utils/interface.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const basePath = path.resolve(__dirname, '../')
const packageJson = fs.readFileSync(basePath + '/package.json', 'utf8')
const packageObj = JSON.parse(packageJson)
const { version } = packageObj
console.log('\n' + chalk.rgb(33, 150, 243)(`version:`), chalk.rgb(255, 152, 0)(version) + '\n')

const question = [
    {
        type: 'input',
        name: 'project-name',
        message: 'What project name to use?',
        default: 'my-project',
    },
    {
        type: 'list',
        name: 'w-template',
        message: 'What template to use?',
        choices: [
            {
                key: 1,
                name: 'vite + vue3',
                value: 'vite-vue3',
            },
            {
                key: 2,
                name: 'vite + vue3 + vue-router + axios + pinia + mitt',
                value: 'vite-all',
            },
            {
                key: 3,
                name: 'vite + vue3 + vue-router + axios(mock) + pinia + mitt',
                value: 'vite-all-mock',
            },
        ],
        default: 'vite-all',
    },
    {
        type: 'list',
        name: 'w-ui',
        message: 'What ui to use?',
        choices: [
            {
                key: 1,
                name: 'none',
                value: 'none',
            },
            {
                key: 2,
                name: 'element-plus(sass will be installed)',
                value: 'element-plus',
            },
            {
                key: 3,
                name: 'tdesign',
                value: 'tdesign',
            },
            {
                key: 4,
                name: 'tdesign for mobile',
                value: 'tdesign-mobile'
            }
        ],
        default: 'element-plus',
    },
    {
        type: 'confirm',
        name: 'is-ts',
        message: 'Do you want to use typescript?',
        default: true,
    },
    {
        type: 'confirm',
        name: 'is-sass',
        message: 'Do you want to use sass/less?',
        default: true,
    },
    {
        type: 'confirm',
        name: 'is-tailwindcss',
        message: 'Do you want to use tailwindcss?',
        default: true,
    },
    {
        type: 'confirm',
        name: 'is-eslint',
        message: 'Do you want to use eslint? (changelog,commitizen will be installed)',
        default: true,
    },
    // {
    //     type: 'confirm',
    //     name: 'is-prettier',
    //     message: 'Do you want to use prettier?',
    //     default: false,
    // },
    // {
    //     type: 'confirm',
    //     name: 'is-permission',
    //     message: 'Do you want to use permission?',
    //     default: false,
    // },
    // {
    //     type: 'confirm',
    //     name: 'is-leaflet',
    //     message: 'Do you want to use leaflet? (only for ts)',
    //     default: false,
    // },
    // {
    //     type: 'confirm',
    //     name: 'is-codemirror',
    //     message: 'Do you want to use codemirror?',
    //     default: false,
    // },
    // {
    //     type: 'confirm',
    //     name: 'is-ckeditor',
    //     message: 'Do you want to use ckeditor?',
    //     default: false,
    // },
]

//互动
if (process.argv.length == 2) {
    inquirer.prompt(question).then((answers: answersType) => {
        //自定义主题的原因, 选择element-plus就会安装sass
        if (answers['w-ui'] == 'element-plus') {
            answers['is-sass'] = true
        }

        const spinner = ora({
            text: 'Please wait...',
            color: 'green',
            spinner: {
                interval: 80,
                frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'],
            },
        })
        spinner.start()
        __init(answers)
        spinner.succeed(`done!`)

        console.log(`\n Next step : \n  1. : ${chalk.rgb(0, 150, 136)(`cd ${answers['project-name']}`)}\n  2. : ${chalk.rgb(0, 150, 136)(`npm i`)}`)
        if (answers['is-eslint']) {
            console.log(
                `\n eslint已经启用了, 如果git初始化了, 请重新再执行一遍: \n  1.: ${chalk.rgb(0, 150, 136)(`npm i`)}`
            )
        }

        if (answers['is-leaflet']) {
            console.log(`\n The leaflet in @/src/components/Map.vue`)
        }

        console.log(`\n Final : ${chalk.rgb(0, 150, 136)(`npm run dev`)}\n`)
    })

}
//快速生成
else {
    const args = minimist(process.argv.slice(2))
    const answers: answersType = {
        'project-name': 'my-project',
        'w-template': 'vite-all',
        'w-ui': 'element-plus',
        'is-ts': true,
        'is-sass': true,
        'is-eslint': true,
        'is-tailwindcss': true,
        'is-prettier': false,
        'is-permission': false,
        'is-leaflet': false,
        'is-codemirror': false,
        'is-ckeditor': false,
    }

    if (args['project-name']) {
        answers['project-name'] = args['project-name']
    }
    if (args['w-template']) {
        answers['w-template'] = args['w-template']
    }
    if (args['w-ui']) {
        answers['w-ui'] = args['w-ui']
    }
    if (args['is-ts'] === false) {
        answers['is-ts'] = false
    }
    if (args['is-sass'] === false) {
        answers['is-sass'] = false
    }
    if (args['is-eslint'] === false) {
        answers['is-eslint'] = false
    }
    if (args['is-tailwindcss'] === false) {
        answers['is-tailwindcss'] = false
    }
    __init(answers)
}
