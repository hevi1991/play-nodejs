var express = require('express')
var ejs = require('ejs')
var path = require('path')
var url = require('url')

// 路由
var indexRouter = require('./routes/index')
var adminRouter = require('./routes/admin')

var app = new express()

// 设置模板引擎的中间件
app.engine('.ejs', ejs.renderFile)
app.set('view engine', 'ejs') // express 4.0后默认是jade
app.set('views', path.resolve(__dirname, 'views')) // 默认就是根目录views
app.use(express.static('public'))// 配置静态文件地址
app.use('/upload', express.static('upload'))// 配置上传文件地址, 参数一为接口路由, 参数二为实际项目地址

// ejs判断当前url
app.use((req, res, next) => {
    app.locals['active'] = url.parse(req.originalUrl).pathname
    next()
})

// 映射路由
app.use('/', indexRouter)
app.use('/admin', adminRouter)

app.listen(3000, () => {
    console.log('Serving at 3000')
})