# Vue3原理
## Vue3 如何实现响应式
### 基本使用
```js
const data = {
    name: 'zhangsan',
    age: 20
}

const proxyData = new Proxy(data, {
    get(target, key, receiver) {
        const result = Reflect.get(target, key, receiver)
        return result // 返回结果    
    },
    set(target, key, value, receiver) {
        const result = Reflect.set(target, key, value, receiver)  
        return result          
    },
    deleteProperty(target, key) {
        const result = Reflect.deleteProperty(target, key)
        return result // 是否删除成功    
    }
})
```
### Reflect 作用
- 和 proxy 能力一一对应
- 规范化、标准化、函数式
- 替代掉 Object 上的工具函数

### Proxy 如何实现响应式
- 利用 Reflect 实现响应式
- Proxy 能规避 Object.defineProperty 的问题
- Proxy 无法兼容所有浏览器，无法 polyfill

## watch 和 watchEffect 的区别
- 两者都可以监听 data 属性变化
- watch 需要明确监听哪个属性
- watchEffect 会根据其中的属性，自动监听其变化

## setup 中如何获取组件实例
- 在 setup 和其他 Composition API 中没有 this
- 可以通过 getCurrentInstance 获取当前实例
- 若使用 Options API 可照常使用 this

## Vue3 为何比 Vue2 快
- Proxy 响应式
- PatchFlag
  - 编译模版时，动态节点做标记
  - 标记，分为不同的类型，如 TEXT PROPS
  - diff 算法时，可以区分静态节点，以及不同类型的动态节点
- hoistStatic
  - 将静态节点的定义，提升到父作用域，缓存起来
  - 多个相邻的静态节点，会被合并起来
  - 典型的拿空间换时间的优化策略
- cacheHandler：缓存事件
- SSR 优化
- tree-shaking

## Vite 为何启动快
- 开发环境使用 ES6 Module ，无需打包，webpack 需要将 ES6 Module 打包转化成 ES5 代码去执行，而 Vite 直接使用 ES6 Module 引入包执行，因此会快很多
- 生产环境使用 rollup，并不会快很多

## Composition API 和 React Hooks 区别
- 前者 setup 只会被调用一次，而后者函数会被多次调用
- 前者无需 useMemo useCallback ，因为 setup 只调用一次
- 前者无需顾虑调用顺序，而后者需要保证 hooks 的顺序一致
- 前者 reactive + ref 比后者 useState 要难理解

## Vue3使用JSX
JSX中使用插值、判断、循环的方式
```js
import { defineComponent, ref, reactive } from 'vue'

export default defineComponent(() => {
    const flagRef = ref(true)
    
    function changeFlag() {
        flagRef.value = !flagRef.value    
    }
    
    const state = reactive({
        list: ['a1', 'a2', 'a3']    
    })
    
    const render = () => {
        return <>
            <p onClick={changeFlag}>demo1 {flagRef.value.toString()}</p>
            {flagRef.value && <Child a={flagRef.value}></Child>}
            
            <ul>
                {state.list.map(item => <li>{item}</li>)}
            </ul>
        </>                                
    }
    return render
})
```
