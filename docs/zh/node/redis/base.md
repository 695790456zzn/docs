# Redis
问题
- session如果是js变量，放在nodejs进程内存中，如果访问量过大，内存暴增容易引起栈溢出
- 线上环境是多进程的，进程之间内存无法共享

> redis 是web server 最常用的缓存数据库，数据存放在内存中，相比于 mysql ，访问速度快，但是成本更高

为什么session适用于 redis
- session 访问频繁，对性能要求极高
- session可以不考虑断电丢失数据的问题
- session数据量不会很大

安装 redis
- Windows：[http://www.runoob.com/redis/redis-install.html](http://www.runoob.com/redis/redis-install.html)
- Mac：使用 brew install redis