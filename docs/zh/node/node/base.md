# node基本使用
## Node.js 和 JS 的区别
- JS：遵循ES语法规范，结合Web-API，可以操作DOM、BOM、Ajax等
- node.js：遵循ES语法规范，结合node-API

## cookie 和 session
### cookie
什么是cookie

- 存储在浏览器的一段字符串（最大5kb）
- 跨域不共享
- 格式如：k1=v1; k2=v2; k3=v3; 因此可以存储结构化数据
- 每次发送http请求，会将请求域的cookie一起发送给server
- server端可以修改cookie并返回给浏览器
- 浏览器中也可以通过js修改cookie

客户端查看cookie的三种方式：
- 在检查工具中的network的请求的headers中查看
- 在Application中查看Cookies
- 在控制台中document.cookie查看
- 修改方式

  document.cookie 进行累加

  server端nodejs操作cookie

查看cookie
```js
// 解析cookie，将cookie转换为对象
req.cookie = {}
const cookieStr = req.header.cookie || ''
cookieStr.split(';').forEach(item => {
    if (!item) {
        return    
    }
    const arr = item.split('=')
    const key = arr[0]
    const val = arr[1]
    req.cookie[key] = val
})
```

操作 cookie
```js
res.setHeader('Set-cookie', `username=${data.username}; path=/; httpOnly; expires=${getCookieExpires()}`)
```

### session
用cookie登录存在的问题
- cookie会暴露username，很危险
- cookie存储有限

解决方案（session：server端存储用户信息）：cookie中存储 userid， server 端对应 username

## CORS
```js
// 允许跨域传递cookie
res.setHeader('Access-Control-Allow-Credentials', true)
// 允许跨域的 origin，*代表所有的
res.setHeader('Access-Control-Allow-Origin', '*')
// 允许单个来源， 可以通过前端js location.origin 获取
res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8001')
// 允许的方法
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

// express、koa2
app.use(
    cors({
        origin: '*' // 或设置单个 origin    
    })
)
```

## 日志
### 文件操作 
nodejs stream
```js
// 基本使用
// 读取文件内容
fs.readFile(fileName, (err, data) => {
  if (err) {
    console.log(err);
    return
  }

  // data 是二进制类型，需要转换为字符串
  console.log(data.toString());
})

// 写入文件
const content = '这是新写入的内容\n'
const opt = {
  flag: 'a' // 追加写入。覆盖用 'w'
}
fs.writeFile(fileName, content, opt, (err) => {
  if (err) {
    console.error(err)
  }
})

// 判断文件是否存在
fs.exists(fileName, (exist) => {
  console.log('exist', exist);
})
```

### IO操作
IO操作的性能瓶颈： 
- IO包括网络IO和文件IO
- 相比于CPU计算和内存读写，IO的特点就是慢

stream：
```js
// 复制文件
const fs = require('fs')
const path = require('path')

const fileName1 = path.resolve(__dirname, 'data.txt')
const fileName2 = path.resolve(__dirname, 'data-bak.txt')

const readStream = fs.createReadStream(fileName1)
const writeStream = fs.createWriteStream(fileName2)

readStream.pipe(writeStream)
readStream.on('data', chunk => {
  console.log(chunk.toString());
})
readStream.on('end', () => {
  console.log('copy done');
})
```


