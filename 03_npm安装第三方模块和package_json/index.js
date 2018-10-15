var http = require('http')
var sd = require('silly-datetime')
http.createServer((req, res) => {
    res.writeHead(200, {
        "Content-type": "text/html;charset=utf-8"
    })
    res.write(`now: ${sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss')}`)
    res.end()
}).listen(3000)