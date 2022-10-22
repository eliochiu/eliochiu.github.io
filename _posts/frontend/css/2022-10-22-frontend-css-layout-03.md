---
layout: "post"
title: "「前端开发」- CSS-Layout-03"
subtitle: "CSS布局 —— 浮动"
author: "eliochiu"
date: 2022-10-22

tags: ["前端开发@Tags", "CSS@Languages", "布局@Tags"]
lang: zh
catalog: true
header-image: ""
header-style: text
katex: true
---

很长一段时间里，浮动都是网页布局的方案，然而浮动诞生之初却是为了浮动图片，形成文字环绕图片的效果。

浮动通过控制CSS中的`float`属性实现，`float`属性的可选值为`left`, `right`, `none`，初始值为`none`。

## 浮动的规则
浮动的元素遵循下列的规则排列：

**浮动的元素不能超过其容器的左（右）内边界，即浮动只在内容区域进行。**
```css
.son1 {
  float: right;
  width: 100px;
  height: 100px;
  background-color: dodgerblue;
}

.son2 {
  float: left;
  width: 100px;
  height: 100px;
  background-color: dodgerblue;
}
```
![](/img/in-post/post-frontend-css/float1.png#pic_center)

**如果一个元素前面的元素处于左浮动状态，那么后面元素的左外边界必然在前一个元素的右外边界右侧，右浮动同理。**

该条规则可以实现浮动元素紧贴布局的效果，避免了浮动元素之间的相互遮挡。

```css
.son {
  float: left;
  border: 1px solid black;
  width: 100px;
  height: 100px;
  background-color: dodgerblue;
}
```

![](/img/in-post/post-frontend-css/float2.png#pic_center)

**左浮动元素的右外边界不能超过右浮动元素的左外边界，反之同理。**
```css
.son1 {
  float: left;
  border: 1px solid black;
  width: 200px;
  height: 200px;
  background-color: dodgerblue;
}

.son2 {
  float: left;
  border: 1px solid black;
  width: 200px;
  height: 200px;
  background-color: dodgerblue;
}
```

![](/img/in-post/post-frontend-css/float3.png#pic_center)

**浮动的元素外边界永远不能超过其父元素的内边界，如果一行无法排列开，将会自动挤到下一行进行排列。**
```css
.son {
  float: left;
  border: 1px solid black;
  width: 100px;
  height: 100px;
  background-color: dodgerblue;
}
```
![](/img/in-post/post-frontend-css/float4.png#pic_center)

## 浮动元素的特点

**浮动的元素将会脱离标准流，简称脱标。浮动的盒子在标准流中不占有位置，好像“飘在半空中一般”。**

![](/img/in-post/post-frontend-css/float5.png#pic_center)

可以看出，浮动盒子`float-son`脱离了标准流，对其后的`normal-son`造成了遮挡。

**浮动只影响其后的标准流盒子，不会影响之前的标准流盒子。也就是说，标准流盒子占有了位置后，浮动只能在下一行排列。**

![](/img/in-post/post-frontend-css/float6.png#pic_center)

浮动的盒子并没有遮挡住他之前的标准流盒子，是因为在他之前的标准流盒子已经占据了位置，浮动的元素应当另起一行排列。

**浮动的行内元素具备了行内块元素的特点。**

```css
span {
  float: right;
  font-size: 20px;
  height: 100px;
  background-color: yellow;
}
```
![](/img/in-post/post-frontend-css/float7.png#pic_center)

显然，浮动使得`span`元素获得了高度属性，具备了行内块元素的特点。

## 清除浮动

### 为什么要清除浮动
我们知道，如果不为父盒子指定高度，则父盒子将由子盒子自动撑开。当没有设置高度的父盒子中的子盒子浮动后，由于浮动会脱离标准流，将会造成父盒子高度的塌陷。例如：

子盒子浮动前，父盒子被子盒子撑开：
![](/img/in-post/post-frontend-css/float8.png#pic_center)

子盒子浮动后，父盒子高度塌陷：
![](/img/in-post/post-frontend-css/float9.png#pic_center)

为了防止浮动元素脱离标准流导致的一系列影响，我们需要清除浮动。

### 清除浮动的方式

清除浮动的基本原则是：闭合浮动，将浮动的元素闭合起来，使其不要影响其他元素。

清除浮动使用的属性为`clear`，他的取值有`left`, `right`, `both`，表示的是使其尽可能远离某一侧的浮动元素。

#### 为父盒子指定高度
上面提到，父盒子如果没有高度，浮动元素会导致其塌陷，因此要想解决塌陷的问题，可以为父盒子指定高度。

> 这种方法只适合高度固定的布局，要给出精确的高度，如果高度和父级div不一样时，会产生问题。


#### 额外标签法
想要为谁清除浮动，就在该浮动元素的后面添加一个内容为空的div。

```css
.clear-fix {
  clear: both;
}
```

> 额外标签法引入了没意义的标签，原则上不推荐使用

#### 伪元素法
为浮动元素的父元素添加`::after`伪元素。
```css
.father::after {
  content: "";
  display: block;
  clear: both;
}
```

> 注意：伪元素默认是行内元素，需要转化成块元素才能生效。
> 同时，为了兼容ie6-7（不支持after伪元素），需要添加*zoom：1

#### 双伪元素法
为浮动元素的父元素同时添加`::after`和`::before`伪元素。
```css
.father::after,
.father::before {
  content: "";
  display: block;
  clear: both;
}
```

#### overflow
为父元素添加`overflow: hidden;`，使父盒子触发BFC，可以实现清除浮动的效果。缺点是：内容增多时候容易造成不会自动换行导致内容被隐藏掉，无法显示需要溢出的元素。不能和position配合使用，因为超出的尺寸的会被隐藏。

