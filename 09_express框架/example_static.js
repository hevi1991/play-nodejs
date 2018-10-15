var express = require('express')
var app = new express()
var path = require('path')
var fs = require('fs')

// 使用应用级中间件去处理静态资源
var baseStaticDir = 'public'
app.use(express.static(baseStaticDir))
// 这里做个无法找到图片的时候, 响应一个提示图的中间件玩玩
app.use('/images', (req, res, next) => {
    res.setHeader('Content-type', 'image/gif')
    res.status(404)
    var pic404Path = path.resolve(baseStaticDir, 'images/404.gif')
    res.send(fs.readFileSync(pic404Path))
})

// 简单的访问接口
app.get('/', (req, res) => {
    res.send('你好, express')
})

app.get('/news', (req, res) => {
    res.send('这是今日新闻')
})


app.listen(4321, () => {
    console.log('Serving at 4321')
})