import{_ as s,c as a,d as p,o as t}from"./app-DLJKApBj.js";const e={};function l(o,n){return t(),a("div",null,n[0]||(n[0]=[p(`<h1 id="事件" tabindex="-1"><a class="header-anchor" href="#事件"><span>事件</span></a></h1><h2 id="事件绑定" tabindex="-1"><a class="header-anchor" href="#事件绑定"><span>事件绑定</span></a></h2><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token keyword">const</span> btn <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&quot;btn1&quot;</span><span class="token punctuation">)</span></span>
<span class="line">btn<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&quot;click&quot;</span><span class="token punctuation">,</span> <span class="token parameter">event</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span></span>
<span class="line">    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;clicked&quot;</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 通用的绑定函数</span></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">bindEvent</span><span class="token punctuation">(</span><span class="token parameter">elem<span class="token punctuation">,</span> type<span class="token punctuation">,</span> fn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    elem<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span>type<span class="token punctuation">,</span> fn<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> a <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&quot;link1&quot;</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token function">bindEvent</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> <span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> <span class="token parameter">e</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span></span>
<span class="line">    e<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 阻止默认行为</span></span>
<span class="line">    <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">&#39;clicked&#39;</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="事件冒泡" tabindex="-1"><a class="header-anchor" href="#事件冒泡"><span>事件冒泡</span></a></h2><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token operator">&lt;</span>body<span class="token operator">&gt;</span></span>
<span class="line">    <span class="token operator">&lt;</span>div id<span class="token operator">=</span><span class="token string">&quot;div1&quot;</span><span class="token operator">&gt;</span></span>
<span class="line">        <span class="token operator">&lt;</span>p id<span class="token operator">=</span><span class="token string">&quot;p1&quot;</span><span class="token operator">&gt;</span>激活<span class="token operator">&lt;</span>p<span class="token operator">&gt;</span></span>
<span class="line">        <span class="token operator">&lt;</span>p id<span class="token operator">=</span><span class="token string">&quot;p2&quot;</span><span class="token operator">&gt;</span>取消<span class="token operator">&lt;</span>p<span class="token operator">&gt;</span></span>
<span class="line">        <span class="token operator">&lt;</span>p id<span class="token operator">=</span><span class="token string">&quot;p3&quot;</span><span class="token operator">&gt;</span>取消<span class="token operator">&lt;</span>p<span class="token operator">&gt;</span></span>
<span class="line">        <span class="token operator">&lt;</span>p id<span class="token operator">=</span><span class="token string">&quot;p4&quot;</span><span class="token operator">&gt;</span>取消<span class="token operator">&lt;</span>p<span class="token operator">&gt;</span></span>
<span class="line">    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span></span>
<span class="line">    <span class="token operator">&lt;</span>div id<span class="token operator">=</span><span class="token string">&quot;div2&quot;</span><span class="token operator">&gt;</span></span>
<span class="line">        <span class="token operator">&lt;</span>p id<span class="token operator">=</span><span class="token string">&quot;p5&quot;</span><span class="token operator">&gt;</span>取消<span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">&gt;</span></span>
<span class="line">        <span class="token operator">&lt;</span>p id<span class="token operator">=</span><span class="token string">&quot;p6&quot;</span><span class="token operator">&gt;</span>取消<span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">&gt;</span></span>
<span class="line">    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span></span>
<span class="line"><span class="token operator">&lt;</span><span class="token operator">/</span>body<span class="token operator">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> p1 <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&quot;p1&quot;</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">const</span> body <span class="token operator">=</span> document<span class="token punctuation">.</span>body</span>
<span class="line"><span class="token function">bindEvent</span><span class="token punctuation">(</span>p1<span class="token punctuation">,</span> <span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> <span class="token parameter">e</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span></span>
<span class="line">    e<span class="token punctuation">.</span><span class="token function">stopPropagation</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 阻止冒泡</span></span>
<span class="line">    <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">&#39;激活&#39;</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token function">bindEvent</span><span class="token punctuation">(</span>body<span class="token punctuation">,</span> <span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> <span class="token parameter">e</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">&quot;取消&quot;</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="事件代理" tabindex="-1"><a class="header-anchor" href="#事件代理"><span>事件代理</span></a></h2><blockquote><p>代码简洁,减少浏览器内存占用,但是，不要滥用（瀑布流中使用）</p></blockquote><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token keyword">function</span> <span class="token function">bindEvent</span><span class="token punctuation">(</span><span class="token parameter">elem<span class="token punctuation">,</span> type<span class="token punctuation">,</span> selector<span class="token punctuation">,</span> fn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span>fn <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        fn <span class="token operator">=</span> selector</span>
<span class="line">        selector <span class="token operator">=</span> <span class="token keyword">null</span>    </span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    </span>
<span class="line">    elem<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span>type<span class="token punctuation">,</span> <span class="token parameter">event</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">const</span> target <span class="token operator">=</span> event<span class="token punctuation">.</span>target</span>
<span class="line">        <span class="token keyword">if</span> <span class="token punctuation">(</span>selector<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token comment">// 代理绑定</span></span>
<span class="line">            <span class="token keyword">if</span> <span class="token punctuation">(</span>target<span class="token punctuation">.</span><span class="token function">matches</span><span class="token punctuation">(</span>selector<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token function">fn</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> event<span class="token punctuation">)</span>            </span>
<span class="line">            <span class="token punctuation">}</span>        </span>
<span class="line">        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token comment">// 普通绑定</span></span>
<span class="line">            <span class="token function">fn</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> event<span class="token punctuation">)</span>        </span>
<span class="line">        <span class="token punctuation">}</span>  </span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="描述事件冒泡的流程" tabindex="-1"><a class="header-anchor" href="#描述事件冒泡的流程"><span>描述事件冒泡的流程</span></a></h2><ul><li>基于 DOM 树形结构</li><li>事件会顺着触发元素往上冒泡</li><li>应用场景：代理</li></ul>`,10)]))}const i=s(e,[["render",l],["__file","event.html.vue"]]),u=JSON.parse('{"path":"/zh/js/web/event.html","title":"事件","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"事件绑定","slug":"事件绑定","link":"#事件绑定","children":[]},{"level":2,"title":"事件冒泡","slug":"事件冒泡","link":"#事件冒泡","children":[]},{"level":2,"title":"事件代理","slug":"事件代理","link":"#事件代理","children":[]},{"level":2,"title":"描述事件冒泡的流程","slug":"描述事件冒泡的流程","link":"#描述事件冒泡的流程","children":[]}],"git":{"updatedTime":1736823036000,"contributors":[{"name":"zhan_zhang","username":"zhan_zhang","email":"18311292602@163.com","commits":2,"url":"https://github.com/zhan_zhang"}]},"filePathRelative":"zh/js/web/event.md"}');export{i as comp,u as data};