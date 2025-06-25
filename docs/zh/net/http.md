# HTTP
## http 状态码
### 状态码分类
- 1xx - 服务器收到请求
- 2xx - 请求成功，如 200
- 3xx - 重定向，如 302
- 4xx - 客户端错误，如 404
- 5xx - 服务端错误，如500

### 常见状态码
- 200 - 成功
- 301 - 永久重定向（场景：域名到期，老域名返回301，下次再访问，直接访问新地址）
- 302 - 临时重定向（下次再访问，仍然访问老地址，返回302和location（重定向跳转的地址））
- 304 - 资源未被修改
- 401 - 未授权
- 404 - 资源未找到
- 403 - 没有权限
- 500 - 服务器错误
- 504 - 网关超时

## Restful API
- 传统 API 设计：把每个 url 当作一个功能
- Restful API 设计：把每个 url 当作一个唯一的资源
  - 尽量不用url参数
    - 传统API设计：/api/list?pageIndex=2
    - Restful API设计：/api/list/2
  - 使用method表示操作类型
    - 传统 API 设计：
      - post请求： /api/create-blog
      - post请求: /api/update-blog?id=100
      - get请求:/api/get-blog?id=100
    - Restful API设计：
      - post请求：/api/blog
      - patch请求：/api/blog/100
      - get请求: /api/blog/100

## http headers
### 常见的 Request Headers
- Accept 浏览器可接收的数据格式
- Accept-Encoding 浏览器可接收的压缩算法，如 gzip
- Accept-Languange 浏览器可接收的语言，如 zh-CN
- Connection keep-alive 一次 TCP 连接重复使用
- cookie
- Host 请求域名
- User-Agent （简称 UA ）浏览器信息
### 常见的 Response Headers
- Content-type 发送数据的格式，如 application / json
- Content-length 返回数据的大小，多少字节
- Content-Encoding 返回数据的压缩算法，如 gzip
- set-cookie

## http 缓存
### 什么是缓存
把一些没有必要重复获取的数据存起来（让页面加载更快）

哪些资源可以被缓存--静态资源（js、css、img）
### 强制缓存
例如：（稳定库：jQuery、lodash）

初次请求，如果服务端感觉资源可以被缓存，就会加上 Cache-Control ，如果服务端感觉资源不可以被缓存，就不会加上 Cache-Control。有 Cache-Control 客户端就会将资源缓存起来。

cache-control（在 Response Headers 中）的值：
- max-age：秒级的最大过期时间
- no-cache：不使用强制缓存，正常向服务器端去请求
- no-store：不使用本地缓存，而且不使用服务器端的一些缓存措施（强制缓存或者协商缓存）
- private：只允许最终用户做缓存
- public：允许中间路由或者代理做缓存

Expires (被 cache-control 代替)

![http强制缓存](/images/net/cache1.png)
![http强制缓存](/images/net/cache2.png)

### 协商（对比）缓存
标识：

- Last-Modified 资源的最后修改时间
- Etag 资源的唯一标识（一个字符串，类似人类的指纹）

![http协商缓存](/images/net/cache3.png)
![http协商缓存](/images/net/cache4.png)

Last-Modified 和 Etag，会优先使用 Etag，Last-Modified 只能精确到妙级，如果资源被重复生成，而内容不变，则 Etag 更精确

### 缓存整体流程

![缓存整体流程](/images/net/cache-flow.png)

### 刷新页面对缓存对影响
- 正常操作：地址栏输入 url ，跳转链接，前进后退等；  强制缓存有效，协商缓存有效
- 手动刷新：F5 ，点击刷新按钮，点击菜单刷新； 强制缓存失效，协商缓存有效
- 强制刷新： 强制缓存失效，协商缓存失效

## https - 加密方式
### http 和 https
- http 是明文传输，敏感信息容易被中间劫持
- https = http + 加密，劫持了也无法解密
- 现在浏览器已开始强制 https 协议
### 加密方式
- 对称加密：一个 key 负责加密和解密（服务端把 key 传递给客户端）
- 非对称加密：一对 key，A 加密之后，只能用 B 解密（服务端维护publicKey和privateKey，服务端把publicKey传递给客户端，客户端使用publicKey加密传输内容，服务端使用privateKey解密）
### https 证书

![HTTPS加密方式](/images/net/http-secret.png)