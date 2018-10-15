const fs = require('fs')
const path = require('path')

let mine = JSON.parse(fs.readFileSync('mime.json'))

/*module.exports = (pathname) => {
    const mimeType = path.extname(pathname)
    return mine[mimeType] || 'text/html'
}*/
exports.getMimeType = (pathname) => {
    const mimeType = path.extname(pathname)
    return mine[mimeType] || 'text/html'
}