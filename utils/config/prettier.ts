export const prettierrcStr = () => {
	return `{
    "arrowParens": "always",
    "bracketSpacing": true,
    "endOfLine": "lf",
    "htmlWhitespaceSensitivity": "css",
    "insertPragma": false,
    "singleAttributePerLine": false,
    "bracketSameLine": false,
    "jsxBracketSameLine": false,
    "jsxSingleQuote": true,
    "printWidth": 200,
    "proseWrap": "preserve",
    "quoteProps": "as-needed",
    "requirePragma": false,
    "semi": false,
    "singleQuote": true,
    "tabWidth": 4,
    "useTabs": false,
    "embeddedLanguageFormatting": "auto",
    "vueIndentScriptAndStyle": false
}
`
}

export const prettierIgnoreStr = () => {
	return `dist
node_modules
/src/assets
public
*.md
`
}
