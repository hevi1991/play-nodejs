var express = require('express')
var cookieParser = require('cookie-parser') // npm install cookie-parser --save

var app = new express()
app.use(cookieParser())

app.get('/', (req, res) => {
    console.log(req.cookies)
    res.send('你好, express')
})

app.get('/news', (req, res) => {
    res.send('NEWS')
})

app.get('/set', (req, res) => {
    /**
     * param1 cookie的键
     * param2 cookie的值
     * param3 cookie属性
     */
    res.cookie('cookie-key', 'cookie-value', {maxAge: 60000})
    res.send('We had set cookie.')
})

app.get('/clear', (req, res) => {
    for (let cookKey in req.cookies) {
        /**
         * param cookie的键
         */
        res.clearCookie(cookKey)
    }

    res.send('We had removed all cookies')
})

app.listen(4321, () => {
    console.log('4321 listening.')
})

