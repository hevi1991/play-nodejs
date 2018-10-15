/*
文件系统模块
fs.stat 检查文件类型
fs.mkdir 创建目录
fs.writeFile 创建写入文件
fs.appendFile 追加文件
fs.readFile 读取文件
fs.readdir 读取目录
fs.rename 重命名
fs.rmdir 删除目录
fs.unlink 删除文件

大部分文件操作都是异步的, 所以操作的时候需要注意
 */

var fs = require('fs')

/*

// fs.stat 查看文件状态

fs.stat('./html', (err, stats) => {
    if (err) {
        console.log(err)
        return false
    }
    console.log(stats.isFile())
    console.log(stats.isDirectory())
})

fs.stat('./index.txt', (err, stats) => {
    if (err) {
        console.log(err)
        return false
    }
    console.log(stats.isFile())
    console.log(stats.isDirectory())
})


// fs.mkdir 创建文件夹

fs.mkdir('css', err => {
    if (err) {
        console.log(err)
        return
    }
    console.log('目录创建成功')
})

// fs.writeFile 写入文件

fs.writeFile('./t.txt', '你好啊nodejs', err => {
    if (err) {
        console.log(err)
        return
    }
    console.log('写入成功')
})

// fs.appendFile 追加写入文件

fs.appendFile('t1.txt', '\t写入内容', err => {
    if (err) {
        console.log(err)
        return
    }
    console.log('追加写入成功!')
})

// fs.readFile 读取文件

fs.readFile('./index.txt', 'utf8', (err, data) => {
    if (err) {
        console.log(err)
        return
    }
    console.log(data)
})

// fs.readDir 读取目录下的文件/文件夹

fs.readdir('html', (err, files) => {
    if (err) {
        console.log(err)
        return
    }
    console.log(files)
})


// fs.rename 改名或移动文件/文件夹

// 1.改名
fs.rename('html/index.html', 'html/news.html', err => {
    if (err) {
        console.log(err)
        return
    }
    console.log('修改名字成功')
})

// 2.剪切文件
fs.rename('html/style.css', 'html/css/basic.css', err => {
    if (err) {
        console.log(err)
        return
    }
    console.log('移动完成')
})


// fs.rmdir 删除目录

fs.rmdir('css', err => {
    if(err){
        console.log(err)
        return
    }
    console.log('删除目录成功')
})


// fs.unlink 删除文件

fs.unlink('t1.txt', err => {
    if (err) {
        console.log(err)
        return
    }
    console.log('删除文件成功')
})*/
