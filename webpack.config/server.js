const express = require('express')
const app = express()
const path = require('path')
const ROOTPATH = process.cwd()

const port = require('./config').preview.port
const homePath = path.join(ROOTPATH, require('./config').preview.homePath)

app.use(express.static(homePath))
app.listen(port, () => {
    console.log(`
        The file server is running at http://localhost:${port}, please open the link after you build the project...`
    )
})