var str = 'this is a string'

// 暴露一个str属性, 外部引用需要.str才能访问
// exports.str = str


var tools = {
    add(x, y) {
        return x + y
    }
}

// 将暴露为一个对象, 外部直接可以使用tools
module.exports = tools


// exports.property = value 或 module.exports = value 只能用其中一个