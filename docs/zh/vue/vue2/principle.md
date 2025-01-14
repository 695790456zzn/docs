# Vue2原理
## 组件化基础
组件化的概念很早就有，但更多的使用操作DOM的方式去实现，更新还要依赖于操作DOM，Vue的组件化与之不同的就是数据去驱动视图。

MVVM
- M -- Model 数据层
- V -- View 视图层
- VM -- ViewModel 数据和视图的链接层

![MVVM](/images/vue/mvvm.png)

## 响应式
组件 data 的数据一旦变化，立即触发视图的更新

Object.defineProperty
```js
function updateView() {
    console.log('视图更新')
}

// 重新定义数组原型
const oldArrayProperty = Array.prototype
// 创建新对象，原型指向oldArrayProperty，再扩展方法不会影响原型aq
const arrProto = Object.creat(oldArrayProperty);
['push', 'pop', 'shift', 'unshift', 'splice'].forEach(methodName => {
    arrProto[methodName] = function () {
           // 更新视图
           updateView()
           oldArrayProperty[methodName].call(this, ...arguments) 
    }
})

// 重新定义属性，监听起来
function defineReactive(target, key, value) {
    // 深度监听
    observer(value)
    // 核心API
    Object.defineProperty(target, key, {
        get () {
            return value        
        },
        set (newValue) {
            if (newValue !== value) {
                // 设置新值，深度监听
                observer(newValue)
                // 注意，value一直在闭包中，此处设置完以后，再get时也是新值
                value = newValue 
                // 触发视图更新
                updateView()                           
            }        
        }
    })
}

// 监听对象属性
function observe(target) {
    if (typeof target !== 'object' || target === null) {
        // 不是数组或对象
        return target    
    }
    
    if (Array.isArray(target)) {
        target.__proto__ = arrProto    
    }
    // 重新定义各个属性（for in 也可以遍历数组）
    for (let key in target) {
        defineReactive(target, key, target[key])    
    }
}

// 数据
const data = {
    name: 'zhangsan',
    age: 20,
    info: {
        address: '北京'    
    },
    nums: [10, 20, 30]
}

// 监听数据
observer(data)

// 测试
data.name = 'lisi'
data.age = 21
data.x = '100' // 新增属性，监听不到 -- 所以有Vue.set
delete data.name // 删除属性，监听不到--所以有Vue.delete
data.info.address = '上海' // 深度监听
data.nums.push(40) // 监听数组
```
**缺点：**
- 深度监听，需要递归到底，一次性计算量大
- 无法监听新增属性/删除属性（Vue.set  Vue.delete）
- 无法原生监听数组，需要特殊处理

### 响应式原理实现过程（文字描述）
1.数据劫持

Vue 通过 Object.defineProperty 对数据对象的属性进行劫持，拦截对属性的访问和修改。当数据被访问时，Vue会将当前的 Watcher 记录下来，以便在数据变化时通知它。
```js
class Observer {
  constructor(data) {
    this.walk(data);
  }

  walk(data) {
    Object.keys(data).forEach(key => this.defineReactive(data, key, data[key]));
  }

  defineReactive(obj, key, val) {
    const dep = new Dep(); // 为每个属性创建一个 Dep
    const childObj = typeof val === 'object' ? new Observer(val) : null; // 如果是对象，递归观察

    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        if (Dep.target) {
          dep.addSub(Dep.target); // 收集依赖
        }
        return val;
      },
      set(newVal) {
        if (newVal !== val) {
          val = newVal; // 更新值
          childObj && childObj.walk(newVal); // 递归观察新值
          dep.notify(); // 通知所有依赖
        }
      }
    });
  }
}
```

2.Watcher：Watcher 是一个观察者，它负责监听数据的变化。当数据变化时，Watcher 会被通知并执行相应的回调。创建 Watcher 时，Vue 会在构造函数中进行一些初始化操作，包括：
- 将当前 Watcher 推入一个栈中，以便在访问数据时能够记录依赖。
- 在 getter 中收集依赖（即将当前的 Watcher 记录到依赖的 Dep 中）
- 执行 getter，并在 getter 执行完成后，将当前 Watcher 从栈中弹出。

```js
class Watcher {
  constructor(getter) {
    this.getter = getter;
    this.value = this.get(); // 初始化时获取值并收集依赖
  }

  get() {
    // 将当前的 Watcher 收集到 Dep 中
    Dep.target = this; // 设置当前的 Watcher
    const value = this.getter(); // 触发 getter
    Dep.target = null; // 清空当前的 Watcher
    return value;
  }

  update() {
    // 当数据变化时调用
    this.value = this.get(); // 重新获取值
    console.log('视图更新:', this.value);
  }
}
```

