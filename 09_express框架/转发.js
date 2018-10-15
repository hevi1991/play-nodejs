var express = require('express')

var app = new express()

app.get('/', (req, res) => {
    console.log(req.query)
    res.send('HOME PAGE')
})

app.get('/location', (req, res) => {
    // res.status(301) //这里设置301后, 变为了重定向...
    res.location('/')
    res.end()
})


app.listen(4321, () => {
    console.log('4321 start!')
})