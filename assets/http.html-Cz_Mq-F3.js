import{_ as l,c as t,d as i,o as a}from"./app-D0nt0rSp.js";const s="/docs/images/net/cache1.png",h="/docs/images/net/cache2.png",n="/docs/images/net/cache3.png",p="/docs/images/net/cache4.png",r="/docs/images/net/cache-flow.png",c="/docs/images/net/http-secret.png",d={};function o(u,e){return a(),t("div",null,e[0]||(e[0]=[i('<h1 id="http" tabindex="-1"><a class="header-anchor" href="#http"><span>HTTP</span></a></h1><h2 id="http-状态码" tabindex="-1"><a class="header-anchor" href="#http-状态码"><span>http 状态码</span></a></h2><h3 id="状态码分类" tabindex="-1"><a class="header-anchor" href="#状态码分类"><span>状态码分类</span></a></h3><ul><li>1xx - 服务器收到请求</li><li>2xx - 请求成功，如 200</li><li>3xx - 重定向，如 302</li><li>4xx - 客户端错误，如 404</li><li>5xx - 服务端错误，如500</li></ul><h3 id="常见状态码" tabindex="-1"><a class="header-anchor" href="#常见状态码"><span>常见状态码</span></a></h3><ul><li>200 - 成功</li><li>301 - 永久重定向（场景：域名到期，老域名返回301，下次再访问，直接访问新地址）</li><li>302 - 临时重定向（下次再访问，仍然访问老地址，返回302和location（重定向跳转的地址））</li><li>304 - 资源未被修改</li><li>401 - 未授权</li><li>404 - 资源未找到</li><li>403 - 没有权限</li><li>500 - 服务器错误</li><li>504 - 网关超时</li></ul><h2 id="restful-api" tabindex="-1"><a class="header-anchor" href="#restful-api"><span>Restful API</span></a></h2><ul><li>传统 API 设计：把每个 url 当作一个功能</li><li>Restful API 设计：把每个 url 当作一个唯一的资源 <ul><li>尽量不用url参数 <ul><li>传统API设计：/api/list?pageIndex=2</li><li>Restful API设计：/api/list/2</li></ul></li><li>使用method表示操作类型 <ul><li>传统 API 设计： <ul><li>post请求： /api/create-blog</li><li>post请求: /api/update-blog?id=100</li><li>get请求:/api/get-blog?id=100</li></ul></li><li>Restful API设计： <ul><li>post请求：/api/blog</li><li>patch请求：/api/blog/100</li><li>get请求: /api/blog/100</li></ul></li></ul></li></ul></li></ul><h2 id="http-headers" tabindex="-1"><a class="header-anchor" href="#http-headers"><span>http headers</span></a></h2><h3 id="常见的-request-headers" tabindex="-1"><a class="header-anchor" href="#常见的-request-headers"><span>常见的 Request Headers</span></a></h3><ul><li>Accept 浏览器可接收的数据格式</li><li>Accept-Encoding 浏览器可接收的压缩算法，如 gzip</li><li>Accept-Languange 浏览器可接收的语言，如 zh-CN</li><li>Connection keep-alive 一次 TCP 连接重复使用</li><li>cookie</li><li>Host 请求域名</li><li>User-Agent （简称 UA ）浏览器信息</li></ul><h3 id="常见的-response-headers" tabindex="-1"><a class="header-anchor" href="#常见的-response-headers"><span>常见的 Response Headers</span></a></h3><ul><li>Content-type 发送数据的格式，如 application / json</li><li>Content-length 返回数据的大小，多少字节</li><li>Content-Encoding 返回数据的压缩算法，如 gzip</li><li>set-cookie</li></ul><h2 id="http-缓存" tabindex="-1"><a class="header-anchor" href="#http-缓存"><span>http 缓存</span></a></h2><h3 id="什么是缓存" tabindex="-1"><a class="header-anchor" href="#什么是缓存"><span>什么是缓存</span></a></h3><p>把一些没有必要重复获取的数据存起来（让页面加载更快）</p><p>哪些资源可以被缓存--静态资源（js、css、img）</p><h3 id="强制缓存" tabindex="-1"><a class="header-anchor" href="#强制缓存"><span>强制缓存</span></a></h3><p>例如：（稳定库：jQuery、lodash）</p><p>初次请求，如果服务端感觉资源可以被缓存，就会加上 Cache-Control ，如果服务端感觉资源不可以被缓存，就不会加上 Cache-Control。有 Cache-Control 客户端就会将资源缓存起来。</p><p>cache-control（在 Response Headers 中）的值：</p><ul><li>max-age：秒级的最大过期时间</li><li>no-cache：不使用强制缓存，正常向服务器端去请求</li><li>no-store：不使用本地缓存，而且不使用服务器端的一些缓存措施（强制缓存或者协商缓存）</li><li>private：只允许最终用户做缓存</li><li>public：允许中间路由或者代理做缓存</li></ul><p>Expires (被 cache-control 代替)</p><p><img src="'+s+'" alt="http强制缓存"><img src="'+h+'" alt="http强制缓存"></p><h3 id="协商-对比-缓存" tabindex="-1"><a class="header-anchor" href="#协商-对比-缓存"><span>协商（对比）缓存</span></a></h3><p>标识：</p><ul><li>Last-Modified 资源的最后修改时间</li><li>Etag 资源的唯一标识（一个字符串，类似人类的指纹）</li></ul><p><img src="'+n+'" alt="http协商缓存"><img src="'+p+'" alt="http协商缓存"></p><p>Last-Modified 和 Etag，会优先使用 Etag，Last-Modified 只能精确到妙级，如果资源被重复生成，而内容不变，则 Etag 更精确</p><h3 id="缓存整体流程" tabindex="-1"><a class="header-anchor" href="#缓存整体流程"><span>缓存整体流程</span></a></h3><p><img src="'+r+'" alt="缓存整体流程"></p><h3 id="刷新页面对缓存对影响" tabindex="-1"><a class="header-anchor" href="#刷新页面对缓存对影响"><span>刷新页面对缓存对影响</span></a></h3><ul><li>正常操作：地址栏输入 url ，跳转链接，前进后退等； 强制缓存有效，协商缓存有效</li><li>手动刷新：F5 ，点击刷新按钮，点击菜单刷新； 强制缓存失效，协商缓存有效</li><li>强制刷新： 强制缓存失效，协商缓存失效</li></ul><h2 id="https-加密方式" tabindex="-1"><a class="header-anchor" href="#https-加密方式"><span>https - 加密方式</span></a></h2><h3 id="http-和-https" tabindex="-1"><a class="header-anchor" href="#http-和-https"><span>http 和 https</span></a></h3><ul><li>http 是明文传输，敏感信息容易被中间劫持</li><li>https = http + 加密，劫持了也无法解密</li><li>现在浏览器已开始强制 https 协议</li></ul><h3 id="加密方式" tabindex="-1"><a class="header-anchor" href="#加密方式"><span>加密方式</span></a></h3><ul><li>对称加密：一个 key 负责加密和解密（服务端把 key 传递给客户端）</li><li>非对称加密：一对 key，A 加密之后，只能用 B 解密（服务端维护publicKey和privateKey，服务端把publicKey传递给客户端，客户端使用publicKey加密传输内容，服务端使用privateKey解密）</li></ul><h3 id="https-证书" tabindex="-1"><a class="header-anchor" href="#https-证书"><span>https 证书</span></a></h3><p><img src="'+c+'" alt="HTTPS加密方式"></p>',40)]))}const f=l(d,[["render",o],["__file","http.html.vue"]]),m=JSON.parse('{"path":"/zh/net/http.html","title":"HTTP","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"http 状态码","slug":"http-状态码","link":"#http-状态码","children":[{"level":3,"title":"状态码分类","slug":"状态码分类","link":"#状态码分类","children":[]},{"level":3,"title":"常见状态码","slug":"常见状态码","link":"#常见状态码","children":[]}]},{"level":2,"title":"Restful API","slug":"restful-api","link":"#restful-api","children":[]},{"level":2,"title":"http headers","slug":"http-headers","link":"#http-headers","children":[{"level":3,"title":"常见的 Request Headers","slug":"常见的-request-headers","link":"#常见的-request-headers","children":[]},{"level":3,"title":"常见的 Response Headers","slug":"常见的-response-headers","link":"#常见的-response-headers","children":[]}]},{"level":2,"title":"http 缓存","slug":"http-缓存","link":"#http-缓存","children":[{"level":3,"title":"什么是缓存","slug":"什么是缓存","link":"#什么是缓存","children":[]},{"level":3,"title":"强制缓存","slug":"强制缓存","link":"#强制缓存","children":[]},{"level":3,"title":"协商（对比）缓存","slug":"协商-对比-缓存","link":"#协商-对比-缓存","children":[]},{"level":3,"title":"缓存整体流程","slug":"缓存整体流程","link":"#缓存整体流程","children":[]},{"level":3,"title":"刷新页面对缓存对影响","slug":"刷新页面对缓存对影响","link":"#刷新页面对缓存对影响","children":[]}]},{"level":2,"title":"https - 加密方式","slug":"https-加密方式","link":"#https-加密方式","children":[{"level":3,"title":"http 和 https","slug":"http-和-https","link":"#http-和-https","children":[]},{"level":3,"title":"加密方式","slug":"加密方式","link":"#加密方式","children":[]},{"level":3,"title":"https 证书","slug":"https-证书","link":"#https-证书","children":[]}]}],"git":{"updatedTime":1736862884000,"contributors":[{"name":"zhan_zhang","username":"zhan_zhang","email":"18311292602@163.com","commits":1,"url":"https://github.com/zhan_zhang"}]},"filePathRelative":"zh/net/http.md"}');export{f as comp,m as data};