const fs = require('fs')

// 文件流操作是一个事件广播的机制运行的. (观察者模式)

let readStream = fs.createReadStream('input.txt', {highWaterMark: 1, encoding: 'utf8'})

var str = '' //保存数据

// 读取中
readStream.on('data', chunk => {
    console.log(chunk)
    str += chunk
})

// 读取完成
readStream.on('end', chunk => {
    console.log(str)
})

// 读取失败
readStream.on('error', err => {
    console.log(err)
})