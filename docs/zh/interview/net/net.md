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

## HTTP请求版本和区别
HTTP（Hypertext Transfer Protocol）是互联网中最重要的协议之一，用于客户端和服务器之间的通信。HTTP 经过多次迭代和优化，目前主要有以下几个版本：HTTP/0.9、HTTP/1.0、HTTP/1.1、HTTP/2 和 HTTP/3。每个版本在传输性能、并发性、安全性等方面有所不同。
### 1. HTTP/0.9
**特点：**
- HTTP/0.9 是最早的 HTTP 协议版本，诞生于 1991 年，专注于传输纯文本。
- 无状态：每个请求独立，服务器不保存请求间的状态。
- 仅支持 GET 方法：只能请求资源，无法发送数据。
- 没有 HTTP 头：请求和响应都没有头信息，仅能传输纯文本。

**应用场景：**
- HTTP/0.9 主要用于初期的网页浏览，支持有限的文本传输，不适合现代应用。
### 2. HTTP/1.0
发布时间：1996 年

**特点：**
- 支持多种 HTTP 方法：增加了 POST 和 HEAD 方法，支持更多请求类型。
- 增加了 HTTP 头：客户端和服务器可以通过 HTTP 头传递更多的元信息，如 Content-Type、Content-Length 等。
- 短连接：HTTP/1.0 默认使用短连接，每次请求完成后会关闭连接。为每个请求建立和关闭 TCP 连接的开销较大。

**缺点：**
- 每次请求都需要重新建立连接，效率低，特别是在同一页面包含多个资源（如图片、CSS）时，会导致性能瓶颈。
- 无缓存机制：缺乏明确的缓存控制，不能很好的支持现在web应用的性能需求
- 带宽利用率低：没有引入压缩等机制，数据传输效率较低
### 3. HTTP/1.1
发布时间：1997 年

**特点：**
- 长连接：引入了持久连接机制（Keep-Alive），允许多个请求和响应复用同一个 TCP 连接，减少连接建立的开销。
- 管道化：支持请求管道化（Pipelining），即在同一连接中，客户端可以同时发送多个请求而无需等待响应完成（不过，大多数浏览器并未完全实现此功能）。
- 增加新的 HTTP 方法：支持 PUT、DELETE、OPTIONS 等方法，拓展了 HTTP 的功能。
- 分块传输编码：支持分块传输编码（Chunked Transfer Encoding），在传输大文件或动态生成内容时，服务器可以分块发送数据。
- Host 头：增加了 Host 头，使得同一台服务器可以通过主机名来区分不同的站点，支持虚拟主机的需求。
- 缓存控制：使用Cache-Control和ETag等头自字段更好的支持缓存
- 错误状态码扩展：增加了如206（部分内容）、409（冲突）、410（已删除）等状态码

**缺点：**
- 队头阻塞：虽然支持管道化，但同一个连接上，请求的响应必须按顺序返回，如果前一个请求阻塞，后续请求也会受影响。
- 并发限制：浏览器通常对同一域名的并发请求数量有限（通常为6个），超过限制的请求需要排队。
### 4. HTTP/2
发布时间：2015 年

**特点：**
- 二进制分帧：HTTP/2 采用二进制格式传输数据（而非文本格式），更高效。将请求和响应分解为更小的帧并进行多路复用。每个帧有唯一的流（Stream）ID。
- 多路复用：一个连接可以并发处理多个请求和响应，不会相互阻塞，彻底解决了 HTTP/1.x 中的队头阻塞问题。
#### HTTP/2.0 的多路复用 (Multiplexing)
多路复用是 HTTP/2.0 的核心功能之一，用于解决 HTTP/1.1 中的性能瓶颈问题，例如队头阻塞 (Head-of-line Blocking) 和连接过多的问题。

**多路复用的核心特性**

1.单一连接，多个并发流：
- 在 HTTP/2 中，客户端与服务器之间只需一个 TCP 连接即可并发传输多个请求和响应。
- 每个请求/响应被分成独立的帧，这些帧可以混合在同一个连接中传输。

2.无序传输：
- HTTP/2 使用流 (Stream) 来标识每个请求/响应。即使帧的传输顺序不同，它们仍然可以在接收端根据流的标识符重新组装。

