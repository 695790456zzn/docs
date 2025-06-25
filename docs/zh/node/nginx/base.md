# Nginx
## 介绍
- 高性能的web服务器，开源免费
- 一般用于做静态服务、负载均衡
- 反向代理

## 下载
- Windows：[http://nginx.org/en/download.html](http://nginx.org/en/download.html)
- Mac： brew install nginx

## 配置
Windows：C:\nginx\conf\nginx.conf
Mac：/usr/local/etc/nginx/nginx.conf

命令
```js
// 测试配置文件格式是否正确
nginx -t
// 启动
nginx
// 重启
nginx -s reload
// 停止
nginx -s stop
```
