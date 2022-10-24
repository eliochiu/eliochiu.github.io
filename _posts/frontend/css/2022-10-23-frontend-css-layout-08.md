---
layout: "post"
title: "「前端开发」- CSS-Layout-08"
subtitle: "CSS布局 —— 两列布局"
author: "eliochiu"
date: 2022-10-23

tags: ["前端开发@Tags", "CSS@Languages", "布局@Tags"]
lang: zh
catalog: true
header-image: ""
header-style: text
katex: true
---



两列布局是一种简单的布局方式，主要有两种需求：左侧定宽且右侧自适应、左侧不定宽且右侧自适应。可以使用下列不同的方式实现两列布局。

## 左侧定宽且右侧自适应

假设我们要实现下列HTML的两列布局：
```html
<div class="container">
	<div class="left">定宽</div>
	<div class="right">自适应</div>
</div>
```
效果如下：
![](/img/in-post/post-frontend-css/2column1.png#pic_center)

### 浮动 + margin
```css
.container {
    height: 100px;
}

.left {
    float: left;
    width: 200px;
    height: 100%;
    background-color:chartreuse;
}

.right {
    margin-left: 200px;
    height: 100%;
    background-color: coral;
}
```

### 浮动 + BFC
将自适应的盒子变成BFC。
```css
.container {
    height: 100px;
}

.left {
    float: left;
    width: 200px;
    height: 100%;
    background-color:chartreuse;
}

.right {
    overflow: hidden;
    height: 100%;
    background-color: coral;
}
```


### 定位 + margin
```css
.container {
    position: relative;
    height: 100px;
}

.left {
    position: absolute;
    left: 0;
    width: 200px;
    height: 100%;
    background-color:chartreuse;
}

.right {
    margin-left: 200px;
    height: 100%;
    background-color: coral;
}
```

### 双定位
```css
.container {
    position: relative;
    height: 100px;
}

.left {
    position: absolute;
    left: 0;
    width: 200px;
    height: 100%;
    background-color:chartreuse;
}

.right {
    position: absolute;
    left: 200px;
    right: 0;
    height: 100%;
    background-color: coral;
}
```

### flex布局
将父元素变成弹性容器，给左侧添加定宽，右侧自适应布局。
```css
.container {
    display: flex;
    height: 300px;
}

.left {
    width: 200px;
    height: 100%;
    background-color:chartreuse;
}

.right {
    /* 剩余位置还有空间时，全部分配给该元素 */
    flex: 1;
    height: 100%;
    background-color: coral;
}
```

### table布局
给父元素指定table显示模式，子元素变成`table-cell`
```css
.container {
    display: table;
    height: 100px;
    width: 100%;
}

.left {
    display: table-cell;
    width: 200px;
    background-color:chartreuse;
}

.right {
    display: table-cell;
    background-color: coral;
}
```

### grid布局
将父元素变成grid元素，通过`grid-template-columns`属性完成两列布局。
```css
.container {
    display: grid;
    height: 100px;
    width: 100%;
    grid-template-columns: 200px 1fr;
}

.left {
    background-color:chartreuse;
}

.right {
    background-color: coral;
}
```

## 左侧不定宽且右侧自适应
假设我们要实现下列HTML的两列布局：
```html
<div class="container">
	<div class="left">左侧不定宽</div>
	<div class="right">右侧自适应</div>
</div>
```
效果如下：
![](/img/in-post/post-frontend-css/2column2.png#pic_center)

### 浮动 + BFC
不为左侧盒子指定宽度，浮动将其变成行内块元素，宽度由元素自动撑开，将自适应的盒子变成BFC。
```css
.container {
    height: 100px;
}

.left {
    float: left;
    height: 100%;
    background-color:chartreuse;
}

.right {
    overflow: hidden;
    height: 100%;
    background-color: coral;
}
```

### flex布局
```css
.container {
    display: flex;
    height: 100px;
}

.left {
    height: 100%;
    background-color:chartreuse;
}

.right {
    flex: 1;
    height: 100%;
    background-color: coral;
}
```

### grid布局
```css

.container {
    display: grid;
    height: 100px;
    grid-template-columns: auto 1fr; 
    /* auto表示自动确认其宽度 */
}

.left {
    height: 100%;
    background-color:chartreuse;
}

.right {
    height: 100%;
    background-color: coral;
}
```






