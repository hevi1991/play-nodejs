/*express实质是在web程序中调用各种中间件*/

var express = require('express')
var app = new express()

// 简单的访问接口
app.get('/', (req, res) => {
    res.send('你好, express')
})

app.get('/news', (req, res) => {
    res.send('这是今日新闻')
})

/* 需要注意的是, 这个中间件声明的位置. 啥都不写, 就匹配所有的路由. */
app.use((req, res)=>{
    res.status(404).send('PAGE NOT FOUND.')
})

app.listen(4321, () => {
    console.log('Serving at 4321')
})