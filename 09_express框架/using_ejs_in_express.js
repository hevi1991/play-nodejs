/**
 * express已经集成了ejs, 后端渲染模板
 * */

let express = require('express')
let ejs = require('ejs')
let app = new express()
const path = require('path')

// 配置esj为模板引擎
// app.set('views', path.resolve(__dirname, 'views')) // 默认就是根目录views
app.engine('.ejs', ejs.renderFile)
app.set('view engine', 'ejs') // express 4.0后默认是jade

// 配置静态文件地址
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index', {
        list: [1, 2, 3, 4, 4, 3, 2, 1]
    })
})

app.listen(3001, () => {
    console.log('Serving at 3001')
})