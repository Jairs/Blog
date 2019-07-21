var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser'); // 处理cookie
var logger = require('morgan'); // 记录日志

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const blogRouter = require('./routes/blog');
const userRouter = require('./routes/user');


var app = express(); // 实例

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));

//可在 res.body 中获取post请求的数据
app.use(express.json()); // 解析post请求（application/json)
app.use(express.urlencoded({ // 解析post请求（x-www-form-urlencoded）
    extended: false
}));

app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public'))); // 静态文件路径

// 处理路由
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'dev' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;