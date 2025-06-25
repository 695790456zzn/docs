# 手写代码
## 手写深度比较 lodash.isEqual
```js
// 判断是否是对象或数组
function isObject(obj) {
    return typeof obj === 'object' && obj !== null    
}
function isEqual(obj1, obj2) {
    if (!isObject(obj1) || !isObject(obj2)) {
        // 值类型（注意，参与 equal 的一般不会是函数）
        return obj1 === obj2    
    }
    if (obj1 === obj2) {
        return true    
    }
    // 两个都是对象或数组，而且不相等
    // 1.先取出 obj1 和 obj2 的keys，比较个数
    const obj1Keys = Object.keys(obj1)
    const obj2Keys = Object.keys(obj2)
    if (obj1Keys.length !== obj2Keys.length) {
        return false    
    }
    // 2. 以 obj1 为基准，和 obj2 依次递归比较
    for(let key in obj1) {
       // 比较当前 key 的 val
       const res = isEqual(obj1[key], obj2[key])
       if (!res) {
           return false       
       }     
    }
    // 3.全相等
    return true
}

// 测试
const obj1 = {
  a: 100,
  b: {
    x: 100,
    y: 200
  }
}

const obj2 = {
  a: 100,
  b: {
    x: 100,
    y: 200,
  },
};
console.log(isEqual(obj1, obj2));
```

## 手写字符串 trim 保证浏览器兼容性
```js
String.prototype.trim = function () {
    return this.replace(/^\s+/, '').replace(/\s+$/,)
}
```

## 手写 flatten
```js
// 将一层数组排平
var arr = [1, 2, [3, 4], 5]
// 1
Array.prototype.concat.apply([], arr) // [1, 2, 3, 4, 5]
// 2
Array.prototype.concat.call([], arr) // [1, 2, 3, 4, 5]
// 3
[].concat(arr)
// 4

// 按层数扁平数组
function flatten(arr, n) {
  const res = []
  const flattening = (nums, l) => {
    for(let num of nums) {
      if (Array.isArray(num) && l > 0) {
        flattening(num, l - 1)
      } else {
        res.push(num)
      }
    }
  }
  flattening(arr, n)
  return res
}

// 将多层数组排平
// 1 -- 循环 -> some
function flat(arr) {
    // 验证 arr 中，还有没有深层数组
    const isDeep = arr.some(item => item instanceof Array)
    if (!isDeep) {
        return arr  // 已经是 flatern [1, 2, 3, 4, 5]  
    }
    const res = Array.prototype.concat.apply([], arr)
    return flat(res) // 递归
}

// 2 -- 循环 -> concat
function flatten(arr) {
  let res = []
  for(let i = 0; i < arr.length; i++) {
    const s = arr[i]
    if (Array.isArray(s)) {
      res = res.concat(flatten(s))
    } else {
      res.push(s)
    }
  }
  return res
}

// 3 -- reduce -> concat
function flatten(arr) {
  return arr.reduce((acc, val) => {
    return acc.concat(Array.isArray(val) ? flatten(val) : val)
  }, [])
}

// 4 -- reduce -> 扩展运算符
function flatten(arr) {
  return arr.reduce((acc, val) => {
    return Array.isArray(val) ? [...acc, ...flatten(val)] : [...acc, val]
  }, [])
}

// 5 -- flat方法
function flatten(arr) {
  return arr.flat(Infinity)
}
```

## 数组去重
```js
// 1 -- 循环 -> indexOf
function unique(arr) {
  const length = arr.length
  if (length === 0) return arr
  const res = []
  for(let i = 0; i < length; i++) {
    const s = arr[i]
    if (res.indexOf(s) < 0) {
      res.push(s)
    }
  }
  return res
}

// 2 -- 循环 -> includes
function unique(arr) {
  const length = arr.length
  if (length === 0) return arr
  const res = []
  for(let i = 0; i < length; i++) {
    const s = arr[i]
    if (!res.includes(s)) {
      res.push(s)
    }
  }
  return res
}

// 3 -- Set -> 扩展运算符
function unique(arr) {
  return [...new Set(arr)]
}

// 4 -- Set -> Array.from
function unique(arr) {
  return Array.from(new Set(arr))
}
```

## 手写深拷贝
### 使用 JSON.parse(JSON.stringify())
- 优点：简单易用，适用于深拷贝普通对象和数组。
- 缺点：不能复制 undefined 、 function 、 Symbol，会忽略原型链，不能处理循环引用。
```js
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}
```

