import { answersType } from '../interface.js';

/**
 * .eslintrc.cjs的配置
 */
export const eslintrcStr = (answers: answersType) => {
    return `module.exports = {
    env: {
        es2021: true,
        node: true,
    },
    extends: ['eslint:recommended', 'plugin:vue/vue3-essential', 'plugin:@typescript-eslint/recommended' , ${answers['is-prettier'] ? `'plugin:prettier/recommended', 'eslint-config-prettier'` : ''} ],
    overrides: [],
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    globals: {
        AMap: true,
        AMapUI: true,
    },
    ignorePatterns: ['.eslintrc.cjs', 'postcss.config.cjs', 'tailwind.config.cjs', 'vite.config.ts' , 'vite.config.js' , 'dist'],
    plugins: ['vue', '@typescript-eslint' , ${answers['is-prettier'] ? `'prettier'` : ''}],
    rules: {
        'no-var': 'error',
        'prefer-const': 'warn',
        'new-cap': 'error',
        'no-undef': 'error',
        'getter-return': 'error',
        'no-async-promise-executor': 'error',
        'no-await-in-loop': 'error',
        'no-class-assign': 'error',
        'no-compare-neg-zero': 'error',
        'no-const-assign': 'error',
        'no-constant-binary-expression': 'error',
        'no-constant-condition': 'error',
        'no-debugger': 'warn',
        'no-console': 'warn',
        'use-isnan': 'warn',
        camelcase: 'off',
        'no-unreachable-loop': 'warn',
        'no-unreachable': 'warn',
        'no-this-before-super': 'error',
        'no-promise-executor-return': 'error',
        'no-irregular-whitespace': 'error',
        'no-func-assign': 'error',
        'no-import-assign': 'warn',
        'no-empty-pattern': 'warn',
        'no-duplicate-imports': 'warn',
        'no-dupe-keys': 'error',
        'no-dupe-else-if': 'warn',
        'no-dupe-class-members': 'error',
        'no-dupe-args': 'error',
        '@typescript-eslint/no-explicit-any': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/require-default-prop': 'off', // 关闭属性参数必须默认值
        'vue/singleline-html-element-content-newline': 'off', // 关闭单行元素必须换行符
        'vue/multiline-html-element-content-newline': 'off', // 关闭多行元素必须换行符
        'vue/max-attributes-per-line': 'off',
        'vue/html-self-closing': 'off',
        'vue/valid-v-for': 'off',
        'no-regex-spaces': 'off'
    },
}
    
`
}

/**
 * 文件校验
 * @returns 
 */
