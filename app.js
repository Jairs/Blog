const Koa = require('koa') // 引用koa
const app = new Koa() // 当前请求的实例
const views = require('koa-views') // 视图
const json = require('koa-json') // post data 里json处理
const onerror = require('koa-onerror') // 错误处理
const bodyparser = require('koa-bodyparser') // post上传的body
const logger = require('koa-logger') // 在koa下优化后台打印格式
const session = require('koa-generic-session')
const RedisStore = require('koa-redis')
const path = require('path')
const fs = require('fs')
const morgan = require('koa-morgan') // 记录日志

const index = require('./routes/index')
const users = require('./routes/users')
const blog = require('./routes/blog')
const user = require('./routes/user')

const {
    REDIS_CONF
} = require('./conf/db')

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

const ENV = process.env.NODE_ENV
if (ENV !== 'production') {
    // 开发环境 / 测试环境
    app.use(morgan('dev'));
} else {
    // 线上环境
    const logFileName = path.join(__dirname, 'logs', 'access.log')
    const writeStream = fs.createWriteStream(logFileName, {
        flags: 'a'
    })
    app.use(morgan('combined', {
        stream: writeStream // 默认为标准输出 process.stdout
    }));
}

// session配置
app.keys = ['joa,sdf.sf_e#25']
app.use(session({
    // 配置cookie
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    },
    // 配置redis
    store: RedisStore({
        // all: '127.0.0.1:6379' // 写死本地的redis
        all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
    })
}))

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