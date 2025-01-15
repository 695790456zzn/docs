# 算法
## 获取多个数字中的最大值
```js
function max() {
    const nums = Array.prototype.slice.call(arguments)
    let max = 0
    nums.forEach(n => {
        if (n > max) {
            max = n        
        }    
    })
    return max
}

Math.max()
```

## 排序
### 冒泡排序
* 时间复杂度：最坏和平均情况的时间复杂度为O(n^2)
* 空间复杂度：O(1)
```js
function bubbleSort(arr) {
  const n = arr.length

  // 外层循环控制排序轮数，每轮将最大的元素推到排序部分的末尾
  for(let i = 0; i < n - 1; i++) {
    // 内层循环用于比较相邻元素，将较大元素向后移动
    for(let n = 0; j < n - i - 1; j++) {
      // 如果前一个元素比后一个元素大，交换他们的位置
      if (arr[j] > arr[j+1]) {
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
      }
    }
  }

  return arr
}
```

 冒泡排序优化算法
 * 时间复杂度：最坏和平均情况的时间复杂度为O(n^2)，如果数组有序时间复杂度为O(n)
 * 空间复杂度：O(1)
 ```js
function optimizedBubbleSort(arr) {
  const n = arr.length

  for(let i = 0; i < n - 1; i++) {
    let swapped = false // 标记本轮是否发生过交换
    for(let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j+1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true // 发生了交换，设置标记
      }
    }

    if (!swapped) break
  }
  return arr
}
 ```

 测试
 ```js
// 测试
const arr = [64, 34, 25, 12, 22, 11, 90];
console.time('bubbleSort')
console.log(bubbleSort(arr));
console.timeEnd("bubbleSort");
 ```

 ### 插入排序
 ```js
function insertionSort(arr) {
  const n = arr.length;

  // 从第二个元素开始遍历，因为第一个元素本身已排序
  for (let i = 1; i < n; i++) {
    let current = arr[i]; // 待插入的元素
    let j = i - 1;

    // 将当前元素与前面的已排序部分进行比较，寻找插入位置
    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j]; // 将已排序元素向右移动
      j--;
    }

    // 插入当前元素到正确的位置
    arr[j + 1] = current;
  }

  return arr;
}
 ```

 测试
 ```js
// 测试
console.log(insertionSort([12, 11, 13, 5, 6])); // 输出: [5, 6, 11, 12, 13]
 ```

 ### 快速排序
 1.使用 splice
 ```js
function quickSort(arr) {
  const length = arr.length
  if (length === 0) return []

  const midIndex = Math.floor(length / 2)
  const midValue = arr.splice(midIndex, 1)[0]

  const left = []
  const right = []

  for(let i = 0; i < arr.length; i++) {
    const s = arr[i]
    if (s < midValue) {
      left.push(s)
    } else {
      right.push(s)
    }
  }

  return quickSort(left).concat(midValue, quickSort(right))
}
 ```

 2.使用slice
 ```js
function quickSort(arr) {
  const length = arr.length
  if (length === 0) return []

  const midIndex = Math.floor(length / 2)
  const midValue = arr.slice(midIndex, midIndex + 1)[0]

  const left = []
  const right = []

  for(let i = 0 ;i < length; i++) {
    const s = arr[i]
    if (i !== midIndex) {
      if (s < midValue) {
        left.push(s);
      } else {
        right.push(s);
      }
    }
  }
  return quickSort(left).concat(midValue, quickSort(right))
}
 ```

 测试
 ```js
console.log(quickSort([56, 32, 45, 1, 43, 6, 21]));
 ```

 ### 选择排序
 ```js
function selectionSort(arr) {
  const n = arr.length;

  // 外层循环用于控制已排序部分的边界
  for (let i = 0; i < n - 1; i++) {
    // 假设当前第 i 个元素是最小的
    let minIndex = i;

    // 内层循环遍历未排序部分，寻找最小值的索引
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j; // 更新最小值的索引
      }
    }

    // 如果 minIndex 发生变化，交换当前元素和找到的最小值
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]; // 交换
    }
  }

  return arr;
}
 ```

测试
```js
// 测试
console.log(selectionSort([64, 25, 12, 22, 11])); // 输出: [11, 12, 22, 25, 64]
```

## 树结构与数组的相互转化
### 将数组转化为树结构
```js
function arrayToTree(arr) {
  const map = new Map()
  const roots = []

  arr.forEach(item => {
    // 克隆当前项，避免修改原数组
    const newItem = {...item, children: []}
    map.set(item.id, newItem)

    if (item.parentId == null) {
      // 如果parentId是null或undefined，则认为它是根节点
      roots.push(newItem)
    } else {
      // 否则，将其添加到父节点的children中
      const parent = map.get(item.parentId)
      if (parent) {
        parent.children.push(newItem)
      }
    }
  })

  return roots
}
```
测试
```js
// 测试
const array = [
  { id: 1, parentId: null, name: "A" },
  { id: 2, parentId: 1, name: "B" },
  { id: 3, parentId: 1, name: "C" },
  { id: 4, parentId: 2, name: "D" },
  { id: 5, parentId: 2, name: "E" },
];

const tree = arrayToTree(array);
console.log(JSON.stringify(tree, null, 2));

// 结果
[
  {
    id: 1,
    parentId: null,
    name: "A",
    children: [
      {
        id: 2,
        parentId: 1,
        name: "B",
        children: [
          {
            id: 4,
            parentId: 2,
            name: "D",
            children: [],
          },
          {
            id: 5,
            parentId: 2,
            name: "E",
            children: [],
          },
        ],
      },
      {
        id: 3,
        parentId: 1,
        name: "C",
        children: [],
      },
    ],
  },
];
```

