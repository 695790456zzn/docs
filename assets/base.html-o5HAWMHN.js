import{_ as s,c as a,d as p,o as e}from"./app-hG96JMTt.js";const t={};function o(l,n){return e(),a("div",null,n[0]||(n[0]=[p(`<h1 id="node基本使用" tabindex="-1"><a class="header-anchor" href="#node基本使用"><span>node基本使用</span></a></h1><h2 id="node-js-和-js-的区别" tabindex="-1"><a class="header-anchor" href="#node-js-和-js-的区别"><span>Node.js 和 JS 的区别</span></a></h2><ul><li>JS：遵循ES语法规范，结合Web-API，可以操作DOM、BOM、Ajax等</li><li>node.js：遵循ES语法规范，结合node-API</li></ul><h2 id="cookie-和-session" tabindex="-1"><a class="header-anchor" href="#cookie-和-session"><span>cookie 和 session</span></a></h2><h3 id="cookie" tabindex="-1"><a class="header-anchor" href="#cookie"><span>cookie</span></a></h3><p>什么是cookie</p><ul><li>存储在浏览器的一段字符串（最大5kb）</li><li>跨域不共享</li><li>格式如：k1=v1; k2=v2; k3=v3; 因此可以存储结构化数据</li><li>每次发送http请求，会将请求域的cookie一起发送给server</li><li>server端可以修改cookie并返回给浏览器</li><li>浏览器中也可以通过js修改cookie</li></ul><p>客户端查看cookie的三种方式：</p><ul><li><p>在检查工具中的network的请求的headers中查看</p></li><li><p>在Application中查看Cookies</p></li><li><p>在控制台中document.cookie查看</p></li><li><p>修改方式</p><p>document.cookie 进行累加</p><p>server端nodejs操作cookie</p></li></ul><p>查看cookie</p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token comment">// 解析cookie，将cookie转换为对象</span></span>
<span class="line">req<span class="token punctuation">.</span>cookie <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span>
<span class="line"><span class="token keyword">const</span> cookieStr <span class="token operator">=</span> req<span class="token punctuation">.</span>header<span class="token punctuation">.</span>cookie <span class="token operator">||</span> <span class="token string">&#39;&#39;</span></span>
<span class="line">cookieStr<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&#39;;&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">item</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>item<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span>    </span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">const</span> arr <span class="token operator">=</span> item<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&#39;=&#39;</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">const</span> key <span class="token operator">=</span> arr<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span></span>
<span class="line">    <span class="token keyword">const</span> val <span class="token operator">=</span> arr<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span></span>
<span class="line">    req<span class="token punctuation">.</span>cookie<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> val</span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>操作 cookie</p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line">res<span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token string">&#39;Set-cookie&#39;</span><span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">username=</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>data<span class="token punctuation">.</span>username<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">; path=/; httpOnly; expires=</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token function">getCookieExpires</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="session" tabindex="-1"><a class="header-anchor" href="#session"><span>session</span></a></h3><p>用cookie登录存在的问题</p><ul><li>cookie会暴露username，很危险</li><li>cookie存储有限</li></ul><p>解决方案（session：server端存储用户信息）：cookie中存储 userid， server 端对应 username</p><h2 id="cors" tabindex="-1"><a class="header-anchor" href="#cors"><span>CORS</span></a></h2><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token comment">// 允许跨域传递cookie</span></span>
<span class="line">res<span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token string">&#39;Access-Control-Allow-Credentials&#39;</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token comment">// 允许跨域的 origin，*代表所有的</span></span>
<span class="line">res<span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token string">&#39;Access-Control-Allow-Origin&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;*&#39;</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token comment">// 允许单个来源， 可以通过前端js location.origin 获取</span></span>
<span class="line">res<span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token string">&#39;Access-Control-Allow-Origin&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;http://localhost:8001&#39;</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token comment">// 允许的方法</span></span>
<span class="line">res<span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token string">&#39;Access-Control-Allow-Methods&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;GET, POST, OPTIONS, PUT, PATCH, DELETE&#39;</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// express、koa2</span></span>
<span class="line">app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span></span>
<span class="line">    <span class="token function">cors</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">        <span class="token literal-property property">origin</span><span class="token operator">:</span> <span class="token string">&#39;*&#39;</span> <span class="token comment">// 或设置单个 origin    </span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="日志" tabindex="-1"><a class="header-anchor" href="#日志"><span>日志</span></a></h2><h3 id="文件操作" tabindex="-1"><a class="header-anchor" href="#文件操作"><span>文件操作</span></a></h3><p>nodejs stream</p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token comment">// 基本使用</span></span>
<span class="line"><span class="token comment">// 读取文件内容</span></span>
<span class="line">fs<span class="token punctuation">.</span><span class="token function">readFile</span><span class="token punctuation">(</span>fileName<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> data</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">return</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment">// data 是二进制类型，需要转换为字符串</span></span>
<span class="line">  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 写入文件</span></span>
<span class="line"><span class="token keyword">const</span> content <span class="token operator">=</span> <span class="token string">&#39;这是新写入的内容\\n&#39;</span></span>
<span class="line"><span class="token keyword">const</span> opt <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">flag</span><span class="token operator">:</span> <span class="token string">&#39;a&#39;</span> <span class="token comment">// 追加写入。覆盖用 &#39;w&#39;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line">fs<span class="token punctuation">.</span><span class="token function">writeFile</span><span class="token punctuation">(</span>fileName<span class="token punctuation">,</span> content<span class="token punctuation">,</span> opt<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 判断文件是否存在</span></span>
<span class="line">fs<span class="token punctuation">.</span><span class="token function">exists</span><span class="token punctuation">(</span>fileName<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">exist</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span></span>
<span class="line">  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;exist&#39;</span><span class="token punctuation">,</span> exist<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="io操作" tabindex="-1"><a class="header-anchor" href="#io操作"><span>IO操作</span></a></h3><p>IO操作的性能瓶颈：</p><ul><li>IO包括网络IO和文件IO</li><li>相比于CPU计算和内存读写，IO的特点就是慢</li></ul><p>stream：</p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token comment">// 复制文件</span></span>
<span class="line"><span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;fs&#39;</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;path&#39;</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> fileName1 <span class="token operator">=</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">&#39;data.txt&#39;</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">const</span> fileName2 <span class="token operator">=</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">&#39;data-bak.txt&#39;</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> readStream <span class="token operator">=</span> fs<span class="token punctuation">.</span><span class="token function">createReadStream</span><span class="token punctuation">(</span>fileName1<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">const</span> writeStream <span class="token operator">=</span> fs<span class="token punctuation">.</span><span class="token function">createWriteStream</span><span class="token punctuation">(</span>fileName2<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">readStream<span class="token punctuation">.</span><span class="token function">pipe</span><span class="token punctuation">(</span>writeStream<span class="token punctuation">)</span></span>
<span class="line">readStream<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">&#39;data&#39;</span><span class="token punctuation">,</span> <span class="token parameter">chunk</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span></span>
<span class="line">  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>chunk<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line">readStream<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">&#39;end&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span></span>
<span class="line">  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;copy done&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,28)]))}const i=s(t,[["render",o],["__file","base.html.vue"]]),u=JSON.parse('{"path":"/zh/node/node/base.html","title":"node基本使用","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"Node.js 和 JS 的区别","slug":"node-js-和-js-的区别","link":"#node-js-和-js-的区别","children":[]},{"level":2,"title":"cookie 和 session","slug":"cookie-和-session","link":"#cookie-和-session","children":[{"level":3,"title":"cookie","slug":"cookie","link":"#cookie","children":[]},{"level":3,"title":"session","slug":"session","link":"#session","children":[]}]},{"level":2,"title":"CORS","slug":"cors","link":"#cors","children":[]},{"level":2,"title":"日志","slug":"日志","link":"#日志","children":[{"level":3,"title":"文件操作","slug":"文件操作","link":"#文件操作","children":[]},{"level":3,"title":"IO操作","slug":"io操作","link":"#io操作","children":[]}]}],"git":{"updatedTime":1736852909000,"contributors":[{"name":"zhan_zhang","username":"zhan_zhang","email":"18311292602@163.com","commits":2,"url":"https://github.com/zhan_zhang"}]},"filePathRelative":"zh/node/node/base.md"}');export{i as comp,u as data};