### 使用 structuredClone
浏览器提供的原生方法
- 优点：简单、快速、支持循环引用和复杂类型（如Map、Set、Date等）
- 缺点：兼容性较差，不适用于所有环境

```js
const obj = { a: 1, b: { c: 2 } };
obj.d = obj
const clone = structuredClone(obj)
console.log(clone);
```

### 使用 Lodash 库的 cloneDeep 方法
* 优点：全面支持所有数据类型（Date、RegExp、Map、Set等），且性能较好
* 缺点：需要引入第三方库
```js
const _ = require('lodash')
const obj = { a: 1, b: { c: 2 } };
const clone = _.cloneDeep(obj)
console.log(clone);
```

### 手写递归实现深拷贝
* 优点：可以复制 undefined 、function、Symbol，保留原型链，能处理循环引用。
* 缺点：实现稍微复杂，对某些嵌套层级很深的对象可能会导致栈溢出
```js
function deepClone(value, hash = new WeakMap()) {
    if (typeof value !== 'object' || value == null) {
        return value    
    }
    if (hash.has(value)) return hash.get(value)
    
    let result
    if (Array.isArray(value)) {
        result = []    
    } else if (value instanceof Map) {
        result = new Map()    
    } else if (value instanceof Set) {
        result = new Set()    
    } else {
        result = Object.create(Object.getPrototypeOf(value))    
    }
    hash.set(value, result)
    
    if (Array.isArray(value)) {
        for(let i = 0; i < value.length; i++) {
            result[i] = deepClone(value[i], hash)        
        }     
    } else if (value instanceof Map) {
        value.forEach((v, k) => {
            result.set(deepClone(k, hash), deepClone(v, hash))        
        })    
    } else if (value instanceof Set) {
        value.forEach(v => {
            result.add(deepClone(v, hash))        
        })    
    } else {
        for(let key in value) {
            if (value.hasOwnProperty(key)) {
                result[key] = deepClone(value[key], hash)            
            }        
        }    
    }
    return result
}

// 测试
const obj = {
  a: 1,
  b: [1, 2, 3],
  c: new Map([['key1', 'value1']]),
  d: new Set([1, 2, 3])
}

obj.e = obj // 循环引用
 const cloneObj = deepClone(obj)

 console.log(cloneObj);
 console.log(cloneObj !== obj); // true，说明是深拷贝
 console.log(cloneObj.e === cloneObj); // true，说明循环引用也被正确处理

// Object.assign 不是深拷贝!!!无法深层拷贝
```

## 函数的柯里化
```js
/**
 * 支持不定参数的柯里化
 * @param {*} fn 
 * @returns 
 */
function flexibleCurry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    } else {
      return (...nextArgs) => curried(...args, ...nextArgs);
    }
  };
}

// 测试
const multiply = (a, b, c) => a * b * c;
const curriedMultiply = curry(multiply);

console.log(curriedMultiply(2)(3)(4)); // 输出: 24
console.log(curriedMultiply(2, 3)(4)); // 输出: 24
console.log(curriedMultiply(2)(3, 4)); // 输出: 24
```

## 实现一个通用的事件绑定函数
```js
/**
 * addEventListener(type, function, useCapture)
 * type: 事件类型 -> click
 * function：事件执行时的处理函数
 * useCapture：true -- 在捕获阶段执行 false -- 在冒泡阶段执行
 */
function bindEvent(elem, type, selector, fn) {
  if (fn === null) {
    fn = selector
    selector = null
  }

  elem.addEventListener(type, event => {
    const target = event.target
    if (selector) {
      // 代理绑定
      if (target.matches(selector)) {
        fn.call(target, event)
      }
    } else {
      // 普通绑定
      fn.call(target, event)
    }
  })
}
```

## 实现apply、bind、call
### apply
```js
Function.prototype.myApply = function(context, argsArray) {
  context = context || globalThis;

  const fnSymbol = Symbol()
  context[fnSymbol] = this;

  // 使用 argsArray 展开调用
  const result = context[fnSymbol](...(argsArray || []))

  delete context[fnSymbol]

  return result
}

// 测试 myApply
function greet(greeting, punctuation) {
  return `${greeting}, ${this.name}${punctuation}`;
}

const person = { name: "Alice" };

console.log(greet.myApply(person, ["Hi", "?"])); // 输出: "Hi, Alice?"
```

### bind
```js
Function.prototype.myBind = function (context, ...args) {
  const fn = this;

  return function (...newArgs) {
    return fn.apply(context, args.concat(newArgs));
  };
};

// 测试 myBind
function greet(greeting, punctuation) {
  return `${greeting}, ${this.name}${punctuation}`;
}

const person = { name: "Alice" };

const greetPerson = greet.myBind(person, "Hey", "!!");
console.log(greetPerson()); // 输出: "Hey, Alice!!"
```

