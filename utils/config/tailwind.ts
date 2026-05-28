export const postcssStr = () => {
    return (`module.exports = {
    plugins: {
        autoprefixer: {},
    },
}`)
}

// export const tailwindStr = () => {
//     return (`/** @type {import('tailwindcss').Config} */
// module.exports = {
//     content: [
//         './public/**/*.html',
//         './src/**/*.{js,jsx,ts,tsx,vue}',
//     ],
//     theme: {
//         extend: {},
//     },
//     plugins: [],
// }`)
// }