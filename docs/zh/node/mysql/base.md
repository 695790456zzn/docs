# Mysql
## 相关资料
web server 中最流行的关系型数据库，轻量级，易学易用

> 下载地址：https://dev.mysql.com/downloads/mysql/

可视化操作客户端：workbench

>下载地址：https://dev.mysql.com/downloads/workbench/

## 数据库操作
1.建库
```sql
CREATE SCHEMA `myblog` 
```

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

## node 连接 mysql 
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
