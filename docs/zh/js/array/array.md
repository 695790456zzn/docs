# 数组
## 创建数组
### 使用数组字面量表示法创建
```js
// 创建一个空数组
var arr1 = []

// 创建一个包好1项数据为20的数组
var arr2 = [20]

// 创建一个包含3个字符串的数组
var arr3 = ['a', 'b', 'c']
```

### 使用Array构造函数创建
```js
// 创建一个空数组
var arr1 = new Array()

// 如果只传一个数值参数，则表示创建一个初始长度为指定数值的空数组
var arr2 = new Array(20) // 创建一个包含20项的空数组
// 创建包含指定元素的数组
var arr3 = new Array('a', 'b', 'c') // ['a', 'b', 'c']
```

### Array.of 方法创建数组（es6新增）
```js
// Array.of() 方法总会创建一个包含所有传入参数的数组，而不管参数的数量和类型
let arr = Array.of(1, 2) // [1, 2]
let arr2 = Array.of(3) // [3]
```

### Array.from方法创建数组（es6新增）
在js中将非数组对象转换为真正的数组是非常麻烦的。在ES6中，将可迭代对象或者类数组对象作为第一个参数传入，Array.from()就能返回一个数组
```js
function test(...args) {
    let argArr = Array.from(args)
    console.log(arg)
}
test('a', 24, true) // ['a', 24, true]
```

## 数组方法
### join
用于把数组中的所有元素转换为一个字符串，元素是通过指定的分隔符进行分隔的，默认使用逗号作为分隔符。
```js
var arr = [1, 2, 3]
console.log(arr.join()) // 1,2,3
console.log(arr.join('-')) // 1-2-3
console.log(arr) // [1, 2, 3] 原数组不变

// 应用
// 通过 join() 方法可以实现重复字符串
function repeatString(str, n) {
    return new Array(n + 1).join(str)
}
console.log(repeatString('abc', 3)) // abcabcabc
```

### push
从数组末尾向数组添加元素，可以添加一个或多个元素
```js
var arr = [1, 2, 3]
const res = arr.push(4, 5)
console.log(res) // 5
console.log(arr) // [1, 2, 3, 4, 5]
```

### pop
删除数组最后一个元素并返回删除的元素
```js
var arr = [1, 2, 3, 4, 5]
var res = arr.pop()
console.log(res) // 5
console.log(arr) // [1, 2, 3, 4]
```

### shift
删除数组第一个元素并返回删除的值
```js
var arr = [1, 2, 3]
var res = arr.shift()
console.log(res) // 1
console.log(arr) // [2, 3]
```

### unshift
向数组的开头添加一个或多个元素，并返回新的数组长度
```js
var arr = [1, 2, 3]
var res = arr.unshift(4, 5)
console.log(res) // 5
console.log(arr) // [4, 5, 1, 2, 3]
```

### sort
对数组的元素进行排序，可以是字母或者数组，默认按字母升序
```js
var arr1 = ['b', 'c', 'a', 'd']
console.log(arr1.sort()) // ['a', 'b', 'c', 'd']
var arr2 = [13, 4, 7, 2]
console.log(arr2) // [2, 4, 7, 13]

// 升序
const numbers = [4, 2, 9, 3, 5, 1];
numbers.sort((a, b) => a - b);
console.log(numbers); // 输出: [1, 2, 3, 4, 5, 9]

// 降序
const numbers = [4, 2, 9, 3, 5, 1];
numbers.sort((a, b) => b - a);
console.log(numbers); // 输出: [9, 5, 4, 3, 2, 1]

// 按字符串长度排序
const words = ['apple', 'orange', 'banana'];
words.sort((a, b) => a.length - b.length);
console.log(words); // 输出: ['apple', 'banana', 'orange']

// 按字符串字典顺序排序
const words = ['banana', 'apple', 'orange'];
words.sort();
console.log(words); // 输出: ['apple', 'banana', 'orange']

// 对象数组按属性排序
const users = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
  { name: 'Charlie', age: 35 }
];
users.sort((a, b) => a.age - b.age);
console.log(users); // 输出: [ { name: 'Bob', age: 25 }, { name: 'Alice', age: 30 }, ... ]
```

### reverse
反转数组
```js
var arr = [13, 24, 51, 3]
console.log(arr.reverse()) // [3, 51, 24, 13]
console.log(arr) // [3, 51, 24, 13] 原数组改变
```

### concat
连接两个或多个数组，不会改变原数组，仅仅返回被连接数组的一个副本
```js
var arr = [1, 3, 5, 7]
var arrCopy = arr.concat(9, [11, 13])
console.log(arrCopy) // [1, 3, 5, 7, 9, 11, 13]
console.log(arr) // [1, 3, 5, 7] 原数组不改变
```

