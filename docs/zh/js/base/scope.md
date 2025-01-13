# 作用域和闭包
## 作用域
- 全局作用域
- 函数作用域
- 块级作用域

## 自由变量
> 一个变量在当前作用域没有定义，但被使用了，会向上级作用域一层一层依次寻找，直至找到为止。如果到全局作用域都没找到，则报错： xxx is not defined.

## 闭包
1.函数作为返回值被返回
```js
// 函数作为返回值
function create() {
    const a = 100;
    return function() {
        console.log(a)    
    }
}

const fn = create();
const a = 200;
fn(); // 100
```
2.函数作为参数被传递
```js
function print(fn) {
    const a = 200;
    fn();
}
const a = 100;
function fn() {
    console.log(a);
}
print(fn); // 100
```
> **自由变量的查找，是在函数定义的地方，向上级作用域查找，不是在函数执行的地方；**

## this
> **this 取值是在函数执行的时候确定的，不是在函数定义的时候确定的**

1.作为普通函数被调用
```js
function fn1() {
    console.log(this);
}
fn1() // window
```

2.使用 call apply bind 调用
```js
fn1.call({ x: 100 }) // { x: 100 }

// bind 会返回一个新的函数
const fn2 = fn1.bind({ x: 200 })
fn2() // { x: 200 }
```
3.作为对象方法被调用
```js
const zhangsan = {
    name: "张三",
    sayHi() {
        // this 即当前对象
        console.log(this);    
    },
    wait() {
        setTimeout(function() {
            // this === window ,此时 this 被作为普通函数去执行
            console.log(this)        
        })    
    }
}
```
4.在 class 方法中调用
```js
class People {
    constructor(name) {
        this.name = name;
        this.age = 20;    
    }
    sayHi() {
        console.log(this)    
    }
}
```
5.箭头函数中调用（箭头函数中的 this 取上级作用域的 this）
```js
const zhangsan = {
    name: "张三",
    sayHi() {
        // this 即当前对象
        console.log(this);    
    },
    waitAgain() {
        setTimeout(() => {
            // this 即当前对象, 箭头函数中的 this 取上级作用域的 this
            console.log(this)        
        })    
    }
}
```
## 手写bind函数
```js
// 模拟 bind
Function.prototype.bind1 = function() {
    // 将参数拆解为数组
    const args = Array.prototype.slice.call(arguments)
    // 获取 this （数组第一项）
    const t = args.shift()
    // fn1.bind(...) 中的 fn1
    const self = this
    // 返回一个函数
    return function() {
            return self.apply(t, args)
    }
}
```

## 闭包的应用
1.隐藏数据
```js
// 闭包隐藏数据，只提供 API
function createCache() {
    const data = {} // 闭包中的数据，被隐藏，不被外界访问
    return {
        set: function(key, value) {
            data[key] = value                    
        },
        get: function (key) {
            return data[key]
        }    
    }
}

const c = createCache()
c.set("a", 100)
console.log(c.get("a"))
```
