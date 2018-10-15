/*express实质是在web程序中调用各种中间件 (中间件的声明要在路由声明之前)*/

var express = require('express')
var app = new express()

// 开发一个应用级中间件.
app.use((req, res, next) => {
    console.log(`${req.url} at ${new Date()}`)
    next() // 让响应继续
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