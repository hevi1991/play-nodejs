var router = require('express').Router() // 可挂载的路由器句柄

router.get('/', (req, res) => {
    res.send('INDEX')
})

module.exports = router