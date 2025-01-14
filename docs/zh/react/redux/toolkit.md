# Redux Toolkit
## 使用流程
1.创建切片
```js
// 创建 user 切片，管理 user 数据
// user.js
import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user-slice',
  initialState: {
    name: '张三',
    gender: '男',
    age: 18
  },
  reducers: {
    setName(state, action) { // action.type action.payload
      state.name = action.payload
    },
    setGender(state, action) {
      state.age = action.payload
    },
    setAge(state, action) {
      state.age = action.payload
    }
  }
})

export default userSlice

// 创建商品 goods 切片，管理商品数据
// goods.js
import { createSlice } from "@reduxjs/toolkit";

const goodsSlice = createSlice({
  name: 'goods-slice',
  initialState: {
    name: '苹果',
    price: 100
  },
  reducers: {
    setName(state, action) {
      state.name = action.payload
    },
    setPrice(state, action) {
      state.price = action.payload
    }
  }
})

export default goodsSlice
```

2.Reducer
- Redux Toolkit 允许我们在 reducers 写 “可变” 逻辑。它并不是真正的改变状态值，因为它使用了 Immer 库，可以检测到 ”草稿状态“ 的变化并且基于这些变化生产全新的不可变的状态
```js
// 简写方式
reducers: {
    increment: state => {
        state.value += 1    
    }
}

// 传统方式
reducers: {
    setName(state, action) {
        return {
            ...state,
            name: action.payload        
        }    
    }
}
```

3.整合切片
```js
// store/index.js
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user";
import goodsSlice from "./goods";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    goods: goodsSlice.reducer
  }
})

export default store
```

4.全局配置
```js
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './stores/index.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
```

5.组件中使用
```js
import { useDispatch, useSelector } from "react-redux"

const Child = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  return <>
    <h1>子组件 - {JSON.stringify(user)}</h1>
    <button onClick={() => dispatch({type: 'user-slice/setAge', payload: user.age+1})}>加</button>
  </>
}

export default Child
```

6.使用action生成器
```js
import { useDispatch, useSelector } from "react-redux"
import userSlice from './store/user.js'
const { setAge } = userSlice.actions

const Child = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  return <>
    <h1>子组件 - {JSON.stringify(user)}</h1>
    <button onClick={() => dispatch(setAge(user.age + 1))}>加</button>
  </>
}

export default Child
```

> 什么是 Redux Toolkit？为什么使用它？

Redux Toolkit 是 Redux 的官方工具库，用于简化 Redux 的使用。它通过内置工具和最佳实践解决了传统 Redux 的以下问题：

- 减少样板代码：传统 Redux 中需要编写大量的 action creators、reducers 和 store 配置，而 Redux Toolkit 提供了简化的 API。
- 内置功能：集成了 immer（支持不可变数据操作）、redux-thunk（异步操作中间件）等功能。
- 性能优化：支持序列化检查、开发者工具集成等。
- 默认支持 TypeScript：提供更好的开发体验。

## Redux Toolkit 和传统 Redux 有什么区别？

| 特性 |传统 Redux | Redux Toolkit |
| :---- | :--- | :----------- |
| 样板代码 | 需要编写大量的 actions、reducers、types | 使用 createSlice 大幅减少样板代码 | 
| 异步逻辑 | 需要手动配置 redux-thunk 或中间件 | 默认支持异步逻辑 | 
| 数据不可变性 | 手动编写不可变逻辑 | 内置 immer 自动处理不可变逻辑 | 
| Redux DevTools 配置 | 需要手动启用和配置 | 默认支持 | 
| 创建 store | 手动编写复杂逻辑 | configureStore 一键配置 |

## 什么是 createSlice？
createSlice 是 Redux Toolkit 中用来生成 action 和 reducer 的方法。它将 action 和 reducer 合并在一个地方定义，减少了代码复杂性。

