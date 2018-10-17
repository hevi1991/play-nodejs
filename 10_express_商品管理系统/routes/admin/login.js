var router = require('express').Router()
var db = require('../../modules/db')
var bodyParser = require('body-parser')
var md5 = require('md5-node')

// 安装请求提解析中间件
router.use(bodyParser.urlencoded({extended: false}))
router.use(bodyParser.json())


router.get('/login', (req, res) => {
    res.render('admin/login')
})

router.post('/login', (req, res) => {
    var params = req.body
    params['password'] = md5(params['password']) // 加密
    db.collection('user').then((cursor) => {
        cursor.findOne(params).then(result => {
            if (result) {
                console.log('登录成功')
                // 保存到session
                req.session.userinfo = result
                // 保存session的用户信息到ejs模板引擎的全局变量
                req.app.locals['userinfo'] = result
                res.send('<script>alert("登录成功");location="product";</script>')
            } else {
                console.log('登录失败')
                res.send('<script>alert("登录失败");location="login";</script>')
            }
        })
    })
})

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err)
            req.end('err')
        }
        res.redirect('/admin/login')
    })
})


module.exports = router