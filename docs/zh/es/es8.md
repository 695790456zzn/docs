# es8
## async/await
用法
```js
import ajax from "./ajax";
function request(url) {
  return new Promise((resolve) => {
    ajax(url, (res) => {
      resolve(res);
    });
  });
}
async function getData() {
  const res1 = await request("static/a.json");
  console.log(res1);
  const res2 = await request("static/b.json");
  console.log(res2);
  const res3 = await request("static/c.json");
  console.log(res3);
}
getData();
```

## 对象的扩展方法
1.Object.values()
```js
const obj = {
  name: "imooc",
  web: "www.imooc.com",
  course: "es",
};
console.log(Object.keys(obj)); // ['name', 'web', 'course']
// ES5 获取对象中的 value 值
const res = Object.keys(obj).map((key) => obj[key]);
console.log(res); // ['imooc', 'www.imooc.com', 'es']

// ES6 获取对象中的 value 值
console.log(Object.values(obj)); // ['imooc', 'www.imooc.com', 'es']
```

2.Object.entries()
```js
// entries -- 获取对象中的 key 和 value
// console.log(Object.entries(obj));
for (let [key, value] of Object.entries(obj)) {
  console.log(`${key}: ${value}`); // name: imooc  web: www.imooc.com course: es
}
```

3.对象属性描述符
Object.getOwnPropertyDescriptors()
```js
const obj = {
  name: "imooc",
  course: "es",
};

const desc = Object.getOwnPropertyDescriptors(obj); // 获取对象属性的描述
console.log(desc);

const obj = {};
Reflect.defineProperty(obj, "name", {
  value: "zhangsan",
  writable: false, // 属性是否可以修改
  configurable: true, // 当前属性可否被删除
  enumerable: true, // 当前属性是否可以被循环出来
});
console.log(obj);
```

## 字符串扩展
padStart、padEnd
```js
const str = "imooc";
console.log(str.padStart(8, "x")); // str.padStart(x, y) 从头开始填充 x -- 填充的长度， y -- 填充的字符
console.log(str.padEnd(8, "y")); // str.padEnd(x, y) 从尾开始填充 x -- 填充的长度， y -- 填充的字符
console.log(str.padStart(8)); // 第二个参数不填，表示用空格填充

// 应用场景
// 1、表示日期 yyyy-mm-dd 2020-04-01
const now = new Date();
const year = now.getFullYear();
const month = (now.getMonth() + 1).toString().padStart(2, "0"); // 0~11
const day = now.getDate().toString().padStart(2, "0");
console.log(`${year}-${month}-${day}`);

// 2、隐藏手机号
const tel = "13012345678";
const newTel = tel.slice(-4).padStart(tel.length, "*");
console.log(newTel);

// 3、时间戳
console.log(new Date().getTime()); // 13位 ms
timestamp.padEnd(13, "0"); // 伪代码，将时间戳补0
```
函数参数允许使用尾逗号