3.Dep（依赖收集）

Dep 是一个用于管理依赖关系的类。每个被劫持的属性都有一个对应的 Dep 实例。当 Watcher 访问某个属性时，它会将自己添加到该属性的 Dep 中，这样，当属性的值发生变化时，Dep 可以通知所有依赖于该属性的 Watcher 进行更新。

```js
class Dep {
  constructor() {
    this.subscribers = new Set(); // 用 Set 来存储订阅者
  }

  // 添加订阅者
  addSub(sub) {
    this.subscribers.add(sub);
  }

  // 通知所有订阅者
  notify() {
    this.subscribers.forEach(sub => sub.update());
  }
}
```

4.更新机制

当数据被修改时，Vue 会调用相应的 setter，在setter 中，Vue 会触发 Dep 的通知机制，通知所有依赖于该数据的 Watcher。这些 Watcher 会重新计算并更新视图。

## 虚拟DOM
[Snabbdom](https://github.com/snabbdom/snabbdom)

用 JS 模拟 DOM 结构
```js
<div id="div1" class="container">
    <p>vdom</p>
    <ul style="font-size: 20px">
        <li>a</li>
    </ul>
</div>

// 用 JS 模拟
{
    tag: 'div',
    props: {
        id: 'div1',
        className: 'container'    
    },
    children: [
        {
            tag: 'p',
            children: 'vdom'        
        },
        {
            tag: 'ul',
            props: { style: 'font-size: 20px' },
            children: [
                {
                    tag: 'li',
                    children: 'a'                
                }            
            ]        
        }    
    ]
}
```

snnabbdom使用 
- h 函数：用 JS 生成虚拟 DOM 结构，返回 vnode
patch：
- 1、将 vnode 放入容器中渲染
- 2、更新 vnode

### diff 算法
树 diff 算法的时间复杂度 O(n^3)
优化后，时间复杂度到 O(n)
- 只比较同一层级，不跨级比较
- tag（虚拟 DOM 标签） 不相同，则直接删掉重建，不再深度比较
- tag 和 key，两者都相同，则认为是相同节点，不再深度比较
![diff](/images/vue/diff.png)

snabbdom 源码：
- patchVnode：做 vnode 对比
- addVnodes（添加 children ） removeVnodes
- updateChildren( key 的重要性)

### Diff算法的实现原理
基本思想：
- 同层比较：在同一层级的节点之间进行比较，避免跨层比较。
- 最小化操作：尽量减少对真实DOM的操作，以提高性能。

实现步骤：

1.比较两个虚拟节点
- 如果两个节点的类型不同，直接替换整个节点。
- 如果节点类型相同，继续比较它们的属性和子节点。
```js
function patch(oldVNode, newVNode) {
  if (!oldVNode) {
    // 如果旧节点不存在，直接创建新节点
    return createElement(newVNode);
  }

  if (!newVNode) {
    // 如果新节点不存在，删除旧节点
    return removeElement(oldVNode.el);
  }

  if (oldVNode.tag !== newVNode.tag) {
    // 节点类型不同，替换节点
    return replaceElement(oldVNode, newVNode);
  }

  // 节点类型相同，更新属性和子节点
  updateProps(oldVNode, newVNode);
  updateChildren(oldVNode.children, newVNode.children);
}
```
2.更新节点属性
- 在比较节点时，如果节点的类型相同，需要更新节点的属性。可以通过 setAttribute 方法来设置新的属性
```js
function updateProps(oldVNode, newVNode) {
  const el = oldVNode.el;
  const newProps = newVNode.props || {};
  const oldProps = oldVNode.props || {};

  // 更新属性
  for (const key in newProps) {
    if (newProps[key] !== oldProps[key]) {
      el.setAttribute(key, newProps[key]);
    }
  }

  // 删除旧属性
  for (const key in oldProps) {
    if (!(key in newProps)) {
      el.removeAttribute(key);
    }
  }
}
```
3.更新子节点
- 对于子节点的比较，Diff 算法采用了不同的策略。Vue2.0 中使用的是“双指针”方法来优化子节点的更新。
```js
function updateChildren(oldChildren, newChildren) {
  let oldStartIdx = 0;
  let newStartIdx = 0;
  let oldEndIdx = oldChildren.length - 1;
  let newEndIdx = newChildren.length - 1;

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    const oldVNode = oldChildren[oldStartIdx];
    const newVNode = newChildren[newStartIdx];

    if (oldVNode.key === newVNode.key) {
      // 如果 key 相同，说明是同一个节点，继续比较
      patch(oldVNode, newVNode);
      oldStartIdx++;
      newStartIdx++;
    } else {
      // 处理其他情况（例如移动、插入、删除等）
      // ...
    }
  }

  // 处理剩余节点的插入或删除
  if (newStartIdx <= newEndIdx) {
    // 新节点还有剩余，插入新节点
    for (let i = newStartIdx; i <= newEndIdx; i++) {
      const newVNode = newChildren[i];
      // 插入操作
    }
  }

  if (oldStartIdx <= oldEndIdx) {
    // 旧节点还有剩余，删除旧节点
    for (let i = oldStartIdx; i <= oldEndIdx; i++) {
      const oldVNode = oldChildren[i];
      // 删除操作
    }
  }
}
```

## 模版编译
with：
- 改变 {} 内自由变量的查找规则，当作 obj 属性来查找
- 如果找不到匹配的 obj 属性，就会报错
- with 要慎用，它打破了作用域规则，易读性变差
```js
const obj = {a: 100, b: 200}
console.log(obj.a)
console.log(obj.b)
console.log(obj.c) // undefined

// 使用 with ，能改变 {} 内自由变量的查找方式
// 将 {} 内自由变量，当作 obj 的属性来查找
with(obj) {
    console.log(a)
    console.log(b)
    console.log(c) // 会报错！！！
}
```

模版编译：
- 模版编译为 render 函数，执行 render 函数返回 vnode
- 基于 vnode 再执行 patch 和 diff
- 使用 webpack vue-loader ， 会在开发环境下编译模版（性能优化）

## 组件 渲染/更新 过程
初次渲染过程：
- 解析模版为 render 函数（或在开发环境已完成， vue-loader）
- 触发响应式，监听 data 属性 getter setter
- 执行 render 函数，生成 vnode ， patch(elem, vnode)

更新过程：
- 修改 data， 触发 setter（此前在 getter 中已被监听）
- 重新执行 render 函数，生成 newVnode
- patch(vnode, newVnode)

## 异步渲染
- 汇总 data 的修改，一次性更新视图
- 减少 DOM 操作次数，提高性能

## 前端路由原理
网页 url 组成部分
```js
// http://127.0.0.1:8881/01-hash.html?a=100&b=20#/aaa/bbb
location.protocol // 'http:'
location.hostname // '127.0.0.1'
location.host // '127.0.0.1:8881'
location.port // '8881'
location.pathname // '01-hash.html'
location.search // '?a=100&b=20'
location.hash // '#/aaa/bbb'!!
```
hash 的特点 -- 通过 window.onhashchange 监听
- hash 变化会触发网页跳转，即浏览器的前进、后退
- hash 变化不会刷新页面， SPA 必须的特点
- hash 永远不会提交到 server 端（前端自生自灭）
```js
<script>
    // hash 变化，包括：
    // a. JS 修改 url
    // b. 手动修改 url 的 hash
    // c. 浏览器前进、后退
    window.onhashchange = (event) => {
        console.log('old url', event.oldURL)
        console.log('new url', event.newURL)

        console.log('hash:', location.hash)
    }

    // 页面初次加载，获取 hash
    document.addEventListener('DOMContentLoaded', () => {
        console.log('hash:', location.hash)
    })

    // JS 修改 url
    document.getElementById('btn1').addEventListener('click', () => {
        location.href = '#/user'
    })
</script>
```

H5 history
- 用 url 规范的路由，但跳转时不刷新页面
- history.pushState -- 监听路由切换
- window.onpopstate -- 监听浏览器前进后退
```js
<script>
    // 页面初次加载，获取 path
    document.addEventListener('DOMContentLoaded', () => {
        console.log('load', location.pathname)
    })

    // 打开一个新的路由
    // 【注意】用 pushState 方式，浏览器不会刷新页面
    document.getElementById('btn1').addEventListener('click', () => {
        const state = { name: 'page1' }
        console.log('切换路由到', 'page1')
        history.pushState(state, '', 'page1') // 重要！！
    })

    // 监听浏览器前进、后退
    window.onpopstate = (event) => { // 重要！！
        console.log('onpopstate', event.state, location.pathname)
    }

    // 需要 server 端配合，可参考
    // https://router.vuejs.org/zh/guide/essentials/history-mode.html#%E5%90%8E%E7%AB%AF%E9%85%8D%E7%BD%AE%E4%BE%8B%E5%AD%90
</script>
```

