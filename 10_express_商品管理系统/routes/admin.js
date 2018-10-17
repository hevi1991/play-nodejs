var session = require('express-session')
var router = require('express').Router()
var productRouter = require('./admin/product')
var loginRouter = require('./admin/login')

// 配置session中间件
router.use(session({
    secret: 'hellokitty',
    resave: false,
    saveUninitialized: false,  // 是否自动保存未初始化的会话，建议false
    cookie: {maxAge: 1000 * 60 * 30},
    rolling: true
}))

// 自定义中间件
// 判断登录状态
router.use((req, res, next) => {
    if (req.originalUrl == '/admin/login') {
        next()
    } else {
        if (req.session.userinfo && req.session.userinfo.username != '') {
            next()
        } else {
            res.redirect('/admin/login')
        }
    }
})


router.use('/product', productRouter)
router.use('/', loginRouter)

module.exports = router