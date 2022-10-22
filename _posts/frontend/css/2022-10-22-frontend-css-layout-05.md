---
layout: "post"
title: "「前端开发」- CSS-Layout-05"
subtitle: "CSS布局 —— 定位"
author: "eliochiu"
date: 2022-10-22

tags: ["前端开发@Tags", "CSS@Languages", "布局@Tags"]
lang: zh
catalog: true
header-image: ""
header-style: text
katex: true
---
## 定位
定位也是CSS布局的一种方式，他比浮动更加灵活。定位有两个核心：定位方式和边偏移。

### 定位方式
CSS共有五种基本的定位方式，他们通过CSS的`position`属性指定，分别是：
- 静态定位`static`：默认定位方式，遵循标准流元素的规则。
- 相对定位`relative`：相对元素在标准流中的位置进行偏移。
- 绝对定位`absolute`：相对容纳块进行偏移。
- 固定定位`fixed`：与绝对定位类似，相对视窗进行偏移。
- 粘性定位`sticky`：元素一开始在标准流中，遵循相对定位的规则；当出发粘滞条件后，遵循固定定位的规则。

### 边偏移
边偏移是指在确定了定位方式后，相对基础定位点的偏移量，主要由`left`, `right`, `top`, `bottom`四个属性控制。

边偏移的属性值可以为正也可以为负，为负时可以将其移至容纳块外部。

### 定位元素的容纳块
一般而言，容纳块就是父元素，例如`body`的容纳块是`html`根标签，`body`又是其他内容标签的容纳块。而对于相对定位的元素来说，容纳块完全取决于定位类型。

- 对于`position`属性是`static`和`relative`的元素，容纳块是其距离最近的父元素。
- 对于`position`属性是`absolute`的元素，容纳块是距离他最近的、带有非`static`定位的祖辈元素。

## 相对定位
相对定位是一种最容易理解的定位方式，他相对于自己在标准流中的位置进行偏移，但值得注意的是，相对定位的元素仍然保留其在标准流中的位置，不会脱离标准流。例如，初始状态下两个`div`盒子遵循标准流规则上下排放：
![](/img/in-post/post-frontend-css/position-relative1.png#pic_center)

为红色的盒子添加相对定位，并指定左偏移为100px：
![](/img/in-post/post-frontend-css/position-relative2.png#pic_center)

可以看到，蓝色盒子并没有因为红色盒子的偏移而向上移动，说明相对定位元素仍占有其标准流位置。

## 绝对定位
绝对定位的容纳块是距离他最近的、非`static`定位的祖辈元素。因此，我们常为绝对定位元素的父元素指定相对定位属性，也就是常说的“子绝父相”。例如：
```css
.container {
  position: relative;
  width: 200px;
  height: 200px;
  background-color: red;
}

.box {
  position: absolute;
  left: 100px;
  top: 100px;
  width: 100px;
  height: 100px;
  background-color: blue;
}
```
能够实现子盒子在父盒子内部右下定位的效果。
![](/img/in-post/post-frontend-css/position-absolute1.png#pic_center)

和相对定位不同的是，绝对定位的盒子会脱离标准流，不再保有原来的位置。例如，我们在一个父盒子中放置两个子盒子，标准流下他们是这样排列的：
![](/img/in-post/post-frontend-css/position-absolute2.png#pic_center)

当我们为蓝色盒子设置绝对定位后：

![](/img/in-post/post-frontend-css/position-absolute3.png#pic_center)

可以看到，绿色盒子并因为蓝色盒子的偏移而向上移动，说明相对定位元素不占有其标准流位置。

## 固定定位
固定定位与绝对定位类似，只不过固定定位是相对视窗进行偏移。固定定位可以保证，不管滚轮滑到哪里，用户都能看到该元素。

固定定位的元素同样不占有位置，即脱离标准流，这一点与绝对定位是相同的。

## 粘性定位
粘性定位是CSS新增的一种定位方式，主要结合了相对定位和固定定位的特点。粘性定位会根据元素距离视窗的距离进行判断，如果距离大于阈值，则为相对定位，否则为固定定位。

![](/img/in-post/post-frontend-css/position-sticky.gif#pic_center)

## 元素的溢出与裁剪
如果内容太多，元素放不下，可能会出现溢出现象，可以通过控制`overflow`属性来对溢出的文字进行处理。
- `visible`：默认的处理方式，显示溢出的文字。
- `hidden`：隐藏溢出的文字。
- `scroll`：为元素侧边添加滚动条，滚动显示溢出的文字。
- `auto`：在需要时提供滚动条。
![](/img/in-post/post-frontend-css/overflow.png#pic_center)

## 元素的可见性
除了溢出和剪裁，还可以通过`visibility`控制元素的可见性：
- `visible`：元素可见。
- `hidden`：元素隐藏，但元素仍然占有标准流位置。
- `collapse`：渲染表格时使用。


