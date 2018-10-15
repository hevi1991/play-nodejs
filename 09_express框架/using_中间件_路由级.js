/*express实质是在web程序中调用各种中间件*/

var express = require('express')
var app = new express()


// 简单的访问接口
app.get('/', (req, res) => {
    res.send('你好, express')
})

// 开发一个路由级中间件, 与声明一个路由操作很像, 就多了个next()的调用传递
app.get('/news', (req, res, next) => {
    console.log(`${req.url} at ${new Date()} by get`)
    next()//传递下去
})
app.use('/news', (req, res, next) => { // 用use也可以, 匹配所有请求方法. 中间件的执行顺序与声明顺序有关
    console.log(`${req.url} at ${new Date()} by use`)
    next()//传递下去
})

app.get('/news', (req, res) => {
    res.send('这是今日新闻')
})


app.listen(4321, () => {
    console.log('Serving at 4321')
})