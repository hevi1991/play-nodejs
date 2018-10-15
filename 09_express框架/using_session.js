var express = require('express')
var session = require('express-session')
var MongoStore = require('connect-mongo')(session) // 负载均衡1, 将session存入mongodb

var app = new express()
app.use(session({
    secret: 'hellokitty',
    resave: false,
    saveUninitialized: false,  // 是否自动保存未初始化的会话，建议false
    cookie: {maxAge: 1000 * 30 * 60},
    rolling: true, // 当发生请求的时候, 会更新cookie的产生时间, 达到设置session过期时间的效果
    store: new MongoStore({ // 负载均衡2
        url: 'mongodb://127.0.0.1:27017/student', // 放在mongodb的位置
        touchAfter: 24 * 3600
    })
}))

app.get('/', (req, res) => {
    if (req.session.userinfo) {
        res.send(`hello, ${req.session.userinfo}. <a href="/logout">logout</a>`)
        return
    }
    res.send('未登录, 请<a href="/login">login</a>')
})

app.get('/login', (req, res) => {
    req.session.userinfo = 'zhangsan1990'
    console.log('登录成功')
    // 负载均衡3, 会将session对象信息保存到mongodb:student:sessions中
    res.redirect('/')
})

app.get('/logout', (req, res) => {
    // 方法一: 改变cookie的存活时间, cookie销毁后, 不会保留浏览器的sessionid, 达到退出登录的效果
    // req.session.cookie.maxAge = 0
    // 方法二: 销毁session
    // 负载均衡4, 当session被删除或者修改, 都会同步到服务器中
    req.session.destroy((err) => {
        if (err) {
            console.log("退出失败")
        } else {
            console.log('退出成功')
        }
    })
    res.redirect('/')
})

app.listen(4321, () => {
    console.log('4321 start!')
})
