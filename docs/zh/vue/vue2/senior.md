# Vue2高级特性
## 自定义 v-model
```vue
<template>
    <input type="text" :value="text1" @input="$emit('change1', $event.target.value)">
    <!-- 
        1.上面的 input 使用了 :value 而不是 v-model
        2.上面的 text1 和 model.event 要对应起来
        3.text1 属性对应起来
      -->
</template>
<script>
export default {
    model: {
        prop: 'text1', // 对应props text1
        event: 'change1'    
    },
    props: {
        text1: {
            type: String,
            default() {
                return ''            
            }        
        }   
    }
}
</script>
```

## $nextTick

data 改变之后，DOM 不会立刻渲染

$nextTick 会在 DOM 渲染之后被触发，以获取最新的 DOM 节点

[源码解析](https://zhuanlan.zhihu.com/p/83218117)

在Vue2.x中，实现大致如下：
```js
Vue.prototype.$nextTick = function (fn) {
  return nextTick(fn, this);
};

let callbacks = [];
let pending = false;

function nextTick(cb, ctx) {
  callbacks.push(() => {
    if (cb) {
      cb.call(ctx);
    }
  });

  if (!pending) {
    pending = true;
    // 使用 Promise 来处理微任务
    Promise.resolve().then(flushCallbacks);
  }
}

function flushCallbacks() {
  pending = false;
  const copies = callbacks.slice(0);
  callbacks.length = 0;
  for (let i = 0; i < copies.length; i++) {
    copies[i]();
  }
}
```

关键点：
- 回调函数：callbacks 数组用于存储所有的回调函数。
- Promise：通过 Promise.resolve().then(flushCallbacks)来确保回调在下一个微任务中执行。
- flushCallbacks：该函数会在微任务队列中调用所有存储的回调

在Vue3.x中
```js
import { queueJob } from './scheduler';

export function nextTick(fn) {
  return new Promise((resolve) => {
    queueJob(() => {
      if (fn) {
        fn();
      }
      resolve();
    });
  });
}
```
关键点
- Promise： Vue3 中的 $nextTick 返回一个 Promise，这使得它可以更好的于 async/await 语法结合使用
- 队列工作：queueJob 函数用于将工作添加到队列中，确保它在下一个微任务中执行

## slot
1.具名插槽
```vue
<!-- NamedSlot 组件（子组件） -->
<div class="container">
    <header>
        <slot name="header"></slot>
    </header>
    <main>
        <slot></slot>
    </main>
    <footer>
        <slot name="footer"></slot>
    </footer>
</div>

<!-- 父组件，使用NameSlot -->
<NamedSlot>
    <!-- 缩写 <template #header> -->
    <template v-slot:header>
        <h1>将插入 header slot 中</h1>
    </template>
    
    <p>将插入到 main slot 中，即未命名的 slot</p>
    
    <template v-slot:footer>
        <p>将插入到 footer slot 中</p>
    </template>
</NamedSlot>
```

## 动态、异步组件
1.动态组件

:is="component-name"，根据数据，动态渲染的场景，例：新闻列表（图片、视频、文字）的动态展示。

2.异步组件
```js
export default {
    components: {
        FormDemo: () => import('../xxx')    
    }
}
```

## keep-alive
组件缓存，用于 tab 切换

## mixin
缺点：
- 代码来源不明确，不利于阅读
- 多mixin可能会造成命名冲突
- mixin组件可能会出现多对多的关系，复杂度较高

## Vuex
![Vuex](/images/vue/vuex.png)
- state
- getters
- action
- mutation
- dispatch
- commit
- mapState
- mapGetters
- mapActions
- mapMutations

## Vue-router
1.路由模式（hash、H5 history）
```js
// hash 模式（默认）
// 如： http://abc.com/#/user/10
// H5 history 模式
// 如： http://abc.com/user/20
// H5 history 模式需要 server 端支持，因此无特殊需求可选择前者
// H5 history 模式无法返回 404 页面，需要手动配置
```

2.路由配置（动态路由、懒加载）
```js
// 动态路由
const User = {
    // 获取参数如 10 20 
    template: '<div>User {{ $route.params.id }}</div>'
}

const router = new VueRouter({
    routes: [
        // 动态路径参数 以冒号开头。能命中 `/user/10` `/user/20` 等格式的路由
        { path: '/user/:id', component: User }    
    ]
})

// 懒加载
export default new VueRouter({
    routes: [
        {
            path: '/',
            component: () => import(
                './../components/Navigator'            
            )        
        }    
    ]
})
```
