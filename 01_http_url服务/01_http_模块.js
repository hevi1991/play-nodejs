// 引入http模块
var http = require('http')

http.createServer(function (req, res) {
    try {
        if (req.url == '/test') {
            throw "big wrong"
        }
        // 设置响应头
        res.writeHead(
            200,
            {
                'Content-type': 'text/html;charset="utf-8"'
            }
        )
        // 写入响应体
        res.write('Hello world.')
        // 结束响应
        res.end()
    } catch (e) {
        res.end(e)
    }

}).listen(8001)