### slice
返回从原数组中指定开始下标到结束下标之间的项组成的新数组
接收一个或者两个参数，即要返回项的起始位置和结束位置
在只有一个参数的情况下，返回从该参数指定位置到当前数组末尾的所有项
如果有两个参数，该方法返回起始和结束为止之间的项，但不包括结束的项
当出现负数时，将负数加上数组长度的值来替换该位置的数
```js
var arr = [1, 3, 5, 7, 9, 11]
var arrCopy = arr.slice(1)
var arrCopy2 = arr.slice(1, 4)
var arrCopy3 = arr.slice(1, -2) // 相当于arr.slice(1, 4)
var arrCopy4 = arr.slice(-4, -1) // 相当于arr.slice(2, 5)
console.log(arr);   //[1, 3, 5, 7, 9, 11](原数组没变)
console.log(arrCopy);   //[3, 5, 7, 9, 11]
console.log(arrCopy2);   //[3, 5, 7]
console.log(arrCopy3);   //[3, 5, 7]
console.log(arrCopy4);   //[5, 7, 9]
```

### splice
1、可以删除人意数量多项，需要指定2个参数：要删除的第一项的位置和要删除的项数
```js
var arr = [1,2, 3, 4, 5 ,6]
var res = arr.splice(0, 2)
console.log(arr) // [3, 4, 5, 6]
console.log(res) // [1, 2]
```
2、向指定索引处添加元素
```js
var array1 = [22, 3, 31, 12];
array1.splice(1, 0, 12, 35);  //[]
console.log(array1); // [22, 12, 35, 3, 31, 12]
```
3、替换指定索引位置的元素
```js
const array1 = [22, 3, 31, 12];
array1.splice(1, 1, 8);   //[3]
console.log(array1);  // [22, 8, 31, 12]
```

### indexOf 和 lastIndexOf
接收两个参数：要查找的项和（可选的）表示查找起点位置的索引。
- indexOf()：从数组的开头（位置 0）开始向后查找。
- lastIndexOf：从数组的末尾开始向前查找。

这两个方法都返回要查找的项在数组中的位置，或者在没找到的情况下返回-1。在比较第一个参数与数组中的每一项时，会使用全等操作符。
```js
var arr = [1,3,5,7,7,5,3,1];
console.log(arr.indexOf(5));   //2
console.log(arr.lastIndexOf(5));   //5
console.log(arr.indexOf(5,2));   //2
console.log(arr.lastIndexOf(5,4));   //2
console.log(arr.indexOf("5"));   //-1
```

### forEach
参数分别为：遍历的数组内容；第对应的数组索引，数组本身
```js
var arr = [11, 22, 33, 44, 55];
arr.forEach(function(x, index, a){
 console.log(x +  |  + index +  |  + (a === arr));
});

输出为：

 11|0|true
 22|1|true
 33|2|true
 44|3|true
 55|4|true
```

### map
- map() 方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。
- map() 方法按照原始数组元素顺序依次处理元素。
- 该方法不会改变原数组
```js
var arr = [1, 2, 3, 4, 5];
var arr2 = arr.map(function(item){
 return item*item;
});
console.log(arr2);  //[1, 4, 9, 16, 25]
```

### filter
“过滤”功能，数组中的每一项运行给定函数，返回满足过滤条件组成的数组。
```js
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var arr2 = arr.filter(function(x, index) {
 return index % 3 === 0 || x >= 8;
});
console.log(arr2);  //[1, 4, 7, 8, 9, 10]
```

### fill
es6新增，填充数组
```js
// 当只有一个参数时，用参数的值填充整个数组
let arr = [1, 2, 3,  cc , 5];
arr.fill(1);
console.log(arr);//[1,1,1,1,1];

// 3 个参数： 填充数值，起始位置参数，结束位置参数（不包括结束位置的那个元素）
let arr = [1, 2, 3,  arr , 5];

arr.fill(1, 2);
console.log(arr);//[1,2,1,1,1]

arr.fill(0, 1, 3);
console.log(arr);//[1,0,0,1,1];
```

### every
判断数组中每一项都是否满足条件，只有所有项都满足条件，才会返回 true。
```js
var arr = [1, 2, 3, 4, 5];
var arr2 = arr.every(function(x) {
 return x < 10;
});
console.log(arr2);  //true
var arr3 = arr.every(function(x) {
 return x < 3;
});
console.log(arr3);  // false
```

### some
判断数组中是否存在满足条件的项，只要有一项满足条件，就会返回 true。
```js
var arr = [1, 2, 3, 4, 5];
var arr2 = arr.some(function(x) {
 return x < 3;
});
console.log(arr2);  //true
var arr3 = arr.some(function(x) {
 return x < 1;
});
console.log(arr3);  // false
```

