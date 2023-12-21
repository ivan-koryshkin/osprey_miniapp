const express = require('express')
const path = require('path')

const app = express()

const staticDir = path.resolve(__dirname, 'build')

app.use('/miniapp', express.static(staticDir))

app.get('*', (req, res) => {
    const date = new Date()
    console.log(`[${date.toISOString()}] ${req.url}`)
    const indexPage = path.resolve(__dirname, 'build', 'index.html');
    res.header('content-type', 'application/js')
    res.sendFile(indexPage);
});


app.listen(3000, function (err) {
    console.log(err)
})