3.双向通信：
- 同一条连接既可以传输客户端的请求，也可以传输服务器的推送 (Server Push) 数据。

4.消除队头阻塞：
- 在 HTTP/1.1 中，浏览器通常会限制每个域名同时发起的 TCP 连接数量（通常是 6 个），超出的请求会被阻塞。
- HTTP/2 的多路复用允许多个流独立传输，避免单个流阻塞其他流的传输。

**HTTP/2 多路复用的原理**

1.帧 (Frame)：
- HTTP/2 将请求和响应的数据分成更小的帧，每个帧附带一个流标识符 (Stream ID)。
- 帧可以属于不同的流，它们可以交错在一起，通过相同的 TCP 连接发送。

2.流 (Stream)：
- 每个请求或响应对应一个流，每个流都有唯一的标识符。
- 流可以独立地打开、关闭和优先级设置。

3.优先级 (Priority)：
- 每个流都可以设置优先级，允许服务器优先传输高优先级的内容，从而优化带宽利用率。

4.二进制协议：
- HTTP/2 使用二进制帧格式，取代了 HTTP/1.1 的文本格式。
- 二进制格式更高效，易于解析，减少了协议层的开销。

5.流控 (Flow Control)：
- HTTP/2 使用窗口更新 (Window Update) 帧来控制流量，确保数据的发送方不会压垮接收方。
- Header 压缩：使用 HPACK 算法对头信息进行压缩，减少传输体积，提升速度。
- 服务器推送：服务器可以在客户端请求之前主动推送资源（如 CSS、JavaScript 文件），减少后续请求延迟。

#### HPACK
静态表
- 静态表是一个预定义、全局共享的头字段集合
- 包含常用的HTTP头字段，如:method , :path , content-type等，最多61个
- 静态表是固定不变的，因此客户端和服务器之间无需传输，直接通过索引访问即可
如：:method:GET 的索引值为2，:authority的索引值为1

动态表
- 动态表是客户端和服务器自维护的一个内存缓冲区，用于存储当前会话的头字段。
- 头字段在动态表中按索引存储，重复出现时可以直接引用索引，而无需再次传输完整的字段。
- 动态表时可修改的，支持添加、更新和删除。

哈夫曼编码
- 哈夫曼编码时一种可变长度的二进制编码方案，用于对头字段的值进行进一步压缩。
- 它根据字符的出现频率分配编码，常见字符使用较短的编码，罕见字符使用较长的编码。

HPACK 的优势

- 减少冗余传输：利用动态表和静态表对重复字段进行索引引用，大幅减少传输的数据量。
- 高效压缩：哈夫曼编码进一步压缩头部数据。
- 带宽节约：尤其在多次请求场景下，动态表复用显著降低了带宽占用。
- 灵活性：动态表和静态表结合，同时支持安全的字段传输。

优点：
- 高性能：多路复用解决了HTTP/1.1的线头阻塞问题，头部压缩减少了宽带占用。
- 减少延迟：不需要为每个请求建立单独的连接，服务器推送提前传输资源，减少请求的等待时间。
- 传输效率高：二进制协议使得传输和解析更加高效。

缺点：
- 虽然 HTTP/2 性能明显提升，但依然基于 TCP 协议。由于 TCP 的握手和重传机制，在高丢包环境下性能会下降。

### 5. HTTP/3
发布时间：2020 年（起草）

特点：
- 基于 QUIC 协议：HTTP/3 采用 QUIC（Quick UDP Internet Connections）协议，基于 UDP 实现的传输层协议，解决了 TCP 的队头阻塞和慢启动问题。
- 减少连接建立时间：QUIC 将 TLS 和握手集成到协议中，支持 0-RTT 和 1-RTT 连接建立，使得连接速度更快。
- 无队头阻塞：HTTP/3 中每个数据流独立传输，即使某个流丢包，也不会影响其他流的传输。
- 更适合移动网络：在移动环境中，QUIC 更快的连接恢复和重传机制减少了因网络切换导致的连接中断。

优点：
- HTTP/3 解决了 TCP 的一些固有问题，如队头阻塞和高丢包时的性能降低。更适合现代 Web 应用，特别是在移动网络和弱网环境下表现优异。

缺点：
- 由于基于 UDP，部分防火墙和网络中间设备可能会对 QUIC 协议造成阻碍。实现和推广仍在进行中。