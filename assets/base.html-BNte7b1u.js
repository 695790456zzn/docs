import{_ as s,c as a,d as e,o as p}from"./app-hG96JMTt.js";const t={};function l(i,n){return p(),a("div",null,n[0]||(n[0]=[e(`<h1 id="nest" tabindex="-1"><a class="header-anchor" href="#nest"><span>nest</span></a></h1><p><a href="https://nestjs.com/" target="_blank" rel="noopener noreferrer">官网</a><a href="https://docs.nestjs.cn/" target="_blank" rel="noopener noreferrer">中文网站</a><a href="https://github.com/nestjs/nest" target="_blank" rel="noopener noreferrer">GitHub</a></p><h2 id="核心概念" tabindex="-1"><a class="header-anchor" href="#核心概念"><span>核心概念</span></a></h2><ul><li>模块：module</li><li>控制器：controller</li><li>服务： service</li></ul><h2 id="环境搭建" tabindex="-1"><a class="header-anchor" href="#环境搭建"><span>环境搭建</span></a></h2><p>安装nest cli</p><blockquote><p>npm i -g @nest/cli</p></blockquote><p>使用 Nest CLI 创建项目</p><blockquote><p>nest new nestdemo</p></blockquote><h2 id="基本使用" tabindex="-1"><a class="header-anchor" href="#基本使用"><span>基本使用</span></a></h2><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token comment">// 创建模块</span></span>
<span class="line">nest g module blog</span>
<span class="line"></span>
<span class="line"><span class="token comment">// 创建 controller</span></span>
<span class="line">nest g controller blog</span>
<span class="line"><span class="token comment">// 创建不带测试文件的 controller</span></span>
<span class="line">nest g controller <span class="token operator">--</span>no<span class="token operator">-</span>spec</span>
<span class="line"></span>
<span class="line"><span class="token comment">// 创建拦截器（配置统一的正确的返回格式）{ errno, data, message }</span></span>
<span class="line">nest g interceptor transform</span>
<span class="line"></span>
<span class="line"><span class="token comment">// 创建拦截器（配置统一的错误的返回格式）</span></span>
<span class="line">nest g filter http<span class="token operator">-</span>exception</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="路由" tabindex="-1"><a class="header-anchor" href="#路由"><span>路由</span></a></h2><p>Nestjs 中没有单独配置路由的地方。定义好控制器后 nestjs 会自动给我们配置对应的路由。</p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span>Controller<span class="token punctuation">,</span> Get<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@nestjs/common&#39;</span></span>
<span class="line"></span>
<span class="line">@<span class="token function">Controller</span><span class="token punctuation">(</span><span class="token string">&#39;article&#39;</span><span class="token punctuation">)</span> </span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">ArticleController</span> <span class="token punctuation">{</span></span>
<span class="line">    @<span class="token function">Get</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token function">index</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> string <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token string">&#39;这是 article 里面的 index&#39;</span>    </span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    @<span class="token function">Get</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> string <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token string">&#39;这是 article 里面的 index&#39;</span>    </span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关于 nest 的 return ：当请求处理程序返回对象或数组时，它将自动序列化为 JSON。但是，当它返回一个字符串时，Nest 将只发送一个字符串而不是序列化它。这使响应请求处理变得简单：只需要返回值，Nest 负责其余部分。</p><h2 id="请求方法" tabindex="-1"><a class="header-anchor" href="#请求方法"><span>请求方法</span></a></h2><h3 id="get、post请求" tabindex="-1"><a class="header-anchor" href="#get、post请求"><span>Get、Post请求</span></a></h3><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span>Controller<span class="token punctuation">,</span> Get<span class="token punctuation">,</span> Post<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@nestjs/common&#39;</span></span>
<span class="line"></span>
<span class="line">@<span class="token function">Controller</span><span class="token punctuation">(</span><span class="token string">&#39;cats&#39;</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">CatsController</span> <span class="token punctuation">{</span></span>
<span class="line">    @<span class="token function">Post</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> string <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token string">&#39;This action adds a new cat&#39;</span>    </span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    @<span class="token function">Get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> </span>
<span class="line">    <span class="token function">findAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> string <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token string">&#39;This action returns all cats&#39;</span>    </span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>nestjs 也提供了其他HTTP请求方法的装饰器 @Put()、@Delete()、@Patch()、@Options()、@Head() 和 @All()</p><h3 id="nestjs-中获取请求参数" tabindex="-1"><a class="header-anchor" href="#nestjs-中获取请求参数"><span>Nestjs 中获取请求参数</span></a></h3><p>在 Nestjs 中获取 Get 传值或者 Post 提交的数据的话可以使用 Nestjs 中的装饰器来获取</p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line">@<span class="token function">Request</span><span class="token punctuation">(</span><span class="token punctuation">)</span>                req</span>
<span class="line">@<span class="token function">Response</span><span class="token punctuation">(</span><span class="token punctuation">)</span>               res</span>
<span class="line">@<span class="token function">Next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>                   next</span>
<span class="line">@<span class="token function">Session</span><span class="token punctuation">(</span><span class="token punctuation">)</span>                req<span class="token punctuation">.</span>session</span>
<span class="line">@<span class="token function">Param</span><span class="token punctuation">(</span>key<span class="token operator">?</span><span class="token operator">:</span> string<span class="token punctuation">)</span>      req<span class="token punctuation">.</span>params</span>
<span class="line">@<span class="token function">Body</span><span class="token punctuation">(</span>key<span class="token operator">?</span><span class="token operator">:</span> string<span class="token punctuation">)</span>       req<span class="token punctuation">.</span>body</span>
<span class="line">@<span class="token function">Query</span><span class="token punctuation">(</span>key<span class="token operator">?</span> string<span class="token punctuation">)</span>       req<span class="token punctuation">.</span>query</span>
<span class="line">@<span class="token function">Headers</span><span class="token punctuation">(</span>name<span class="token operator">?</span><span class="token operator">:</span> string<span class="token punctuation">)</span>   req<span class="token punctuation">.</span>headers</span>
<span class="line"></span>
<span class="line"><span class="token comment">// 例</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span>Controller<span class="token punctuation">,</span> Get<span class="token punctuation">,</span> Post<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@nestjs/common&#39;</span></span>
<span class="line">@<span class="token function">Controller</span><span class="token punctuation">(</span><span class="token string">&#39;news&#39;</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">NewsController</span> <span class="token punctuation">{</span></span>
<span class="line">    @<span class="token function">Get</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token function">getAbout</span><span class="token punctuation">(</span>@<span class="token function">Query</span><span class="token punctuation">(</span><span class="token punctuation">)</span> query<span class="token punctuation">)</span><span class="token operator">:</span> string <span class="token punctuation">{</span></span>
<span class="line">        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>query<span class="token punctuation">)</span> <span class="token comment">// 这里获取的就是所有 Get 传值</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token string">&#39;这是 about&#39;</span>    </span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    @<span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">&#39;list&#39;</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token function">getNews</span><span class="token punctuation">(</span>@<span class="token function">Query</span><span class="token punctuation">(</span><span class="token string">&#39;id&#39;</span><span class="token punctuation">)</span> query<span class="token punctuation">)</span><span class="token operator">:</span> string <span class="token punctuation">{</span></span>
<span class="line">        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>query<span class="token punctuation">)</span> <span class="token comment">// 这里获取的就是 Get传值里面的id的值</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token string">&#39;这是新闻&#39;</span>    </span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    @<span class="token function">Post</span><span class="token punctuation">(</span><span class="token string">&#39;doAdd&#39;</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">async</span> <span class="token function">addNews</span><span class="token punctuation">(</span><span class="token parameter">@<span class="token function">Body</span><span class="token punctuation">(</span><span class="token punctuation">)</span> newsDate</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>newsData<span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token string">&#39;增加新闻&#39;</span>    </span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="动态路由" tabindex="-1"><a class="header-anchor" href="#动态路由"><span>动态路由</span></a></h3><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line">@<span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">&quot;:id&quot;</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token function">findOne</span><span class="token punctuation">(</span>@<span class="token function">Param</span><span class="token punctuation">(</span><span class="token punctuation">)</span> params<span class="token punctuation">)</span><span class="token operator">:</span> string <span class="token punctuation">{</span></span>
<span class="line">    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>params<span class="token punctuation">.</span>id<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">This action returns a #</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>params<span class="token punctuation">.</span>id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> cat</span><span class="token template-punctuation string">\`</span></span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="nest-js连接-mysql-数据库" tabindex="-1"><a class="header-anchor" href="#nest-js连接-mysql-数据库"><span>Nest.js连接 MySQL 数据库</span></a></h2><p>使用 typeorm 并连接数据库</p><blockquote><p>npm install --save @nestjs/typeorm typeorm mysql2</p></blockquote><p>创建 service</p><blockquote><p>nest g service blog --no-spec</p></blockquote><h4 id="vscode按nestjs规则格式化-保存自动格式化" tabindex="-1"><a class="header-anchor" href="#vscode按nestjs规则格式化-保存自动格式化"><span>vscode按nestjs规则格式化（保存自动格式化）</span></a></h4><p>在Visual Studio Code中，要保存文件时自动格式化为满足NestJS规范，你需要安装一个插件，比如Prettier - Code formatter和ESLint。</p><p>步骤如下：</p><p>1.打开VS Code。 2.打开扩展视图（快捷键Ctrl + Shift + X）。 3.搜索并安装</p><p>Prettier - Code formatter和ESLint。</p><p>4.重新加载窗口（可选，可以让扩展生效）。 5.根据需要配置 .prettierrc 和 .eslintrc 文件。</p><p>这样，每次保存文件时，VS Code会自动使用Prettier进行格式化，并根据ESLint的配置检查代码符不符合NestJS的规范。 示例.prettierrc配置：</p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token punctuation">{</span>  </span>
<span class="line">    <span class="token string-property property">&quot;singleQuote&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> </span>
<span class="line">    <span class="token string-property property">&quot;trailingComma&quot;</span><span class="token operator">:</span> <span class="token string">&quot;es5&quot;</span><span class="token punctuation">,</span>  </span>
<span class="line">    <span class="token string-property property">&quot;printWidth&quot;</span><span class="token operator">:</span> <span class="token number">80</span><span class="token punctuation">,</span>  </span>
<span class="line">    <span class="token string-property property">&quot;tabWidth&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>  </span>
<span class="line">    <span class="token string-property property">&quot;semi&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>  </span>
<span class="line">    <span class="token string-property property">&quot;arrowParens&quot;</span><span class="token operator">:</span> <span class="token string">&quot;avoid&quot;</span></span>
<span class="line"> <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>示例.eslintrc配置（使用了NestJS的推荐配置）：</p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token punctuation">{</span>  </span>
<span class="line">    <span class="token string-property property">&quot;parser&quot;</span><span class="token operator">:</span> <span class="token string">&quot;@typescript-eslint/parser&quot;</span><span class="token punctuation">,</span>  </span>
<span class="line">    <span class="token string-property property">&quot;plugins&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;@nestjs&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>  </span>
<span class="line">    <span class="token string-property property">&quot;extends&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>    </span>
<span class="line">        <span class="token string">&quot;plugin:@typescript-eslint/recommended&quot;</span><span class="token punctuation">,</span>    </span>
<span class="line">        <span class="token string">&quot;plugin:@typescript-eslint/recommended-requiring-type-checking&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">&quot;prettier/@typescript-eslint&quot;</span><span class="token punctuation">,</span>    </span>
<span class="line">        <span class="token string">&quot;plugin:prettier/recommended&quot;</span><span class="token punctuation">,</span>    </span>
<span class="line">        <span class="token string">&quot;plugin:@nestjs/recommended&quot;</span>  </span>
<span class="line">     <span class="token punctuation">]</span><span class="token punctuation">,</span>  </span>
<span class="line">     <span class="token string-property property">&quot;rules&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">         <span class="token comment">// 自定义规则 </span></span>
<span class="line">       <span class="token punctuation">}</span></span>
<span class="line"> <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>确保你的项目已经安装了所需的依赖，例如@nestjs/cli、typescript和@typescript-eslint/parser。</p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line">npm install <span class="token operator">--</span>save<span class="token operator">-</span>dev @nestjs<span class="token operator">/</span>cli</span>
<span class="line">npm install <span class="token operator">--</span>save<span class="token operator">-</span>dev typescript</span>
<span class="line">npm install <span class="token operator">--</span>save<span class="token operator">-</span>dev @typescript<span class="token operator">-</span>eslint<span class="token operator">/</span>parser</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上步骤和配置将确保你的代码在保存时自动格式化，并符合NestJS的规范。</p>`,42)]))}const o=s(t,[["render",l],["__file","base.html.vue"]]),r=JSON.parse('{"path":"/zh/node/nest/base.html","title":"nest","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"核心概念","slug":"核心概念","link":"#核心概念","children":[]},{"level":2,"title":"环境搭建","slug":"环境搭建","link":"#环境搭建","children":[]},{"level":2,"title":"基本使用","slug":"基本使用","link":"#基本使用","children":[]},{"level":2,"title":"路由","slug":"路由","link":"#路由","children":[]},{"level":2,"title":"请求方法","slug":"请求方法","link":"#请求方法","children":[{"level":3,"title":"Get、Post请求","slug":"get、post请求","link":"#get、post请求","children":[]},{"level":3,"title":"Nestjs 中获取请求参数","slug":"nestjs-中获取请求参数","link":"#nestjs-中获取请求参数","children":[]},{"level":3,"title":"动态路由","slug":"动态路由","link":"#动态路由","children":[]}]},{"level":2,"title":"Nest.js连接 MySQL 数据库","slug":"nest-js连接-mysql-数据库","link":"#nest-js连接-mysql-数据库","children":[]}],"git":{"updatedTime":1736862884000,"contributors":[{"name":"zhan_zhang","username":"zhan_zhang","email":"18311292602@163.com","commits":3,"url":"https://github.com/zhan_zhang"}]},"filePathRelative":"zh/node/nest/base.md"}');export{o as comp,r as data};