# JS基础面试题
## var 和 let const 的区别
- var 是 ES5 语法， let const 是 ES6 语法；var 有变量提升；
- var 和 let 是变量，可修改；const 是常量，不可修改；
- let const 有块级作用域，var 没有；
tips：变量提升
```js
// 变量提升
console.log(a) // undefined
var a = 200

console.log(b) // 报错
let b = 20

// 函数表达式 函数声明
```
## typeof 能判断哪些类型
- 识别所有值类型：undefined string number boolean symbol
- 判断是否是对象：object（注意，typeof null === 'object'）
- 识别函数：function

## 列举强制类型转换和隐式类型转换
- 强制：parseInt parseFloat toString 等
- 隐式：if、逻辑运算、==、+拼接字符串

## split() 和 join() 的区别
```js
'1-2-3'.split('-') // [1, 2, 3]
[1, 2, 3].join('-') // '1-2-3'
```

## [10, 20, 30].map(parseInt)
```js
// [10, NaN, NaN]
// 拆解
[10, 20, 30].map((num, index) => {
    return parseInt(num, index)
})
// parseInt(10, 0) // 0 或者不传，都默认按照 10 进制解析
// parseInt(20, 1) // radix 取值范围 2-36 ，1 不合法，因此返回 NaN
// parseInt(30, 2) // 基数为2，按二进制解析30，得NaN
```

## 函数 call 和 apply 的区别
传参方式不同
```js
fn.call(this, p1, p2, p3)
fn.apply(this, arguments)
```

## 闭包是什么？有何特性？有何影响？
- 应用场景：作为参数被传入，作为返回值被返回
- 自由变量的查找：要在函数定义的地方而不是在函数执行的地方
- 影响：变量会常驻内存，得不到释放。闭包不要乱用

## 如何减少 DOM 操作
- 缓存 DOM 查询结果
- 多次 DOM 操作，合并到一起操作

## document load 和 ready 的区别
```js
window.addEventListener('load', function() {
    // 页面的全部资源加载完才会执行，包括图片、视频等
})

document.addEventListener('DOMContentLoaded', function() {
    // DOM 渲染完即可执行，此时图片、视频等可能没有加载完
})
```

## 函数声明和函数表达式的区别
- 函数声明 function fn() {...}
- 函数表达式 const fn = function() {...}
- 函数声明会在代码执行前预加载，而函数表达式不会
```js
const res = sum(10, 20) 
console.log(res)

// 函数声明
function sum(x, y) {
    return x + y
}
// 函数表达式
const sum = function (x, y) {
    return x + y
}
```

## new Object() 和 Object.create() 的区别
- {} 等同于 new Object()， 原型 Object.prototype
- Object.create(null) 没有原型
- Object.create({...}) 可以指定原型
```js
const obj1 = {
    a: 10,
    b: 20,
    sum() {
        return this.a + this.b    
    }
}
const obj2 = new Object({
    a: 10,
    b: 20,
    sum() {
        return this.a + this.b    
    }
})

const obj2 = new Object(obj1) // obj1 === obj2

// 创建一个空对象，将传入的对象挂载到空对象的原型上
const obj5 = Object.create({
    a:10,
    b:20,
    sum() {
        return this.a + this.b    
    }
})
```

## 将 url 参数解析为 JS 对象
```js
// 传统方式
function queryToObj() {
    const res = {}
    const search = location.search.substr(1) // 去掉前面的 '？'
    search.split('&').forEach(paramStr => {
        const arr = paramStr.split('=')
        const key = arr[0]
        const val = arr[1]
        res[key] = val    
    })
    return res
}
// 使用 URLSearchParams
function queryToObj () {
    const res = {}
    const pList = new URLSearchParams(location.search)
    pList.forEach((val, key) => {
        res[key] = val    
    })
    return res
}
```

