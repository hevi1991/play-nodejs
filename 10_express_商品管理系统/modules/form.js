var multiparty = require('multiparty')

module.exports = () => {
    return new multiparty.Form({
        uploadDir: './upload'
    })
}