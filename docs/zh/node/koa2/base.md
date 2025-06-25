# koa2
## 特点
原生支持 async/await
async await 要点：    
- await 后面可以追加 promise 对象，获取 resolve 的值
- await 必须包裹在 async 函数里面
- async 函数执行返回的也是一个  promise 对象
- try-catch 截获 promise 中 reject 的值

## 安装
> npm install koa-generator -g
> koa blog-koa2

## 洋葱圈模型
![洋葱圈模型](/images/node/koa2.png)