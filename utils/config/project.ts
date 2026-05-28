export const ideaProjectDefaultXmlStr = () => {
    return `<component name="InspectionProjectProfileManager">
  <profile version="1.0">
    <option name="myName" value="Project Default" />
    <inspection_tool class="Eslint" enabled="true" level="WARNING" enabled_by_default="true" />
    <inspection_tool class="Stylelint" enabled="true" level="ERROR" enabled_by_default="true" />
  </profile>
</component>`
}

export const ideaStylelintStr = () => {
    return `<?xml version="1.0" encoding="UTF-8"?>
<project version="4">
  <component name="StylelintConfiguration">
    <file-patterns value="**/*.{css,scss,vue}" />
  </component>
</project>`
}

export const vscodeSettingsStr = () => {
    return `{
    "stylelint.validate": [
        "css",
        "scss",
        "vue"
    ],
    "css.validate": false,
    "scss.validate": false,
    "less.validate": false
}`
}

