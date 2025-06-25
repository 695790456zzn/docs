# pm2
## 作用
- 进程守护，系统崩溃自动重启
- 启动多进程，充分利用CPU和内存

## 安装
> npm install pm2 -g

## 基本使用
```js
{
    "scripts": {
        "prd": "cross-env NODE_ENV=production pm2 start app.js"    
    }
}
```

## 常用命令
```js
// 启动
pm2 start
// 查看进程
pm2 list
// 重启
pm2 restart <AppName>/<id>
// 停止/删除进程
pm2 stop <AppName>/<id>, pm2 delete <AppName>/<id>
// 查看服务信息
pm2 info <AppName>/<id>
// 查看打印日志
pm2 log <AppName>/<id>
// 内存/日志信息等
pm2 monit <AppName>/<id>
```

## 常用配置
```js
// pm2.conf.json 文件
{
    "apps": {
        "name": "pm2-test-server",
        "script": "app.js",
        "watch": true,
        "ignore_watch": [
            "node_modules",
            "logs"        
        ],
        "instances": 4, // 进程
        "error_file": "logs/err.log",
        "out_file": "logs/out.log",
        "log_date_format": "YYYY-MM-DD HH:mm:ss"    
    }
}

// package.json 文件
"prd": "cross-env NODE_ENV=production pm2 start pm2.conf.json"
```
