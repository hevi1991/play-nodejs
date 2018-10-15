var fs = require('fs')

// 1. 查看当前目录下是否有upload目录, 没有就创建

/*fs.stat('upload', function (err, stats) {
    if (err) {
        //console.log(err);
        fs.mkdir('upload', error => {
            if (error) {
                console.log(error);
                return
            }
            console.log('文件夹创建成功');
        })
        return
    }
    console.log(stats.isDirectory());
})*/


// 2. 打印html目录下的所有目录
var seachPath = 'html'
fs.readdir(seachPath, (err, files) => {
    if (err) {
        console.log(err);
        return
    }
    var dirFiles = files.filter(item => {
        var fileStat = fs.statSync(`${seachPath}/${item}`)
        return fileStat.isDirectory()
    })
    console.log(dirFiles);
})

// 2.1 使用立即调用函数表达式
// fs.readdir(seachPath, (err, files) => {
//     if (err) {
//         console.log(err);
//         return
//     }
//     var dirList = []
//     ;(function getDir(i) {
//
//         if (i === files.length) {
//             console.log(dirList)
//             return
//         }
//
//         fs.stat(`${seachPath}/${files[i]}`, (error, stats) => {
//             if (error) {
//                 console.log(error);
//                 return
//             }
//             if (stats.isDirectory()) {
//                 dirList.push(files[i])
//             }
//             getDir(i + 1)
//         })
//
//     })(0)
// })