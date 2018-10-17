var assert = require('assert')
var express = require('express')
var ejs = require('ejs')
var path = require('path')
var bodyParser = require('body-parser') // 请求体解析(中间件)
var session = require('express-session')
var md5 = require('md5-node')
var form = require('./modules/form')
var fs = require('fs')
var os = require('os')

var app = new express()

// 设置模板引擎的中间件
app.engine('.ejs', ejs.renderFile)
app.set('view engine', 'ejs') // express 4.0后默认是jade
app.set('views', path.resolve(__dirname, 'views')) // 默认就是根目录views
app.use(express.static('public'))// 配置静态文件地址
app.use('/upload', express.static('upload'))// 配置上传文件地址, 参数一为接口路由, 参数二为实际项目地址

// 设置请求解析中间件
app.use(bodyParser.json()) // 解析 application/json
app.use(bodyParser.urlencoded({extended: true})) // 解析 application/x-www-form-urlencoded

// 封装好的mongodb
var db = require('./modules/db.js')

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
    db.collection('user').then((cursor) => {
        cursor.findOne(params).then(result => {
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
    db.collection('product').then(cursor => {
        cursor.find().toArray().then(docs => {
            res.render('index', {list: docs})
        })
    })
})

app.get('/product_add', (req, res) => {
    res.render('add')
})

app.post('/do_product_add', (req, res) => {

    form().parse(req, (err, fields, files) => {
        if (err) {
            console.log(`新增商品失败: ${err}`)
            res.send(`<script>alert('添加商品失败')</script>`)
            return
        }
        let title = fields.title[0]
        let price = fields.price[0]
        let fee = fields.fee[0]
        let description = fields.description[0]
        let pic = files.pic[0].path
        db.collection('product').then(cursor => {
            cursor.insertOne({title, price, fee, description, pic})
            res.send(`<script>alert('添加成功');location.href='/product_add'</script>`)
        })
    })
})

app.get('/product_edit/:id', (req, res) => {
    db.collection('product').then(cursor => {
        return cursor.findOne(new db.ObjectId(req.params.id))
    }).then(product => {
        res.render('edit', product)
    })
})

app.post('/do_product_edit', (req, res) => {
    form().parse(req, (err, fields, files) => {
        let _id = fields._id[0]
        let title = fields.title[0]
        let price = fields.price[0]
        let fee = fields.fee[0]
        let description = fields.description[0]
        let pic = files.pic[0].path
        let updateParams = {
            title,
            price,
            fee,
            description
        }

        db.collection('product').then(cursor => {
            return cursor.findOne({_id: new db.ObjectId(_id)})
        }).then(result => {
            if (files.pic[0].originalFilename) { // 如果图片上传了, 删除原图片保存新图片
                updateParams.pic = pic
                if (fs.existsSync(result.pic)) {
                    fs.unlinkSync(result.pic)
                }
            } else {// 否则不更改图片, 删除生成的临时文件
                fs.unlinkSync(pic)
            }
            db.collection('product').then(cursor => {
                cursor.updateOne({_id: new db.ObjectId(_id)}, {$set: updateParams}).then(result => {
                    res.send(`<script>alert('修改成功');location.href='/product_edit/${_id}'</script>`)
                }).catch((err) => {
                    res.send(`<script>alert('修改失败: ${err}');location.href='/product_edit/${_id}'</script>`)
                })
            })
        })
    })
})

app.get('/do_product_delete/:id', (req, res) => {
    var id = req.params.id
    db.collection('product').then(cursor => {
        return cursor.findOne({_id: new db.ObjectId(id)})
    }).then(result => {
        if (fs.existsSync(result.pic)) {
            fs.unlinkSync(result.pic)
        }
        console.log(this)
        return db.collection('product')
    }).then(cursor => {
        cursor.deleteOne({_id: new db.ObjectId(id)}).then(result => {
            res.send(`<script>alert('删除成功');location.href='/product'</script>`)
        }).catch(err => {
            res.send(`<script>alert('删除失败: ${err}');location.href='/product'</script>`)
        })
    })
})


app.listen(3000, () => {
    console.log('Serving at 3000')
})