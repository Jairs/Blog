const {
    exec,
    escape
} = require('../db/mysql')
const {
    getPassword
} = require('../utils/cryp')

const login = (username, password) => {
    //防止登录的sql注入
    username = escape(username)

    //生成加密密码
    password = getPassword(password)
    password = escape(password)

    let sql = `select username, realname from users where username=${username} and password=${password};`
    return exec(sql).then(rows => {
        return rows[0] || {}
    })
}

module.exports = {
    login
}