### call
```js
Function.prototype.maCall = function(context, ...args) {
  // 如果 context 为空，则设置为全局对象（浏览器中是 window， Node.js 中是 global）
  context = context || globalThis;

  // 将当前函数设为 context 的属性
  const fnSymbol = Symbol()
  context[fnSymbol] = this;

  // 执行函数并保存结果
  const result = context[fnSymbol](...args);

  // 删除临时属性
  delete context[fnSymbol];

  return result;
}

// 测试 myCall
function greet(greeting, punctuation) {
  return `${greeting}, ${this.name}${punctuation}`;
}

const person = { name: "Alice" };

console.log(greet.myCall(person, "Hello", "!")); // 输出: "Hello, Alice!"

```

## 手写实现Promise
### Promise
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

  static resolve(value) {
    return new MyPromise(resolve => resolve(value))
  }

  static reject(reason) {
    return new MyPromise((_, reject) => reject(reason))
  }
}
```

### allSettled
```js
Promise.prototype.myAllSettled = function(promises) {
  return new Promise((resolve, reject) => {
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
```

### all
```js
Promise.prototype.myAll = function(promises) {
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
```

### race
```js
Promise.prototype.myRace = function(promises) {
  return new MyPromise((resolve, reject) => {
    promises.forEach(promise => {
      promise.then(resolve, reject)
    })
  })
}
```

### any
```js
Promise.prototype.myAny = function(promises) {
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
```

## 防抖
```js
function debounce(func, delay) {
  let timer;
  return function(...args) {
    // 获取 this 上下文
    const context = this;

    // 每次调用时清除之前的计时器
    clearTimeout(timer);

    // 创建一个新的计时器，延迟执行函数
    timer = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  }
}
```

## 节流
### 基于时间戳的截流实现
开始会先执行一次
```js
function throttle1(func, delay) {
  let last = 0;
  return function(...args) {
    const now = Date.now();
    if (now - last >= delay) {
      last = now;
      func.apply(this, args);
    }
  };
}
```
### 基于定时器的截流实现
```js
function throttle2(func, delay) {
  let timer;
  return function(...args) {
    if (!timer) {
      timer = setTimeout(() => {
        func.apply(this, args);
        timer = null
      }, delay)
    }
  }
}
```

## 实现EventBus
```js
class EventBus {
  constructor() {
    this.events = {}
    this.onceEvents = {}
  }

  on(type, fn) {
    const events = this.events
    if (events[type] == null) events[type] = []
    events[type].push(fn)
  }

  once(type, fn) {
    const onceEvents = this.onceEvents
    if (onceEvents[type] == null) onceEvents[type] = []
    onceEvents[type].push(fn)
  }

  off(type, fn) {
    if (!fn) {
      this.events[type] = []
      this.onceEvents[type] = []
    } else {
      const fnList = this.events[type]
      const onceFnList = this.onceEvents[type]
      if (fnList) {
        this.events[type] = fnList.filter(curFn => curFn !== fn)
      }
      if (onceFnList) {
        this.onceEvents[type] = onceFnList.filter(curFn => curFn !== fn)
      }
    }
  }

  emit(type, ...args) {
    const fnList = this.events[type]
    const onceFnList = this.onceEvents[type]
    if (fnList) {
      fnList.forEach(f => f(...args))
    }
    if (onceFnList) {
      onceFnList.forEach(f => f(...args))

      this.onceEvents[type] = []
    }
  }
}
```
测试
```js
// 测试
const e = new EventBus();

function fn1(a, b) {
  console.log("fn1", a, b);
}
function fn2(a, b) {
  console.log("fn2", a, b);
}
function fn3(a, b) {
  console.log("fn3", a, b);
}

e.on("key1", fn1);
e.on("key1", fn2);
e.once("key1", fn3);
e.on("xxxxxx", fn3);

e.emit("key1", 10, 20); // 触发 fn1 fn2 fn3

e.off("key1", fn1);

e.emit("key1", 100, 200); // 触发 fn2
```

## 实现一个判断变量类型的方法
```js
function getType(x) {
  const originType = Object.prototype.toString.call(x)
  const type = originType.slice(8, -1)
  return type.toLowerCase()
}
```
测试
```js
// 测试
console.log(getType(null));
console.log(getType(undefined));
console.log(getType(100));
console.log(getType('abc'));
console.log(getType(true));
console.log(getType(Symbol()));
console.log(getType({}));
console.log(getType([]));
console.log(getType(() => {}));
console.log(getType(new Map()));
console.log(getType(new Set()));
console.log(getType(new WeakMap()));
console.log(getType(new WeakSet()));
```

## 手写代码实现instanceof
```js
function myInstanceof(instance, origin) {
  if (instance == null) return false

  const type = typeof instance
  if (type !== 'object' && type !== 'function') {
    return false
  }

  let tempInstance = instance
  while(tempInstance) {
    if (tempInstance.__proto__ === origin.prototype) {
      return true
    }
    tempInstance = tempInstance.__proto__
  }

  return false
}
```
测试
```js
// 功能测试
console.info( myInstanceof({}, Object) )
console.info( myInstanceof([], Object) )
console.info( myInstanceof([], Array) )
console.info( myInstanceof({}, Array) )
console.info( myInstanceof('abc', String) )
```

## 实现一个睡眠方法
```js
class LazyMan {
  constructor() {
    this.name = ''
    this.tasks = []

    setTimeout(() => {
      this.next()
    })
  }

  next() {
    const task = this.tasks.shift()
    if (task) task()
  }

  eat(food) {
    const task = () => {
      console.log(`${this.name} eat ${food}`)
      this.next()
    }
    this.tasks.push(task)

    return this
  }

  sleep(time) {
    const task = () => {
      setTimeout(() => {
        this.next()
      }, time * 1000)
    }
    this.tasks.push(task)

    return this
  }
}
```
测试
```js
const s = new LazyMan('xxx')
s.eat('香蕉').eat('苹果').sleep(1).eat('橘子').sleep(0.5).eat('水果')
```

## 单向链表实现队列
```js
class MyQueue {
  constructor() {
    this.head = null
    this.tail = null
    this.len = 0
  }

  add(n) {
    const newNode = {
      value: n
    }

    if (this.head == null) this.head = newNode
    const tailNode = this.tail
    if (tailNode) tailNode.next = newNode
    this.tail = newNode

    this.len++
  }

  delete() {
    const headNode = this.head
    if (headNode == null) return null
    if (this.len <= 0) return null

    const value = headNode.value

    this.head = headNode.next

    this.len--

    return value
  }

  get length() {
    return this.len
  }
}
```
测试
```js
// 功能测试
const q = new MyQueue()
q.add(100)
q.add(200)
q.add(300)
console.info('length1', q.length)
console.log(q.delete())
console.info('length2', q.length)
console.log(q.delete())
console.info('length3', q.length)
console.log(q.delete())
console.info('length4', q.length)
console.log(q.delete())
console.info('length5', q.length)
```

## 反转单项链表
```js
function createLinkList(arr) {
  const length = arr.length
  if (length === 0) throw new Error('arr is empty')

  let curNode = {
    value: arr[length - 1]
  }

  if (length === 1) return curNode

  for(let i = length - 2; i >= 0; i--) {
    curNode = {
      value: arr[i],
      next: curNode
    }
  }

  return curNode
}

function reverseLinkList(listNode) {
  let prevNode = undefined
  let curNode = undefined
  let nextNode = listNode

  while(nextNode) {
    if (curNode && !prevNode) {
      delete curNode.next
    }

    if (curNode && prevNode) {
      curNode.next = prevNode
    }

    prevNode = curNode
    curNode = nextNode
    nextNode = nextNode.next
  }

  curNode.next = prevNode

  return curNode
}
```
测试
```js
const arr = [100, 200, 300, 400, 500];
const list = createLinkList(arr);
console.info("list:", list);

const list1 = reverseLinkList(list);
console.info("list1:", list1);
```

## 两个栈实现一个队列
```js
class MyQueue {
  constructor() {
    this.stack1 = []
    this.stack2 = []
  }

  add(n) {
    this.stack1.push(n)
  }

  delete() {
    const stack1 = this.stack1
    const stack2 = this.stack2
    let res 

    while(stack1.length) {
      const n = stack1.pop()
      if (n) {
        stack2.push(n)
      }
    }

    res = stack2.pop()

    while(stack2.length) {
      const n = stack2.pop()
      if (n) {
        stack1.push(n)
      }
    }

    return res
  }

  get length() {
    return this.stack1.length
  }
}
```
测试
```js
// 功能测试
const q = new MyQueue()
q.add(100)
q.add(200)
q.add(300)
console.info(q.length)
console.info(q.delete())
console.info(q.length)
console.info(q.delete())
console.info(q.length)
console.info(q.delete());
```