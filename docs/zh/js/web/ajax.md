# Ajax
## XMLHttpRequest
```js
// GET
const xhr = new XMLHttpRequest()
xhr.open('GET', '/data/test.json', true) // true 代表异步
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            alert(xhr.responseText)        
        } else {
            alert('其他情况')        
        }   
    }
}
xhr.send(null)

// POST
const xhr = new XMLHttpRequest()
xhr.open('POST', '/login', true)
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            alert(xhr.responseText)        
        } else {
            alert('其他情况')        
        }   
    }
}
const postData = {
    userName: 'zhangsan',
    password: 'xxx'
}
xhr.send(JSON.stringify(postData))
```

**xhr.readyState**
- UNSET 尚未调用 open 方法
- OPENED open方法已被调用
- HEADERS_RECEIVED send 方法已被调用，header 已被接收
- LOADING 下载中， responseText 已有部分内容
- DONE 下载完成

**xhr.status**
- 2xx - 表示成功处理请求，如200
- 3xx - 需要重定向，浏览器直接跳转，如 301 302 304
- 4xx - 客户端请求错误，如 404（服务器找不到资源） 403（无权限）
- 5xx - 服务器端错误

## 浏览器同源策略
> 概念：ajax 请求时，浏览器要求当前网页和 server 必须同源（安全）
同源：协议、域名、端口，三者必须一致

## 实现跨域的常见方式
1.jsonp（\<script\>可以实现跨域，服务器端可以拼接返回的内容，从而实现跨域）

2.CORS - 服务器设置 http header
```js
// 第二个参数填写允许跨域的域名称，不建议直接写"*"
response.setHeader("Access-Control-Allow-Origin", "http://localhost:8011")
response.setHeader("Access-Control-Allow-Headers", "X-Requested-With")
response.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")

// 接收跨域的cookie
response.setHeader("Access-Control-Allow-Credentials", "true")
```
