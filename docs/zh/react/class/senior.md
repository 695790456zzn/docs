# 高级特性
## 函数组件
- 纯函数，输入props，输出 JSX
- 没有实例，没有生命周期，没有state
- 不能扩展其他方法
```js
// class 组件
class List extends React.Component {
    constructor(props) {
        super(props)    
    }
    render() {
        const { list } = this.props
        return <ul>{list.map((item, index) => {
               return <li key={item.id}>
                   <span>{item.title}</span>
               </li>     
        })}</ul>                                
    }
}

// 函数组件
function List(props) {
    const { list } = this.props
    
    return <ul>{list.map((item, index) => {
               return <li key={item.id}>
                   <span>{item.title}</span>
               </li>     
        })}</ul>
}
```

## 非受控组件
* input的值不受state控制

  通过ref获取值

  通过defaultValue defaultChecked设置值
* 使用场景：

  必须手动操作DOM，setState实现不了，如：文件上传\<input type=file\>

  某些文本编辑器，需要传入DOM元素
* 使用原则：

  优先使用受控组件，符合React设计原则

  必须操作DOM时，再使用非受控组件

## Portals
hack：在创新和创意领域，被定义为用智利和创造性找到更简单、更有效的解决办法
传送门

使用场景：
- overflow：hidden
- 父组件 z-index 值太小
- fixed 需要放在 body 第一层级
```js
return ReactDOM.createPortal(
    <div className="modal">{this.props.children}</div>,
    document.body // DOM 节点
)
```

## context
应用场景：主题、字体、语言等

使用过程：生产数据、消费数据
```js
import React from 'react'

// 创建 Context 填入默认值（任何一个 js 变量）
const ThemeContext = React.createContext('light')

// 底层组件 - 函数是组件
function ThemeLink (props) {
    // const theme = this.context // 会报错。函数式组件没有实例，即没有 this

    // 函数式组件可以使用 Consumer
    return <ThemeContext.Consumer>
        { value => <p>link's theme is {value}</p> }
    </ThemeContext.Consumer>
}

// 底层组件 - class 组件
class ThemedButton extends React.Component {
    // 指定 contextType 读取当前的 theme context。
    // static contextType = ThemeContext // 也可以用 ThemedButton.contextType = ThemeContext
    render() {
        const theme = this.context // React 会往上找到最近的 theme Provider，然后使用它的值。
        return <div>
            <p>button's theme is {theme}</p>
        </div>
    }
}
ThemedButton.contextType = ThemeContext // 指定 contextType 读取当前的 theme context。

// 中间的组件再也不必指明往下传递 theme 了。
function Toolbar(props) {
    return (
        <div>
            <ThemedButton />
            <ThemeLink />
        </div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            theme: 'light'
        }
    }
    render() {
        return <ThemeContext.Provider value={this.state.theme}>
            <Toolbar />
            <hr/>
            <button onClick={this.changeTheme}>change theme</button>
        </ThemeContext.Provider>
    }
    changeTheme = () => {
        this.setState({
            theme: this.state.theme === 'light' ? 'dark' : 'light'
        })
    }
}

export default App
```

## 异步组件
React.lazy
```js
const ContextDemo = React.lazy(() => import('./ContextDemo'))
```
React.Suspense
```js
<React.Suspense fallback={<div>Loading...</div>}>
    <ContextDemo />
</React.Suspense>
```

## 性能优化
SCU
```js
// SCU 基本用法
shouldComponentUpdate(nextProps, nextState) {
    if (nextState.count !== this.state.count) {
        return true // 可以渲染    
    }
    return false // 不重复渲染
}
```
在 React 中，父组件更新，子组件无条件更新，不管子组件是否有变化
- scu必须要配合不可变值进行优化
- scu深层比较是一次行递归，对性能有影响
### PureComponent 和 memo
- PureComponent ，SUC 中实现了浅比较（浅比较已经适应了大部分情况，尽量不要做深度比较）

- memo ，函数组件中的 PureComponent

### immutable.js
彻底拥抱不可变值，基于共享数据，速度好，有一定学习和迁移成本，按需使用
高阶组件

## HOC
```js
// 高阶组件不是一种功能，而是一种模式
const HOCFactory = (Component) => {
    class HOC extends React.Component {
        // 在此定义多个组件的公共逻辑
        render() {
            return <Component {...this.props} /> // 返回拼装结果        
        }    
    }
    return HOC
}
const EnhancedComponent1 = HOCFactory(WrappedComponent1)
const EnhancedComponent2 = HOCFactory(WrappedComponent2)

// 使用 HOC 原因
// 1、抽离复用的代码，实现组件的复用
// 2、条件渲染，渲染拦截
// 3、拦截 组件的生命周期

// 属性代理 
// 操作 props
function HOC(WrappedComponent) {
    const newProps = { type: 'HOC' }
    return props => <WrappendComponent {...props} {...newProps} />
}
function HOC(WrappendComponent) {
    return class extends React.Component {
        render() {
            const newProps = { type: 'HOC' }
            return props => <WrappendComponent {...this.props} {...newProps} />        
        }    
    }
}
// state
function HOC(WrappendComponent) {
    return class extends React.Component {
        super(props);
        this.state = {
            name: '',        
        }
        this.onChange = this.onChange.bind(this)
        
        onChange = (e) => {
            this.setState({
                name: e.target.value            
            })        
        }
        
        render() {
            const newProps = { 
               name: {
                   value: this.state.name,
                   onChange: this.onChange               
               } 
            }
            return props => <WrappendComponent {...this.props} {...newProps} />        
        }    
    }
}
```

### Render Props
```js
// Render Props 的核心思想
// 通过一个函数将 class 组件的 state 作为 props 传递给纯函数组件
class Factory extends React.Component {
    constructor() {
        this.state = {
            // state 即多个组件的公共逻辑的数据        
        }    
    }
    render() {
        return <div>{this.props.render(this.state)}</div>    
    }
}

const App = () => {
    <Factory render={
        (props) => <p>{props.a} {props.b} ...</p>    
    }>
}
```
