import{_ as n,c as a,d as e,o as p}from"./app-D0nt0rSp.js";const l={};function t(o,s){return p(),a("div",null,s[0]||(s[0]=[e(`<h1 id="mysql" tabindex="-1"><a class="header-anchor" href="#mysql"><span>Mysql</span></a></h1><h2 id="相关资料" tabindex="-1"><a class="header-anchor" href="#相关资料"><span>相关资料</span></a></h2><p>web server 中最流行的关系型数据库，轻量级，易学易用</p><blockquote><p>下载地址：https://dev.mysql.com/downloads/mysql/</p></blockquote><p>可视化操作客户端：workbench</p><blockquote><p>下载地址：https://dev.mysql.com/downloads/workbench/</p></blockquote><h2 id="数据库操作" tabindex="-1"><a class="header-anchor" href="#数据库操作"><span>数据库操作</span></a></h2><p>1.建库</p><div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql" data-title="sql"><pre><code><span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">SCHEMA</span> <span class="token identifier"><span class="token punctuation">\`</span>myblog<span class="token punctuation">\`</span></span> </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>2.建表</p><div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql" data-title="sql"><pre><code><span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token identifier"><span class="token punctuation">\`</span>myblog<span class="token punctuation">\`</span></span><span class="token punctuation">.</span><span class="token identifier"><span class="token punctuation">\`</span>users<span class="token punctuation">\`</span></span> <span class="token punctuation">(</span></span>
<span class="line">  <span class="token identifier"><span class="token punctuation">\`</span>id<span class="token punctuation">\`</span></span> <span class="token keyword">INT</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">AUTO_INCREMENT</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token identifier"><span class="token punctuation">\`</span>username<span class="token punctuation">\`</span></span> <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token identifier"><span class="token punctuation">\`</span>password<span class="token punctuation">\`</span></span> <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token identifier"><span class="token punctuation">\`</span>realname<span class="token punctuation">\`</span></span> <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">\`</span>id<span class="token punctuation">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3.操作表</p><div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql" data-title="sql"><pre><code><span class="line"><span class="token keyword">use</span> myblog<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- show tables;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 增加一条数据</span></span>
<span class="line"><span class="token keyword">insert</span> <span class="token keyword">into</span> users <span class="token punctuation">(</span>username<span class="token punctuation">,</span> <span class="token identifier"><span class="token punctuation">\`</span>password<span class="token punctuation">\`</span></span><span class="token punctuation">,</span> realname<span class="token punctuation">)</span> <span class="token keyword">values</span><span class="token punctuation">(</span><span class="token string">&#39;lisi&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;123&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;李四&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 查询表中所有内容</span></span>
<span class="line"><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> users<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 指定条件查询 users 表</span></span>
<span class="line"><span class="token keyword">select</span> id<span class="token punctuation">,</span> username <span class="token keyword">from</span> users<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 查询 users 表中 username 是 zhangsan 并且 password 是 123 的数据（ password 是关键字，用\`\`表示表中的列名）</span></span>
<span class="line"><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> users <span class="token keyword">where</span> username<span class="token operator">=</span><span class="token string">&#39;zhangsan&#39;</span> <span class="token operator">and</span> <span class="token identifier"><span class="token punctuation">\`</span>password<span class="token punctuation">\`</span></span><span class="token operator">=</span><span class="token string">&#39;123&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 模糊查询</span></span>
<span class="line"><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> users <span class="token keyword">where</span> username <span class="token operator">like</span> <span class="token string">&#39;%zhang%&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 排序 desc（逆序）</span></span>
<span class="line"><span class="token keyword">select</span><span class="token operator">*</span><span class="token keyword">from</span> users <span class="token keyword">where</span> password <span class="token operator">like</span> <span class="token string">&#39;%1%&#39;</span> <span class="token keyword">order</span> <span class="token keyword">by</span> id <span class="token keyword">desc</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 更新</span></span>
<span class="line"><span class="token keyword">update</span> users <span class="token keyword">set</span> realname<span class="token operator">=</span><span class="token string">&#39;李四2&#39;</span> <span class="token keyword">where</span> username<span class="token operator">=</span><span class="token string">&#39;lisi&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 删除</span></span>
<span class="line"><span class="token keyword">delete</span> <span class="token keyword">from</span> users <span class="token keyword">where</span> username<span class="token operator">=</span><span class="token string">&#39;lisi&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 软删除</span></span>
<span class="line"><span class="token keyword">select</span><span class="token operator">*</span><span class="token keyword">from</span> users <span class="token keyword">where</span> state<span class="token operator">=</span><span class="token string">&#39;1&#39;</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token comment">-- 查询 state 不为 0</span></span>
<span class="line"><span class="token keyword">select</span><span class="token operator">*</span><span class="token keyword">from</span> users <span class="token keyword">where</span> state <span class="token operator">&lt;&gt;</span> <span class="token string">&#39;0&#39;</span><span class="token punctuation">;</span> </span>
<span class="line"><span class="token keyword">update</span> users <span class="token keyword">set</span> state<span class="token operator">=</span><span class="token string">&#39;0&#39;</span> <span class="token keyword">where</span> username<span class="token operator">=</span><span class="token string">&#39;lisi&#39;</span><span class="token punctuation">;</span> <span class="token comment">-- 软删除</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- insert into blogs (title, content, createtime, author) values (&#39;标题A&#39;, &#39;内容A&#39;, 1679663796796, &#39;zhangsan&#39;);</span></span>
<span class="line"><span class="token comment">-- insert into blogs (title, content, createtime, author) values (&#39;标题B&#39;, &#39;内容B&#39;, 1679663870058, &#39;lisi&#39;);</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- select*from blogs order by createtime desc;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 查询 mysql 版本号</span></span>
<span class="line"><span class="token keyword">select</span> version<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 联表查询</span></span>
<span class="line"><span class="token keyword">select</span> blogs<span class="token punctuation">.</span><span class="token operator">*</span> <span class="token punctuation">,</span> users<span class="token punctuation">.</span>username<span class="token punctuation">,</span> users<span class="token punctuation">.</span>nickname</span>
<span class="line"><span class="token keyword">from</span> blogs <span class="token keyword">inner</span> <span class="token keyword">join</span> users <span class="token keyword">on</span> users<span class="token punctuation">.</span>id <span class="token operator">=</span> blogs<span class="token punctuation">.</span>userid</span>
<span class="line"><span class="token keyword">where</span> users<span class="token punctuation">.</span>username <span class="token operator">=</span> <span class="token string">&#39;zhangsan&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="node-连接-mysql" tabindex="-1"><a class="header-anchor" href="#node-连接-mysql"><span>node 连接 mysql</span></a></h2><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token keyword">const</span> mysql <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;mysql&#39;</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 创建连接对象</span></span>
<span class="line"><span class="token keyword">const</span> con <span class="token operator">=</span> mysql<span class="token punctuation">.</span><span class="token function">createConnection</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">host</span><span class="token operator">:</span> <span class="token string">&#39;localhost&#39;</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">user</span><span class="token operator">:</span> <span class="token string">&#39;root&#39;</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">password</span><span class="token operator">:</span> <span class="token string">&#39;rr3262678&#39;</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">port</span><span class="token operator">:</span> <span class="token string">&#39;3306&#39;</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">database</span><span class="token operator">:</span> <span class="token string">&#39;myblog&#39;</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 开始连接</span></span>
<span class="line">con<span class="token punctuation">.</span><span class="token function">connect</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 执行 sql 语句</span></span>
<span class="line"><span class="token keyword">const</span> sql <span class="token operator">=</span> <span class="token string">&#39;select * from users;&#39;</span></span>
<span class="line">con<span class="token punctuation">.</span><span class="token function">query</span><span class="token punctuation">(</span>sql<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> result</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">return</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 关闭</span></span>
<span class="line">con<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 连接问题</span></span>
<span class="line">  <span class="token literal-property property">errno</span><span class="token operator">:</span> <span class="token number">1251</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">sqlMessage</span><span class="token operator">:</span> <span class="token string">&#39;Client does not support authentication protocol requested by server; consider upgrading MySQL client&#39;</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">sqlState</span><span class="token operator">:</span> <span class="token string">&#39;08004&#39;</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">fatal</span><span class="token operator">:</span> <span class="token boolean">true</span></span>
<span class="line"><span class="token comment">// 解决方案</span></span>
<span class="line">mysql<span class="token operator">&gt;</span> alter user <span class="token string">&#39;root&#39;</span>@<span class="token string">&#39;localhost&#39;</span> identified <span class="token keyword">with</span> mysql_native_password by <span class="token string">&#39;自己的密码&#39;</span><span class="token punctuation">;</span></span>
<span class="line">mysql<span class="token operator">&gt;</span> flush privileges<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,15)]))}const i=n(l,[["render",t],["__file","base.html.vue"]]),r=JSON.parse('{"path":"/zh/node/mysql/base.html","title":"Mysql","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"相关资料","slug":"相关资料","link":"#相关资料","children":[]},{"level":2,"title":"数据库操作","slug":"数据库操作","link":"#数据库操作","children":[]},{"level":2,"title":"node 连接 mysql","slug":"node-连接-mysql","link":"#node-连接-mysql","children":[]}],"git":{"updatedTime":1736852909000,"contributors":[{"name":"zhan_zhang","username":"zhan_zhang","email":"18311292602@163.com","commits":1,"url":"https://github.com/zhan_zhang"}]},"filePathRelative":"zh/node/mysql/base.md"}');export{i as comp,r as data};