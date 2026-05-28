import { answersType } from '../interface.js'

const packageStr = (answers: answersType) => {
    return `{
    "name": "${answers['project-name']}",
	"private": true,
	"version": "0.0.0",
	"type": "module",
    "scripts": {
        "dev": "cross-env VITE_ENV=development RUN_MODE=webstorm vite --host",
        "dev-vscode": "cross-env VITE_ENV=development RUN_MODE=code vite --host",
        ${_configScripts(answers)}
        "build-only": "vite build",
        "preview": "vite preview",
        "build:dev": "cross-env VITE_APP_BASE_URL='/' npm run build",
        "build:test": "cross-env VITE_APP_BASE_URL='/test/' npm run build"
    },
    "dependencies": {
        ${_configDependencies(answers)}
        "@types/crypto-js": "latest",
        "crypto-js": "latest",
        "vue": "latest",
        "lodash": "latest",
        "cross-env": "latest",
        "dotenv" : "latest",
        "vite-svg-loader": "latest",
        "npm-run-all": "latest"
    },
    "devDependencies": {
        "@vitejs/plugin-legacy": "latest",
        "@vitejs/plugin-vue": "latest",
        "@vitejs/plugin-vue-jsx": "latest",
        "@vue/tsconfig": "latest",
        "vite-plugin-compression2": "latest",
        "unplugin-vue-inspector": "latest",
        "terser": "latest",
        ${_configDevDependencies(answers)}
        "vite": "latest"
    },
    ${_configLintStaged(answers)}
    "browserslist": [
        "chrome >= 110"
    ]
}`
}


const _configScripts = (answers: answersType) => {
    let configStr = ''

    if (answers['is-eslint']) {
        configStr += `"lint": "eslint \\"src/**/*.{vue,ts,js}\\"",
        "lint:fix" : "eslint \\"src/**/*.{vue,ts,js}\\" --fix",
        "lint:style": "stylelint \\"src/**/*.{vue,scss,css}\\"",
        "lint:style:fix": "stylelint \\"src/**/*.{vue,scss,css}\\" --fix",
        "cz": "npm run filename-check && npm run changelog && npm run lint && git add . && czg",
        "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s",
        "filename-check": "esno vite-plugins/check-filename-plugins.ts --exit",
        "setup-husky": "node vite-plugins/setup-husky.cjs",
        "postinstall": "npm run setup-husky",`
    }
    if (answers['is-ts']) {
        configStr += `
        "type-check": "vue-tsc --build --force",`
    }

    if (answers['is-eslint'] && answers['is-ts']) {
        configStr += `
        "build": "npm run lint && run-p type-check \\"build-only {@}\\" --",`
    } else if (answers['is-ts']) {
        configStr += `
        "build": "run-p type-check \\"build-only {@}\\" --",`
    } else if (answers['is-eslint']) {
        configStr += `
        "build": "npm run lint && npm run build-only",`
    } else {
        configStr += `
        "build": "npm run build-only",`
    }

    if (answers['is-prettier']) {
        configStr += `"prettier": "npx prettier --write .",`
    }

    return configStr
}

const _configDependencies = (answers: answersType) => {
    let configStr = ''
    if (['vite-all', 'vite-all-mock'].includes(answers['w-template'])) {
        configStr += `"axios": "latest",
        "vue-router": "latest",
        "mitt": "latest",
		"pinia": "latest",
		"pinia-plugin-persistedstate": "latest",`
    }

    if (answers['w-ui'] == 'element-plus') {
        configStr += `
        "element-plus": "latest",
        "@element-plus/icons-vue": "latest",`
    }

    if (answers['w-ui'] == 'tdesign') {
        configStr += `
        "tdesign-vue-next": "latest",`
    }

    if (answers['w-ui'] == 'tdesign-mobile') {
        configStr += `
        "tdesign-mobile-vue": "latest",`
    }

    if (answers['is-leaflet']) {
        configStr += `
        "leaflet": "latest",
        "esri-leaflet": "latest",
        "@tmcw/togeojson": "latest",
		"@turf/turf": "latest",`
    }

    if (answers['is-codemirror']) {
        configStr += `
        "@codemirror/language": "latest",
		"@codemirror/legacy-modes": "latest",
		"@codemirror/theme-one-dark": "latest",
        "codemirror": "latest",
        "vue-codemirror": "latest",`
    }

    if (answers['is-ckeditor']) {
        configStr += `
        "@ckeditor/ckeditor5-build-classic": "latest",
		"@ckeditor/ckeditor5-vue": "latest",`
    }

    return configStr
}

const _configDevDependencies = (answers: answersType) => {
    let configStr = `"postcss": "latest",`
    if (answers['is-ts']) {
        configStr += `
        "typescript": "latest",
        "@types/lodash": "latest",
        "@types/node": "latest",
        "vue-tsc": "latest",`
    }
    if (answers['is-ts'] && answers['is-leaflet']) {
        configStr += `
        "@types/leaflet": "latest",
        "@types/esri-leaflet": "latest",`
    }

    if (answers['is-eslint']) {
        configStr += `
        "@antfu/eslint-config": "latest",
        "@typescript-eslint/eslint-plugin": "latest",
        "@typescript-eslint/parser": "latest",
        "eslint": "latest",
        "eslint-plugin-vue": "latest",
        "vue-eslint-parser": "latest",
        "czg": "latest",
        "cz-git": "latest",
        "conventional-changelog": "latest",
        "conventional-changelog-angular": "latest",
        "husky": "latest",
        "esno": "latest",
        "lint-staged": "latest",
        "postcss-scss": "latest",
        "stylelint": "latest",
        "stylelint-config-recess-order": "latest",
        "stylelint-config-recommended-vue": "latest",
        "stylelint-config-standard-scss": "latest",
        "stylelint-scss": "latest",`
    }

    if (answers['is-tailwindcss']) {
        configStr += `
        "autoprefixer": "latest",
        "tailwindcss": "latest",
        "@tailwindcss/vite": "latest",`
    }

    if (answers['is-sass']) {
        configStr += `
        "sass": "latest",
        "less": "latest",`
    }

    if (answers['is-prettier']) {
        configStr += `
        "eslint-config-prettier": "latest",
        "eslint-plugin-prettier": "latest",
        "prettier": "latest",`
    }

    if (answers['w-template'] == 'vite-all-mock') {
        configStr += `
        "mockjs": "latest",
        "vite-plugin-mock": "latest",`
    }

    if (answers['w-ui'] == 'element-plus') {
        configStr += `
        "unplugin-auto-import": "latest",
        "unplugin-vue-components": "latest",`
    }

    return configStr
}

const _configLintStaged = (answers: answersType) => {
    let configStr = ''
    if (answers['is-eslint']) {
        configStr += `"lint-staged" : {
        "*.{vue,scss,css}": "stylelint --fix",
        "*.{js,${answers['is-ts'] ? 'ts,' : ''}vue}": "eslint --fix"
    },`
    }
    return configStr
}

export default packageStr