### 将树结构转化为数组
#### 深度优先遍历
```js
function treeToArray(tree) {
  const result = []

  function traverse(node, parentId) {
    const { children, ...rest } = node
    const newNode = { ...rest, parentId }
    result.push(newNode)

    if (children && children.length) {
      children.forEach(child => traverse(child, node.id))
    }
  }

  tree.forEach(root => traverse(root, null))

  return result
}
```
#### 广度优先遍历
```js
function treeToArray(tree) {
  const result = []
  const queue = [...tree] // 使用队列存储树的节点

  while(queue.length > 0) {
    const node = queue.shift() // 从队列中取出一个节点
    const {children, ...rest} = node
    result.push({...rest, parentId: node.parentId || null}) // 将当前节点加入结果数组

    // 如果节点有子节点，加入队列
    if (children && children.length) {
      queue.push(...children)
    }
  }

  return result
}
```
测试
```js
// 测试
const tree = [
  {
    id: 1,
    parentId: null,
    name: "A",
    children: [
      {
        id: 2,
        parentId: 1,
        name: "B",
        children: [
          {
            id: 4,
            parentId: 2,
            name: "D",
            children: [],
          },
          {
            id: 5,
            parentId: 2,
            name: "E",
            children: [],
          },
        ],
      },
      {
        id: 3,
        parentId: 1,
        name: "C",
        children: [],
      },
    ],
  },
];

const array = treeToArray(tree);
console.log(JSON.stringify(array, null, 2));
```

## 求升序数组中和为n的两个数
### 嵌套循环
```js
function findTowNumbers(arr, n) {
  const res = []
  const length = arr.length
  if (length === 0) return res

  for(let i = 0; i < length; i++) {
    let n1 = arr[i]
    let flag = false
    for(let j = i+1; j < length; j++) {
      let n2 = arr[j]
      if (n1 + n2 === n) {
        res.push(n1)
        res.push(n2)
        flag = true
        break
      }
    }
    if (flag) break
  }

  return res
}
```

### 双指针
```js
function findTowNumbers(arr, n) {
  const res = []
  const length = arr.length
  if (length === 0) return res

  let i = 0
  let j = length - 1

  while(i < j) {
    let n1 = arr[i]
    let n2 = arr[j]
    let sum = n1 + n2

    if (sum < n) {
      i++
    } else if (sum > n) {
      j--
    } else {
      res.push(n1)
      res.push(n2)
      break
    }
  }

  return res
}
```
测试
```js
// 功能测试
const arr = [1, 2, 4, 7, 11, 15]
console.info(findTowNumbers(arr, 22))
```

## 旋转数组k步
### 使用pop和unshift
```js
function rotate(arr, k) {
  const length = arr.length
  if (!k || length === 0) return arr
  const step = Math.abs(k % length)

  for(let i = 0; i < step; i++) {
    const n = arr.pop()
    if (n) {
      arr.unshift(n)
    }
  }
  return arr
}
```

### 使用concat
```js
function rotate(arr, k) {
  const length = arr.length
  if (!k || length === 0) return arr
  const step = Math.abs(k % length)

  const part1 = arr.slice(-step)
  const part2 = arr.slice(0, length - step)

  return part1.concat(part2)
}
```
测试
```js
// 功能测试
const arr = [1, 2, 3, 4, 5, 6, 7]
const arr1 = rotate(arr, 3)
console.info(arr1)
```

## 二分法求数组中的目标值
### 循环
```js
function binarySearch(arr, target) {
  const length = arr.length
  if (length === 0) return -1

  let startIndex = 0
  let endIndex = length - 1

  while(startIndex < endIndex) {
    const midIndex = Math.floor((startIndex + endIndex) / 2)
    const midValue = arr[midIndex]

    if (target < midValue) {
      endIndex = midIndex - 1
    } else if (target > midValue) {
      startIndex = midIndex + 1
    } else {
      return midIndex
    }
  }

  return -1
}
```
### 递归
```js
function binarySearch(arr, target, startIndex, endIndex) {
  const length = arr.length
  if (length === 0) return -1

  if (startIndex == null) startIndex = 0
  if (endIndex == null) endIndex = length - 1

  if (startIndex > endIndex) return -1

  const midIndex = Math.floor((startIndex + endIndex) / 2)
  const midValue = arr[midIndex]

  if (target < midValue) {
    return binarySearch(arr, target, startIndex, midIndex - 1)
  } else if (target > midValue) {
    return binarySearch(arr, target, midIndex + 1, endIndex)
  } else {
    return midIndex
  }
}
```
测试
```js
// 功能测试
const arr = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120]
const target = 40
console.info(binarySearch(arr, target))
```

