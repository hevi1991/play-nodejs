var fs = require('fs')
var router = require('express').Router()
var db = require('../../modules/db')
var form = require('../../modules/form')

router.get('/', (req, res) => {
    db.collection('product').then(cursor => {
        cursor.find().toArray().then(docs => {
            res.render('admin/product/index', {list: docs})
        })
    })
})

router.get('/add', (req, res) => {
    res.render('admin/product/add')
})

router.post('/add', (req, res) => {
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
            res.send(`<script>alert('添加成功');location.href='/admin/product/add'</script>`)
        })
    })
})

router.get('/edit/:id', (req, res) => {
    db.collection('product').then(cursor => {
        return cursor.findOne(new db.ObjectId(req.params.id))
    }).then(product => {
        res.render('admin/product/edit', product)
    })
})

router.post('/edit', (req, res) => {
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
                    res.send(`<script>alert('修改成功');location.href='/admin/product/edit/${_id}'</script>`)
                }).catch((err) => {
                    res.send(`<script>alert('修改失败: ${err}');location.href='/admin/product/edit/${_id}'</script>`)
                })
            })
        })
    })
})

router.get('/delete/:id', (req, res) => {
    var id = req.params.id
    db.collection('product').then(cursor => {
        return cursor.findOne({_id: new db.ObjectId(id)})
    }).then(result => {
        if (fs.existsSync(result.pic)) {
            fs.unlinkSync(result.pic)
        }
        return db.collection('product')
    }).then(cursor => {
        cursor.deleteOne({_id: new db.ObjectId(id)}).then(result => {
            res.send(`<script>alert('删除成功');location.href='/admin/product'</script>`)
        }).catch(err => {
            res.send(`<script>alert('删除失败: ${err}');location.href='/admin/product'</script>`)
        })
    })
})


module.exports = router