# Redux基本使用
## 基本使用
Redux是React最常用的集中状态管理工具，类似于Vue中的pinia（Vuex），可以独立于框架运行。

作用：通过集中管理的方式管理应用的状态。

使用步骤：

1.定义一个reducer函数（根据当前想要做的修改返回一个新的状态）

2.使用createStroe方法传入reducer函数，生成一个store实例对象

3.使用store实例的subscribe方法订阅数据的变化（数据一旦变化，可以得到通知）

4.使用store实例的dispatch方法提交action对象出发数据变化（告诉reducer你想怎么改数据）

5.使用store实例的getState方法获取最新的状态数据更新到视图中

```js
<button id="decrement">-</button>
<button id="count">0</button>
<button id="increment">+</button>

<script src="https://unpkg.com/redux@4.2.0/dist/redux.min.js"></script>

<script>
  // 1.定义reducer函数
  // 作用：根据不同的action对象，返回不同的新的state
  // state: 管理的数据初始状态
  // action： 对象 type 标记当前想要做什么样的修改
  function reducer(state = {count: 0}, action) {
    if (action.type === 'INCREMENT') {
      return { count: state.count + 1 }
    }
    if (action.type === 'DECREMENT') {
      return { count: state.count - 1 }
    }
    return state
  }

  // 2.使用reducer函数生成store实例
  const store = Redux.createStore(reducer)

  // 3.通过store实例的subscribe订阅数据变化
  // 回调函数可以在每次state发生变化的时候自动执行
  store.subscribe(() => {
    console.log('state变化了', store.getState());
    document.getElementById('count').innerText = store.getState().count
  })

  // 4.通过store实例的dispatch函数提交action更新状态
  const inBtn = document.getElementById('increment')
  inBtn.addEventListener('click', () => {
    // 增加
    store.dispatch({
      type: 'INCREMENT'
    })
  })

  const dBtn = document.getElementById('decrement')
  dBtn.addEventListener('click', () => {
    // 减少
    store.dispatch({
      type: 'DECREMENT'
    })
  })

  // 5.通过store实例的getState方法获取最新状态更新到视图中

</script>
```

## 在React中使用
在React中使用redux，官方要求安装两个插件 - Redux Toolkit 和 react-redux
### Redux Tookit（RTK）

官方推荐编写Redux逻辑的方式，是一套工具的集合集，简化书写方式
- 简化store的配置方式
- 内置immer支持可变式状态修改
- 内置thunk更好的异步创建

安装
> npm i @reduxjs/toolkit react-redux
### React-redux
用来连接Redux 和 React组件的中间件

store目录结构设计

1.通常集中状态管理的部分都会创建一个单独的store目录

2.应用通常会有很多个子store模块，所以创建一个modules目录，在内部编写业务分类的子store

3.store中的入口文件index.js的作用是组合modules中所有的子模块，并导出store
```js
// 1.创建 counterStore 模块
import {createSlice} from '@reduxjs/toolkit'

const counterStore = createSlice({
  name: 'counter',
  // 初始化state
  initialState: {
    count: 0
  },
  // 修改状态的方法 同步方法 支持直接修改
  reducers: {
    increment(state) {
      state.count++
    },
    decrement(state) {
      state.count--
    }
  }
})

// 解构出来actionCreater函数
const {increment, decrement} = counterStore.actions
// 获取reducer
const reducer = counterStore.reducer

// 以按需导出的方式导出actionCreater
export {increment, decrement}
// 以默认导出的方式导出reducer
export default reducer

// 在 store/index.js 中导入reducer，并导出store
import { configureStore } from "@reduxjs/toolkit";
// 导入子模块reducer
import counterReducer from './modules/counterStore'

const store = configureStore({
  reducer: {
    counter: counterReducer
  }
})

export default store

// 在 index.js 中注册Provider并绑定store
import store from './store'
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
      <App />
    </Provider>
);

// 组件中使用
import {useSelector, useDispatch} from 'react-redux'
import { increment, decrement } from './store/modules/counterStore';

function App() {
  const { count } = useSelector(state => state.counter)
  const dispatch = useDispatch()
  return (
    <div className="App">
      <button onClick={() => dispatch(decrement())}>-</button>
      {count}
      <button onClick={() => dispatch(increment())}>+</button>
    </div>
  );
}

export default App;
```
### action传参
```js
// 在counterStore中添加方法并导出
reducers: {
    increment(state) {
      state.count++
    },
    decrement(state) {
      state.count--
    },
    addToNum(state, action) {
      state.count += action.payload
    }
  }
  
// 在组件中使用
<button onClick={() => dispatch(addToNum(10))}>add to 10</button>
<button onClick={() => dispatch(addToNum(20))}>add to 10</button>  
```         

### 异步状态操作

* 创建store的写法保持不变，配置好同步修改状态的方法

* 单独封装一个函数，在函数内部return一个新函数，在新函数中
  - 封装异步请求获取数据
  - 调用同步actionCreater传入异步数据生成一个action对象，并使用dispatch提交

* 组件中dispatch的写法保持不变
```js
// channelStore
import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const channelStore = createSlice({
  name: 'channel',
  initialState: {
    channelList: []
  },
  reducers: {
    setChannels(state, action) {
      state.channelList = action.payload
    }
  }
})

// 异步请求部分
const { setChannels } = channelStore.actions
const fetchChannelList = () => {
  return async(dispatch) => {
    const res = await axios.get('http://geek.itheima.net/v1_0/channels')
    dispatch(setChannels(res.data.data.channels))
  }
}

export {fetchChannelList}

const reducer = channelStore.reducer

export default reducer

// store/index.js 中引入
import { configureStore } from "@reduxjs/toolkit";
// 导入子模块reducer
import channelReducer from './modules/channelStore'

const store = configureStore({
  reducer: {
    channel: channelReducer
  }
})

export default store

// 组件中使用
import {useSelector, useDispatch} from 'react-redux'
import { fetchChannelList } from './store/modules/channelStore';
import { useEffect } from 'react';

function App() {
  const {channelList} = useSelector(state => state.channel)
  const dispatch = useDispatch()
  // 使用useEffect触发异步请求执行
  useEffect(() => {
    dispatch(fetchChannelList())
  }, [dispatch])
  return (
    <div className="App">
      <ul>
        {channelList.map(item => <li key={item.id}>{item.name}</li>)}
      </ul>
    </div>
  );
}

export default App;
```
