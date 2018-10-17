/**
 * 配置mongodb数据库配置
 * 操作数据库
 */

// 配置mongodb数据库配置
var MongoClient = require('mongodb').MongoClient
var ObjectId = require('mongodb').ObjectId
const DBURL = 'mongodb://localhost:27017'
const DBNAME = 'productmanage'

/**
 * mongodb数据操作
 * @param collectionName 集合名称
 * @returns {Promise}
 */
module.exports = {
    collection(collectionName) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(DBURL, {useNewUrlParser: true}, (err, client) => {
                if (err) {
                    console.log(`数据库连接失败: ${err}`)
                    return reject(err)
                }
                let db = client.db(DBNAME)
                let cursor = db.collection(collectionName)
                return resolve(cursor)
            })
        })
    },
    ObjectId
}