# vscode
## npm run start没有反应
问题描述：命令行输入npm run start 没有反应

解决方案：删除node_modules，删除package-lock.json，重新 npm install 安装包，然后重新运行 npm run start

## 创建React项目
问题描述：创建react项目执行 npx create-react-app my-app 时没有反应或者创建太慢

解决方案：
- 使用npm源时翻墙，使用国内镜像时不需要
- 修改 npm 源

npm源：https://registry.npmjs.org/

国内npm源：https://registry.npmmirror.com

查看npm源：npm config get registry

修改npm源：npm config set registry

清空缓存：npm cache clean --force

注意：npm淘宝镜像源已经从 registry.npm.taobao.org 切换到了registry.npmmirror.com
