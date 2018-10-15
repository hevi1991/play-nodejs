const fs = require('fs')
const path = require('path')


exports.getMimeType = (pathname, callback) => {
    fs.readFile('mime.json', (err, data) => {
        let result = 'text/html'
        if (err) {
            console.log(err)
        } else {
            let mime = JSON.parse(data)
            const mimeType = path.extname(pathname)
            result = mime[mimeType] || 'text/html'
        }
        callback(result)
    })

}