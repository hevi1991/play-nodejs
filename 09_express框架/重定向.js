var express = require('express')

var app = new express()

app.get('/', (req, res)=>{
    console.log(req.query)
    res.send('HOME PAGE')
})

app.get('/redirect', (req, res)=>{
    res.redirect(`/?from=${req.url}`)
})


app.listen(4321, ()=>{
    console.log('4321 start!')
})