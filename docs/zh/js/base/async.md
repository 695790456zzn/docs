# 异步和单线程
## 概念
> 单线程和异步
> JS 是单线程语言，只能同时做一件事
> 浏览器和nodejs已支持JS启动进程，如Web Worker
> JS 和 DOM 渲染共用一个线程，因为 JS 可以修改 DOM 解构
## 应用场景
- 网络请求，如ajax图片加载
- 定时任务，如 setTimeout
## callback hell
```js 
// 获取第一份数据
$.get(url1, (data1) => {
    console.log(data1)
    
    // 获取第二份数据
    $.get(url2, (data2) => {
        console.log(data2)
        
        // 获取第三份数据
        $.get(url3, (data3) => {
            console.log(data3)
            
            // 还可能获取更多的数据                
        })                                
    })
})
```
## Promise
1.基本使用
```js
function getData(url) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url,
            success(data) {
                resolve(data)            
            },
            error(err) {
                reject(err)            
            }        
        })    
    })
}

// 使用
const url1 = "/data1.json"
const url2 = "/data2.json"
const url3 = "/data3.json"

getData(url1).then(data1 => {
    console.log(data1)
    return getData(url2)
}).then(data2 => {
    console.log(data2)
    return getData(url3)
}).then(data3 => {
    console.log(data3)
}).catch(err => console.error(err)))
```
2.使用Promise加载图片
```js
function loadImg (src) {
    const p = new Promise(
        (resolve, reject) => {
            const img = document.craeteElement('img')
            img.onload = () => {
                resolve(img)            
            }       
            img.onerror = () => {
                const err = new Error(`图片加载失败 ${src}`)
                reject(err)            
            } 
            img.src = src
        }    
    )
    return p
}

const url = "xxx"
loadImg(url).then(img => {
    console.log(img.width)
    return img // return 对象或者 Promise 实例
}).then(img => {
    console.log(img.height)
}).catch(ex => console.error(ex)))
```
3.Promise的状态
> pending resolved reject
> pending -> resolved  pending -> reject
> 变化不可逆
```js
const p1 = new Promise((resolve, reject) => {
    
})

console.log("p1", p1) // pending

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve()    
    })
})

console.log('p2', p2) // pending 一开始打印时
setTimeout(() => console.log('p2-setTimeout', p2)) // resolve

const p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject()    
    })
})

console.log('p3', p3) // pending 一开始打印时
setTimeout(() => console.log('p3-setTimeout', p3)) // rejected
```
4.状态表现
- pending 状态，不会触发 then 和 catch
- resolved 状态，会触发后续的 then 回调函数
- rejected 状态，会触发后续的 catch 回调函数

5.then 和 catch 改变状态
- then 正常返回 resolved，里面有报错则返回 rejected
- catch 正常返回 resolved， 里面有报错则返回 rejected
```js
// then 正常返回 resolved，里面有报错则返回 rejected
const p1 = Promise.resolve().then(() => {
    return 100
})
console.log('p1', p1) // resolved

const p2 = Promise.resolve().then(() => {
    throw new Error('then error')
})
console.log('p2', p2) // rejected 触发后续 catch 回调

// catch 正常返回 resolved， 里面有报错则返回 rejected
const p3 = Promise.reject('my error').catch(err => {
    console.error(err)
})
console.log('p3', p3) // resolved 注意！触发 then 回调

const p4 = Promise.reject('my error').catch(err => {
    throw new Error('catch err')
})
console.log('p4', p4) // rejected 触发 catch 回调
```
6.使用场景
```js
// 第一题
Promise.resolve().then(() => {
    console.log(1) // 1
}).catch(() => {
    console.log(2)
}).then(() => {
    console.log(3) // 3
})

// 第二题
Promise.resolve().then(() => {
    console.log(1) // 1
    throw new Error("error1")
}).catch(() => {
    console.log(2) // 2
}).then(() => {
    console.log(3) // 3
})

// 第三题
Promise.resolve().then(() => {
    console.log(1) // 1
    throw new Error('error1')
}).catch(() => {
    console.log(2) // 2
}).catch(() => {
    console.log(3)
})
```
## 异步进阶
1.event loop
> event loop （事件循环/事件轮询）：event loop就是异步回调的实现原理

