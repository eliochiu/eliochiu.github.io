---
layout: "post"
title: "「前端开发」- CSS-Layout-09"
subtitle: "CSS布局 —— 三列布局"
author: "eliochiu"
date: 2022-10-25

tags: ["前端开发@Tags", "CSS@Languages", "布局@Tags"]
lang: zh
catalog: true
header-image: ""
header-style: text
katex: true
---
三列布局是一种常用的布局方式，常见的三列布局有两种：前两列定宽且第三列自适应、中间自适应且两端定宽。

第一种布局方式和两列布局没什么区别，可使用浮动、绝对定位、flex、grid、table实现。这里主要讨论第二种布局方式。

公共的HTML代码：
```html
<div class="container clearfix">
    <div class="left">左</div>
    <div class="content">自适应</div>
    <div class="right">右</div>
</div>
```

公共的CSS样式：
```css
body {
    margin: 0;
}

.container {
    height: 100px;
    background-color: #eebefa;
}

.left {
    height: 100px;
    width: 200px;
    background-color: #f783ac;
}

.content {
    height: 100px;
    background-color: #d9480f;
}

.right {
    height: 100px;
    width: 200px;
    background-color: #c0eb75;
}

.left,
.content,
.right {
    font-size: 70px;
    line-height: 400px;
    text-align: center;
}

/* 清除浮动 */
.clearfix:after {
    content: '';
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
}
```

最终的效果：
![](/img/in-post/post-frontend-css/3column1.png#pic_center)

## 双浮动 + BFC
左盒子左浮，右盒子右浮，中间盒子变成BFC。需要注意的是，浮动元素必须写在内容元素之前，否则会引起布局混乱，调整HTML为：
```html
<div class="container clearfix">
    <div class="left">左</div>
    <div class="right">右</div>
    <div class="content">自适应</div>

</div>
```

```css
.left {
    float: left;
}

.right {
    float: right;
}

.content {
    overflow: hidden;
}
```

<!-- ## 双定位 + cacl
左盒子左浮，右盒子右浮，中间盒子计算宽度。
```css
.left {
    float: left;
}

.right {
    float: right;
}

.content {
    width: cacl(100% - 400px)
}
``` -->

## 双定位 + margin
左右盒子均绝对定位，中间盒子BFC。

```css
.container {
    position: relative;
}

.left {
    position: absolute;
    left: 0;

}

.content {
    margin-left: 200px;
    margin-right: 200px;
    width: calc(100% - 400px);
}

.right {
    position: absolute;
    right: 0;
```

## flex布局

```css
.container {
    display: flex;
}

.content {
    flex: 1;
}
```

## grid布局
```css
.container {
    display: grid;
    grid-template-columns: 200px 1fr 200px;
}
```

## 圣杯布局
圣杯布局是一种常见的布局方式，分别有`header`, `footer`, `left`, `right`, `center`，其中`header`、`footer`定高，`left`、`right`定宽，`center`自适应。基本的DOM结构（注意`center`排在第一位）：
```html
<header>header</header>
<div class="container">
    <div class="center column">center</div>
    <div class="left column">left</div>
    <div class="right column">right</div>
</div>
<footer>footer</footer>
```
最重要实现的效果：

![](/img/in-post/post-frontend-css/cup.png#pic_center)

圣杯布局的基本思路是：
- 为`header`和`footer`指定宽度为`100%`，高度为定值。
- 为`left`和`right`指定宽度为定值，高度为容器的定高。
- 为`center`指定宽度为100%。
- 为三列添加浮动`float: left`，因为`center`宽度是容器100%因此无法和左右两列在一行
- `left`添加`margin-left: -100%`，右盒子添加`margin-left: -右盒子的宽度`，将使左右盒子覆盖掉`center`盒子
- 为`left`, `right`添加相对定位的偏移，圣杯布局完成。

```css
* {
    margin: 0;
    padding: 0;
}

body {
    min-width: 700px;
    padding: 0 250px;
}

header {
    width: 100%;
    height: 100px;
    background-color: bisque;
}

footer {
    width: 100%;
    height: 100px;
    background-color: #71c29d;
    clear: both;
}

.container {
    height: 300px;
    padding-left: 200px;
    padding-right: 150px;
}

.left {
    margin-left: -100%;
    left: -200px;
    width: 200px;
    background-color: pink;
}

.right {
    margin-left: -150px;
    right: -150px;
    width: 150px;
    background-color: greenyellow;
}

.center {
    width: 100%;
    background-color: skyblue;
}

.column {
    position: relative;
    float: left;
    height: 300px;
    line-height: 300px;
}
```

圣杯布局可以使用浮动、flex、grid实现，其中flex和grid实现非常简单，浮动实现比较复杂。

浮动实现圣杯布局的关键在于：
- 三列要设置相对定位
- left盒子left设为-左盒子宽度，right盒子right设为-右盒子宽度
- left盒子margin-left设为-100%，right盒子margin-left设为-右盒子宽度









