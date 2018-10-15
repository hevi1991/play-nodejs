var fs = require('fs')

// 使用回调函数去取得需要的数据
function getMime(callback) {
    fs.readFile('mime.json', 'utf8', (err, data) => {
        callback(data)
    })
}

getMime(result=>{
    console.log(result)
})

// 还可以使用是事件驱动, EventEmitter