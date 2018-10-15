const fs = require('fs')
const path = require('path')
const events = require('events')

let emitter = new events.EventEmitter()

exports.getMimeType = (pathname) => {
    fs.readFile('mime.json', (err, data) => {
        let result = 'text/html'
        if (err) {
            console.log(err)
        } else {
            let mime = JSON.parse(data)
            const mimeType = path.extname(pathname)
            result = mime[mimeType] || 'text/html'
        }
        emitter.emit('data', result)
    })
    return emitter
}