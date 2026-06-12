# Project Docs

本目录用于存放项目开发规范、架构说明和团队协作约定。

> This file is for human developers only. Code generation tools should follow `../AGENTS.md` and the specific referenced docs instead.

## Documents

### `../AGENTS.md`

全项目硬规则。

用于声明代码生成和修改时必须遵守的核心约束，例如编码格式、命名规则、Vue 文件结构、是否允许主动运行测试或构建命令。

### `conventions.md`

详细编码约定。

说明 TypeScript、JavaScript、Vue、文件命名、目录命名、类型拆分、文件长度等通用开发规范。

### `architecture.md`

架构与模块边界。

说明项目目录职责、模块依赖方向，以及页面、组件、API、store、utils、hooks/composables 之间的边界。

### `ui-style-guide.md`

UI、Tailwind 与样式规范。

说明 Vue 组件结构、Tailwind 使用优先级、SCSS 使用边界、Stylelint 约束、组件命名和样式嵌套规则。

### `api-style-guide.md`

接口与数据请求规范。

说明 API 模块组织、请求函数命名、请求/响应类型、错误处理、请求封装和业务接口边界。

## Suggested Reading

- 修改通用代码： `conventions.md`。
- 修改目录结构、模块依赖或新增业务模块： `architecture.md`。
- 修改组件、页面 UI 或样式： `ui-style-guide.md`。
- 修改接口请求、响应类型或请求封装： `api-style-guide.md`。