export const fileCheckStr = () => {
    return `import type { Plugin } from 'vite'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ignoreList = ['node_modules', '.git', '.vscode', 'dist', '.husky', 'public', '.VSCodeCounter', '.idea']

interface FileType {
    filePath: string
    fileName: string
    realPath: string
    isDirectory: boolean
    fileEnd?: string
}

interface ErrorFile {
    errorType: string
    errorInfo: string
    errorPaths: string[]
    isDirectory?: boolean
}

// 读取文件名
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.resolve(path.dirname(__filename), '..')
// 项目根目录


const allFiles: FileType[] = []


const check = (): Plugin => {
    return {
        name: 'check-filename',
    }
}

const errorList: ErrorFile[] = [
    {
        errorType: 'directory',
        errorInfo: '文件夹名称要求使用全小写字母、数字、中划线，且以小写字母开头:',
        errorPaths: []
    },
    {
        errorType: 'vue',
        errorInfo: 'vue文件要求使用大写字母开头，使用驼峰命名, 且不包含\`-\`,\`_\`:',
        errorPaths: []
    },
    {
        errorType: 'ts,js,css,scss',
        errorInfo: 'ts文件规则: 普通文件小驼峰；接口文件I开头；若文件名大写开头，文件内容必须导出class。js/css/scss要求小写开头:',
        errorPaths: []
    },
    {
        isDirectory: false,
        errorType: 'vite.config',
        errorInfo: '错误的vite.config文件提交:',
        errorPaths: []
    },
    {
        errorType: 'compressed',
        errorInfo: '不可以提交的压缩文件:',
        errorPaths: []
    }
]

const getFileNames = (filePath: string) => {
    const files = fs.readdirSync(path.join(__dirname, filePath))
    files.forEach((element) => {
        if (!ignoreList.includes(element)) {
            const fileRealPath = path.join(__dirname, filePath, element)
            if (fs.statSync(fileRealPath).isDirectory()) {
                getFileNames(path.join(filePath, element))
                allFiles.push({
                    filePath: path.join(__dirname, filePath),
                    fileName: element,
                    realPath: path.join(__dirname, filePath, element),
                    isDirectory: true,
                })
            } else {
                allFiles.push({
                    filePath: path.join(__dirname, filePath),
                    fileName: element,
                    realPath: path.join(__dirname, filePath, element),
                    isDirectory: false,
                    fileEnd: element.split('.').pop()
                })
            }
        }
    })
}

const checkFileName = () => {
    allFiles.map((t) => {
        if (t.isDirectory) {
            // 文件夹
            if (!/^[a-z](?:[a-z0-9-]*[a-z0-9])?$/.test(t.fileName)) {
                errorList[0].errorPaths.push(t.realPath)
            }
        } else {
            if (t.fileEnd === 'vue') {
                // vue文件
                // if (!/^[A-Z][a-zA-Z0-9]*\\.vue$/.test(t.fileName)) {
                if (!/^[A-Z][A-Za-z0-9]*\\.vue$/.test(t.fileName)) {
                    errorList[1].errorPaths.push(t.realPath)
                }
            }
            if (t.fileEnd && ['ts', 'js', 'css', 'scss'].includes(t.fileEnd)) {
                if (t.fileEnd === 'ts') {
                    // 忽略类型声明文件
                    if (/\\.d\\.ts$/.test(t.fileName)) {
                        return
                    }

                    // 1) 普通文件
                    const isLowerCamelTs = /^[a-z](?:[A-Za-z0-9.-]*[A-Za-z0-9])?\\.ts$/.test(t.fileName)

                    // 2) 接口文件
                    const isInterfaceTs = /^I[A-Z](?:[A-Za-z0-9.-]*[A-Za-z0-9])?\\.ts$/.test(t.fileName)

                    // 3) PascalCase 要求文件内存在 class
                    const isPascalTs = /^[A-Z](?:[A-Za-z0-9.-]*[A-Za-z0-9])?\\.ts$/.test(t.fileName)

                    let isPascalWithClass = false
                    if (isPascalTs) {
                        const content = fs.readFileSync(t.realPath, 'utf-8')

                        // 不要求导出；只要有类定义（可被继承、可内部使用）就算通过
                        // 匹配: class A / abstract class A / export class A / export default class A
                        isPascalWithClass = /\\b(?:export\\s+default\\s+|export\\s+)?(?:abstract\\s+)?class\\s+[A-Z][A-Za-z0-9]*\\b/.test(content)
                    }

                    const tsOk = isLowerCamelTs || isInterfaceTs || isPascalWithClass
                    if (!tsOk) {
                        errorList[2].errorPaths.push(t.realPath)
                    }
                } else {
                    if (!/^[a-z](?:[A-Za-z0-9.-]*[A-Za-z0-9])?\\.(?:js|css|scss)$/.test(t.fileName)) {
                        errorList[2].errorPaths.push(t.realPath)
                    }
                }
                if (t.fileName.startsWith('vite.config') && (t.fileName !== 'vite.config.ts' && t.fileName !== 'vite.config.js')) {
                    errorList[3].errorPaths.push(t.realPath)
                }
            }
            if (t.fileEnd && ['zip', 'rar'].includes(t.fileEnd)) {
                errorList[4].errorPaths.push(t.realPath)
            }
        }
    })
}

let b = true
const sysOutErrorInfo = () => {
    errorList.map((t) => {
        if (t.errorPaths.length > 0) {
            b = false
            console.error(t.errorInfo)
            console.error(t.errorPaths)
        }
    })
}

const startCheck = () => {
    const args = process.argv.slice(2)
    getFileNames('')
    checkFileName()
    sysOutErrorInfo()
    if (!b && args.includes('--exit')) {
        console.error('File name validation failed. Aborting.')
        process.exit(1)
    }
}

startCheck()

export default check`
}

/**
 * antfu eslint配置
 */
export const eslintConfigStr = () => {
    return `import antfu from '@antfu/eslint-config'

export default antfu(
    {
        stylistic: {
            indent: 4,
        },
        // TypeScript and Vue are autodetected, you can also explicitly enable them:
        typescript: true,
        vue: true,
        ignores: [
            'package.json',
            'tsconfig.json',
            'tsconfig.app.json',
            'tsconfig.node.json',
            'src/utils/ase.ts',
            'eslint.config.js',
            'global.d.ts',
            '**/*.json',
            'vite-plugins/*',
            '*.yml'
        ],
    },
    {
        // vue
        files: ['**/*.vue'],
        rules: {
            'vue/operator-linebreak': ['error', 'after'],
            'vue/block-order': 'off',
            'vue/singleline-html-element-content-newline': 'off',
            'vue/attributes-order': 'off',
            'vue/valid-template-root': 'off',
            'vue/no-restricted-class': ['error', '/^(?!animate__)(?:.*([^a-z0-9!:\\\\-/[\\\\]%._]|[^a-z0-9\\\\]]$)).*$/u'],
            'max-lines': ['error', { max: 1500, skipBlankLines: true, skipComments: true }]
        },
    },
    {
        files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
        rules: {
            'max-lines': ['error', { max: 1500, skipBlankLines: true, skipComments: true }]
        }
    },
    {
        // all
        rules: {
            'style/indent' : 'warn',
            'style/eol-last' : 'off',
            'style/key-spacing' : 'off',
            'style/comma-dangle' : 'off',
            'style/spaced-comment' : 'off',
            'style/no-tabs' : 'off',
            'style/no-multiple-empty-lines' : 'off',
            'style/brace-style' : 'off',
            'style/quotes' : 'warn',
            'style/no-trailing-spaces' : 'off',
            'style/arrow-parens': 'off',
            'style/member-delimiter-style': 'off',
            'node/prefer-global/process' : 'off',
            'array-callback-return' : 'off',
            'perfectionist/sort-imports': 'off',
            'perfectionist/sort-named-imports': 'off',
            'jsdoc/check-param-names' : 'off',
            'ts/no-use-before-define': 'off',
            'ts/no-explicit-any': 'error',
            'no-console' : 'warn'
        }
    },
    {
        // antfu
        rules: {
            'antfu/top-level-function' : 'off',
            'antfu/if-newline': 'off',
            'antfu/curly': 'off',
            'antfu/consistent-list-newline': 'off',
        }
    },
)
`
}

