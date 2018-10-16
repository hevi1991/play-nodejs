var assert = require('assert')
var express = require('express')
var ejs = require('ejs')
var path = require('path')
var bodyParser = require('body-parser') // 请求体解析(中间件)
var session = require('express-session')
var md5 = require('md5-node')

var app = new express()

// 设置模板引擎的中间件
app.engine('.ejs', ejs.renderFile)
app.set('view engine', 'ejs') // express 4.0后默认是jade
app.set('views', path.resolve(__dirname, 'views')) // 默认就是根目录views
app.use(express.static('public'))// 配置静态文件地址

// 设置body-parser中间件
app.use(bodyParser.json()) // 解析 application/json
app.use(bodyParser.urlencoded({extended: true})) // 解析 application/x-www-form-urlencoded

// 配置mongodb数据库配置
var MongoClient = require('mongodb').MongoClient
const DBURL = 'mongodb://localhost:27017'
const DBNAME = 'productmanage'

// 配置session中间件
app.use(session({
    secret: 'hellokitty',
    resave: false,
    saveUninitialized: false,  // 是否自动保存未初始化的会话，建议false
    cookie: {maxAge: 1000 * 60 * 30},
    rolling: true
}))

// 自定义中间件
// 判断登录状态
app.use((req, res, next) => {
    if (req.url == '/login' || req.url == '/do_login') {
        next()
    } else {
        if (req.session.userinfo && req.session.userinfo.username != '') {
            next()
        } else {
            res.redirect('/login')
        }
    }
})

// ejs判断当前url
app.use((req, res, next) => {
    app.locals['active'] = req.url
    next()
})


// 首页
app.get('/', (req, res) => {
    res.redirect('/product')
})

// 登录
app.get('/login', (req, res) => {
    res.render('login', {
        userinfo: req.session.userinfo
    })
})

app.post('/do_login', (req, res) => {
    var params = req.body
    params['password'] = md5(params['password']) // 加密
    MongoClient.connect(DBURL, {useNewUrlParser: true}, (err, client) => {
        if (err) {
            console.log(`数据链接失败: ${err}`)
            return
        }
        // 查询数据
        let db = client.db(DBNAME)
        db.collection('user').findOne(params).then(result => {
            if (result) {
                console.log('登录成功')
                // 保存到session
                req.session.userinfo = result
                // 保存session的用户信息到ejs模板引擎的全局变量
                app.locals['userinfo'] = result
                res.send('<script>alert("登录成功");location="/product";</script>')
            } else {
                console.log('登录失败')
                res.send('<script>alert("登录失败");location="/login";</script>')
            }
        })
    })
})

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        assert.equal(err, null)
        res.redirect('/login')
    })
})

// 商品
app.get('/product', (req, res) => {
    MongoClient.connect(DBURL, {useNewUrlParser: true}, (err, client) => {
        if (err) {
            console.log(`数据库连接失败: ${err}`)
            return
        }
        let db = client.db(DBNAME)
        db.collection('product').find().toArray().then(docs => {
            res.render('index', {list: docs})
        })
    })
})

app.get('/product_add', (req, res) => {
    res.render('add')
})

app.get('/product_edit', (req, res) => {
    res.render('edit')
})

app.get('/product_delete', (req, res) => {
    res.send('删除商品')
})


app.listen(3000, () => {
    console.log('Serving at 3000')
})