const {
    exec,
    escape
} = require('../db/mysql')

const getList = (author, keyword) => {
    let sql = `select * from blogs where 1=1 `
    if (author) {
        author = escape(author)
        sql += `and author=${author} `
    }
    if (keyword) {
        keyword = escape('%' + keyword + '%')
        sql += `and title like ${keyword} `
    }
    sql += `order by createtime desc;`

    //返回promise
    return exec(sql)
}

const getDetail = (id) => {
    id = escape(id)
    let sql = `select * from blogs where id=${id};`
    return exec(sql).then(rows => {
        return rows[0]
    })
}

const newBlog = (blogData = {}) => {
    // blogData 是一个博客对象，包含 title content author属性

    const title = escape(blogData.title)
    const content = escape(blogData.content)
    const author = escape(blogData.author)
    const createtime = Date.now()
    let sql = `insert into blogs (title,content,createtime,author) values (${title},${content},'${createtime}',${author})`
    return exec(sql).then(insertData => {
        console.log("OUTPUT: newBlog -> insertData", insertData)
        return {
            id: insertData.insertId // 表示新建博客，插入到数据表里面的id
        }
    })
}

const updateBlog = (id, blogData = {}) => {
    // id 就是要更新博客的id
    // blogData 是一个博客对象， 包含 title content 属性
    id = escape(id)
    const title = escape(blogData.title)
    const content = escape(blogData.content)

    let sql = `update blogs set title=${title},content=${content} where id=${id}`
    return exec(sql).then(updateData => {
        console.log("OUTPUT: updateBlog -> updateData", updateData)
        if (updateData.affectedRows > 0) {
            return true
        }
        return false
    })
}

const delBlog = (id, author) => {
    // id 就是要删除博客的 id
    // author 就是要删除博客的 author
    id = escape(id)
    author = escape(author)
    let sql = `delete from blogs where id=${id} and author=${author}`
    return exec(sql).then(delData => {
        console.log("OUTPUT: delBlog -> delData", delData)
        if (delData.affectedRows > 0) {
            return true
        }
        return false
    })
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}