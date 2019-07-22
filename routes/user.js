const router = require('koa-router')()

const {
    login
} = require('../controller/user')
const {
    SuccessModel,
    ErrorModel
} = require('../model/resModel')

router.prefix('/api/user')

router.post('/login', async function(ctx, next) {
    const {
        username,
        password
    } = ctx.request.body
    const data = await login(username, password)
    if (data.username) {
        // 设置 session
        ctx.session.username = data.username
        ctx.session.realname = data.realname
        ctx.body = new SuccessModel()
        return
    } else {
        ctx.body = new ErrorModel('登录失败')
    }
})

// 记录访问次数 
// router.get('/session-test', async function(ctx, next) {
//     if (ctx.session.viewNum == null) {
//         ctx.session.viewNum = 0
//     }
//     ctx.session.viewNum++
//         ctx.body = {
//             errno: 0,
//             viewNum: ctx.session.viewNum
//         }
// })

module.exports = router