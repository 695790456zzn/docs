# 事件
## 事件绑定
```js
const btn = document.getElementById("btn1")
btn.addEventListener("click", event => {
    console.log("clicked")
})

// 通用的绑定函数
function bindEvent(elem, type, fn) {
    elem.addEventListener(type, fn)
}

const a = document.getElementById("link1")
bindEvent(a, 'click', e => {
    e.preventDefault() // 阻止默认行为
    alert('clicked')
})
```

## 事件冒泡
```js
<body>
    <div id="div1">
        <p id="p1">激活<p>
        <p id="p2">取消<p>
        <p id="p3">取消<p>
        <p id="p4">取消<p>
    </div>
    <div id="div2">
        <p id="p5">取消</p>
        <p id="p6">取消</p>
    </div>
</body>

const p1 = document.getElementById("p1")
const body = document.body
bindEvent(p1, 'click', e => {
    e.stopPropagation() // 阻止冒泡
    alert('激活')
})
bindEvent(body, 'click', e => {
    alert("取消")
})
```

## 事件代理
> 代码简洁,减少浏览器内存占用,但是，不要滥用（瀑布流中使用）
```js
function bindEvent(elem, type, selector, fn) {
    if (fn === null) {
        fn = selector
        selector = null    
    }
    
    elem.addEventListener(type, event => {
        const target = event.target
        if (selector) {
            // 代理绑定
            if (target.matches(selector)) {
                fn.call(target, event)            
            }        
        } else {
            // 普通绑定
            fn.call(target, event)        
        }  
    })
}
```

## 描述事件冒泡的流程
- 基于 DOM 树形结构
- 事件会顺着触发元素往上冒泡
- 应用场景：代理