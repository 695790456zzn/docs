# CSS
## 布局
### 盒模型宽度计算
**offsetWidth = (内容宽度 + 内边距 + 边框)，无外边距；**
```css
#div1 {
    width: 100px;
    padding: 10px;
    border: 1px solid #ccc;
    margin: 10px;
    box-sizing: border-box; // 使 offsetWidth 为100px；
}
```
div1的offsetWidth是多少？（122px）

### margin纵向重叠
```html
<!-- 如下代码， AAA 和 BBB 之间的距离是多少？ -->
p {
    font-size: 16px;
    margin-top: 10px;
    margin-bottom: 15px;
    line-height: 1;
}

<p>AAA</p>
<p></p>
<p></p>
<p></p>
<p>BBB</p>
```
相邻元素的 margin-top 和 margin-bottom会发生重叠；

空白内容的 <p></p> 也会重叠；

答案: 15px；

### margin 负值问题
- margin-top 和 margin-left 负值，元素向上、向左移动；
- margin-right 负值，右侧元素左移，自身不受影响；
- margin-bottom 负值，下方元素上移，自身不受影响；

### BFC理解与应用

Block format context，块级格式化上下文；

一块独立渲染区域，内部元素的渲染不会影响边界以外的元素；
- 形成 BFC 的条件：
  - float 不是 none
  - position 是absolute 或者是 fixed
  - overflow 不是visible（可以是：hidden,clip,scroll,auto,overlay）
  - display 是 flex 或者 inline-block
- BFC 常见应用：
  - 清除浮动

### float 布局

如何实现圣杯布局和双飞翼布局；

目的：
- 三栏布局，中间一栏最先加载和渲染（内容最重要）
- 两侧内容固定，中间内容随着宽度自适应
- 一般用于 PC 网页

圣杯布局和双飞翼布局技术总结：

- 使用 float 布局
- 两侧使用 margin 负值，以便和中间内容横向重叠
- 防止中间内容被两侧覆盖，一个用 padding（圣杯布局） 一个用 margin（双飞翼布局）

### 手写 clearfix
```css
.clearfix:after {
    content: '';
    display: table;
    clear: both;
}
```

### flex 布局
常用语法：
- flex-direction  主轴方向
- justify-content 主轴对齐方式
- align-items  交叉轴对齐方式
- flex-wrap  是否换行
- align-self  子元素在交叉轴的对齐方式

实现一个三点的骰子
```css
<!-- 骰子容器 -->
.box {
    display: flex;
    justify-content: space-between;
}
.item {
    /* 背景色、大小、边框等 */
}
.item:nth-child(2) {
    align-self: center; /* 第二项居中对齐 */
}
.item:nth-child(3) {
    align-self: flex-end; /* 第三项尾对齐 */
}
```

## 定位
### absolute 和 relative 分别依据什么定位
- relative 依据自身定位
- absolute 依据最近一层定位元素定位

### 居中对齐有哪些实现方式
#### 水平居中
- inline 元素： text-align: center;
- block 元素： margin: auto;
- absolute 元素：left: 50%; margin-left 负值
#### 垂直居中
- inline 元素：line-height 的值等于 height 值；
- absolute 元素：top: 50%; margin-top 负值；
- absolute 元素：transform: translate(-50%, -50%)；(CSS3属性，注意浏览器兼容)
- absolute 元素：left, top, bottom, right = 0; + margin: auto；（兼容性好）

## 图文样式
### line-height 如何继承
- 写具体数值，如 30px，则继承该值
- 写比例，如 2、1.5，则继承该比例
- 写百分比，如 200%，则继承计算出来的值

## 响应式
### rem
rem 是一个长度单位
- px 是绝对长度单位
- em 相对长度单位，相对于父元素，不常用
- rem 相对长度单位，相对于根元素，常用于响应式布局
### 响应式布局的常见方案
- media-query ，根据不同的屏幕宽度设置根元素font-size
- rem ，基于根元素的相对单位
### vw、vh
- window.screen.height  // 屏幕高度
- window.innerHeight // 网页视口高度
- document.body.clientHeight  // 内容高度，随网页内容变化
- vh：网页视口高度的 1 / 100；
- vw：网页视口宽度的 1 / 100；
- vmax：取两者最大值；
- vmin：取两者最小值；

## 补充
### CSS 样式优先级
!important > 内联样式 > ID 选择器 = 属性选择器 = 伪类选择器 > 标签选择器 = 伪元素选择器 > 通配选择器

权重的4个等级顺序

- 第一等级：代表内联样式，如 style="" ，权值为 1000
- 第二等级：代表id选择器，如 #content ，权值为 100
- 第三等级：代表类，伪类和属性选择器，如 .content ，权值为 10
- 第四等级：代表标签选择器和伪元素选择器，如 div p ，权值伪 1

**注意**：通用选择器（*），子选择器（>），相邻同胞选择器（+）并不在这个等级中，所以他们的权值为0
权重的优先顺序：行内样式（1000）> ID选择器（100）> 类选择器（10）> 标签选择器（1） >  通用选择器（0）

## css控制html结构显示和隐藏的方法
1.使用 display 属性

通过设置 display 属性为 none 可以隐藏元素，设置为其他值（如 block 、 inline）可以显示元素
```css
.hidden {
    display: none;
}
```

2.使用 visibility 属性

visibility属性可以控制元素的可见性，但保留其占据的空间。设置为 hidden 时，元素不可见，但仍然占据布局空间。
```css
.hidden {
    visibility: hidden;
}
```

3.使用 opacity 属性

通过设置 opacity 属性为 0 可以使元素完全透明，从而实现隐藏效果，但元素仍然占据空间并可以被点击
```css
.hidden {
    opacity: 0;
    pointer-events: none; /* 禁止点击 */
}
```

4.使用 position 属性

通过设置 position 属性为 absolute 或 fixed 并将元素移除视口，可以实现隐藏效果
```css
.hidden {
    position: absolute;
    left: -9999px; /* 将元素移出视口 */
}
```

5.使用 css 伪类

可以使用伪类（如 :hover 或 :focus ）来控制元素的显示和隐藏
```css
.hidden {
    display: none;
}

.button:hover + .hidden {
    display: block; /* 当按钮被悬停时显示 */
}
```

6.使用媒体查询

可以通过css媒体查询屏幕尺寸或设备特性来控制元素的显示和隐藏
```css
.hidden {
    display: block;
}

@media (max-width: 600px) {
    .hidden {
        display: none; /* 在小屏幕上隐藏 */
    }
}
```

7.使用 css 动画

可以结合 css 动画实现元素的渐隐和渐显效果
```css
.fade {
    opacity: 1;
    transition: opacity 0.5s ease;
}

.fade.hidden {
    opacity: 0;
}
```