2.JS 如何执行
- 从前到后，一行一行执行
- 如果某一行执行报错，则停止下面代码的执行
- 先把同步代码执行完，再执行异步

3.event loop执行过程
- 同步代码，一行一行放在 Call Stack 执行
- 遇到异步，会先记录下，等待时机（定时、网络请求等）
- 时机到了，就移动到 Callback Queue
- 如 Call Stack 为空（即同步代码执行完）Event Loop 开始工作
- 轮询查找 Callback Queue，如有则移动到Call Stack执行
- 然后继续轮询查找（永动机一样）

4.DOM事件和event loop
- JS 是单线程的
- 异步（setTimeout， ajax等）使用回调，基于 event loop
- DOM 事件也使用回调，基于 event loop（DOM事件不是异步）

## async/await
1.基本使用
```js
function loadImg (src) {
    const p = new Promise(
        (resolve, reject) => {
            const img = document.craeteElement('img')
            img.onload = () => {
                resolve(img)            
            }       
            img.onerror = () => {
                const err = new Error(`图片加载失败 ${src}`)
                reject(err)            
            } 
            img.src = src
        }    
    )
    return p
}

const url1 = "xxx1";
const url2 = "xxx2";
(async function () {
    // 同步的写法，执行了异步的代码
    
    const img1 = await loadImg(url1)
    console.log(img1.height, img1.width) 
    
    const img2 = await loadImg(url2)
    console.log(img2.height, img2.width)                                     
})()
```

2.async/await 和 Promise 的关系
- 执行 async 函数，返回的是 Promise 对象
- await 相当于 Promise 的 then
- try...catch 可捕获异常，代替了 Promise 的 catch
```js
// await 相当于 Promise 的 then
async function fn1 () {
    return 100 // 相当于 return Promise.resolve(100)
    return Promise.resolve(200)
}

const res1 = fn1() // 执行 async 函数，返回的是一个 Promise 对象
console.log('res1', res1) // Promise 对象
res1.then(data => {
    console.log('data', data) // 200
})

!(async function () {
    const p1 = Promise.resolve(300)
    const data = await p1 // await 相当于 Promise then
    console.log('data', data) // 300
})()

!(async function () {
    const data1 = await 400 // 相当于 await Promise.resolve(400)
    console.log('data1', data1) // 400
})()

// try...catch 可捕获异常，代替了 Promise 的 catch
!(async function () {
    const p4 = Promise.reject("err") // rejected 状态
    try {
        const res = await p4   
        console.log(res) 
    } catch (ex) {
        console.log(ex) // try...catch 相当于 promise catch
    }
})()
```

3.异步的本质
```js
async function async1 () {
    console.log('async1 start') // 2
    await async2()
    // await 的后面，都可以看做是 callback 里的内容，即异步
    // 类似，event loop ， setTimeout(cb1)
    console.log('async1 end') // 5
}

async function async2 () {
    console.log('async2') // 3
}

console.log('script start') // 1
async1()
console.log('script end') // 4
```

4.for...of
```js
function muti(num) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(num * num)        
        }, 1000)    
    })
}

const nums = [1, 2, 3]

nums.forEach(async (i) => {
    const res = await muti(i)
    console.log(res) // 1 4 9 同时打印出来
})

!(async function () {
    for (let i of nums) {
        const res = await muti(i)
        console.log(res) // 依次打印 1 4 9
    }
})()
```

## 宏任务和微任务
1.类型
- 宏任务：setTimeout , setInterval, Ajax, DOM 事件
- 微任务：Promise async / await
- 微任务执行时机比宏任务要早

2.event loop 和 DOM 渲染
- 每次 Call Stack 清空（即每次轮询结束），即同步任务执行完
- 都是 DOM 重新渲染的机会，DOM 结构如有改变则重新渲染
- 然后再去触发下一次 Event Loop
```js
const $p1 = $('<p>一段文字</p>')
const $p2 = $('<p>一段文字</p>')
const $p3 = $('<p>一段文字</p>')
$('#container').append($p1).append($p2).append($p3)
console.log('length', $('#container').children().length) // 3
alert('本次 call stack 结束，DOM 结构已更新，但尚未触发渲染')

// 微任务：DOM 渲染前触发
Promise.resolve().then(() => {
    console.log('length1', $('#container').children().length)
    alert('Promise then') // DOM 渲染了吗？ -- no
})

// 宏任务：DOM 渲染后触发
setTimeout(() => {
    console.log('length1', $('#container').children().length)
    alert('setTimeout') // DOM 渲染了吗？ -- yes
})
```
3.微任务和宏任务的区别
- 宏任务：DOM 渲染后触发，如 setTimeout
- 微任务：DOM 渲染前触发，如 Promise

