const router = require('koa-router')()

router.prefix('/api/user')

router.post('/login', async function(ctx, next) {
    const {
        username,
        password
    } = ctx.request.body
    ctx.body = {
        errno: 0,
        username,
        password
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