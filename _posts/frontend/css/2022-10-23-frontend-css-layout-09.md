---
layout: "post"
title: "「前端开发」- CSS-Layout-09"
subtitle: "CSS布局 —— 三列布局"
author: "eliochiu"
date: 2022-10-23

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
左盒子左浮，右盒子右浮，中间盒子变成BFC。调整HTML：
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

### 双定位 + cacl
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
```

## 双定位 + BFC
```


