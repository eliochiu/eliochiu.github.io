---
layout: "post"
title: "「前端开发」- Interview-01"
subtitle: "面试经验-01"
author: "eliochiu"
date: 2022-11-20

tags: ["前端开发@Tags", "面经@Tags"]
lang: zh
catalog: true
header-image: ""
header-style: text
katex: true
---

### Q: 讲一下盒模型，普通盒模型和怪异盒模型有什么区别？
CSS中，所有元素都可以看成是一个盒模型，它规定了元素的显示方式和元素之间的关系。盒模型共由四部分组成，它们分别是：**内容区（content）、内边距（margin）、边框（border）和外边距（margin）**，其中内边距是内容和边框之间的距离，外边距是两个盒模型之间的距离。CSS盒模型有两种，分别是**标准盒模型和IE盒模型**。

标准盒模型，也称w3c盒模型，是一般网页经常使用的一种盒模型。在标准盒模型下，一个盒子的总宽度= `width + padding(左右) + border(左右)+ margin(左右) `，width属性只控制内容区的宽度。

IE盒模型，也称怪异盒模型，主要用于IE内核的浏览器上。在IE盒模型下，一个盒子的总宽度=`width + margin（左右）`，width属性同时控制了内容区、内边距和边框，若`width`指定后调整内边距和边框，相应的宽度变化会反映在内容区。

CSS的`box-sizing`属性用于指定盒模型，其中`box-sizing: content-box`是标准盒模型，`box-sizing: border-box`是IE盒模型。


### Q: 块元素和行内元素区别是什么？常见块元素和行内元素有哪些？
HTML元素可以分为块元素和行内元素，他们具有不同的显示模式。可以通过CSS的`display`属性控制元素的显示模式，其中`display: block`将该元素转换成块元素，`display: inline`将该元素转换成行内元素。

块元素有下面的特点：
- 高度和宽度属性有效，`margin, padding, border`等盒子模型属性在水平和垂直两个有效。
- 块元素独占一行，从上到下排列。
- 默认宽度是父元素宽度的100%，可以充当行内元素和块级元素的容器。

行内元素有下面的特点：
- 高度和宽度属性无效，`margin, padding, border`等盒子模型属性在水平方向有效，垂直方向无效。
- 行内元素从左到右在一行排列。
- 宽度就是其中文字的宽度，完全由其中元素撑开。

常见的块级标签：`div, p, h1~h6, ul, ol, li, dl, dd, dt, table, tr, header, nav, main, footer, section, article, aside, form`等

常见的行内标签：`span, i, b, u, strong, em, del, ins, a`

### Q: HTML语义化标签有哪些？
- `header`：常用在网页/`section`的页眉
- `nav`：常用在导航链接处
- `footer`：常用在网页/`section`的页脚
- `hgroup`：标题组
- `section`：分段或分块
- `article`：独立的部分
- `aside`：当前页面的附属信息
- `figure`：独立的流内容（图像、代码、图表）
- `figurecaption`：用于定义`figure`的标题
- `address`：联系信息，一般用于末尾

### Q: 伪类和伪元素的区别是什么？
伪类描述的是出于某种状态的元素（实际上并不存在，是一种悬浮的元素），类似于往已有的元素上添加类。例如“第一个子元素”、“访问过的元素”等，伪元素由`:`开始；

而伪元素则是在页面中创建了实际的元素，由`::`开始。例如`::after、::before`。

### Q: CSS如何实现垂直居中？
- `line-height`设置成父元素的`height`，这种方法适用于子元素是单行文本的情况
- `display: inline-block`, `vertical-align: middle`
- 父元素`display: table`， `vertical-align: middle`，子元素`display: table-cell`
- 父元素`display: flex`, `align-items: center或者align-itself: center`
- 父元素添加伪元素：
  ```css
  #father::before {
    content: "";
    display: inline-block;
    vertical-align: middle;
    height: 100%;
  }
  ```
- 父元素设置相对定位，子元素绝对定位，`top: calc(50% - 自身高度 / 2)`
- 父元素设置相对定位，子元素绝对定位，`top: 50%`, `margin-top: -自身高度 / 2`
- 父元素设置相对定位，子元素绝对定位，`top: 50%`，`transform: translateY(-50%)`，该方式无需知道要居中的元素的尺寸

### Q: CSS常见的选择器有哪些？
- 通配选择器`*`
- 元素选择器`p`
- 类选择器`.`
- ID选择器`#`
- 属性选择器`[]`
- 交集选择器`div.red`
- 并集选择器`div,#red`
- 后代选择器`father son`
- 子元素选择器`father > son`
- 通用兄弟选择器`sbling1 ~ sbling2`
- 相邻兄弟选择器`sbling1 + sbling2`
- 伪类选择器：`:`
- 伪元素选择器：`::`