4.微任务执行时机更早的原理
- 微任务是 ES6 语法规定的
- 宏任务是浏览器规定的
![微任务执行时机](/images/js/micro-task1.png)
![微任务执行时机](/images/js/micro-task2.png)

5.执行顺序题目举例
```js
async function async1 () {
    console.log('async1 start') // 2
    await async2()
    console.log('async1 end') // 6
}

async function async2 () {
    console.log('async2') // 3
}

console.log('script start') // 1

setTimeout(() => {
    console.log('setTimeout') // 8
}, 0)

async1()

new Promise(function (resolve) {
    console.log('promise1') // 4
    resolve()
}).then(function () {
    console.log('promise2') // 7
})

console.log('script end') // 5
```

6.手写 Promise并实现resolve、reject、all、allSettled、race、any方法
```js
class MyPromise {
  constructor(executor) {
    this.state = 'pending'
    this.value = undefined
    this.reason = undefined
    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []

    const resolve = value => {
      if (this.state === 'pending') {
        this.state = 'fulfilled'
        this.value = value
        this.onFulfilledCallbacks.forEach(callback => callback(value))
      }
    }

    const reject = reason => {
      if (this.state === 'pending') {
        this.state = 'rejected'
        this.reason = reason
        this.onRejectedCallbacks.forEach(callback => callback(reason))
      }
    }

    try {
      executor(resolve, reject)
    } catch(error) {
      reject(error)
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
    onRejected = typeof onRejected === 'function' ? onRejected : e => {throw e}

    if (this.state === 'fulfilled') {
      return new MyPromise((resolve, reject) => {
        try {
          const result = onFulfilled(this.value)
          resolve(result)
        } catch(error) {
          reject(error)
        }
      })
    }

    if (this.state === 'rejected') {
      return new MyPromise((resolve, reject) => {
        try {
          const result = onRejected(this.reason)
          resolve(result)
        } catch(error) {
          reject(error)
        }
      })
    }

    if (this.state === 'pending') {
      return new MyPromise((resolve, reject) => {
        this.onFulfilledCallbacks.push(() => {
          try {
            const result = onFulfilled(this.value);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        })

        this.onRejectedCallbacks.push(() => {
          try {
            const result = onRejected(this.reason);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        })
      })
    }
  }

  catch(onRejected) {
    return this.then(null, onRejected)
  }

  finally(onFinally) {
    return this.then(
      value => MyPromise.resolve(onFinally()).then(() => value),
      reason => MyPromise.resolve(onFinally()).then(() => {throw reason})
    )
  }

  static allSettled(promises) {
    return new MyPromise((resolve, reject) => {
      let results = []
      let completed = 0
      promises.forEach((promise, index) => {
        promise.then(
          value => {
            results[index] = { status: 'fulfilled', value }
          },
          reason => {
            results[index] = { status: 'rejected', reason }
          }
        ).finally(() => {
          completed++
          if (completed === promises.length) {
            resolve(results)
          }
        })
      })
    })
  }

  static all(promises) {
    return new MyPromise((resolve, reject) => {
      let results = []
      let completed = 0
      promises.forEach((promise, index) => {
        promise.then(value => {
          results[index] = value
          completed++
          if (completed === promises.length) {
            resolve(results)
          }
        }, reject)
      })
    })
  }

  static race(promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach(promise => {
        promise.then(resolve, reject)
      })
    })
  }

  static any(promises) {
    return new MyPromise((resolve, reject) => {
      let errors = []
      let completed = 0
      promises.forEach((promise, index) => {
        promise.then(resolve, error => {
          errors[index] = error
          completed++
          if (completed === promises.length) {
            reject(new AggregateError(errors, "All promises were rejected"));
          }
        })
      })
    })
  }

  static resolve(value) {
    return new MyPromise(resolve => resolve(value))
  }

  static reject(reason) {
    return new MyPromise((_, reject) => reject(reason))
  }
}
```
