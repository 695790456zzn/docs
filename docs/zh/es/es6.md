# es6
[ES电子文档](http://es.xiecheng.live)
## 变量声明
### var
使用 var 代表在当前作用域内声明变量
```js
// 使用和不使用 var 的区别
var a = 1 // 使用 var 代表在当前作用域内声明变量
console.log(a)
delete a // 可以使用 delete 进行检测，delete 只能删除对象的属性，不能删除变量
console.log(a)
```

不使用 var 相当于对属性进行赋值
```js
b = 2 // 不使用 var 相当于对属性进行赋值（相当于 window.b ）
console.log(b)
delete b // b 被删除
console.log(b) // 报错 （b is not defined）
```

### Let
1.不属于顶层对象 window，不会污染全局变量
```js
// 如果不删除 a 和 b , a 和 b 都会作为 window 的属性，因为 JS 作者设计时将变量与window的属性进行了关联（JS设计中的弊端）
console.log(window.a) // 1
console.log(window.b) // 2

let a = 5
console.log(a)
console.log(window.a) // undefined. let 弥补了 var 的缺陷，不会污染全局变量
```

2.不允许重复声明
- 避免了协作开发中的命名重复

3.不存在变量提升

4.暂时性死区（变量使用前要先定义）
```js
var a = 5
if (true) {
    a = 6
    let a // 报错，cannot access 'a' before initialization
}
```

5.块级作用域
```js
// var 声明变量不存在块级作用域
for(var i = 0; i < 3; i++) {
    console.log('循环内' + i) // 0, 1, 2
}
console.log("循环外" + i) // 3

// let 存在块级作用域
for(let i = 0; i < 3; i++) {
    console.log('循环内：' + i)
}
console.log('循环外：' + i) // i is not defined

// 使用闭包解决 var 定义的变量在循环中被释放的问题
for(var i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log(i) // 3， 3， 3    
    })
}
for(var i = 0; i < 3; i++) {
    // 闭包能保证其中的变量不被释放
    (function(j) {
        setTimeout(function() {
            console.log(j)  // 0, 1, 2    
        })    
    })(i)
}
// 使用 let 实际上是被 babel 转换成了 ES5 的闭包形式
for(let i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log(i) // 0, 1, 2    
    })
}
```

### const
- 不属于顶层对象 window
- 不允许重复声明
- 不存在变量提升
- 暂时性死区
- 块级作用域
- 定义时必须赋值
- 值不允许被改变

## 解构赋值
定义：按照一定模式，从数组和对象中提取值，对变量进行赋值

1数组解构
```js
// ES5 实现方式
let arr = [1, 2, 3];
let a = arr[0]
let b = arr[1]
let c = arr[2]
console.log(a, b, c)

// 对数组解构
let [a, b, c] = [1, 2, 3]
console.log(a, b, c)

// 对多层级数组解构
let [a, b, [c, d]] = [1, 2, [3, 4]];
console.log(a, b, c, d);

// 惰性赋值，右边有值则取右边的值，没有就取默认值
let [a, b, c, d = 5] = [1, 2, [3, 4], 6];
console.log(a, b, c, d); // 1, 2, [3, 4], 6
```

2.对象解构
```js
// 对象的解构赋值
let user = {
  name: "xxx",
  age: 20,
};

let { name, age } = user;
console.log(name, age);

// 重命名
let { age: uage, name: uname } = user; // 以 key 为准，不受顺序影响
console.log(uname, uage);
```

3.字符串解构
```js
// 字符串解构赋值
let str = 'imooc'

// ES5
for(let i = 0; i < str.length; i++) {
  console.log(str[i])
}

// ES6
let [a, b, c, d, e] = str
console.log(a, b, c, d, e)
```

4.应用
```js
// 函数参数解构赋值
function foo([a, b, c]) {
  console.log(a, b, c);
}
let arr = [1, 2, 3];
foo(arr);

// 对象参数（默认参数）解构赋值
function foo({name, age, school = 'imooc'}) {
  console.log(name, age, school);
}

let obj = {
  name: 'xxx',
  age: 20
}
foo(obj);

// 对函数返回值的解构赋值
function foo() {
  let obj = {
    name: "xxx",
    age: 20,
    school: 'xxx'
  };
  return obj
}
let {name, age} = foo()
console.log(name, age)

// json 解构
let json = '{"a": "hello", "b": "world"}';
let { a, b } = JSON.parse(json);
console.log(a, b);
```

## 数组的各种遍历方式
### ES5数组的遍历方式
纯函数：map、filter、some、every、reduce
```js
let arr = [1, 2, 3];

// for 循环
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}
// forEach (不支持 break， continue)
arr.forEach(function (elem, index, array) {
  console.log(elem);
});

// map(返回值会组成一个新数组，不会改变原函数)
arr.map(function (value) {
  console.log(value);
});

// filter（返回一个新数组，数组中的元素经过过滤，返回符合条件的数组，不改变原数组）
arr.filter(function (value) {
  console.log(value);
});

// some（返回布尔值，只要有一个符合就返回true）
arr.some(function (value) {
  console.log(value);
});

// every（返回布尔值，全部都符合才返回true）
arr.every(function (value) {
  console.log(value);
});

// reduce
// 求和
let sum = arr.reduce(function (prev, cur, index, array) {
  return prev + cur;
}, 0);

// 找出最大值
let max = arr.reduce(function (prev, cur) {
  return Math.max(prev, cur);
});
console.log(max);

// 数组求和（
// 第一个参数为一个方法（
// 参数1:上一次调用回调时所对应的返回值，首次为初始值。
// 参数2:当前正在处理的数组里面的元素
// 参数3:当前正在处理元素所对应的索引
// 参数4：原数组
// ）
// 第二个参数为初始值）
let sum = arr.reduce(function(prev, cur, index, array) {
    return prev + cur
}, 0)

// 数组去重
arr.reduce(function (prev, cur) {
  prev.indexOf(cur) == -1 && prev.push(cur);
  return prev;
}, []);

// for in（遍历数组会有问题，会遍历出数组原型的方法）
for (let index in arr) {
  console.log(index, arr[index]);
}
```

### ES6中数组遍历的方式
```js
let arr = [1, 2, 3, 2, 4];

// find（返回找到的第一个元素）
let res = arr.find(function (value) {
    return value == 2;
});
console.log(arr, res); // [1, 2, 3, 2, 4] 2

// findIndex（返回找到的第一个元素的下标）
let res = arr.findIndex(function (value) {
  return value == 2;
});
console.log(arr, res); // [1, 2, 3, 2, 4] 1

// for of
for (let item of arr) {
  console.log(item);
}

// values()
for (let item of arr.values()) {
  console.log(item);
}

// keys()
for (let item of arr.keys()) {
  console.log(item);
}

// entries()
for (let [index, item] of arr.entries()) {
  console.log(index, item);
}
```

## 数组的扩展
### 类数组/伪数组
```js
let divs = document.getElementsByTagName("div");
console.log(divs); // HTMLCollection

let divs2 = document.getElementsByClassName("xx");
console.log(divs2); // HTMLCollection

let divs3 = document.querySelectorAll(".xx");
console.log(divs3); // NodeList

function foo() {
    console.log(arguments) // 伪数组
}
foo(1, 'imooc', true)
```

### ES5中将伪数组转化为数组
```js
// slice -- 将类数组转换为数组
let arr = Array.prototype.slice.call(div3)
console.log(arr)
arr.push(123) // 有了 push 方法
console.log(arr)
```

### ES6中将伪数组转化为数组
```js
// Array.from()
let arrayLike = {
    0: "es6",
    1: "es7",
    2: "es8",
    length: 3,
}
let arr = Array.from(arrayLike)
arr.push("es9")
console.log(arr)
```
### Array.of()
```js
// 用法一：创建新数组
// 使用 new Array() 创建
let arr = new Array(1, 2)
console.low(arr) // [1, 2]
let arr = new Array(3)
console.log(arr) // [] length = 3
let arr = Array.of(3)
console.log(arr) // [3]

// 用法二：将各个元素转化为数组
let arr = Array.of(1, true, 'imooc', [1, 2, 3], {name: 'xxx'})
console.log(arr) // [1, true, 'imooc', [1, 2, 3], {name: 'xxx'}]
```

### copyWithin
```js
// 替换数组中的元素
let arr = [1, 2, 3, 4, 5]
console.log(arr.copyWithin(1, 3)) // [1, 4, 5, 4, 5]
```

### fill
```js
// 用法一
let arr = new Array(3).fill(7)
console.log(7, 7, 7)
// 用法二
let arr = [1, 2, 3, 4, 5]
arr.fill('imooc', 1, 3)
console.log(arr) // [1, 'imooc', 'imooc', 4, 5]
```

### includes
```js
// 判断数组中是否包含某个元素
let arr = [1, 2, 3, NaN]
console.log(arr.indexOf(NaN)) // -1 indexOf 不能检测 NaN
console.log(NaN == NaN) // false
// includes 能够检测 NaN
```

## 函数的参数
### 默认参数
- 参数相当于默认的声明，不可以再重复声明
- 默认参数要放在行参最后
- length 获取函数参数中没有指定默认值的参数的个数

## 扩展运算符与 rest 参数
### 扩展运算符：
把数组或者类数组展开成用逗号隔开的值
```js
// 扩展运算符
function foo(a, b, c) {
    console.log(a, b, c)
}
let arr = [1, 2, 3]
foo(...arr)

// 合并数组
let arr1 = [1, 2, 3]
let arr2 = [4, 5, 6]
// ES5中合并
Array.prototype.push.apply(arr1, arr2)
// ES6中合并
arr1.push(...arr2)
```

### rest参数：
把逗号隔开的值组合成一个数组
```js
// 用法一：对于不确定参数，使用 rest 参数
// ES5中实现
function foo() {
    let sum = 0
    Array.prototype.forEach.call(arguments, function(item) {
        sum += item    
    })
    return sum
}
// ES6中实现
function foo() {
    let sum = 0
    Array.from(arguments).forEach(function(item) {
        sum += item    
    })
    return sum
}
// 使用 rest 参数实现
function foo(...args) {
    let sum = 0
    args.forEach(function(item) {
        sum += item    
    })
    return sum
}

// 用法二：剩余参数
function foo(x, ...args) {
    console.log(x)
    console.log(args)
}
foo(1, 2, 3)
foo(1, 2, 3, 4)

// 用法三：与结构赋值结合使用
let [x, ...y] = [1, 2, 3]
console.log(x) // 1
console.log(y) // [2, 3]
```

## 箭头函数
1.this 指向定义时所在的对象， 而不是调用时所在的对象
```js
let oBtn = document.querySelector("#btn");
oBtn.addEventListener("click", function () {
  // console.log(this);
  // setTimeout(function() {
  //   console.log(this);
  // }.bind(this), 1000) // ES5 中通过 bind 改变 this 指向
  setTimeout(() => {
    // 箭头函数中的 this 继承上一层的 this
    console.log(this);
  }, 1000);
});
```

2.不可以当作构造函数

3.不可以使用 arguments 对象

## 对象的扩展
### 属性简洁表示法
对象中 key 和 value 名相同，可省略 value 

### 属性名表达式
```js
let name = 'xxx'
let age = 25
let s = 'school'
let obj = {
  name,
  age,
  [s]: 'imooc', // ES6 中， key 为变量时的写法
//   study: function() { // ES5 中对象的方法
//       console.log(this.name + '正在学习');
//   },
  study() { // ES6 中对象的方法的写法
    console.log(this.name + '正在学习');
  }
}

obj.study()
```

### Object.is()
```js
// 判断两个值是否相等
console.log(Object.is(NaN, NaN)) // true
console.log(Object.is(2, '2')) // false
```

### 扩展运算符与Object.assign()
```js
let x = {
  a: 3,
  b: 4
}

// let y = {...x}
let y = {
  c: 5
}
Object.assign(y)
```

### in
```js
let arr = [1, 2, 3]
console.log(3 in arr) // false 数组是判断当前位置是否有值（角标为3的位置没有值，所以返回 false）
```

### 对象的遍历方式
```js
let obj = {
    name: 'xxx',
    age: 32,
    school: 'xxx'
}
// 1
for(let key in obj) {
    console.log(key, obj[key])
}
// 2
Object.keys(obj).forEach(key => {
    console.log(key, obj[key])
})
// 3
Object.getOwnPropertyNames(obj).forEach(key => {
    console.log(key, obj[key])
})
// 4
Reflect.ownKeys(obj).forEach(key => {
    console.log(key, obj[key])
})
```

## 类
类（class）是对象（object）的模版，定义了同一组对象共有的属性和方法
### ES5中的类和继承
```js
// 类
function People(name, age) {
    console.log(this) // this 指向 new 出来的实例化对象
    // 实例属性
    this.name = name
    this.age = age
}
// ES5 中方法的定义一般是绑定在原型上，避免实例化过程中方法被多次实例化
// 实例方法
People.prototype.showName = function() {
    console.log('我的名字是' + this.name)
}
// 静态属性
People.count = 0
// 静态方法
People.getCount = function() {
    console.log('当前共有' + People.count + '个人')
}

// 继承
function Animal(name) {
    this.name = name
}
Animal.prototype.showName = function() {
    console.log('名字是:' + this.name)
}
// 子类
// 组合式继承（构造函数继承+原型继承）
function Dog(name, color) {
    Animal.call(this, name) // 只能继承属性
    this.color = color
}
// 继承父类方法
Dog.prototype = new Animal()
Dog.prototype.constructor = Dog
```

### ES6中的类与继承
```js
class People {
    constructor(name, age) {
        this.name = name
        this.age = age   
        this._sex = -1 
    }
    // 定义顶层属性（可对属性进行业务逻辑编辑，可被继承）
    // get -- 只读 set -- 写入
    get sex() {
        if (this._sex === 1) {
            return 'male'        
        } else if (this._sex === 0) {
            return 'female'        
        } else {
            return 'error'        
        }    
    }
    set sex(val) {
        if (val === 0 || val === 1) {
            this._sex = val        
        }    
    }
    showName() {
        console.log(this.name)    
    }
    // 定义静态方法，可以在类或者子类中调用，无法再实例中调用
    // ES6中无法定义静态属性
    static getCount() {
        return 3    
    }
}
class Coder extends People {
    constructor(name, age, company) {
        super(name, age)
        this.company = company    
    }
    showCompany() {
        console.log(this.company)    
    }
}
```

## Symbol
### Symbol 特性
1.定义变量的唯一性
```js
let s1 = Symbol();
let s2 = Symbol();
console.log(s1);
console.log(s2);
console.log(s1 === s2); // false

let s1 = Symbol('foo')
let s2 = Symbol('bar')
console.log(s1);
console.log(s2);
console.log(s1 === s2); // false

const obj = {
  name: "imooc",
  toString() {
    return this.name;
  },
};
let s = Symbol(obj);
console.log(s);
```

2.description 属性，获取 Symbol 描述
```js
let s = Symbol();
s.name = "imooc";
console.log(s);
console.log(s.description);
```

3.Symbol.for 
生成全局环境值，如果相同，就去全局环境中寻找
```js
let s1 = Symbol.for("foo");
let s2 = Symbol.for("foo");
console.log(s1 === s2); // true

function foo() {
  return Symbol.for("foo");
}
const x = foo();
const y = Symbol.for("foo");
console.log(x === y); // true
```

4.Symbol.keyFor 寻找全局登记过的 Symbol
```js
const s1 = Symbol("foo");
console.log(Symbol.keyFor(s1));

const s2 = Symbol.for("foo");
console.log(Symbol.keyFor(s2));
```

### 使用场景
1.用于对象中 key 值重复的情况
```js
// key 值重复，会被覆盖
const grade = {
  张三: { address: "xxx", tel: "111" },
  李四: { address: "yyy", tel: "222" },
  李四: { address: "zzz", tel: "333" },
};
console.log(grade);

// []:取常量的值作为对象的 key
const stu1 = "李四";
const stu2 = "李四";
const grade = {
  // []:取常量的值作为对象的 key
  [stu1]: { address: "yyy", tel: "222" },
  [stu2]: { address: "zzz", tel: "333" },
};
console.log(grade);

// 使用 Symbol
const stu1 = Symbol("李四");
const stu2 = Symbol("李四");
const grade = {
  [stu1]: { address: "yyy", tel: "222" },
  [stu2]: { address: "zzz", tel: "333" },
};
console.log(grade);
console.log(grade[stu1]);
console.log(grade[stu2]);
```

2.保护类中的某些属性
```js
const sym = Symbol("imooc"); // 使用 Symbol 定义类中的属性
class User {
  constructor(name) {
    this.name = name;
    this[sym] = "imooc.com"; // 在构造器中构造 Symbol 定义的属性
  }
  getName() {
    return this.name + this[sym];
  }
}
const user = new User("xxx");
console.log(user.getName());

for (let key in user) {
  console.log(key); // 只能取到不是 Symbol 的属性
}

for (let key of Object.keys(user)) {
  console.log(key); // 只能取到不是 Symbol 的属性
}

for (let key of Object.getOwnPropertySymbols(user)) {
  console.log(key); // 只能取到 Symbol 的属性
}

for(let key of Reflect.ownKeys(user)) {
  console.log(key); // 都能取到
}
```

3.消除魔术字符串
```js
// 'Triangle' 重复出现（魔术字符串）
function getArea(shape) {
  let area = 0;
  switch (shape) {
    case "Triangle":
      area = 1;
      break;
    case "Circle":
      area = 2;
      break;
  }
  return area;
}
console.log(getArea("Triangle"));

// 不使用 Symbol 消除魔术字符串
const shapeType = {
  triangle: "Triangle",
  circle: "Circle",
};
function getArea(shape) {
  let area = 0;
  switch (shape) {
    case shapeType.triangle:
      area = 1;
      break;
    case shapeType.circle:
      area = 2;
      break;
  }
  return area;
}
console.log(getArea(shapeType.triangle));

// 使用 Symbol -- 'Triangle' 、'Circle' 具体是什么并不重要，因此可以用 Symbol
const shapeType = {
  triangle: Symbol(),
  circle: Symbol(),
};
function getArea(shape) {
  let area = 0;
  switch (shape) {
    case shapeType.triangle:
      area = 1;
      break;
    case shapeType.circle:
      area = 2;
      break;
  }
  return area;
}
console.log(getArea(shapeType.triangle));
```

## Set
### Set 的属性
```js
// 定义
let s = new Set();
console.log(s);

// 赋值
let s = new Set([1, 2, 3]);
console.log(s);
// 增加数据(支持链式操作)
s.add("imooc").add("es");
// 删除
s.delete(2);
// 清空
// s.clear();
console.log(s);
// 判断 set 中是否有某个值
console.log(s.has("imooc"));
// set 大小
console.log(s.size);
// 遍历
// 1
s.forEach((item) => console.log(item));
// 2
for(let item of s) {
  console.log(item);
}
// 3
for(let item of s.keys()) {
  console.log(item);
}
for(let item of s.values()) {
  console.log(item);
}
for(let item of s.entries()) {
  console.log(item[0], item[1]);
}
```

### Set 应用场景
```js
// 应用场景
// 1 -- 数组去重
let arr = [1, 2, 3, 4, 2, 3]
let s = new Set(arr)
console.log(s);

// 2 -- 数组合并去重
let arr1 = [1, 2, 3, 4];
let arr2 = [2, 3, 4, 5, 6];
let s = new Set([...arr1, ...arr2]);
console.log(s); // 得到 set 值
console.log([...s]); // 1--得到数组
console.log(Array.from(s)); // 2--得到数组

// 3 -- 求数组的交集
let s1 = new Set(arr1);
let s2 = new Set(arr2);
let result = new Set(
  arr1.filter((item) => {
    return s2.has(item);
  })
);
console.log(result);

// 4 -- 求数组的差集
let s1 = new Set(arr1);
let s2 = new Set(arr2);
let arr3 = new Set(
  arr1.filter((item) => {
    return !s2.has(item);
  })
);
let arr4 = new Set(
  arr2.filter((item) => {
    return !s1.has(item);
  })
);
console.log([...arr3, ...arr4]);
```

### WeakSet
与 Set 的区别
- WeakSet 只能添加对象
- WeakSet 不可以遍历
- 弱引用
```js
// WeakSet（只能添加对象）弱引用
let ws = new WeakSet();
const obj1 = {
  name: "imooc",
};
const obj2 = {
  age: 5,
};
ws.add(obj1);
ws.add(obj2);
// 删除对象
ws.delete(obj1);
console.log(ws);
console.log(ws.has(obj2));
// WeakSet 不可以遍历
// 垃圾回收机制 GC 计数机制，又一个引用就加1，不为0就不会回收
// WeakSet 是弱引用，不会被垃圾回收机制考虑
```

## Map
### 常用方法
```js
// 定义 Map
let m = new Map();
let obj = {
  name: "imooc",
};
// 设置值
m.set(obj, "es");
console.log(m);
// 获取值
console.log(m.get(obj));
// 删除
// m.delete(obj)
console.log(m);
console.log(m.has(obj));

let map = new Map([
  ["name", "imooc"],
  ["age", 5],
]);
console.log(map);
console.log(map.size);
console.log(map.has("name"));
console.log(map.get("age"));
map.set("name", "zhangsan"); // 覆盖之前的
map.delete("name");
console.log(map);

// 遍历
let map = new Map([
  ["name", "imooc"],
  ["age", 5],
]);
map.forEach((value, key) => {
  console.log(value, key);
})

for (let [key, value] of map) {
  console.log(key, value);
}

for (let key of map.keys()) {
  console.log(key);
}

for (let value of map.values()) {
  console.log(value);
}

for (let [key, value] of map.entries()) {
  console.log(key, value);
}
```

### 应用场景
使用对象的场景都可以使用 Map

### WeakMap
```js
// 1、WeakMap 的 key 只支持引用数据类型
let vm = new WeakMap();
vm.set([1], 2);
vm.set({ name: "imooc" }, "es");
console.log(vm);
// 2、WeakMap 不支持遍历，不支持 clear() 方法，没有 size

// 3、防止内存泄漏，当删除当前节点时，WeakMap 中的存储的值自动消失（因为不会保持对节点的引用）
let vm = new WeakMap();
let elem = document.getElementsByTagName("h1");
vm.set(elem, "info");
console.log(vm.get(elem));
```

## 模版字符串
### unicode
```js
// unicode
// es6 \uxxxx 码点 0000～ffff
// \u20BB7 -> \u20BB + 7
// \u{20BB7}
// \u{41} -> A
```

### 遍历字符串
```js
// 遍历字符串
for (let item of "imooc") {
  console.log(item);
}
```

### 使用
```js
// 1 -- 回车换行
const str3 = `法开始
减肥的宋爱见佛i奥ID
是啊放假哦啊`;
console.log(str3);

// 2 -- 变量拼接
const a = 20;
const b = 14;
const c = "ES";
const str2 = "我的年龄是：" + (a + b) + "，我在讲" + c;
console.log(str2);
const str5 = `我的年龄是：${a + b}，我在讲${c}`;

// 3 -- 嵌套模版
const isLargeScreen = () => {
  return true;
};
let class1 = "icon";
class1 += isLargeScreen() ? " icon-big" : " icon-small";
console.log(class1);
const class2 = `icon icon-${isLargeScreen() ? 'big' : 'small'}`

// 4 -- 带标签的模版字符串
const foo = (a, b, c, d) => {
  console.log(a);
  console.log(b);
  console.log(c);
  console.log(d);
};

// foo(1, 2, 3, 4)
const name = "zhangsan";
const age = 34;
foo`这是${name}, 他的年龄是${age}岁`;
```

### 新增 API
```js
// API
// fromCharCode
console.log(String.fromCharCode(0x20bb7)); // ES5
console.log(String.fromCodePoint(0x20bb7)); // ES6

// indexOf
const str = "imooc";
console.log(str.indexOf("mo1")); // -1 -- 不包含（包含则返回角标）
console.log(str.includes("mo1")); // false -- 不包含（包含则返回 true ）

// startWidth 是否以某个字符开头
console.log(str.startsWith("im"));
// endWidth
console.log(str.endsWith("oc"));
// repeat 重复
const newStr = str.repeat(10);
console.log(newStr);
```

## 数值的扩展
### 进制表示
```js
// ES5 中进制转化
// 十进制 -> 二进制
const a = 5
console.log(a.toString(2)) // 101

// 二进制 -> 十进制
const b = 101
console.log(parseInt(b, 2)) // 5

// ES6 中 0B--二进制 0o--八进制
const a = 0B0101
console.log(a) // 5
```

### 扩展方法
```js
// Number.isFinite() -- 是否是有限的
console.log(Number.isFinite(5));
console.log(Number.isFinite(0.5));
console.log(Number.isFinite(Infinity)); // false
console.log(Number.isFinite('imooc')); // false
console.log(Number.isFinite('true')); // false

// Number.isNaN()
console.log(Number.isNaN(NaN)); // true
console.log(Number.isNaN(15)); // false
// isNaN() 是 window.isNaN() 释放 window 压力，是语言更加模块化

// isInteger() 是否是整数
console.log(Number.isInteger(5)); // true
console.log(Number.isInteger(5.5)); // false

// ES 采用 IEEE 754 双精度标准
// 十进制 35 表示成 00100011
// 0.375 表示成 -> 0.011
// 0.1 表示成 -> 0.000110011... 无法整除，得倒近似值
console.log(0.1000000000000001 === 0.1) // true
```

## Proxy（代理）
### 基本使用
```js
// ES5
let obj = {};
let newVal = "";
Object.defineProperty(obj, "name", {
  get() {
    console.log("get");
    return newVal;
  },
  set(val) {
    console.log("set");
    // this.name = val; // 重复设置，会导致死循环
    newVal = val;
  },
});
console.log(obj.name);
obj.name = "es";
```
## Reflect

## 异步
### Promise
Promise 的静态方法
```js
// Promise.resolve() -- 返回一个成功的 Promise 对象
// Promise.reject() -- 返回一个失败的 Promise 对象
// Promise.all() -- 所有都完成后执行 then 方法，有一个失败则进入 catch 方法
let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log(1)
        resolve()    
    }, 1000)
})
let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log(1)
        resolve()    
    }, 2000)
})
let p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log(3)
        resolve()    
    }, 3000)
})
Promise.all([p1, p2, p3]).then(res => {
    console.log(res) // res -- 每个 Promise 返回值组成的数组
})
// Promise.race() -- 只要有一个玩成，则认为整个都是完成的
Promise.race([p1, p2, p3]).then(res => {
    console.log(res)
}, err => {
    console.log(err)
})
```
