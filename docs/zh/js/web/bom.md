# BOM
## BOM 操作
1.navigator
```js
const ua = navigator.userAgent
const isChrome = ua.indexOf("Chrome")
console.log(isChrome)
```

2.screen
```js
console.log(screen.width)
console.log(screen.height)
```

3.location
```js
console.log(location.href) // 整个网址
console.log(location.protocol) // 'http:' 'https:'
console.log(location.pathname) // '/learn/188'
console.log(location.host) // www.imooc.com 获取域名
console.log(location.search) // 获取参数
console.log(location.hash)
```

4.history
```js
history.back()
history.forward()
```