export const huskyConfig = () => {
    return `const fs = require('fs')
const cp = require('child_process')
const path = require('path')

if (!fs.existsSync('.git')) {
  console.log('[husky] skip: .git not found')
  process.exit(0)
}

cp.execSync('git config core.ignorecase false', { stdio: 'inherit' })
cp.execSync('npx husky install', { stdio: 'inherit' })

const hookDir = path.join('.husky')
const hookPath = path.join(hookDir, 'pre-commit')
const content = \`npm run filename-check && npm run type-check && npx lint-staged\`

if (!fs.existsSync(hookDir)) fs.mkdirSync(hookDir, { recursive: true })
fs.writeFileSync(hookPath, content, { encoding: 'utf8' })

console.log('[husky] wrote .husky/pre-commit')`
}

export const czConfig = () => {
    return `module.exports = {
    disableEmoji: true,
    maxHeaderLength: 100,
    allowCustomScopes: true,
    scopes: ['核心', '接口', '路由', '状态', '界面', '构建', 'CI', '依赖', '文档'],
    allowBreakingChanges: ['feat', 'fix', 'refactor'],
    types: [
        { value: 'feat', name: 'feat:     新功能' },
        { value: 'fix', name: 'fix:      修复 Bug' },
        { value: 'docs', name: 'docs:     文档变更' },
        { value: 'style', name: 'style:    代码格式（不影响功能）' },
        { value: 'refactor', name: 'refactor: 重构（非修复/非新功能）' },
        { value: 'perf', name: 'perf:     性能优化' },
        { value: 'test', name: 'test:     测试相关' },
        { value: 'build', name: 'build:    构建系统或依赖变更' },
        { value: 'ci', name: 'ci:       CI 配置变更' },
        { value: 'chore', name: 'chore:    其他杂项' },
        { value: 'revert', name: 'revert:   回滚提交' }
    ],
    messages: {
        type: '请选择提交类型：',
        scope: '请输入修改范围（可选）：',
        customScope: '请输入自定义修改范围：',
        subject: '请简要描述提交（必填）：\\n',
        body: '请输入详细描述（可选，回车跳过）：\\n',
        breaking: '列出破坏性变更（可选）：\\n',
        footerPrefixesSelect: '请选择关联问题前缀（可选）：',
        customFooterPrefix: '请输入自定义前缀：',
        footer: '请输入要关闭的 Issues，例如: #123, #456（可选）：',
        confirmCommit: '确认使用以上信息创建提交？'
    }
}`
}

export const styleLintStr = () => {
    return `/** @type {import('stylelint').Config} */
module.exports = {
    extends: [
        'stylelint-config-standard-scss',
        'stylelint-config-recommended-vue',
        'stylelint-config-recess-order',
    ],
    overrides: [
        {
            files: ['**/*.vue'],
            customSyntax: 'postcss-html',
        },
        {
            files: ['**/*.scss'],
            customSyntax: 'postcss-scss',
        },
    ],
    rules: {
        'selector-class-pattern': [
            '^[a-z][a-z0-9-_]*$',
            {
                resolveNestedSelectors: true,
                message: '类名必须使用小写字母、数字和中划线（kebab-case）',
            }
        ],
        // 限制嵌套深度，避免样式过深耦合
        'max-nesting-depth': [3, { ignore: ['blockless-at-rules'] }],

        // 避免 0 后面写单位
        'length-zero-no-unit': true,

        // 禁止重复选择器
        // 'no-duplicate-selectors': true,

        // 禁止使用 ID 选择器，鼓励使用类选择器
        'selector-max-id': 0,

        // 关闭核心规则 , @mixins 和 @include 是 SCSS 的特有语法，stylelint 默认的 'at-rule-no-unknown' 规则会误报这些语法为未知的 at-rule。
        'at-rule-no-unknown': null,

        // 启用scss规则
        'scss/at-rule-no-unknown': true,
    }
}`
}

export const styleLintIgnoreStr = () => {
    return `node_modules
dist
public
src/assets
*.min.css
src/style.scss
src/style.css`
}