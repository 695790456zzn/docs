# es7
## includes
1.基本用法
```js
// 基本用法
const arr = ["es6", "es7", "es8"];
console.log(arr.includes("es7")); // true
console.log(arr.includes("es8")); // false
console.log(arr.includes("es7", 1)); // true
console.log(arr.includes("es7", 2)); // false
console.log(arr.includes("es7", -1)); // false -1 -- 从后面数
console.log(arr.includes("es7", -2)); // true
```

2.只能检测是否包含基本数据类型
```js
// 只能判断是否包含基本数据类型
const arr = ['es6', ['es7', 'es8'], 'es9']
console.log(arr.includes(['es7', 'es8'])); // false
console.log(arr.indexOf(['es7', 'es8'])); // -1
```

3.能够检测是否包含 NaN
```js
// 是否能检测 NaN
const arr = ["es6", "es7", NaN, "es8"];
console.log(arr.includes(NaN)); // true
console.log(arr.indexOf(NaN)); // -1 （不能检测 NaN）
```

## 幂运算符
**
```js
// 求 2^10 -> 1024
// 1 -- 自定义方法
function pow(x, y) {
  let res = 1
  for(let i = 0; i < y; i++) {
    res *= x
  }
  return res
}
console.log(pow(2, 10));

// 2 -- Math
console.log(Math.pow(2, 10));

// 3 -- ES7
console.log(2 ** 10);
```
