# 组件
## 生命周期
1.组件的生命周期
- beforeCreate、created：Vue 实例初始化完成，页面还没渲染完成
- beforeMount、mounted：页面渲染完成
- beforeUpdate、updated：
- beforeDestroy、destroyed：在 beforeDestroy 中解除绑定、销毁子组件以及事件监听器

2.组件生命周期详解

**创建阶段**

beforeCreate
- 组件实例已经创建，但数据响应性和事件尚未设置，即 props、data 和 methods 等属性尚未被初始化
- 注意事项：由于此时组件的数据还未初始化，因此无法访问到 this.data 或其他组件属性。
- 使用场景：通常不在此阶段进行重要的逻辑操作。因为它太早了，很多必要的组件设置都还未完成。

created
- 组件的实例已经完成创建，并且数据响应性、计算属性、方法和侦听器都已经设置好了。可以访问到 this.data 和其他组件属性。
- 注意事项：虽然可以访问到组件的数据和方法，但模版还未编译，DOM 也没有生成。
- 使用场景：常用语执行一些初始化操作，如发起网络请求获取数据，设置定时器或事件订阅等。

**挂载阶段**

beforeMount
- 在模版编译和挂载之前调用。此时，模版已经编译成虚拟DOM，但尚未挂载到真实DOM上。
- 注意事项：在这个阶段，仍然可以对组件的实例进行更改，这些更改将反映在最终的DOM输出中。
- 使用场景：可以在此时对即将挂载的虚拟DOM进行一些预处理操作。

mounted
- 组件已经成功挂载到DOM上，可以访问到真实的DOM元素。
- 注意事项：此时可以安全地操作DOM，因为模版已经渲染完成。
- 使用场景：常用于执行依赖于DOM的操作，如使用第三方库，设置动画或初始化与DOM相关的插件等。

**更新阶段**

beforeUpdate
- 当组件的数据发生变化时，在DOM更新之前调用，此时，可以访问到更新后的数据，但DOM仍然是旧的。
- 注意事项：避免在此阶段进行耗时的操作，因为它会阻塞DOM的更新。
- 使用场景：可以在此时进行一些数据更新前的准备工作，或者根据就数据的变化执行一些特定的逻辑。

updated
- 组件DOM已经更新完毕，此时可以访问到最新的DOM结构
- 注意事项：由于DOM已经更新，所以在此阶段进行的任何DOM操作都应该基于最新的DOM结构。
- 使用场景：常用于执行一些血药在DOM更新后进行的操作。如更新第三方库的状态、重新计算布局或触发自定义的回调函数等。

**卸载阶段**

beforeUnmount
- 在组件即将卸载之前调用。此时，组件仍然完全可用，但即将被从DOM中移除。
- 注意事项：应该在此阶段进行必要的清理工作，以避免内存泄漏或其他潜在问题。
- 使用场景：取消网络请求、清除定时器、解绑全局事件或自定义事件等。

unmounted
- 组件已经成功从DOM中卸载，并且所有的事件监听器和子组件都已经被移除。
- 注意事项：此时组件已经完全销毁，无法再进行任何操作。
- 使用场景：由于组件已经被卸载，所以通常不在此阶段进行任何逻辑。

3.父子组件生命周期
![父子组件生命周期](/images/vue/life_cycle.png)
> 初始化实例过程：从外到内

> 渲染过程：从内到外

父子组件生命周期完整执行顺序（已验证）：
- 父组件 before create
- 父组件 created
- 父组件 before mount
- 子组件 before create
- 子组件 created
- 子组件 before mount
- 子组件 mounted
- 父组件 mounted
- 父组件 before update
- 子组件 before update
- 子组件 updated
- 父组件 updated
- 父组件 before destroy
- 子组件 before destroy
- 子组件 destroyed
- 父组件 destroyed

## Vue组件的通讯方式
1.Props 和 $emit 

父组件通过 props 向子组件传递数据
```vue
<template>
    <ChildComponent :message="parentMessage"></ChildComponent>
  </template>

  <script>
  export default {
    data() {
      return {
        parentMessage: 'Hello from parent!'
      };
    }
  }
  </script>
```

子组件通过 $emit 向父组件发送事件
```vue
<template>
    <button @click="sendMessage">Send Message</button>
  </template>

  <script>
  export default {
    methods: {
      sendMessage() {
        this.$emit('message-sent', 'Hello from child!');
      }
    }
  }
  </script>
```

2.Provide 和 inject

应用于跨级组件通信，父组件通过 provide 提供数据，子孙组件可以使用 inject 注入数据
```vue
<template>
    <Grandparent>
      <Parent />
    </Grandparent>
  </template>

  <script>
  export default {
    provide() {
      return {
        sharedData: 'Hello from Grandparent!'
      };
    }
  }
  </script>

  <script>
  export default {
    inject: ['sharedData'],
    mounted() {
      console.log(this.sharedData); // 输出: Hello from Grandparent!
    }
  }
  </script>
```

3.全局事件总线

在Vue2.x 中，可以通过创建一个 Vue 实例作为事件总线，实现任意组件之间的通信。在Vue3.x推荐使用 mitt 或其他库
```vue
// event-bus.js
  import Vue from 'vue';
  export const EventBus = new Vue();

  // 在组件中
  import { EventBus } from './event-bus.js';

  // 发送事件
  EventBus.$emit('event-name', data);

  // 接收事件
  EventBus.$on('event-name', (data) => {
    // 处理数据
  });
```

4.Vuex 状态管理

Vuex 是Vue.js 的状态管理库，适用于大型项目。它提供了一个集中式的存储，允许组件共享状态。
```vue
// store.js
  import Vue from 'vue';
  import Vuex from 'vuex';

  Vue.use(Vuex);

  export default new Vuex.Store({
    state: {
      message: 'Hello from Vuex!'
    },
    mutations: {
      updateMessage(state, newMessage) {
        state.message = newMessage;
      }
    }
  });

  // 在组件中
  computed: {
    message() {
      return this.$store.state.message;
    }
  },
  methods: {
    changeMessage() {
      this.$store.commit('updateMessage', 'New message!');
    }
  }
```

5.Composition API

在 Vue3.x 中，使用 Composition API 可以更灵活地组织和共享逻辑。
```vue
import { ref } from 'vue';

  export function useSharedState() {
    const message = ref('Hello from Composition API!');
    return { message };
  }

  // 在组件中
  import { useSharedState } from './useSharedState';

  export default {
    setup() {
      const { message } = useSharedState();
      return { message };
    }
  }
```