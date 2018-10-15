const http = require('http')
const fs = require('fs')
const url = require('url')
const mime = require('./model/mime')

let port = 8001

http.createServer((req, res) => {
    let pathname = req.url
    let mimeType = mime.getMimeType(pathname)

    let parsedUrl = url.parse(pathname)
    let parsedPathname = parsedUrl.pathname

    fs.readFile(`static/${parsedPathname}`, (err, data) => {
        if (err) {
            res.writeHead(404, {'Content-type': 'text/html;charset=utf8'})
            data = fs.readFileSync(`static/404.html`)
            res.write(data)
            res.end()
            return
        }
        res.writeHead(200, {'Content-type': `${mimeType};charset=utf8`})
        res.write(data)
        res.end()
    })
}).listen(port)

console.log(`Server at port: ${port}`)