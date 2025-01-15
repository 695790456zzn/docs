# 网络相关
## ajax 请求 get 和 post 的区别
- get 一般用于查询操作，post 一般用于用户提交操作
- get 参数拼接在 url 上，post 放在请求体内（数据体积可更大）
- 安全性：post 易于防止 CSRF

## 解释 jsonp 原理，为何不是真正到 ajax
- 浏览器的同源策略（服务器端没有同源策略）和跨域
- 哪些 html 标签能绕过跨域（img，script）

## 同源策略及跨域的解决方案
浏览器的同源策略（Same-Origin Policy）是一种重要的安全机制，旨在防止不同来源（域名、协议、端口）的网页相互访问敏感数据。基于同源策略，前端开发中常常需要处理跨域请求，以在不同来源之间安全地进行数据通信。
### 同源策略
#### 定义
只有当两个 URL 的协议、域名和端口都相同，它们才属于同源。只有在同源的情况下，浏览器才能允许访问对方的资源。
#### 同源策略限制的内容
- DOM 访问：不同源的页面之间不能互相操作 DOM。
- Cookie 和 LocalStorage 访问：不同源的页面之间不能互相访问对方的 Cookie 和本地存储数据。
- Ajax 请求：在默认情况下，浏览器会阻止不同源的 Ajax 请求。

### 前端跨域方案
#### 1.JSONP（JSON with Padding）

**原理**

利用 \<script\> 标签不受同源策略限制的特点，动态生成 \<script\> 标签来请求数据。服务端接收到请求后，将数据以函数调用的形式返回，前端定义对应的回调函数来处理数据。

**优缺点**
- 优点：简单易用，兼容性好。
- 缺点：只支持 GET 请求，不适合复杂的请求和响应结构。

**示例**

前端
```js
function handleResponse(data) {
  console.log(data);
}
const script = document.createElement('script');
script.src = 'https://example.com/data?callback=handleResponse';
document.body.appendChild(script);
```
后端
```js
handleResponse({ name: "Alice", age: 25 });
```

#### 2.CORS（Cross-Origin Resource Sharing）
**原理**

CORS 是一种跨域资源共享的机制，通过设置 HTTP 响应头，服务器声明允许的请求源、请求方式和头信息。浏览器收到响应头后，决定是否允许跨域请求。
- 简单请求：如 GET、POST 请求，不带自定义头信息，直接通过。
- 预检请求：对于复杂请求（如 PUT、DELETE、带有自定义头信息等），浏览器会先发送 OPTIONS 请求预检，确认服务器是否允许跨域。

**优缺点**
- 优点：支持多种 HTTP 请求方法，控制粒度细。
- 缺点：需要服务端配置响应头。

**示例**

服务端设置响应头：
```js
Access-Control-Allow-Origin: https://example.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type
```
前端直接发起请求：
```js
fetch('https://example.com/api/data', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

#### 3.代理服务器
**原理**

通过搭建一个代理服务器，前端将跨域请求发送到同源的代理服务器，再由代理服务器将请求转发到目标服务器。这样浏览器看到的请求是同源的，而实际跨域请求由后端代理实现。

**优缺点：**
- 优点：支持多种 HTTP 请求方法，适合复杂跨域场景。
- 缺点：需要搭建和维护代理服务器。

**示例：**
前端请求 /api/data：
```js
fetch('/api/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```
在本地开发中，可以通过 Webpack 配置代理：
```js
// webpack.config.js
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://example.com',
        changeOrigin: true,
      },
    },
  },
};
```

#### 4. document.domain + iframe 跨域
**原理：**

适用于主域相同、子域不同的场景。通过将 document.domain 设置为相同的主域来实现跨域访问。

**优缺点：**
- 优点：适用于同主域的场景。
- 缺点：只能用于同一主域名下的子域，场景受限。

**示例：**

页面 A（a.example.com）：
```js
document.domain = 'example.com'; // 设置主域
```
页面 B（b.example.com）：
```js
document.domain = 'example.com'; // 设置主域
// 通过 iframe 访问页面 A 的内容
```

#### 5. postMessage 跨域通信
**原理：**

postMessage 是 HTML5 提供的 API，可以安全地实现跨源通信。通过在不同来源的窗口间发送消息。

**优缺点：**
- 优点：安全、灵活，适合多窗口和嵌套 iframe 的场景。
- 缺点：只能用于页面间的数据传递，不能直接跨域请求数据。

**示例：**

父窗口页面：
```js
const iframe = document.getElementById('myIframe');
iframe.contentWindow.postMessage('Hello from parent', 'https://child.example.com');

window.addEventListener('message', (event) => {
  if (event.origin !== 'https://child.example.com') return;
  console.log('收到子页面信息:', event.data);
});
```
子页面（https://child.example.com）：
```js
window.addEventListener('message', (event) => {
  if (event.origin !== 'https://parent.example.com') return;
  console.log('收到父页面信息:', event.data);

  event.source.postMessage('Hello from child', event.origin);
});
```

#### 6. WebSocket 跨域
**原理：**

WebSocket 是一种通信协议，它不受同源策略的限制，可以直接建立跨域连接，实现双向通信。

**优缺点：**
- 优点：适合实时通信场景。
- 缺点：需要 WebSocket 支持，不适合普通 HTTP 请求。

**示例：**
```js
const socket = new WebSocket('wss://example.com/socket');

socket.onopen = () => {
  console.log('WebSocket 连接成功');
};

socket.onmessage = (event) => {
  console.log('收到消息:', event.data);
};
```

#### 7. nginx 反向代理
**原理：**

使用 Nginx 配置反向代理，将跨域请求代理到同源地址，再转发到目标服务器，实现跨域访问。

**优缺点：**
- 优点：实现简单、性能好，适合生产环境。
- 缺点：需要配置服务器。

**示例：**

在 Nginx 配置中添加：
```js
server {
    location /api/ {
        proxy_pass https://example.com/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```