var http = require('http')
var config = require('./config')

var app = http.createServer(function (req, res) {
    res.writeHead(200, {
        "Content-type" : "text/html;charset=utf-8"
    })

    res.write('你好, NodeJS')
    console.log(config)
    res.end()
})

app.listen(8002)