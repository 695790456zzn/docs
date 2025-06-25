# es9
## 异步迭代
```js
// 同步迭代
const arr = ["es6", "es7", "es8", "es9"];
arr[Symbol.iterator] = function () {
  let nextIndex = 0;
  return {
    next() {
      return nextIndex < arr.length
        ? {
            value: arr[nextIndex++],
            done: false,
          }
        : {
            value: undefined,
            done: true,
          };
    },
  };
};

for (let item of arr) {
  console.log(item);
}

// 异步迭代
function getPromise(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        value: time,
        done: false,
      });
    }, time);
  });
}
const arr = [getPromise(1000), getPromise(2000), getPromise(3000)];
arr[Symbol.asyncIterator] = function () {
  let nextIndex = 0;
  return {
    next() {
      return nextIndex < arr.length
        ? arr[nextIndex++]
        : Promise.resolve({
            value: undefined,
            done: true,
          });
    },
  };
};

async function test() {
  for await (let item of arr) {
    console.log(item);
  }
}
test();
```

## 正则表达式扩展
1.dotAll
```js
// dot
const reg = /./
console.log(reg.test('5')); // true
console.log(reg.test('x')); // true
console.log(reg.test('\n')); // false
console.log(reg.test('\r')); // false
console.log(reg.test('\u{2028}')); // false
console.log(reg.test('\u{2029}')); // false

// dotAll
const reg = /./s;
console.log(reg.test("5")); // true
console.log(reg.test("x")); // true
console.log(reg.test("\n")); // true
console.log(reg.test("\r")); // true
console.log(reg.test("\u{2028}")); // true
console.log(reg.test("\u{2029}")); // true
```

2.具名组匹配
```js
// 具名组匹配
const date = /(\d{4})-(\d{2})-(\d{2})/.exec("2020-01-01");
// ES9 之前写法
console.log(date[1]);
console.log(date[2]);
console.log(date[3]);

const reg = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
// console.log(reg.exec("2020-02-01"));
const groups = reg.exec("2020-02-01").groups;
// const year = groups.year;
// const month = groups.month;
// const day = groups.day;
const { year, month, day } = groups;
console.log(year, month, day);
```

3.后行断言
```js
const str = "ecmascript";
// 先行断言
console.log(str.match(/ecma(?=script)/));
// 后行断言
console.log(str.match(/(?<=ecma)script/));
```

## 对象扩展
```js
const obj1 = {
  name: "zhangsan",
  age: 20,
};
const obj2 = {
  school: "imooc",
};
// 克隆对象
const obj3 = { ...obj1 };
console.log(obj3);

// 合并对象
const obj4 = {...obj1, ...obj2}
console.log(obj4);

// 匹配剩余属性
const obj1 = {
  name: "zhangsan",
  age: 20,
  school: "imooc",
  course: "es",
};
const { name, age, ...rest } = obj1;
console.log(name);
console.log(age);
console.log(rest);
```

## Promise扩展
finally
```js
new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve("success");
    reject("fail");
  }, 1000);
})
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    // 场景一：loading 动画，无论请求成功或者失败都消失
    // 场景二：数据库请求完成，关闭数据库的连接
    console.log("finally");
  });
```
## 字符串扩展
放松了模版字符串转义序列的语法限制