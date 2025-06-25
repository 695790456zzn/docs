# Mongodb
## 介绍
- Mongodb是一个文档数据库
- Mongodb以文档形式存储数据，格式像 JSON

![Mongodb](/images/node/mongodb.png)

Mongodb和mysql的区别

- Mysql - 关系型，表格存储，SQL 操作，硬盘，适合存储格式规整的信息
- Redis - 非关系型，key-value 存储，NoSQL， 内存
- Mongodb - 非关系型，文档存储，NoSQL，硬盘，适合存储格式松散的信息

## 安装
Mac：

安装 homebrew
```js
// 官方源
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

// 国内源
/bin/zsh -c "$(curl -fsSL https://gitee.com/ineo6/homebrew-install/raw/master/install.sh)"

// 切换源
参考：https://www.jianshu.com/p/5ba6d96b2c37
```

用homebrew安装mongodb
```js
// 前置：需要安装xcode
xcode-select --install
// 安装社区版本（学习使用，正版收费）
brew install mongodb-community
```

## 基本使用
```js
// start
brew services start mongodb-community

// stop
brew services stop mongodb-community

// 命令行操作
> mongosh
// 切换操作的表
> use myblog
// 展示所有集合
> show collections
// 插入一条数据
> db.blogs.insertOne({ "title": "标题1", "content": "内容1", "author": "zhangsan" })
// 查找集合中的所有文档
> db.blogs.find()
// 按条件查找
> db.blogs.find({ "author": "zhangsan" })
// 更新一条数据
> db.blogs.update({"author": "zhangsan"}, {$set: {"title": "标题A"}})
// 删除一条数据
> db.blogs.remove({"author": "zhangsan"}})
// 排序 -- -1(倒叙)
> db.blogs.find().sort({ _id: -1 })
```

## 概念
- 数据库：database
- 集合：collection
- 文档：document
- bson：

  JSON 是一种常用的数据格式，是字符串类型的

  BSON = Binary JSON 即二进制类型的JSON

-NoSQL：无需用 SQL 语句查询

## nodejs连接Mongodb
安装插件

> npm i mongodb --save

连接数据库
```js
const { MongoClient } = require('mongodb')

const url = 'mongodb://localhost:27017'
const dbName = 'myblog'

const client = new MongoClient(url)

async function run() {
  try {
    await client.connect()
    console.log('Connected successfully to server');

    // 连接数据库
    const db = client.db(dbName)
    
    // 连接到集合
    const collection = db.collection('myblog');
 
    // 插入文档
    const insertResult = await collection.insertOne({ a: 1 });
    console.log('Insert document:', insertResult);
 
    // 查询文档
    const query = { a: 1 };
    const docs = await collection.find(query).toArray();
    console.log('Found documents:', docs);
  } catch (err) {
    console.error('Found documents', err)
  } finally {
    // 确保在程序结束前关闭连接
    await client.close()
  }
}

run().catch(console.error)
```

