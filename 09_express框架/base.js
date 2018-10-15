var express = require('express')

var app = new express()

// helloworld
app.get('/', (req, res) => {
    res.send(`HELLO WORLD. ${req.method}`)
})

app.post('/', (req, res) => {
    res.send(`HELLO WORLD. ${req.method}`)
})

// 传值
/// get 传值
app.get('/products', (req, res) => {
    var aid = req.query.aid
    res.send(aid)
})
/// rest 传值 动态路由
app.get('/news/:aid', (req, res) => {
    var aid = req.params.aid
    res.send(`NEWS: ${aid}`)
})
/// post 请求体
// http://www.expressjs.com.cn/4x/api.html#req.body
var bodyParser = require('body-parser') // 请求体解析(中间件)
app.use(bodyParser.json()) // 解析 application/json
app.use(bodyParser.urlencoded({extended: true})) // 解析 application/x-www-form-urlencoded
app.post('/news/:aid', (req, res) => {
    var body = req.body
    console.log(body)
    res.send(`NEWS: ${req.params.aid}, REQ_BODY:${req.body}`)
})

/**
 * express的app能覆盖http的请求方法(get, post, put, delete...all)
 */

app.listen(4321, () => {
    console.log(`Serve at port: ${4321}`)
})