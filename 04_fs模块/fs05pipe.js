let fs = require('fs')

readStream = fs.createReadStream('fs04createWriteStream.js')
writeStream = fs.createWriteStream('tmpl.txt')

// 管道读写
readStream.pipe(writeStream)
console.log('执行完毕!')