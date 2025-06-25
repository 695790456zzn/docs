# zustand
## 基本使用
语法注意事项：
- 函数参数必须返回一个对象，对象内部编写状态数据和方法
- set是用来修改数据的专门方法必须调用它来修改数据
  -参数是函数，需要用老老数据的场景
  -参数直接是一个对象
```js
import {create} from 'zustand'
// 1.创建store
const useStore = create(set => {
  return {
    // 状态数据
    count: 0,
    // 修改状态数据的方法
    inc: () => {
      set((state) => ({count: state.count + 1}))
    }
  }
})

// 2.绑定store到组件

function App() {
  const {count, inc} = useStore()
  return (
    <>
      <button onClick={inc}>{count}</button>
    </>
  );
}

export default App;
```

## 异步支持
对于异步的支持不需要特殊的操作，直接在函数中编写异步逻辑，最后只需要调用set方法传入新状态即可。
```js
import {create} from 'zustand'
import {useEffect} from 'react'
const URL = 'http://geek.itheima.net/v1_0/channels'
// 1.创建store
const useStore = create(set => {
  return {
    // 状态数据
    count: 0,
    // 修改状态数据的方法
    inc: () => {
      set((state) => ({count: state.count + 1}))
    },
    channelList: [],
    fetchGetList: async () => {
      const res = await fetch(URL)
      const jsonRes = await res.json()
      console.log(jsonRes);
      set({
        channelList: jsonRes.data.channels
      })
    }
  }
})

// 2.绑定store到组件

function App() {
  const {count, inc, fetchGetList, channelList} = useStore()
  useEffect(() => {
    fetchGetList()
  }, [fetchGetList])
  return (
    <>
      <button onClick={inc}>{count}</button>
      <ul>
        {
          channelList.map(item => <li key={item.id}>{item.name}</li>)
        }
      </ul>
    </>
  );
}

export default App;
```

## 切片模式
当单个store比较大的时候，可以采用切片模式进行模块拆分组合，类似于模块化。
```js
import {create} from 'zustand'
import {useEffect} from 'react'
const URL = 'http://geek.itheima.net/v1_0/channels'

const createCounterStore = (set) => {
  return {
    // 状态数据
    count: 0,
    // 修改状态数据的方法
    inc: () => {
      set((state) => ({ count: state.count + 1 }));
    },
  };
}

const createChannelStore = (set) => {
  return {
    channelList: [],
    fetchGetList: async () => {
      const res = await fetch(URL);
      const jsonRes = await res.json();
      console.log(jsonRes);
      set({
        channelList: jsonRes.data.channels,
      });
    },
  };
}

// 1.创建store
const useStore = create((...a) => {
  return {
    ...createCounterStore(...a),
    ...createChannelStore(...a)
  }
})

// 2.绑定store到组件
function App() {
  const {count, inc, fetchGetList, channelList} = useStore()
  useEffect(() => {
    fetchGetList()
  }, [fetchGetList])
  return (
    <>
      <button onClick={inc}>{count}</button>
      <ul>
        {
          channelList.map(item => <li key={item.id}>{item.name}</li>)
        }
      </ul>
    </>
  );
}

export default App;
```
