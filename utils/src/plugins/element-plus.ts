const styleSassStr = () => {
    return `// 在这里修改主题色哦 不要直接改样式,具体有哪些就看var.scss里面
@forward 'element-plus/theme-chalk/src/common/var.scss' with (
    $colors: (
        'primary': (
            'base': #409eff,
        ),
    )
);`
}

export default styleSassStr