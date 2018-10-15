const events = require('events')

let emitter = new events.EventEmitter()


// 广播和接受广播

// 监听to_parent广播
emitter.on('to_parent', (data) => {
    console.log(data)
    console.log('接收到了广播事件')
})

const timeId = setInterval(() => {
    // 广播
    emitter.emit('to_parent', '发送的数据')
}, 1000)


setTimeout(() => {
    // 我们停止timeId
    clearInterval(timeId)
    emitter.removeAllListeners('to_parent')
    console.log('我们停止掉广播')
}, 10000)