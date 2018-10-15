var fs = require('fs')

// 异步, 非阻塞IO, 执行顺序 1, 3, 2
console.log(1)
fs.readFile('mime.json', 'utf8', (err, data) => {
    console.log(data)
    console.log(2)
})
console.log(3)

