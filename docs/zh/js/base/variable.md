# 变量类型和计算
## 变量类型

> 值类型
- undefined
- string
- number （ES11新增 bigInt 类型，存储大于 2*53 的数）
- boolean
- symbol

> 引用类型
- 对象（Object）
- 数组（Array）
- null（特殊引用类型，指针指向空地址）
- fn（特殊引用类型，但不用于存储数据，所以没有拷贝、复制函数这一说）

## typeof 运算符
> 作用：
> - 识别所有值类型
> - 识别函数
> - 判断是否是引用类型

## 深拷贝
```js
const obj1 = {
    age: 20,
    name: "zhangsan",
    address: {
        city: "beijing"            
    },
    arr: ["a", "b", "c"]
}

const obj2 = deepClone(obj1);
obj2.address.city = "shanghai";
console.log(obj1.address.city);

// 深拷贝
function deepClone(obj = {}) {
    if (typeof obj !== "object" || obj == null) {
        // obj 是 null ，或者不是对象和数组，直接返回
        return obj;                
    }
    
    // 初始化返回结果
    let result
    if (obj instanceof Array) {
        result = [];
    } else {
        result = {};
    }
    
    for (let key in obj) {
        // 保证 key 不是原型的属性
        if (obj.hasOwnProperty(key)) {
            // 递归
            result[key] = deepClone(obj[key]);                                
        }    
    }
    
    // 返回结果
    return result;
}
```

## 类型转换
1. 字符串拼接
```js
const a = 100 + 10   // 110
const b = 100 + "10" // "10010"
const c = true + "10" // "true10"
```

2. "=="运算符
```js
100 == "100"         // true
0 == ""              // true
0 == false           // true
false == ""          // true
null == undefined    // true

// 除了 == null 之外，其他一律用 ===， 例如：
const obj = { x: 100 }
if (obj.a == null) {}
// 相当于
// if (obj.a === null || obj.a === undefined) { }
```

3. if 语句和逻辑运算
> truely 变量：!!a === true 的变量
>
> falsely 变量： !!a === false 的变量
```js
!!0 === false
!!NaN === false
!!"" === false
!!null === false
!!undefined === false
!!false === false

console.log(10 && 0) // 0 ( && 运算，前面为 truely ，返回后面的)
console.log("" || "abc") // "abc" ( || 运算，前面为falsely ，返回后面的)
```