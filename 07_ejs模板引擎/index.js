var http = require('http')
var ejs = require('ejs')
var url = require('url')


http.createServer((req, res) => {
    var parsedUrl = url.parse(req.url)
    var pathname = parsedUrl.pathname
    var method = req.method.toLowerCase()

    res.setHeader('Content-type', 'text/html;charset=utf8')
    if (pathname === '/login') {

        if (method === 'get') {

            /**
             * renderFile
             * path 路径
             * object 参数
             * func 渲染完的回调
             */
            ejs.renderFile('views/login.ejs', {}, (err, data) => {
                res.end(data)
            })

        } else if (method === 'post') {
            // Node.js获得请求体的办法
            let responseBody = ''
            req.on('data', chunk => {
                responseBody += chunk
            })
            req.on('end', () => {
                res.end(`<script>alert('${responseBody}已登录.');location.href='/index';</script>`)
            })
        } else {
            res.end('404')
        }
    } else {
        ejs.renderFile('views/index.ejs', {now: new Date()}, (err, data) => {
            if (err) {
                console.log(err)
            }
            res.end(data)
        })
    }
}).listen(8888)

console.log('Server at 8888')