# TS基本使用
[TypeScript中文文档](https://nodejs.cn/typescript/)
## TS 优点和缺点
优点：

* 静态类型
* 有类型错误，编译时就报错（而非运行时）
* 智能提示，提高开发效率和稳定性

缺点：

* 有一定学习成本
* 某些情况下，类型定义过于混乱，可读性不好
* 应用不规范，会变成‘any’script

## 适用场景

* 大型项目，业务复杂，维护人员多
* 逻辑性比较强的代码，需要类型更稳定
* 组内要有至少一个懂 TS 的技术 leader 负责把控代码规范

## TS 基础类型
### 常见的基础类型
- boolean
- number
- string
- symbol
- undefined
- null
```js
// 类型断言 -- 赋值明确变量类型时，可以不明确指定变量的类型
const n = 100
```

### 其他类型
数组（Array）：单一类型
```js
const arr1: number[] = [1, 2, 3]
const arr2: Array<number> = [10, 20, 30]
```

元组（Tuple）：多个类型
```js
const x: [string, number] = ['x', 10]
```

枚举（本质就是 JS 对象）
```js
enum Color {
    Red,
    Green,
    Blue
}
const c: Color = Color.Red
```

对象和函数（一般用自定义类型）
```js
interface User {
    name: string
    age: number
    sayHi: (a: string) => string
}
const user: User = {
    name: 'a',
    age: 20,
    sayHi(a: string) {
        return a    
    }
}
```

## TS 访问修饰符
### 访问修饰符
- public（默认）：全部可访问
- protected：自己和派生类可访问
- private：只有自己可访问
```js
class Person {
  public name: string = ''
  protected age: number = 0
  private girlfriend: string

  // 访问修饰符：可以修饰属性，也可以修饰方法

  constructor(name: string, age: number) {
    this.name = name
    this.age = age

    this.girlfriend = '小丽'
    console.log(this.girlfriend);
  }
}

class Employee extends Person {
  constructor(name: string, age: number) {
    super(name, age)
  }

  getInfo() {
    console.log(this.name);
    console.log(this.age);
    // console.log(this.girlfriend);
  }
}

const x = new Employee('x', 20)
x.name
// x.age // 报错，不能在外面获取
```

### 属性可以直接定义到构造函数的参数中
```js
class Person {
  constructor(
    public name: string,
    protected age: number,
    private girlfriend = '小丽'
  ) {}
}
```

### \#和 private 有什么区别？
- \# 属性不能在构造函数参数中定义
- private 属性，可通过 as any 强制获取，但 \# 属性不行
- \#  更加私密
```js
class Person {
  #salary: number;
  constructor(private name: string, salary: number) {
    this.#salary = salary;
  }

  print() {
    console.log(this.#salary);
    console.log(this.name);
  }
}

const p = new Person('xxx', 5000)
console.log((p as any).name); // 可以强制获取
// console.log((p as any).#salary); // 报错，无法强制获取
```

## 泛型
### 定义的位置
定义在函数中
```js
function fn<T>(arg: T): T {
  return arg
}
const x = fn<number>(100)

// function fn1<T, U>(a: T, b: U) {
//   console.log(a, b);
// }
// fn1<string, number>('x', 10)
```

定义在 class 中
```js
class SomeClass<T> {
  name: T
  constructor(name: T) {
    this.name = name
  }
  getName(): T {
    return this.name
  }
}
const s1 = new SomeClass<string>('xx')
const s2 = new SomeClass<number>(100)
```

定义于 interface 和 type
```js
// 定义在 type 中
const myFn: <U>(arg: U) => U = fn

// 定义在 interface 中
const list: Array<string> = ['x']

interface F1<T> {
  (arg: T): T
}

const myFn2: F1<string> = fn
```

### 泛型的使用
可以传入任何类型，包括 interface 和 type
```js
// 泛型，可以传入任何类型
interface User {
  name: string
  age: number
}
const u = fn<User>({ name: 'x', age: 10 })
```

可以当作任何类型来使用，如放在数组中
```js
// 泛型，可以当作任何类型来使用
function fn3<T>(arg: Array<T>) {
  console.log(arg);
}
fn3<string>(['x'])
fn3<number>([10, 20])
```

可以自定义扩展泛型的属性
```js
// 泛型的扩展
interface F2 {
  length: number
}
function fn4<T extends F2>(arg: T) {
  console.log(arg.length);
}
fn4<string>('xxx')
fn4<number[]>([10, 20])
```

## TS 交叉类型和联合类型
### 交叉类型
多个类型合并为一个类型
```js
interface U1 {
  name: string
  city: string
}
interface U2 {
  name: string
  age: number
}

// 交叉类型
type UserType1 = U1 & U2
const user1: UserType1 = {name: 'xx', city: 'beijing', age: 20}
// 可获取 U1 U2 的所有属性（并集）
// 如果属性类型冲突了，那该属性类型是 never
// 基础类型，不能交叉
type T1 = string & number
```

### 联合类型
联合多个类型 T1｜T2｜T3，一种“或”的关系，基础类型可以联合
```js
interface U1 {
  name: string
  city: string
}
interface U2 {
  name: string
  age: number
}

function fn(): U1 | U2 {
  return {
    name: 'x',
    city: 'x'
  }
}

type T = string | number
const a: T = 100

function fn1(a: number | string) {
  // console.log(a.length);
}
```

## TS 特殊符号
### ? 
```js
// ? 可选
interface User {
  name: string
  age?: number
}
const u: User = {name: 'x'}

function fn(a: number, b?: number) {
  console.log(a, b);
}
fn(10)
```

### ?.
```js
// ?. 可选链
const user: any = {
  info: {
    city: '北京'
  }
}
// const city = user && user.info && user.info.city
const city = user?.info?.city
```

### ?? 
空值合并运算符（只有左侧是 null 或者 undefined，才会返回右侧。补齐 ||）
```js
// ?? 空值合并运算符（只有左侧是 null 或者 undefined，才会返回右侧。补齐 ||）
const user1: any = {
  name: '张三',
  index: 0
}
const n1 = user1.name ?? '暂无姓名'
const n2 = user1.name || "暂无姓名";

const i1 = user1.index ?? '暂无 index' // 0
const i2 = user1.index || '暂无 index' // '暂无 index'
```

### !
非空断言操作符
```js
// ! 非空断言操作符
function fn1(a?: string) {
  return a!.length // !表示你已经知道了 a 不会是 undefined
}
```
### _
数字分隔符
```js
// _ 数字分隔符
const million = 1_000_000
const phone = 135_1111_2222
```

### & - 交叉类型
### ｜- 联合类型
### # - 私有属性

## TS 常见的工具类型
### Partial\<T\>
获取部分属性
```js
interface User {
  name: string
  age: number
  city: string
}
const u: Partial<User> = {name: 'x'}
```

### Required\<T\>
所有属性都是必须的
```js
interface User {
  name?: string
  age?: number
  city?: string
}
const u: Required<User> = {name: 'x', age: 20, city: 'x'}
```

### Pick\<T, K\>
选取几个属性
```js
interface User {
  name: string
  age: number
  city: string
}

type User1 = Pick<User, 'name' | 'age'>
const u: User1 = { name: 'x', age: 20 }
```

### Omit\<T, K\>
剔除几个属性
```js
interface User {
  name: string
  age: number
  city: string
}

type User2 = Omit<User, 'city'>
const u2: User2 = {name: 'x', age: 20}
```

### ReadOnly\<T\>
把所有属性设置为只读
```js
interface User {
  name: string
  age: number
  city: string
}

type User3 = Readonly<User>
const u3: User3 = { name: 'x', age: 20, city: 'x' }
```
