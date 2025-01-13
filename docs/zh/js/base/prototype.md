# 原型和原型链
## class 和 class的继承
```js
// 父类
class People {
    constructor(name) {
        this.name = name    
    }
    eat() {
        console.log(`${this.name} eat something`)            
    }
}

// 子类
class Student extends People {
    constructor(name, number) {
        super(name);
        this.number = number;    
    }
    sayHi () {
        console.log(
            `姓名 ${this.name} , 学号 ${this.number}`        
        )    
    }
}

// 子类
class Teacher extends People {
    constructor(name, major) {
        super(name);
        this.major = major;    
    }
    teach() {
        console.log(`${this.name} 教授 ${this.major}`)    
    }
}

// 实例
const xialuo = new Student("夏洛", 100)
console.log(xialuo.name)
console.log(xialuo.number)
xialuo.sayHi()
xialuo.eat()

// 实例
const wanglaoshi = new Teacher("王老师", "语文");
console.log(wanglaoshi.name)
console.log(wanglaoshi.major)
wanglaoshi.teach()
wanglaoshi.eat()
```

## 类型判断
```js
// 基于上面的类，可进行如下判断
xialuo instanceof Student      // true
xialuo instanceof People       // true
xialuo instanceof Object       // true

[] instanceof Array            // true
[] instanceof Object           // true
{} instanceof Object           // true
```
## 原型关系
- **每个 class 都有显式原型 prototype**
- **每个实例都有隐式原型 __proto__**
- **实例的 __proto__ 指向对应 class 的 prototype**
> 基于原型的执行规则：**获取属性 xialuo.name 或执行方法 xialuo.sayHi() 时，先在自身属性和方法寻找，如果找不到则自动去 __proto__ 中去查找**

## 原型链
![这是原型图片](/images/js/prototype.png)

## 简易jQuery的实现
```js
class jQuery {
    constructor(selector) {
        const result = document.querySelectorAll(selector);
        const length = result.length;
        for (let i = 0; i < length; i++) {
           this[i] = result[i];        
        } 
        this.length = length; 
        this.selector = selector;          
    }
    get(index) {
        return this[index];    
    }
    each(fn) {
        for(let i = 0; i < this.length; i++) {
            const elem = this[i];
            fn(elem);        
        }    
    }
    on(type, fn) {
        return this.each(elem => {
            elem.addEventListener(type, fn, false);        
        })    
    }
}

// 插件
jQuery.prototype.dialog = function (info) {
    alert(info)
}

// 造轮子
class myJQuery extends jQuery {
    constructor(selector) {
        super(selector);    
    }
    // 扩展自己的方法
    ...
}
```