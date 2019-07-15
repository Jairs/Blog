const fs = require('fs')
const path = require('path')

// 写日志
function writeLog(writeStream, log) {
    writeStream.write(log + '\n')
}

// 生成 write Stream
function createWriteStream(fileName) {
    const fullFileName = path.join(__dirname, '../', '../', 'logs', fileName)
    const writeStream = fs.createWriteStream(fullFileName, {
        flags: 'a'
    })
    return writeStream
}

const accessWriteStream = createWriteStream('access.log')
const errorWriteStream = createWriteStream('error.log')
const eventWriteStream = createWriteStream('event.log')

// 写访问日志
function access(log) {
    writeLog(accessWriteStream, log)
}

// 写错误日志
function errorLog(log) {
    writeLog(errorWriteStream, log)
}

// 写自定义日志
function eventLog(log) {
    writeLog(eventWriteStream, log)
}

module.exports = {
    access,
    errorLog,
    eventLog
}