import { answersType } from '../interface.js';
export const tsconfigJsonStr = () => {
    return (`{
    "files": [],
    "references": [
        {
            "path": "./tsconfig.node.json"
        },
        {
            "path": "./tsconfig.app.json"
        }
    ]
}`)
}

export const tsconfigNodeJsonStr = (answers: answersType) => {
    return (`{
    "include": [
        "vite.config.*",
        "vitest.config.*",
        "cypress.config.*",
        "nightwatch.conf.*",
        "playwright.config.*",
        "vite-plugins/*"
    ],
    "compilerOptions": {
        "composite": true,
        "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
        "module": "ESNext",
        "target": "ESNext",
        "lib": ["ESNext" ],
        "skipLibCheck": true,
        "jsx" : "preserve",
        "jsxImportSource": "vue",
        "experimentalDecorators": true, // 启用装饰器
        "emitDecoratorMetadata": true, // 启用装饰器元数据
        "useDefineForClassFields": false, // 关闭类字段的 useDefineForClassFields 特性，以确保与某些装饰器库的兼容性
        
        /* Bundler mode */
        "moduleResolution": "bundler",
        "allowImportingTsExtensions": true,
        "verbatimModuleSyntax": true,
        "moduleDetection": "force",
        "noEmit": true,
    
        /* Linting */
        "strict": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "erasableSyntaxOnly": false,
        "noFallthroughCasesInSwitch": true,
        "noUncheckedSideEffectImports": true,
    
        "types": [
            "node",
            ${answers['w-ui'] == 'element-plus' ? "\"element-plus/global\"" : ''}
        ]
    }  
}`)
}

export const tsconfigAppJsonStr = (answers: answersType) => {
    return (`{
    "extends": "@vue/tsconfig/tsconfig.dom.json",
    "include": [
        "src/**/*.ts",
        "src/**/*.tsx",
        "src/**/*.vue",
        "src/vite-env.d.ts",
        "src/**/*.d.ts",
        "*.d.ts"
        ${answers['w-ui'] == "tdesign" ? "\"node_modules/tdesign-vue-next/global.d.ts\"," : ''}
    ],
    "exclude": [
        "src/**/__tests__/*"
    ],
    "compilerOptions": {
        "composite": true,
        "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
        "types": ["vite/client"],
        "allowJs": true,
        "experimentalDecorators": true, // 启用装饰器
        "emitDecoratorMetadata": true, // 启用装饰器元数据
        "useDefineForClassFields": false, // 关闭类字段的 useDefineForClassFields 特性，以确保与某些装饰器库的兼容性
        
        /* Linting */
        "strict": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "erasableSyntaxOnly": false,
        "noFallthroughCasesInSwitch": true,
        "noUncheckedSideEffectImports": true,

        "paths": {
            "@/*": [
                "./src/*"
            ]
        }
    }
}`)
}

export const viteEnvDtsStr = () => {
    return (`/// <reference types="vite/client" />`)
}