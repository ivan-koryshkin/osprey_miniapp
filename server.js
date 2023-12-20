const express = require('express')
const path = require('path')

const app = express()

const staticDir = path.resolve(__dirname, 'build')

app.use(express.static(staticDir))

app.get('*', (req, res) => {
    console.log('miniapp.*')
    const indexPage = path.resolve(__dirname, 'build', 'index.html');
    res.sendFile(indexPage);
});


app.listen(3000, function (err) {
    console.log(err)
})