### Q: CSS的优先级如何计算？
优先级遵循层叠、特指度等规则：
- `!important`永远优先执行
- 行内样式 > ID选择器 > 类/伪类/属性选择器 > 元素/伪元素选择器 > 通配选择器，如果是复合选择器，则将对应选择器的权重相加再比较
- 继承具有最低权重
- 相同权重，遵循层叠性，后定义的样式覆盖前面的样式，且内联 > 内部样式表 > 外部样式表

### Q: 长度单位px、em和rem的区别是什么？
`px`是像素，是一个绝对长度单位，相对屏幕分辨率来说的，一旦设置了就无法因为适应页面大小而改变。

`em`是一个相对的长度单位，它是相对于当前对象内文本的字体尺寸（注意不是父元素的字体尺寸），若没有设置行内文本的字体尺寸，则使用浏览器默认字体尺寸，一般为`16px`。`rem`则是一个相对长度单位，它是相对于根元素的字体尺寸来说的。

`em`和`rem`两个相对长度单位比`px`更具有灵活性，常用在响应式布局中。`em`虽然灵活，但由于继承，它也存在循环嵌套的问题（通过继承，父元素的字体大小会影响子元素的字体大小），而`rem`则没有这个问题。

### Q: 讲一下flex弹性盒布局？
flex是一种布局方式，给一个元素指定了`display: flex`，该元素就成为弹性容器，其内部的所有元素都变成了弹性项目。

弹性容器有两个轴：主轴和交叉轴，其中主轴默认情况下按照从左到右排列，交叉轴从上到下排列。主轴的起始位置和终止位置叫做`main-start, main-end`，交叉轴的起始位置和终止位置叫做`cross-start, cross-end`。

flex布局共有两种属性：容器属性和项目属性，他们分别用于规定容器和项目的某些行为。

- `flex-direction: row | row-reverse | column | column-reverse`
- `flex-wrap: nowrap | wrap | wrap-reverse`
- `flex-flow: <flex-direction> | <flex-wrap>`
- `justify-content: flex-start | center | flex-end | space-between | space-around | space-evenly`
- `align-items: flex-start | center | flex-end | stretch | baseline`
- `align-content: flex-start | center | flex-end | stretch | space-between | space-around | sapce-evenly`

- `flex-grow`：规定剩余空间如何分配，默认值为0，代表不分配
- `flex-shrink`：如果空间不够该如何缩小，默认值为1，代表自动缩小
- `flex-basis`：指定初始宽度、高度，默认为`auto`
- `flex: <flex-grow> | <flex-shrink> | <flex-basis>`
  - `flex: initial = flex: 0 1 auto`
  - `flex: auto = flex: 1 1 auto`
  - `flex: none = flex: 0 0 auto`
  - `flex: 数字 = flex: 数字 0 0`
- `align-self：flex-start | center | flex-end | stretch | baseline`
- `order: <integer>`。默认为0，越小越显示在前面，越大越显示在后面。

### Q: 浮动塌陷问题解决方法是什么？
清除浮动：
- 额外标签法
- BFC
- 伪元素法
- 双伪元素法

### Q: position属性的值有哪些？各个值是什么含义？
- `static`：无定位，遵循标准流的布局方式
- `relative`：相对定位，相对其在标准流中的位置偏移，仍保留原有位置
- `absolute`：绝对定位。相对其距离最近的有定位的祖先元素进行偏移，脱离标准流
- `fixed`：固定定位。相对其视口进行偏移，脱离标准流
- `sticky`：粘性定位。阈值之前相对定位，到达阈值变成固定定位

### Q: BFC、IFC是什么？
BFC叫做块级格式化上下文，IFC是行内（内联）格式化上下文。

BFC、IFC可以看作元素的一种属性，当BFC、IFC被触发时，这种属性使得该元素成为一个封闭的容器，其子元素不会影响其他元素，常用于清除浮动、解决外边距合并问题、自适应布局等。

触发BFC的方式：
- `overflow`不为`visible`
- `float`不为`none`
- `position`不为`relative, static`
- `display: inline-block | table-cell | table-caption`


IFC作用以及触发方式：
- 水平居中：当一个块要在环境中水平居中时，设置其为inline-block则会在外层产生IFC，通过`text-align`则可以使其水平居中。 
- 垂直居中：创建一个IFC，用其中一个元素撑开父元素的高度，然后设置其`vertical-align:middle`，其他行内元素则可以在此父元素下垂直居中。

