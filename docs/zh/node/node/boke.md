# 仿博客项目开发
## 环境搭建
### www.js中配置服务
```js
const http = require('http')

const PORT = 8000
const serverHandle = require('../app')

const server = http.createServer(serverHandle);

server.listen(PORT)
```

### app.js中配置请求
```js
const serverHandle = (req, res) => {
  // 设置返回格式
  res.setHeader('Content-type', 'application/json')

  const resData = {
    name: 'xxx',
    site: 'www.xxx.com',
    env: process.env.NODE_ENV
  }

  res.end(JSON.stringify(resData))
}

module.exports = serverHandle
```

### 安装cross-env
> npm install cross-env --save-dev

环境变量，通用于Mac、Windows、Linux

### 安装nodemon
> npm install nodemon --save-dev

使用 nodemon启动服务，监听文件变化，热更新

## 架构设计
### 第一层启动服务相关
在 www.js 中进行配置

### 第二层整体项目相关
在 app.js 中进行配置

### 第三层路由配置相关    
新建 router 文件，只做路由的处理，不关心数据

### 第四层数据相关
新建 controller 文件，只关注数据处理

## 路由
### app.js中获取url和path
```js
// 获取 path
const url = req.url
req.path = url.split('?')[0]
```

### 路由匹配不到时的错误处理
```js
// 未命中路由，返回 404
res.writeHead(404, {"Content-type": "text/plain"})
res.write("404 Not Found\n")
res.end()
```

## Model
处理返回数据
```js
class resModel {
    constructor(data, message) {
        if (data === 'string') {
           this.message = data
           data = null
           message = null                    
        }  
        
        if(data) {
            this.data = data        
        }    
        
        if (message) {
            this.message = message        
        }
    }
}

class SuccessModel extends BaseModel {
    constructor(data, message) {
        super(data, message)
        this.errno = 0    
    }
}

class ErrorModel extends BaseModel {
    constructor(data, message) {
        super(data, message)
        this.errno = -1    
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}
```

## 处理 post data 
在 app.js 中
```js
const getPostData = req => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({})
            return        
        }         
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return                    
        }       
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()        
        })
        req.on('end', () => {
            if (!postData) {
                resolve({})
                return            
            }        
            resolve(
                JSON.parse(postData)            
            )
        })
    })
    return promise
}

const serverHandle = (req, res) => {
  // 设置返回格式
  res.setHeader('Content-type', 'application/json')

  // 获取 path
  const url = req.url
  req.path = url.split('?')[0]

  // 解析 query
  req.query = querystring.parse(url.split('?')[1])

  // 处理 post data
  getPostData(req).then(postData => {
    // 将 post data 数据保存在req.body 中，后续直接使用
    req.body = postData;

    // 处理blog 路由
    const blogData = handleBlogRouter(req, res);
    if (blogData) {
      res.end(JSON.stringify(blogData));
      return;
    }

    // 处理 user 路由
    const userData = handleUserRouter(req, res);
    if (userData) {
      res.end(JSON.stringify(userData));
      return;
    }

    // 未命中路由，返回 404
    res.writeHead(404, { "Content-type": "text/plain" });
    res.write("404 Not Found\n");
    res.end();
  })
}
```

## Mysql
- web server 中最流行的关系型数据库，轻量级，易学易用
- web server 中最流行的关系型数据库，轻量级，易学易用
- 下载地址：[https://dev.mysql.com/downloads/mysql/]https://dev.mysql.com/downloads/mysql/

- 可视化操作客户端：workbench
- 下载地址：[https://dev.mysql.com/downloads/workbench/]https://dev.mysql.com/downloads/workbench/

### 数据库操作
1.建库

> CREATE SCHEMA `myblog` 

2.建表
```sql
CREATE TABLE `myblog`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(20) NOT NULL,
  `password` VARCHAR(20) NOT NULL,
  `realname` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id`));
```

3.操作表
```sql
use myblog;

-- show tables;

-- 增加一条数据
insert into users (username, `password`, realname) values('lisi', '123','李四');

-- 查询表中所有内容
select * from users;

-- 指定条件查询 users 表
select id, username from users;

-- 查询 users 表中 username 是 zhangsan 并且 password 是 123 的数据（ password 是关键字，用``表示表中的列名）
select * from users where username='zhangsan' and `password`='123';

-- 模糊查询
select * from users where username like '%zhang%';

-- 排序 desc（逆序）
select*from users where password like '%1%' order by id desc;

-- 更新
update users set realname='李四2' where username='lisi';

-- 删除
delete from users where username='lisi';

-- 软删除
select*from users where state='1';
-- 查询 state 不为 0
select*from users where state <> '0'; 
update users set state='0' where username='lisi'; -- 软删除

-- insert into blogs (title, content, createtime, author) values ('标题A', '内容A', 1679663796796, 'zhangsan');
-- insert into blogs (title, content, createtime, author) values ('标题B', '内容B', 1679663870058, 'lisi');

-- select*from blogs order by createtime desc;

// 查询 mysql 版本号
select version();

// 联表查询
select blogs.* , users.username, users.nickname
from blogs inner join users on users.id = blogs.userid
where users.username = 'zhangsan';
```

### node 连接 mysql 
```js
const mysql = require('mysql')

// 创建连接对象
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rr3262678',
  port: '3306',
  database: 'myblog'
})

// 开始连接
con.connect()

// 执行 sql 语句
const sql = 'select * from users;'
con.query(sql, (err, result) => {
  if (err) {
    console.error(err);
    return
  }
  console.log(result);
})

// 关闭
con.end()

// 连接问题
  errno: 1251,
  sqlMessage: 'Client does not support authentication protocol requested by server; consider upgrading MySQL client',
  sqlState: '08004',
  fatal: true
// 解决方案
mysql> alter user 'root'@'localhost' identified with mysql_native_password by '自己的密码';
mysql> flush privileges;
```

### 需要注意的点
sql 条件中 1=1 的作用
```js
const getList = (author, keyword) => {
  // 1=1 起一个占位符的作用，避免后面不确定条件字段的拼接错误
  let sql = `select * from blogs where 1=1`
  if (author) {
    sql += `and author='${author}'`
  }
  if (keyword) {
    sql += `and title like '${keyword}'`
  }
  sql += `order by createtime desc;`

  // 返回 promise
  return exec(sql)
}
```

## 登录
### cookie
什么是cookie：
- 存储在浏览器的一段字符串（最大5kb）
- 跨域不共享
- 格式如k1=v1, k2=v2；因此可以存储结构化数据
- 每次发送http请求，会将请求域的cookie一起发送给server
- server可以修改cookie并返回给浏览器
- 浏览器中也可以通过javascript修改cookie（有限制）

httpOnly：不允许浏览器端修改

path：生效路径

expires: 过期时间

### session
使用 cookie 存在的问题: 
- 会暴露敏感信息
- 存储有限，大小只有5kb

session 的解决方案：
- 生成 userid，userid 对应相应的用户信息

### redis
问题
- session如果是js变量，放在nodejs进程内存中，如果访问量过大，内存暴增容易引起栈溢出
- 线上环境是多进程的，进程之间内存无法共享
- redis 是web server 最常用的缓存数据库，数据存放在内存中，相比于 mysql ，访问速度快，但是成本更高

为什么session适用于 redis
- session 访问频繁，对性能要求极高
- session可以不考虑断电丢失数据的问题
- session数据量不会很大

安装 redis
> Windows：[http://www.runoob.com/redis/redis-install.html]http://www.runoob.com/redis/redis-install.html

>Mac：使用 brew install redis

启动服务：
```js
redis-server
redis-cli
```