### includes
es7新增，用来判断一个数组是否包含一个指定的值，如果是返回 true，否则 false。
```js
const array1 = [22, 3, 31, 12,  arr ];
const includes = array1.includes(31);
console.log(includes); // true

const includes1 = array1.includes(31, 3); // 从索引3开始查找31是否存在
console.log(includes1); // false

// includes使用===运算符来进行值比较，仅有一个例外：NaN 被认为与自身相等。
let values = [1, NaN, 2];
console.log(values.indexOf(NaN));//-1
console.log(values.includes(NaN));//true
```

### reduce 和 reduceRight
- 这两个方法都会实现迭代数组的所有项(即累加器)，然后构建一个最终返回的值。
- reduce()方法从数组的第一项开始，逐个遍历到最后。
- reduceRight()则从数组的最后一项开始，向前遍历到第一项。
- 4 个参数：前一个值、当前值、项的索引和数组对象
```js
var values = [1,2,3,4,5];
var sum = values.reduceRight(function(prev, cur, index, array){
return prev + cur;
},10);   //数组一开始加了一个初始值10,可以不设默认0
console.log(sum);  //25
```

### find 和 findIndex
- find()与 findIndex()方法均接受两个参数：一个回调函数，一个可选值用于指定回调函数内部的 this。
- 该回调函数可接受三个参数：数组的某个元素，该元素对应的索引位置，以及该数组本身。
- 该回调函数应当在给定的元素满足你定义的条件时返回 true，而 find()和 findIndex()方法均会在回调函数第一次返回 true 时停止查找。
- 二者的区别是：find()方法返回匹配的值，而 findIndex()返回匹配位置的索引。
```js
let arr = [1, 2, 3,  4 , 5, 1, 9];

console.log(arr.find((value, keys, arr) => {
    return value > 2;
})); // 3 返回匹配的值

console.log(arr.findIndex((value, keys, arr) => {
    return value > 2;
})); // 2 返回匹配位置的索引
```

### copyWithin
es6新增，将一段元素序列移动到另一个位置，覆盖原有元素。
```js
// target -- 必需。到目标索引位置。
// start -- 可选。源的开始索引，默认为 0。
// end -- 可选。源的结束索引，默认为数组的长度。
arr.copyWithin(target, start = 0, end = this.length)

// 使用 copyWithin 方法移动数组中的元素
let arr = [1, 2, 3, 4, 5];
 
// 将3号位（包含）之后的元素（4和5），拷贝到1号位（包含）之后的位置
arr.copyWithin(1, 3, 5);
console.log(arr); // 输出: [1, 4, 5, 4, 5]
 
// 将整个数组内容拷贝到数组起始位置，覆盖原有元素
arr.copyWithin(0);
console.log(arr); // 输出: [1, 4, 5, 4, 5]
```

### flat
- 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。
- 该方法返回一个新数组，对原数据没有影响。
- 参数： 指定要提取嵌套数组的结构深度，默认值为 1。
```js
const arr1 = [0, 1, 2, [3, 4]];

console.log(arr1.flat());
// expected output: [0, 1, 2, 3, 4]

const arr2 = [0, 1, 2, [[[3, 4]]]];

console.log(arr2.flat(2));
// expected output: [0, 1, 2, [3, 4]]

//使用 Infinity，可展开任意深度的嵌套数组
var arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
arr4.flat(Infinity);
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// 扁平化数组空项,如果原数组有空位，flat()方法会跳过空位
var arr4 = [1, 2, , 4, 5];
arr4.flat();
// [1, 2, 4, 5]
```

### flatMap
es6新增，方法对原数组的每个成员执行一个函数，相当于执行Array.prototype.map(),然后对返回值组成的数组执行flat()方法。
```js
// 相当于 [[2, 4], [3, 6], [4, 8]].flat()
[2, 3, 4].flatMap((x) => [x, x * 2])
// [2, 4, 3, 6, 4, 8]
```

### entries keys values
- ES6新增，用于遍历数组。它们都返回一个遍历器对象，可以用for...of循环进行遍历
- 区别：keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历
```js
for (let index of [ a ,  b ].keys()) {  
console.log(index);  
}  
// 0  
// 1  
for (let elem of [ a ,  b ].values()) {  
console.log(elem);  
}  
//  a   
//  b   
for (let [index, elem] of [ a ,  b ].entries()) {  
console.log(index, elem);  
}  
// 0 "a"  
// 1 "b"
```

如果不使用for...of循环，可以手动调用遍历器对象的next方法，进行遍历。
```js
let letter = [ a ,  b ,  c ];  
let entries = letter.entries();  
console.log(entries.next().value); // [0,  a ]  
console.log(entries.next().value); // [1,  b ]  
console.log(entries.next().value); // [2,  c ]
```