## 求字符串中连续最大的字符和长度
### 嵌套循环
```js
function findContinuousChar(str) {
  const res = {
    char: '',
    length: 0
  }
  const length = str.length
  if (length === 0) return res

  let tempLength = 0

  for(let i = 0; i < length; i++) {
    tempLength = 0
    for(let j = i; j < length; j++) {
      if (str[i] === str[j]) {
        tempLength++
      }

      if (str[i] !== str[j] || j === length - 1) {
        if (tempLength > res.length) {
          res.char = str[i]
          res.length = tempLength
        }

        if (j < length - 1) {
          i = j - 1
        }
        break
      }
    }
  }

  return res
}
```
### 双指针
```js
function findContinuousChar(str) {
  const res = {
    char: '',
    length: 0
  }
  const length = str.length
  if (length === 0) return res

  let tempLength = 0
  let i = 0
  let j = 0

  for(; i < length; i++) {
    if (str[i] === str[j]) {
      tempLength++
    }

    if (str[i] !== str[j] || i === length - 1) {
      if (tempLength > res.length) {
        res.char = str[j]
        res.length = tempLength
      }

      tempLength = 0
      
      if (i < length - 1) {
        j = i
        i--
      }
    }
  }

  return res
}
```
测试
```js
// 功能测试
const str = 'aabbcccddeeee11223'
console.info(findContinuousChar(str))
```

## 求斐波那契数列的第n个值
```js
function fibonacci(n) {
  if (n <= 0) return 0
  if (n === 1) return 1

  let n1 = 1
  let n2 = 0
  let res = 0

  for(let i = 2; i <= n; i++) {
    res = n1 + n2

    n2 = n1
    n1 = res
  }

  return res
}
```
测试
```js
// 功能测试
console.log(fibonacci(10))
```

## 判断字符串是否括号匹配
```js
function isMatch(left, right) {
  if (left === '(' && right === ')') return true
  if (left === '{' && right === '}') return true
  if (left === '[' && right === ']') return true
  return false
}

function matchBracket(str) {
  const length = str.length;
  if (length === 0) return true;

  const stack = [];
  const leftSymbols = "({[";
  const rightSymbols = ")}]";

  for (let i = 0; i < length; i++) {
    const s = str[i];
    if (leftSymbols.includes(s)) {
      stack.push(s);
    } else if (rightSymbols.includes(s)) {
      const top = stack[stack.length - 1];
      if (isMatch(top, s)) {
        stack.pop();
      } else {
        return false;
      }
    }
  }

  return stack.length === 0;
}
```
测试
```js
// 功能测试
const str = '{a(b[c]d)e}f'
console.info(matchBracket(str))
```

## 移动0到数组末尾
### 通过push和splice实现
```js
function moveZero(arr) {
  const length = arr.length
  if (length === 0) return

  let zeroLength = 0

  for(let i = 0; i < length - zeroLength; i++) {
    if (arr[i] === 0) {
      arr.push(0)
      arr.splice(i, 1)
      zeroLength++
      i--
    }
  }
}
```
### 双指针
```js
function moveZero(arr) {
  const length = arr.length
  if (length === 0) return

  let i = 0
  let j = -1

  for(; i < length; i++) {
    if (arr[i] === 0) {
      if (j < 0) {
        j = i
      }
    }
    if (arr[i] !== 0 && j >= 0) {
      [arr[i], arr[j]] = [arr[j], arr[i]]
      j++
    }
  }
}
```
测试
```js
// 功能测试
const arr = [1, 0, 3, 4, 0, 0, 11, 0]
moveZero(arr)
console.log(arr)
```

## 求小于max的对称数
### 转换成字符串反转比较
```js
function findPalindromeNumbers(max) {
  const res = []
  if (max <= 0) return res

  for(let i = 1; i <= max; i++) {
    const s = i.toString()
    if (s === s.split('').reverse().join('')) {
      res.push(i)
    }
  }
  return res
}
```
### 双指针
```js
function findPalindromeNumbers(max) {
  const res = []
  if (max <= 0) return res

  for(let i = 1; i <= max; i++) {
    const s = i.toString()
    const length = s.length
    let flag = true
    let startIndex = 0
    let endIndex = length - 1

    while(startIndex < endIndex) {
      if (s[startIndex] !== s[endIndex]) {
        flag = false
        break
      } else {
        startIndex++
        endIndex--
      }
    }

    if (flag) res.push(i)
  }

  return res
}
```

### 纯数字反转比较
```js
function findPalindromeNumbers(max) {
  const res = []
  if (max <= 0) return res

  for(let i = 1; i <= max; i++) {
    let n = i
    let rev = 0
    while(n > 0) {
      rev = rev * 10 + n % 10
      n = Math.floor(n / 10)
    }

    if (rev === i) res.push(i)
  }

  return res
}
```
测试
```js
// 功能测试
console.info(findPalindromeNumbers(200))
```