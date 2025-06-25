# Vue2基本使用
[Vue2文档](https://v2.cn.vuejs.org/)
## 指令
> v-html v-if v-bind v-for

## 插值
> {{}}

## computed 和 watch
- computed 有缓存，data 不变则不会重新计算
- watch 如何深度监听？使用 deep
- watch 监听引用类型，拿不到 oldVal（引用类型是指针赋值，val与oldVal值不同但是指向的内存地址相同）

## class 和 style
> 使用动态属性
> 使用驼峰式写法
```html
// class 写法
<p :class="{ black: isBlack, yellow: isYellow }">使用 class</p>
<p :class="[black, yellow]">使用 class （数组）</p>

// style 写法
<p :style="styleData">使用 style</p>
```

## 条件渲染
1.v-if、v-else 的用法，可使用变量，也可以使用 === 表达式

2.v-if 和 v-show 的区别
> 是否销毁 DOM 节点，v-show 通过样式 display: none 来控制显示和隐藏，节点不显示但是结构是在的；v-if 通过销毁、创建节点来控制显示和隐藏

3.v-if 和 v-show 的使用场景
> v-if 一般使用在节点不频繁的显示和隐藏的操作中；如果节点需要频繁的显示和隐藏则使用 v-show，不需要每次都创建和销毁节点，可以减少 DOM 操作，提升性能。

## 列表渲染
1.key 的重要性。key 不能乱写（如 random 或者 index ）
2.v-for 和 v-if 不能一起使用（原因）
> 因为 v-for 比 v-if 的优先级要高，要先循环完成后才会去进行判断，所以会进行多次判断，造成性能问题；

## 事件
1.event 参数，自定义参数
- event 是原生的
- 事件被挂载到当前元素
- 获取 event 对象，不传参时直接用 event 获取，传参时用 $event 获取
- event 是 MouseEvent -- 原生的 event 对象
```vue
<template>
    <div>
        <p>{{num}}</p>
        <button @click="increment1">+1</button>
        <button @click="increment2(2, $event)">+2</button>
    </div>
</template>
```
```js
methods: {
        increment1(event) {
            console.log('event', event, event.__proto__.constructor) // 是原生的 event 对象
            console.log(event.target) // target -- 触发事件的元素
            console.log(event.currentTarget) // currentTarget -- 事件绑定的元素， 注意，事件是被注册到当前元素的，和 React 不一样
            this.num++

            // 1. event 是原生的
            // 2. 事件被挂载到当前元素
            // 和 DOM 事件一样
        },
        increment2(val, event) {
            // eslint-disable-next-line
            console.log(event.target)
            this.num = this.num + val
        }
    }
```

2.事件修饰符
```html
<!-- 阻止单击事件继续传播 -->
<a v-on:click.stop="doThis" />
<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit" />
<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThis" />
<!-- 只有修饰符 -->
<form v-on:submit.prevent />
<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即内部元素出发的事件先在此处理，然后才会交由内部元素处理 -->
<div v-on:click.capture="doThis">...</div>
<!-- 只当在 event.target 是当前元素自身时出发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThis">...</div>
```

3.按键修饰符
```html
<!-- 即使 Alt 或 Shift 被一同按下时也会触发 -->
<button @click.ctrl="onClick"></button>
<!-- 有且只有 Ctrl 被按下的时候才触发 -->
<button @click.ctrl.exact="onCtrlClick">A</button>
<!-- 没有任何修饰符被按下的时候才触发 -->
<button @click.exact="onClick">A</button>
```

## 表单
常见表单项：textarea checkbox radio select
表单修饰符
- tirm：去掉前后空格
- lazy：类似于防抖
- number：只能输入数字