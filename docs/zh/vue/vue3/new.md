# Vue3新功能
[Vue3文档](https://cn.vuejs.org/guide/introduction.html)
## Vue3 对比 Vue2
1.Vue3 比 Vue2 有什么优势？
- 性能更好
- 体积更小
- 更好的 TS 支持
- 更好的代码组织
- 更好的逻辑抽离
- 更多新功能

2.Vue3（Composition API） 生命周期对比 Vue2（Options API）生命周期

区别：
- beforeDestroy 改为 beforeUnmount
- destroyed 改为 unmounted
- 其他沿用 Vue2 的生命周期
```vue
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'

export default {
    name: 'LifeCycles',

    props: {
        msg: String
    },

    // 等于 beforeCreate 和 created
    setup() {
        console.log('setup')

        onBeforeMount(() => {
            console.log('onBeforeMount')
        })
        onMounted(() => {
            console.log('onMounted')
        })
        onBeforeUpdate(() => {
            console.log('onBeforeUpdate')
        })
        onUpdated(() => {
            console.log('onUpdated')
        })
        onBeforeUnmount(() => {
            console.log('onBeforeUnmount')
        })
        onUnmounted(() => {
            console.log('onUnmounted')
        })
    }
}
```

### Composition API 对比 Options API：
- 更好的代码组织
- 更好的逻辑复用
- 更好的类型推导
```js
{
    data() {
        return {
            a: 10        
        }    
    }
    methods: {
        fn1() {
            const a = this.a        
        }    
    },
    mounted() {
        this.fn1()    
    }
}
// Vue2 框架封装了 this.fn1()、this.a 的方式调用方法或数据，不利于类型推导。（this.methods.fn1()、this.data.a）
```
如何选择：
- 不建议共用，会引起混乱
- 小型项目、业务逻辑简单，用 Options API
- 中大型项目、逻辑复杂，用 Composition API

## ref、toRef、toRefs
### ref
- 生成值类型的响应数据
- 可用于模版和 reactive
- 通过 .value修改值
```vue
<template>
    <!-- 2、用于模版值 -->
    <p>ref demo {{nameRef}} {{state.name}}</p>
</template>

<script>
import { ref, reactive} from 'vue'

export default {
    name: 'Ref',
    setup() {
        // 建议所有 ref 类型使用 xxxRef 形式
        const ageRef = ref(20) // 1、值类型 响应式
        const nameRef = ref('xxx') // 值类型 响应式
        
        const state = reactive({
            name: nameRef // 2、用于 reactive    
        })
        
        setTimeout(() => {
            console.log('ageRef', ageRef.value) // 获取值
            ageRef.value = 25 // .value 修改值
            nameRef.value = 'yyy'        
        }, 1500)
        
        return {
            nameRef,
            ageRef,
            state        
        }                                                                                
    }
}
</script>
```

### toRef
> 定义：针对一个响应式对象（reactive 封装）的 prop，创建一个 ref，具有响应式，两者保持引用关系
```vue
<template>
    <p>toRef demo - {{ageRef}} - {{state.name}} - {{state.age}}</p>
</template>

<script>
import { ref, toRef, reactive } from 'vue'

export default {
    name: 'ToRef',
    setup() {
        // toRef 如果用于普通对象（非响应式对象），产出的结果不具备响应式
        const state = reactive({
            age: 20,
            name: 'xxx'                    
        })             
        
        const ageRef = toRef(state, 'age')
        
        // 引用关系
        setTimeout(() => {
            state.age = 25        
        }, 1500)
        
        setTimeout(() => {
            ageRef.value = 30 // 用 .value 修改值        
        }, 3000)
        
        return {
            ageRef,
            state        
        }            
    }
}
</script>
```

### toRefs
> 将响应式对象（reactive 封装）转换为普通对象，对象的每个 prop 都是对应的 ref ，两者保持引用关系
```vue
<template>
    <p>toRefs demo {{age}} {{name}}</p>
</template>

<script>
import { ref, toRef, toRefs, reactive } from 'vue'

export default {
    name: 'ToRefs',
    setup() {
        const state = reactive({
            age: 20,
            name: 'xxx'                    
        })             
                
        const stateAsRefs = toRefs(state) // 将响应式对象变成普通对象
        
        return stateAsRefs                                                                    
    }
}
</script>
```

### ref、toRef 和 toRefs 的最佳使用方式
- 用 reactive 做对象的响应式，用 toRef 做值类型的响应式
- setup 中返回 toRefs（state），或者 toRef(stae, 'xxx')
- ref 的变量命名都用 xxxRef
- 合成函数返回响应式对象，方便调用方用解构赋值
```vue
// 合成函数返回响应式对象
function useReatureX() {
    const state = reactive({
        x: 1,
        y: 2    
    })
    
    // 返回时转换为 ref
    return toRefs(state)
}

export default {
    setup() {
        // 可以在不失去响应式的情况下破坏结构
        const { x, y } = useFeatureX()
        
        return {
            x, 
            y        
        }        
    }
}
```

### 为什么用 ref
- 返回值类型，会丢失响应式
- 如在 setup、computed、合成函数，都有可能返回值类型
- Vue 如果不定义 ref， 用户将自造 ref，反而混乱

### 为何需要 .value
- ref 是一个对象（不丢失响应式），value 存储值
- 通过 .value 属性的 get 和 set 实现响应式
- 用于模版、reactive 时，不需要 .value，其他情况都需要

### 为何需要 toRef 和 toRefs
初衷：不丢失响应式的情况下，对数据进行分解/扩散
前提：针对的是响应式对象，非普通对象

## createApp
```vue
// Vue2.x
const app = new Vue({/* 选项 */})
// Vue3
const app = Vue.createApp({/* 选项 */})
```

## emits 属性
```vue
// 父组件
<HelloWorld :msg="msg" @sayHello="onSayHello" />

// 子组件
export default {
    name: 'HelloWorld',
    props: {
        msg: String    
    },
    emits: ['onSayHello'],
    setup(prop, { emit }) {
        emit('onSayHello', 'bbb')    
    }
}
```
## 多事件
```html
<!-- 在 methods 里定义多个函数 -->
<button @click="one($event), two($event)">
    Submit
</button>
```

## Fragment
```vue
<!-- vue2.x 组件模版 -->
<template>
    <div class="blog-post">
        <h3>{{ title }}</h3>
        <div v-html="content"></div>
    </div>
</template>

<!-- vue3 组件模版 -->
<template>
    <h3>{{ title }}</h3>
    <div v-html="content"></div>
</template>
```

## 移除 .sync
```vue
<!-- vue 2.x -->
<MyComponent v-bind:title.sync="title" />

<!-- vue 3.x -->
<MyComponent v-model:title="title" />
```

## 异步组件的写法
```vue
// vue 2.x
new Vue({
    // ...
    components: {
        'my-component': () => import('./my-async-component.vue')    
    }
})

// vue 3.x
import { createApp, defineAsyncComponent } from 'vue'

createApp({
    // ...
    components: {
        AsyncComponent: defineAsyncComponent(() => {
            import('./components/AsyncComponent.vue')        
        })    
    }
})
```

## 移除 filter
```vue
<!-- 以下 filter 在 vue3 中不可用 -->
<!-- 在双花括号中 -->
{{ message | capitalize }}
<!-- 在 v-bind 中 -->
<div v-bind:id="rawId | formatId"></div>
```

## Teleport
```html
<button @click="modalOpen = true">
    Open full screen modal!(With teleport!)
</button>

<teleport to="body">
    <div v-if="modalOpen" class="modal">
        teleport 弹窗（父元素是 body）
        <button @click="modalOpen = false">Close</button>
    </div>
</teleport>
```

## Suspense
```vue
<Suspense>
    <template>
        <Test1 />
    </template>
    <!-- #fallback 就是一个具名插槽。即 Suspense 组件内部，有两个 slot ，其中一个具名为 fallback  -->
    <template #fallback>
        Loading...
    </template>
</Suspense>
```
