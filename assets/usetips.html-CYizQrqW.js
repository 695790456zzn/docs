import{_ as n,c as a,d as e,o as p}from"./app-J1Rr-56F.js";const l={};function t(c,s){return p(),a("div",null,s[0]||(s[0]=[e(`<h1 id="vuepress使用" tabindex="-1"><a class="header-anchor" href="#vuepress使用"><span>Vuepress使用</span></a></h1><h2 id="部署" tabindex="-1"><a class="header-anchor" href="#部署"><span>部署</span></a></h2><h3 id="github-page-部署" tabindex="-1"><a class="header-anchor" href="#github-page-部署"><span>Github page 部署</span></a></h3><p>1.Github上的配置</p><blockquote><ul><li>新建仓库</li></ul></blockquote><blockquote><ul><li>点击用户头像，settings -&gt; Developer settings -&gt; Personal access tokens -&gt; Tokens(classic) -&gt; Generate new token(classic) -&gt; 填写note（token备注），选择（No expiration），勾选repo（全选也可以）-&gt; Generate token</li></ul></blockquote><blockquote><ul><li>在项目仓库中，settings -&gt; Secrets and variables -&gt; Actions -&gt; New repository secret -&gt; ACCESS_TOKEN</li></ul></blockquote><blockquote><ul><li>新建分支（docs_pages），存放打包后的静态页面</li></ul></blockquote><p>2.项目中</p><blockquote><p>创建 .github/workflows/docs.yml 文件来配置工作流。</p></blockquote><blockquote><p><strong>修改 gh-pages 分支为自己创建的 docs_pages 分支</strong></p></blockquote><blockquote><p><strong>修改 GITHUB_TOKEN 为自己配置的 ACCESS_TOKEN</strong></p></blockquote><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre><code><span class="line"><span class="token key atrule">name</span><span class="token punctuation">:</span> docs</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">on</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token comment"># 每当 push 到 main 分支时触发部署</span></span>
<span class="line">  <span class="token key atrule">push</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">branches</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>main<span class="token punctuation">]</span></span>
<span class="line">  <span class="token comment"># 手动触发部署</span></span>
<span class="line">  <span class="token key atrule">workflow_dispatch</span><span class="token punctuation">:</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">jobs</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">docs</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest</span>
<span class="line"></span>
<span class="line">    <span class="token key atrule">steps</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v4</span>
<span class="line">        <span class="token key atrule">with</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token comment"># “最近更新时间” 等 git 日志相关信息，需要拉取全部提交记录</span></span>
<span class="line">          <span class="token key atrule">fetch-depth</span><span class="token punctuation">:</span> <span class="token number">0</span></span>
<span class="line"></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 设置 pnpm</span>
<span class="line">        <span class="token key atrule">uses</span><span class="token punctuation">:</span> pnpm/action<span class="token punctuation">-</span>setup@v4</span>
<span class="line"></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 设置 Node.js</span>
<span class="line">        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/setup<span class="token punctuation">-</span>node@v4</span>
<span class="line">        <span class="token key atrule">with</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token comment"># 选择要使用的 node 版本</span></span>
<span class="line">          <span class="token key atrule">node-version</span><span class="token punctuation">:</span> <span class="token number">22</span></span>
<span class="line">          <span class="token comment"># 缓存 pnpm 依赖</span></span>
<span class="line">          <span class="token key atrule">cache</span><span class="token punctuation">:</span> pnpm</span>
<span class="line"></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 安装依赖</span>
<span class="line">        <span class="token key atrule">run</span><span class="token punctuation">:</span> pnpm install <span class="token punctuation">-</span><span class="token punctuation">-</span>frozen<span class="token punctuation">-</span>lockfile</span>
<span class="line"></span>
<span class="line">      <span class="token comment"># 运行构建脚本</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 构建 VuePress 站点</span>
<span class="line">        <span class="token key atrule">run</span><span class="token punctuation">:</span> pnpm docs<span class="token punctuation">:</span>build</span>
<span class="line"></span>
<span class="line">      <span class="token comment"># 查看 workflow 的文档来获取更多信息</span></span>
<span class="line">      <span class="token comment"># @see https://github.com/crazy-max/ghaction-github-pages</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 部署到 GitHub Pages</span>
<span class="line">        <span class="token key atrule">uses</span><span class="token punctuation">:</span> crazy<span class="token punctuation">-</span>max/ghaction<span class="token punctuation">-</span>github<span class="token punctuation">-</span>pages@v4</span>
<span class="line">        <span class="token key atrule">with</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token comment"># 部署到 gh-pages 分支</span></span>
<span class="line">          <span class="token key atrule">target_branch</span><span class="token punctuation">:</span> gh<span class="token punctuation">-</span>pages</span>
<span class="line">          <span class="token comment"># 部署目录为 VuePress 的默认输出目录</span></span>
<span class="line">          <span class="token key atrule">build_dir</span><span class="token punctuation">:</span> docs/.vuepress/dist</span>
<span class="line">        <span class="token key atrule">env</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token comment"># @see https://docs.github.com/cn/actions/reference/authentication-in-a-workflow#about-the-github_token-secret</span></span>
<span class="line">          <span class="token key atrule">GITHUB_TOKEN</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.GITHUB_TOKEN <span class="token punctuation">}</span><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13)]))}const o=n(l,[["render",t],["__file","usetips.html.vue"]]),u=JSON.parse('{"path":"/zh/tools/vuepress/usetips.html","title":"Vuepress使用","lang":"en-US","frontmatter":{},"git":{"updatedTime":1736780815000,"contributors":[{"name":"zhan_zhang","username":"","email":"18311292602@163.com","commits":1}],"changelog":[{"hash":"e0a5747a4987a7dc49fe8d6e81c7af43222e7d22","time":1736780815000,"email":"18311292602@163.com","author":"zhan_zhang","message":"更改仓库"}]},"filePathRelative":"zh/tools/vuepress/usetips.md"}');export{o as comp,u as data};
