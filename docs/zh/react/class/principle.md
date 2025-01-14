# 原理
[代码编译演示](https://www.babeljs.cn)
## JSX本质
```jsx
// JSX 基本用法
const imgElem = <div id="div1">
    <p>some text</p>
    <img src={imgUrl}/>
</div>

// JSX style
const styleData = { fontSize: '30px',  color: 'blue' }
const styleElem = <p style={styleData}>设置 style</p>

// JSX 加载组件
const app = <div>
    <Input submitTitle={onSubmitTitle}/>
    <List list={list}/>
</div>

// JSX 事件
const eventList = <p onClick={this.clickHandler}>
    some text
</p>

// JSX list
const listElem = <ul>{this.state.list.map((item, index) => {
    return <li key={item.id}>index {index}; title {item.title}</li>
})}</ul>

// 编译后
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
// JSX 基本用法
const imgElem = /*#__PURE__*/_jsxs("div", {
  id: "div1",
  children: [/*#__PURE__*/_jsx("p", {
    children: "some text"
  }), /*#__PURE__*/_jsx("img", {
    src: imgUrl
  })]
});

// JSX style
const styleData = {
  fontSize: '30px',
  color: 'blue'
};
const styleElem = /*#__PURE__*/_jsx("p", {
  style: styleData,
  children: "\u8BBE\u7F6E style"
});

// JSX 加载组件
const app = /*#__PURE__*/_jsxs("div", {
  children: [/*#__PURE__*/_jsx(Input, {
    submitTitle: onSubmitTitle
  }), /*#__PURE__*/_jsx(List, {
    list: list
  })]
});

// JSX 事件
const eventList = /*#__PURE__*/_jsx("p", {
  onClick: this.clickHandler,
  children: "some text"
});

// JSX list
const listElem = /*#__PURE__*/_jsx("ul", {
  children: this.state.list.map((item, index) => {
    return /*#__PURE__*/_jsxs("li", {
      children: ["index ", index, "; title ", item.title]
    }, item.id);
  })
});

// // 总结
// React.createElement('div', null, [child1, child2, child3])
// React.createElement('div', {...}, child1, child2, child3)
// React.createElement(List, null, child1, child2, '文本节点')
// // h 函数
// // 返回 vnode
// // patch
// 类似于 h 函数，返回 vnode
```

## 合成事件：SyntheticEvent
现象
```js
event.preventDefault() // 阻止默认行为
event.stopPropagation() // 阻止冒泡
console.log('target', event.target) // 指向当前元素，即当前元素触发
console.log('current target', event.currentTarget) // 指向当前元素，假象！！！

// 注意，event 其实是 React 封装的。可以看 __proto__.constructor 是 SyntheticEvent 组合事件
console.log('event', event) // 不是原生的 Event ，原生的 MouseEvent
console.log('event.__proto__.constructor', event.__proto__.constructor)

// 原生 event 如下。其 __proto__.constructor 是 MouseEvent
console.log('nativeEvent', event.nativeEvent)
console.log('nativeEvent target', event.nativeEvent.target)  // 指向当前元素，即当前元素触发
console.log('nativeEvent current target', event.nativeEvent.currentTarget) // 指向 document ！！！

// 1. event 是 SyntheticEvent ，模拟出来 DOM 事件所有能力
// 2. event.nativeEvent 是原生事件对象
// 3. 所有的事件，都被挂载到 document 上
// 4. 和 DOM 事件不一样，和 Vue 事件也不一样
```
![合成事件图示](/images/react/synthetic_event.png)

### 为什么要使用合成事件机制
- 更好的兼容性和跨平台
- 减少挂载到 document（**18版本之前，18之后在 root 组件上，有利于多个 React 版本并存**），减少内存消耗，避免频繁解绑
- 方便事件的统一管理（如事务机制）

## setState 和 batchUpdate
### setState
- 有时异步（普通使用），有时同步（setTimeout、DOM 事件）
- 有时合并（对象形式），有时不合并（函数形式）

![setState流程图](/images/react/set_state.png)

### batchUpdate 机制
```js
class ListDemo extends React.Component {
    // 正常使用
    increase = () => {
        // 开始：处于 batchUpdate
        // isBatchingUpdates = true
        this.setState({
            count: this.state.count + 1        
        })    
        // 结束
        // isBatchingUpdates = false
    }
    
    // setTimeout 中
    increase = () => {
        // 开始：处于 batchUpdate
        // isBatchingUpdates = true
        setTimeout(() => {
            // 此时 isBatchingUpdates 是 false
            this.setState({
                count: this.state.count + 1            
            })        
        })    
        // 结束
        // isBatchingUpdates = false
    }
}
```

### setState 异步还是同步
- setState 无所谓异步还是同步
- 看是否能命中 batchUpdate 机制
- 判断 isBatchingUpdates

### 哪些能命中 batchUpdate 机制
- 生命周期（和它调用的函数）
- React 中注册的事件（和它调用的函数）
- React 可以“管理”的入口

### 哪些不能命中 batchUpdate 机制
- setTimeout setInterval 等（和它调用的函数）
- 自定义的 DOM 事件（和它调用的函数）
- React “管不到” 的入口

### transaction 事务机制
![事务机制](/images/react/transaction.png)

## 组件渲染和更新过程
### JSX 本质和 vdom
- JSX 即 createElement 函数
- 执行生成 vnode
- patch(elem, vnode) 和 patch(vnode, newVnode)

### 组件渲染过程
- props state
- render() 生成 vnode
- patch(elem, vnode)

### 组件更新过程
- setState(newState) --> dirtyComponents （可能有子组件）
- render() 生成 newVnode
- patch(elem, vnode)
#### patch 更新的两个阶段
- reconciliation 阶段 - 执行 diff 算法，纯 JS 计算
- commit 阶段 - 将 diff 结果渲染 DOM
##### 组件更新可能会存在的性能问题
- JS 是单线程，且和 DOM 渲染共用一个线程
- 当组件足够复杂，组件更新时计算和渲染都压力大
- 同时在有 DOM 操作需求（动画，鼠标拖动等），将卡顿
##### 解决方案：fiber
- 将 reconciliation 阶段进行任务拆分（commit 无法拆分）
- DOM 需要渲染时暂停，空闲时恢复
- window.requestIdleCallback（DOM 需要渲染时执行的 API）