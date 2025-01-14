import{_ as n,c as a,d as e,o as l}from"./app-rM0olUBi.js";const p="/docs/images/vue/life_cycle.png",i={};function t(c,s){return l(),a("div",null,s[0]||(s[0]=[e('<h1 id="组件" tabindex="-1"><a class="header-anchor" href="#组件"><span>组件</span></a></h1><h2 id="生命周期" tabindex="-1"><a class="header-anchor" href="#生命周期"><span>生命周期</span></a></h2><p>1.组件的生命周期</p><ul><li>beforeCreate、created：Vue 实例初始化完成，页面还没渲染完成</li><li>beforeMount、mounted：页面渲染完成</li><li>beforeUpdate、updated：</li><li>beforeDestroy、destroyed：在 beforeDestroy 中解除绑定、销毁子组件以及事件监听器</li></ul><p>2.组件生命周期详解</p><p><strong>创建阶段</strong></p><p>beforeCreate</p><ul><li>组件实例已经创建，但数据响应性和事件尚未设置，即 props、data 和 methods 等属性尚未被初始化</li><li>注意事项：由于此时组件的数据还未初始化，因此无法访问到 this.data 或其他组件属性。</li><li>使用场景：通常不在此阶段进行重要的逻辑操作。因为它太早了，很多必要的组件设置都还未完成。</li></ul><p>created</p><ul><li>组件的实例已经完成创建，并且数据响应性、计算属性、方法和侦听器都已经设置好了。可以访问到 this.data 和其他组件属性。</li><li>注意事项：虽然可以访问到组件的数据和方法，但模版还未编译，DOM 也没有生成。</li><li>使用场景：常用语执行一些初始化操作，如发起网络请求获取数据，设置定时器或事件订阅等。</li></ul><p><strong>挂载阶段</strong></p><p>beforeMount</p><ul><li>在模版编译和挂载之前调用。此时，模版已经编译成虚拟DOM，但尚未挂载到真实DOM上。</li><li>注意事项：在这个阶段，仍然可以对组件的实例进行更改，这些更改将反映在最终的DOM输出中。</li><li>使用场景：可以在此时对即将挂载的虚拟DOM进行一些预处理操作。</li></ul><p>mounted</p><ul><li>组件已经成功挂载到DOM上，可以访问到真实的DOM元素。</li><li>注意事项：此时可以安全地操作DOM，因为模版已经渲染完成。</li><li>使用场景：常用于执行依赖于DOM的操作，如使用第三方库，设置动画或初始化与DOM相关的插件等。</li></ul><p><strong>更新阶段</strong></p><p>beforeUpdate</p><ul><li>当组件的数据发生变化时，在DOM更新之前调用，此时，可以访问到更新后的数据，但DOM仍然是旧的。</li><li>注意事项：避免在此阶段进行耗时的操作，因为它会阻塞DOM的更新。</li><li>使用场景：可以在此时进行一些数据更新前的准备工作，或者根据就数据的变化执行一些特定的逻辑。</li></ul><p>updated</p><ul><li>组件DOM已经更新完毕，此时可以访问到最新的DOM结构</li><li>注意事项：由于DOM已经更新，所以在此阶段进行的任何DOM操作都应该基于最新的DOM结构。</li><li>使用场景：常用于执行一些血药在DOM更新后进行的操作。如更新第三方库的状态、重新计算布局或触发自定义的回调函数等。</li></ul><p><strong>卸载阶段</strong></p><p>beforeUnmount</p><ul><li>在组件即将卸载之前调用。此时，组件仍然完全可用，但即将被从DOM中移除。</li><li>注意事项：应该在此阶段进行必要的清理工作，以避免内存泄漏或其他潜在问题。</li><li>使用场景：取消网络请求、清除定时器、解绑全局事件或自定义事件等。</li></ul><p>unmounted</p><ul><li>组件已经成功从DOM中卸载，并且所有的事件监听器和子组件都已经被移除。</li><li>注意事项：此时组件已经完全销毁，无法再进行任何操作。</li><li>使用场景：由于组件已经被卸载，所以通常不在此阶段进行任何逻辑。</li></ul><p>3.父子组件生命周期 <img src="'+p+`" alt="父子组件生命周期"></p><blockquote><p>初始化实例过程：从外到内</p></blockquote><blockquote><p>渲染过程：从内到外</p></blockquote><p>父子组件生命周期完整执行顺序（已验证）：</p><ul><li>父组件 before create</li><li>父组件 created</li><li>父组件 before mount</li><li>子组件 before create</li><li>子组件 created</li><li>子组件 before mount</li><li>子组件 mounted</li><li>父组件 mounted</li><li>父组件 before update</li><li>子组件 before update</li><li>子组件 updated</li><li>父组件 updated</li><li>父组件 before destroy</li><li>子组件 before destroy</li><li>子组件 destroyed</li><li>父组件 destroyed</li></ul><h2 id="vue组件的通讯方式" tabindex="-1"><a class="header-anchor" href="#vue组件的通讯方式"><span>Vue组件的通讯方式</span></a></h2><p>1.Props 和 $emit</p><p>父组件通过 props 向子组件传递数据</p><div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue" data-title="vue"><pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ChildComponent</span> <span class="token attr-name">:message</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>parentMessage<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ChildComponent</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript"></span>
<span class="line">  <span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">return</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token literal-property property">parentMessage</span><span class="token operator">:</span> <span class="token string">&#39;Hello from parent!&#39;</span></span>
<span class="line">      <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>子组件通过 $emit 向父组件发送事件</p><div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue" data-title="vue"><pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>sendMessage<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>Send Message<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript"></span>
<span class="line">  <span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token function">sendMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$emit</span><span class="token punctuation">(</span><span class="token string">&#39;message-sent&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Hello from child!&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2.Provide 和 inject</p><p>应用于跨级组件通信，父组件通过 provide 提供数据，子孙组件可以使用 inject 注入数据</p><div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue" data-title="vue"><pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Grandparent</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Parent</span> <span class="token punctuation">/&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Grandparent</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript"></span>
<span class="line">  <span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">provide</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">return</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token literal-property property">sharedData</span><span class="token operator">:</span> <span class="token string">&#39;Hello from Grandparent!&#39;</span></span>
<span class="line">      <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript"></span>
<span class="line">  <span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">inject</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;sharedData&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token function">mounted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>sharedData<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出: Hello from Grandparent!</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3.全局事件总线</p><p>在Vue2.x 中，可以通过创建一个 Vue 实例作为事件总线，实现任意组件之间的通信。在Vue3.x推荐使用 mitt 或其他库</p><div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue" data-title="vue"><pre><code><span class="line">// event-bus.js</span>
<span class="line">  import Vue from &#39;vue&#39;;</span>
<span class="line">  export const EventBus = new Vue();</span>
<span class="line"></span>
<span class="line">  // 在组件中</span>
<span class="line">  import { EventBus } from &#39;./event-bus.js&#39;;</span>
<span class="line"></span>
<span class="line">  // 发送事件</span>
<span class="line">  EventBus.$emit(&#39;event-name&#39;, data);</span>
<span class="line"></span>
<span class="line">  // 接收事件</span>
<span class="line">  EventBus.$on(&#39;event-name&#39;, (data) =&gt; {</span>
<span class="line">    // 处理数据</span>
<span class="line">  });</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>4.Vuex 状态管理</p><p>Vuex 是Vue.js 的状态管理库，适用于大型项目。它提供了一个集中式的存储，允许组件共享状态。</p><div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue" data-title="vue"><pre><code><span class="line">// store.js</span>
<span class="line">  import Vue from &#39;vue&#39;;</span>
<span class="line">  import Vuex from &#39;vuex&#39;;</span>
<span class="line"></span>
<span class="line">  Vue.use(Vuex);</span>
<span class="line"></span>
<span class="line">  export default new Vuex.Store({</span>
<span class="line">    state: {</span>
<span class="line">      message: &#39;Hello from Vuex!&#39;</span>
<span class="line">    },</span>
<span class="line">    mutations: {</span>
<span class="line">      updateMessage(state, newMessage) {</span>
<span class="line">        state.message = newMessage;</span>
<span class="line">      }</span>
<span class="line">    }</span>
<span class="line">  });</span>
<span class="line"></span>
<span class="line">  // 在组件中</span>
<span class="line">  computed: {</span>
<span class="line">    message() {</span>
<span class="line">      return this.$store.state.message;</span>
<span class="line">    }</span>
<span class="line">  },</span>
<span class="line">  methods: {</span>
<span class="line">    changeMessage() {</span>
<span class="line">      this.$store.commit(&#39;updateMessage&#39;, &#39;New message!&#39;);</span>
<span class="line">    }</span>
<span class="line">  }</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>5.Composition API</p><p>在 Vue3.x 中，使用 Composition API 可以更灵活地组织和共享逻辑。</p><div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue" data-title="vue"><pre><code><span class="line">import { ref } from &#39;vue&#39;;</span>
<span class="line"></span>
<span class="line">  export function useSharedState() {</span>
<span class="line">    const message = ref(&#39;Hello from Composition API!&#39;);</span>
<span class="line">    return { message };</span>
<span class="line">  }</span>
<span class="line"></span>
<span class="line">  // 在组件中</span>
<span class="line">  import { useSharedState } from &#39;./useSharedState&#39;;</span>
<span class="line"></span>
<span class="line">  export default {</span>
<span class="line">    setup() {</span>
<span class="line">      const { message } = useSharedState();</span>
<span class="line">      return { message };</span>
<span class="line">    }</span>
<span class="line">  }</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,48)]))}const u=n(i,[["render",t],["__file","component.html.vue"]]),d=JSON.parse('{"path":"/zh/vue/vue2/component.html","title":"组件","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"生命周期","slug":"生命周期","link":"#生命周期","children":[]},{"level":2,"title":"Vue组件的通讯方式","slug":"vue组件的通讯方式","link":"#vue组件的通讯方式","children":[]}],"git":{"updatedTime":1736823036000,"contributors":[{"name":"zhan_zhang","username":"zhan_zhang","email":"18311292602@163.com","commits":2,"url":"https://github.com/zhan_zhang"}]},"filePathRelative":"zh/vue/vue2/component.md"}');export{u as comp,d as data};