## RAF - requestAnimationFrame
- 要想动画流畅，更新频率要60帧，即16.67ms(1000 / 60)更新一次视图
- setTimeout 要手动控制频率，而 RAF 浏览器会自动控制
- 后台标签或隐藏 iframe 中， RAF 会暂停，而 setTimeout 依然执行
```js
// 3s 把宽度从 100px 变为 640px，即增加 540px
// 60帧/s，3s 180帧，每次变化 3px
const $div1 = $('#div1')
let curWidth = 100
const maxWidth = 640
// setTimeout
function animate() {
    curWidth = curWidth + 3
    $div1.css('width', curWidth)
    if (curWidth < maxWidth) {
        setTimeout(animate, 16.7) // 自己控制时间    
    }
}
animate()
// RAF
function animate() {
    curWidth = curWidth + 3
    $div1.css('width', curWidth)
    if (curWidth < maxWidth) {
        window.requestAnimationFrame(animate)  // 时间不需要自控  
    }
}
animate()
```

## Map 和 Set 
### Map 和 Object 区别
- API 不同， Map 可以以任意类型为 key
- Map 是有序结构
- Map 操作同样很快
```js
const m = new Map([
    ['key1', 'hello'],
    ['key2', 100],
    ['key3', {x: 100}]
])
m.set('name', 'zhangsan')
m.set('key1', 'hello world')
m.delete('key2')
m.has('key3')
m.forEach((value, key) => console.log(key, value))
m.size

// Map 可以以任意类型为 key
const o = {name: 'xdx'}
m.set(o, 'object key')
function fn() {}
m.set(fn, 'fn key')

// Map 有序的，但是还很快
// Object 有多快
const obj = {}
for(let i = 0; i < 1000 * 10000; i++) {
    obj[i+''] = i
}
console.time('obj find')
obj['200000']
console.timeEnd('obj find')
console.time('obj delete')
delete obj['200000']
console.timeEnd('obj delete')

// Map 有多快
const m = new Map()
for (let i = 0; i < 1000 * 10000; i++) {
    m.set(i+'', i)
}
console.time('map find')
m.has('200000')
console.timeEnd('map find')
console.time('map delete')
m.delete('200000')
console.timeEnd('map delete')
```

### Set 和数组的区别
- API 不同
- Set 元素不能重复
- Set 是无序结构，操作很快
```js
// 初始化
const set = new Set([10, 20, 30, 40])
// API
set.add(50)
set.delete(20)
set.has(30)
set.size
set.forEach(val => console.log(val)) // 没有 index

// Set 是无序的（快），arr 是有序的（慢）
const arr = []
for(let i = 0; i < 100 * 10000; i++) {
    arr.push(i)
}
console.time('arr unshift')
arr.unshift('a')
console.timeEnd('arr unshift')
console.time('arr push')
arr.push('b')
console.timeEnd('arr push')

const set = new Set()
for(let i = 0; i < 100 * 10000; i++) {
    set.add(i)
}
console.time('set add')
set.add('a')
console.timeEnd('set add')
```

### WeakMap 和 WeakSet
- 弱引用，防止内存泄漏
- WeakMap 只能用对象作用 key，WeakSet 只能用对象做 value
- 没有 forEach 和 size，只能用 add delete has
```js
// WeakMap 弱引用，防止内存泄漏，key 随时会被销毁，因此没有forEach has
// gc 垃圾清理不一定是及时的
const wMap = new WeakMap()
function fn() {
    const obj = {name: 'xxx'}
    wMap.set(obj, 'name info')
}
fn()
// 对比 强引用
const a = {}
function fn() {
    const obj = {name: 'xxx'}
    a.obj = obj // 强引用
}
fn()
console.log(a) // 不会清除 a
// WeakMap 使用场景
const userInfo = {name: 'xxx'}
const cityInfo = {city: 'shanghai'}
// 强引用，可能会造成内存泄漏（销毁 cityInfo 时无法销毁）
userInfo.city = cityInfo
// 弱引用
wMap.set(userInfo, cityInfo) // 建立一种关联关系，而且两者保持独立，而且销毁不影响彼此的销毁逻辑
wMap.get(userInfo)

// WeakSet 弱引用，防止内存泄漏，只能用对象作为 value
// 没有 forEach size，只能 has delete add
const wSet = new WeakSet()
function fn() {
    const obj = {name: 'xxx'}
    wSet.add(obj)
}
fn()
```