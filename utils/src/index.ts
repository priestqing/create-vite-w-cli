const indexStr = (is_ts: boolean) => {
    return (`<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Vite + Vue${is_ts ? ' + TS' : ''}</title>
    </head>
    <body>
        <div id="app"></div>
        <script type="module" src="/src/main.${is_ts ? 'ts' : 'js'}"></script>
    </body>
</html>

`)
}

export default indexStr