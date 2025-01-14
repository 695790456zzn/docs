# sequelize
## ORM
- 使用模型（JS对象）映射数据表，而非直接创建
- 使用JS API 操作数据库，而非 SQL 语句

## sequelize
nodejs ORM 工具

### 使用
1.安装
```js
npm i mysql2 sequelize -D
```

2.连接Mysql数据库
```js
// db.js
const Sequelize = require('sequelize')

const conf = {
  host: 'localhost',
  dialect: 'mysql'
}

// 创建 sequelize 实例
const seq = new Sequelize(
  'myblog_sequelize', // 数据库名称
  'root', // 用户名
  'rr3262678', // 密码
  conf
)
```

3.创建模型
```js
const Sequelize = require('sequelize')
const seq = require('./db')

// User 模型
const User = seq.define(
  'user', // 对应同步到数据库的 users 表（英文复数）
  {
    // id 不用自己定义，sequelize 会帮我们增加上
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },

    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    realname: {
      type: Sequelize.STRING,
    }
  }
)

module.exports = {
  User
}
```

4.增删改查
```js
// 创建
const { User, Blog } = require('./model')

// await 语法，外部要有一个自执行 async 函数
!(async function() {

  const blog = await Blog.create({
    title: '博客标题AAA',
    content: '博客内容AAA',
    author: 'zhangsan'
  })
  console.log('blog', blog.dataValues)
})()

// 查询
const Sequelize = require('sequelize')
const { Blog, User } = require('./model')

!(async function () {

  // 登录，查询一条数据
  const zhangsan = await User.findOne({
    // 查询条件
    where: {
      username: 'zhangsan',
      password: '123'
    }
  })
  if (zhangsan) {
    console.log(zhangsan.dataValues);
  } else {
    console.log(zhangsan);
  }
  
  // 查询多条数据，博客列表
  const blogList = await Blog.findAll({
    // 条件
    where: {
      author: 'zhangsan',
      title: {
        [Sequelize.Op.like]: '%标题%' // 模糊查询，和 SQL 语句 like 一样
      }
    },
    // 排序
    order: [
      ['id', 'desc'] // SQL 语句： order by id desc
    ]
  })
  console.log('blogList', blogList.map(item => item.dataValues))

})()

// 更新
const { Blog } = require('./model')

!(async function() {

  const res = await Blog.update(
    // 要修改的内容
    {
      title: '标题AAA',
      content: '内容AAA'
    },
    // 条件
    {
      where: {
        id: 2
      }
    }
  )
  console.log('res', res)

})()

// 删除
const { Blog } = require('./model')

!(async function() {

  const res = Blog.destroy({
    // 条件
    where: {
      id: 2, 
      author: 'zhangsan'
    }
  })
  console.log('res', res)

})()
```

