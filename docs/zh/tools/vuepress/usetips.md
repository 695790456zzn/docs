# Vuepress使用
## 部署
### Github page 部署

1.Github上的配置
> - 新建仓库

> - 点击用户头像，settings -> Developer settings -> Personal access tokens -> Tokens(classic) -> Generate new token(classic) -> 填写note（token备注），选择（No expiration），勾选repo（全选也可以）-> Generate token

> - 在项目仓库中，settings -> Secrets and variables -> Actions -> New repository secret -> ACCESS_TOKEN

> - 新建分支（docs_pages），存放打包后的静态页面

2.项目中

> 创建 .github/workflows/docs.yml 文件来配置工作流。

> **修改 gh-pages 分支为自己创建的 docs_pages 分支**

> **修改 GITHUB_TOKEN 为自己配置的 ACCESS_TOKEN**

```yml
name: docs

on:
  # 每当 push 到 main 分支时触发部署
  push:
    branches: [main]
  # 手动触发部署
  workflow_dispatch:

jobs:
  docs:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
        with:
          # “最近更新时间” 等 git 日志相关信息，需要拉取全部提交记录
          fetch-depth: 0

      - name: 设置 pnpm
        uses: pnpm/action-setup@v4

      - name: 设置 Node.js
        uses: actions/setup-node@v4
        with:
          # 选择要使用的 node 版本
          node-version: 22
          # 缓存 pnpm 依赖
          cache: pnpm

      - name: 安装依赖
        run: pnpm install --frozen-lockfile

      # 运行构建脚本
      - name: 构建 VuePress 站点
        run: pnpm docs:build

      # 查看 workflow 的文档来获取更多信息
      # @see https://github.com/crazy-max/ghaction-github-pages
      - name: 部署到 GitHub Pages
        uses: crazy-max/ghaction-github-pages@v4
        with:
          # 部署到 gh-pages 分支
          target_branch: gh-pages
          # 部署目录为 VuePress 的默认输出目录
          build_dir: docs/.vuepress/dist
        env:
          # @see https://docs.github.com/cn/actions/reference/authentication-in-a-workflow#about-the-github_token-secret
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```