示例：
```js
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
    name: 'counter', // slice 名称
    initialState: { value: 0 }, // 初始状态
    reducers: {
        increment: (state) => { state.value += 1; }, // 定义 reducer 和 action
        decrement: (state) => { state.value -= 1; },
        incrementByAmount: (state, action) => { state.value += action.payload; },
    },
});

// 导出 action 和 reducer
export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
```

## Redux Toolkit 的 configureStore 有哪些优点？

configureStore 是 Redux Toolkit 提供的一个简化 store 创建的方法，具有以下优点：

- 简化 store 配置：内置了 redux-thunk，不需要手动添加中间件。
- 开发者工具支持：默认启用了 Redux DevTools 和序列化检查。
- 自动合并 reducer：支持传入多个 reducer。

示例：
```js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';

const store = configureStore({
    reducer: {
        counter: counterReducer, // 合并多个 slice reducer
    },
});

export default store;
```

## 什么是 createAsyncThunk？它解决了什么问题？

createAsyncThunk 是 Redux Toolkit 提供的工具，用于简化异步逻辑。它将异步操作的生命周期（pending, fulfilled, rejected）自动管理，减少了开发者手动处理异步状态的工作量。

示例：
```js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 定义异步操作
export const fetchUser = createAsyncThunk('user/fetch', async (userId) => {
    const response = await fetch(`/api/user/${userId}`);
    return response.json();
});

// 创建 slice
const userSlice = createSlice({
    name: 'user',
    initialState: { data: null, loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default userSlice.reducer;
```

## 如何使用 Redux Toolkit 配合 React？

1.配置 store：
```js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';

const store = configureStore({
    reducer: {
        counter: counterReducer,
    },
});

export default store;
```

2.在应用中使用 Provider：
```js
javascript复制代码import { Provider } from 'react-redux';
import store from './store';

const App = () => (
    <Provider store={store}>
        <YourComponent />
    </Provider>
);
```

3.使用 

useSelector 和 useDispatch：
```js
import { useSelector, useDispatch } from 'react-redux';
import { increment } from './counterSlice';

const Counter = () => {
    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();

    return (
        <div>
            <p>{count}</p>
            <button onClick={() => dispatch(increment())}>Increment</button>
        </div>
    );
};
```

## Redux Toolkit 如何处理不可变性？

Redux Toolkit 内置了 immer 库，允许开发者直接修改 state（实际上是代理对象）。在幕后，immer 会记录所有的更改并返回一个新的不可变对象，而不需要开发者手动处理。
```js
const counterSlice = createSlice({
    name: 'counter',
    initialState: { value: 0 },
    reducers: {
        increment: (state) => {
            state.value += 1; // 直接修改状态，`immer` 会处理不可变性
        },
    },
});
```

## Redux Toolkit 是否适合大型项目？为什么？

是的，Redux Toolkit 非常适合大型项目：

- 减少样板代码：在大型项目中，样板代码容易导致重复和混乱，Redux Toolkit 简化了代码结构。
- 内置工具：支持异步逻辑管理（如 createAsyncThunk）和不可变状态操作（immer），提升开发效率。
- 模块化：通过 createSlice 提供清晰的模块划分，适合大型项目的状态管理。

## Redux Toolkit 支持哪些中间件？可以自定义中间件吗？

- Redux Toolkit 默认集成了 redux-thunk，并支持自定义中间件。
- 自定义中间件可以通过 configureStore 的 middleware 配置项添加：
```JS
const customMiddleware = (store) => (next) => (action) => {
    console.log('Action:', action);
    return next(action);
};

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(customMiddleware),
});
```

## 在 Redux Toolkit 中，如何优化性能？

- 使用 useSelector 精确选择状态：避免选择整个状态树，选择具体字段。
- 使用 React.memo：防止无关状态变更导致组件重新渲染。
- 拆分 Slice：将状态切分到多个 Slice 中，避免不必要的状态更新。
- 禁用序列化检查（仅在必要时）：
```JS
configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
```

