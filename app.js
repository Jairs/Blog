const Koa = require('koa') // 引用koa
const app = new Koa() // 当前请求的实例
const views = require('koa-views') // 视图
const json = require('koa-json') // post data 里json处理
const onerror = require('koa-onerror') // 错误处理
const bodyparser = require('koa-bodyparser') // post上传的body
const logger = require('koa-logger') // 日志

const index = require('./routes/index')
const users = require('./routes/users')
const blog = require('./routes/blog')
const user = require('./routes/user')

// error 监测
// error handler
onerror(app)

// 处理post data
// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())

app.use(logger())

app.use(require('koa-static')(__dirname + '/public')) // 静态文件路径

app.use(views(__dirname + '/views', {
    extension: 'pug'
}))

// 获取当前服务的耗时
// logger 
app.use(async(ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(blog.routes(), blog.allowedMethods())
app.use(user.routes(), user.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app