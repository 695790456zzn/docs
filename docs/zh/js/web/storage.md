# 存储
## cookie
> 本身用于浏览器和 server 通讯，被借用到本地存储来
> 可用 document.cookie = '' 来修改
> 缺点：
- 存储大小限制 4kb
- http 请求时需要发送到服务端，增加请求数据量
- 只能用 document.cookie = '' 来修改，太简陋

## localStorage 和 sessionStorage
> HTML5 专门为存储而设计，最大可存5M
> API 简单易用 setItem getItem
> 不会随着 http 请求被发送出去

区别：
- localStorage 数据会永久存储，除非代码或手动删除
- sessionStorage 数据只存在于当前会话，浏览器关闭则清空
- 一般用 localStorage 会更多一些