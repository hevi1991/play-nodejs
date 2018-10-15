const fs = require('fs')

let writeStream = fs.createWriteStream('output.txt')

let count = 1
while (true) {
    writeStream.write(`于${new Date().getTime()}写入\n`)
    count++
    if (count > 100) {
        break
    }
}

// 标记写入完成
writeStream.end()

// 结束时广播
writeStream.on('finish', () => {
    console.log('All writes are now complete.')
})

// 写入失败广播
writeStream.on('error', err => {
    console.log(err)
})