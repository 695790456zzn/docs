import{_ as a,c as s,d as e,o as l}from"./app-EKSVbuuA.js";const i={};function t(r,n){return l(),s("div",null,n[0]||(n[0]=[e(`<h1 id="nginx" tabindex="-1"><a class="header-anchor" href="#nginx"><span>Nginx</span></a></h1><h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍"><span>介绍</span></a></h2><ul><li>高性能的web服务器，开源免费</li><li>一般用于做静态服务、负载均衡</li><li>反向代理</li></ul><h2 id="下载" tabindex="-1"><a class="header-anchor" href="#下载"><span>下载</span></a></h2><ul><li>Windows：<a href="http://nginx.org/en/download.html" target="_blank" rel="noopener noreferrer">http://nginx.org/en/download.html</a></li><li>Mac： brew install nginx</li></ul><h2 id="配置" tabindex="-1"><a class="header-anchor" href="#配置"><span>配置</span></a></h2><p>Windows：C:\\nginx\\conf\\nginx.conf Mac：/usr/local/etc/nginx/nginx.conf</p><p>命令</p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token comment">// 测试配置文件格式是否正确</span></span>
<span class="line">nginx <span class="token operator">-</span>t</span>
<span class="line"><span class="token comment">// 启动</span></span>
<span class="line">nginx</span>
<span class="line"><span class="token comment">// 重启</span></span>
<span class="line">nginx <span class="token operator">-</span>s reload</span>
<span class="line"><span class="token comment">// 停止</span></span>
<span class="line">nginx <span class="token operator">-</span>s stop</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,9)]))}const o=a(i,[["render",t],["__file","base.html.vue"]]),p=JSON.parse('{"path":"/zh/node/nginx/base.html","title":"Nginx","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"介绍","slug":"介绍","link":"#介绍","children":[]},{"level":2,"title":"下载","slug":"下载","link":"#下载","children":[]},{"level":2,"title":"配置","slug":"配置","link":"#配置","children":[]}],"git":{"updatedTime":1736852909000,"contributors":[{"name":"zhan_zhang","username":"zhan_zhang","email":"18311292602@163.com","commits":1,"url":"https://github.com/zhan_zhang"}]},"filePathRelative":"zh/node/nginx/base.md"}');export{o as comp,p as data};