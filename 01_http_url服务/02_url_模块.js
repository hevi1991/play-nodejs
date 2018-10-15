var URL = require('url')
var http = require('http')

/**
 * URL模块, 基本使用
 */
function base_using() {
    console.log(URL)
// url 解析模块
    var rest = URL.parse('https://zhuanlan.zhihu.com/p/45143762')
    console.log(rest)

// 取get方法的查询字段
    rest = URL.parse('https://www.baidu.com/s?wd=%E5%8F%B0%E6%B9%BE&rsv_spt=1&rsv_iqid=0xaa2fe4d300011ff0&issp=1&f=8&rsv_bp=0&rsv_idx=2&ie=utf-8&tn=baiduhome_pg&rsv_enter=1&rsv_sug3=8&rsv_sug1=5&rsv_sug7=100&rsv_sug2=0&inputT=3475&rsv_sug4=3725', true)
    console.log(rest)
    console.log(rest.query)

// 格式化为string
    var str = URL.format(rest)
    console.log(str)
}


http.createServer(function (req, res) {
    res.writeHead(200, {
        'Content-type': 'text/html;charset="utf-8"'
    })
    reqUrl = decodeURI(req.url)
    console.log(reqUrl)
    res.write(reqUrl)
    res.end()
}).listen(8859)