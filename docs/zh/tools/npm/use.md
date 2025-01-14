# NPM
## NPM 源切换
安装 NRM
```js
// windows 系统下： npm install -g nrm
// mac OS 系统下： sudo npm install -g nrm
```

NRM 常用命令
- 查看可选源： nrm ls
- 测试源响应时间： nrm  test taobao
- 切换源: nrm use taobao
- 增加定制源： nrm add imooc http://192.168.1.100:6666
- 删除源： nrm del imooc