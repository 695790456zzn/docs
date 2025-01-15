# LeetCode
## 判断数组中是否有重复元素
给你一个整数数组nums，如果任一值在数组中出现至少两次，返回true；如果数组中每个元素互不相同，返回false。
```js
function containsDuplicate(nums) {
  const set = new Set()
  for(const num of nums) {
    if (set.has(num)) {
      return true
    }
    set.add(num)
  }
  return false
}
```
给你一个整数数组nums和一个整数k，判断数组中是否存在两个不同的索引i 和 j，满足nums[i] == nums[j] 且 abs(i - j) <= k。如果存在，返回true，否则，返回false
```js
function containsDuplicate(nums, k) {
  const length = nums.length
  const map = new Map()
  for(let i = 0; i < length; i++) {
    const num = nums[i]
    if (map.has(num) && i - map.get(num) <= k) {
      return true
    }
    map.set(num, i)
  }
  return false
}
```

## 找出字符串中第一个匹配项的下标
给定两个字符串 haystack 和 needle ，在 haystack 字符串中找出 needle 字符串的第一个匹配项的下标（下标从0开始）。如果 needle 不是 haystack 的一部分，则返回 -1
```js
function findStringIndex(haystack, needle) {
  let pre = 0
  let after = 0
  while(after < needle.length && pre < haystack.length) {
    if (haystack[after + pre] === needle[after]) {
      after++
    } else {
      pre++
      after = 0
    }
  }
  return after === needle.length ? pre : -1
}
```

## 求最后一个单词的长度
给你一个字符串 s，由若干单词组成，单词前后用一些空格字符隔开。返回字符串中最后一个单词的长度。
```js
function lengthOfLastWord(s) {
  let end = s.length - 1
  while(end >= 0 && s[end] == ' ') end--
  if (end < 0) return 0
  let start = end
  while(start >= 0 && s[start] !== ' ') start--
  return end - start
}
```

## 求字符串数组的最长公共前缀
编写一个函数来查找字符串数组中的最长公共前缀，如果不存在公共前缀，返回空字符串
```js
function longestCommonPrefix(strs) {
  let res = ''
  if (!strs.length) return res
  for(let i = 0; i < strs[0].length; i++) {
    for(let j = 1; j < strs.length; j++) {
      if (strs[j][i] !== strs[0][i]) return res
    }
    res += strs[0][i]
  }
  return res
}
```

## 删除有序数组中的重复项
给你一个非严格递增排列的数组 nums，原地删除重复出现的元素，使每个元素只出现一次，返回删除后数组的新长度。元素的相对顺序应该保持一致。然后返回 nums 中唯一元素的个数。
```js
function removeDuplicates(nums) {
  if (!nums.length) return 0
  let i = 0
  for(let j = 1; j < nums.length; j++) {
    if (nums[j] !== nums[i]) {
      i++
      nums[i] = nums[j]
    }
  }
  return i + 1
}
```
测试
```js
// 测试
const nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]
console.log(removeDuplicates(nums));
```

## 移除元素
给定一个数组 nums 和一个值 val，原地移除所有数值等于 val 的元素。元素的顺序可能发生改变。然后返回 nums 中与 val 不同的元素的数量。
```js
function removeElement(nums, val) {
  let i = 0
  for(let num of nums) {
    if (num !== val) {
      nums[i] = num
      i++
    }
  }
  return i
}
```
测试
```js
// 测试
const nums = [3, 2, 2, 3]
console.log(removeElement(nums, 3)); // 2
```

## 反转字符串
编写一个函数，将输入的字符串反转过来。输入字符串以字符数组 s 的形式给出。不要给另外的数组分配额外的空间，原地修改数组，使用 O(1) 的额外空间解决这一问题。
```js
function reverseString(s) {
  const n = s.length
  for(let left = 0, right = n - 1; left < right; ++left, --right) {
    [s[left], s[right]] = [s[right], s[left]]
  }
  return s
}
```
测试
```js
// 测试
const s = ["h", "e", "l", "l", "o"];
console.log(reverseString(s));
```

## 求数组中只出现一次的数字
* 给你一个非空整数数组 nums，除了某个元素只出现一次以外
* 其余每个元素均出现两次。找出那个只出现了一次的元素
* 解：使用异或运算
```js
function singleNumber(nums) {
  let res = 0
  for(let i = 0; i < nums.length; i++) {
    res ^= nums[i]
  }
  return res
}
```
测试
```js
// 测试
const nums = [4, 1, 2, 1, 2];
console.log(singleNumber(nums));
```

## 求数组中的两数之和
给定一个整数数组 nums 和一个整数目标值 target， 找出数组中和为 target 的两个整数，并返回他们的数组下标（数组中仅有两个值和为target）
```js
function twoNumberSum(nums, target) {
  const prevNums = {}

  for(let i = 0; i < nums.length; i++) {
    const curNum = nums[i]
    const targetNum = target - curNum
    const targetNumIndex = prevNums[targetNum]
    if (targetNumIndex !== undefined) {
      return [targetNumIndex, i]
    } else {
      prevNums[curNum] = i
    }
  }
}
```
测试
```js
const arr = [3, 2, 4]
console.log(twoNumberSum(arr, 6)); // [1, 2]
```