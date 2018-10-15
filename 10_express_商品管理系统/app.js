var express = require('express')
var ejs = require('ejs')
var path = require('path')

var app = new express()
app.engine('.ejs', ejs.renderFile)
app.set('view engine', 'ejs') // express 4.0后默认是jade
app.set('views', path.resolve(__dirname, 'views')) // 默认就是根目录views
app.use(express.static('public'))// 配置静态文件地址

// 首页
app.get('/', (req, res) => {
    res.redirect('/product')
})

// 登录
app.get('/login', (req, res) => {
    res.render('login')
})

// 商品
app.get('/product', (req, res) => {
    res.render('index', {active: req.url})
})

app.get('/product_add', (req, res) => {
    res.render('add', {active: req.url})
})

app.get('/product_edit', (req, res) => {
    res.render('edit', {active: req.url})
})

app.get('/product_delete', (req, res) => {
    res.send('删除商品', {active: req.url})
})


app.listen(3000, () => {
    console.log('Serving at 3000')
})