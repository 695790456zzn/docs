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