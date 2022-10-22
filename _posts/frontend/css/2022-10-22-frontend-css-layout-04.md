---
layout: "post"
title: "「前端开发」- CSS-Layout-04"
subtitle: "CSS布局 —— BFC"
author: "eliochiu"
date: 2022-10-22

tags: ["前端开发@Tags", "CSS@Languages", "布局@Tags"]
lang: zh
catalog: true
header-image: ""
header-style: text
katex: true
---
## BFC
BFC（*Block Fommayting Context*， 块级格式化上下文），指代的是一个区域。这个区域具有下列性质：
- 一个BFC区域包括了创建该上下文元素的所有子元素，但是不包括创建了新的BFC元素的子元素。
- BFC是一块独立的渲染区域，可看作是元素的属性，这种元素与其他元素隔绝开来，不会影响到其他元素。

## 设置BFC区域
下列方法可以使元素变为BFC区域：
- `body`根元素是BFC
- 设置浮动，不包括`none`
- 设置定位，不包括`absolute`, `fix`
- 设置行内块显示模式`inline-block`
- 设置`overflow`属性，包括`scroll`, `hidden`, `auto`
- 设置表格单元格`table-cell`
- 设置弹性盒`flex`

## BFC区域应用

BFC区域有许多作用，可以解决外边距折叠、清除浮动、父盒子高度塌陷等问题。

### 解决外边距折叠的问题

例如，我们为两个相邻的子元素指定下列样式：
```css
.son {
  width: 100px;
  height: 100px;
  margin: 100px;
} 
```
![](/img/in-post/post-frontend-css/bfc1.png#pic_center)


由于外边距折叠原理，两个盒子的间距应为100px，我们可以为两个子盒子添加父盒子变成BFC区域的方式，取消外边距折叠。
```css
.father {
  overflow: hidden;
}
```

此时，两个盒子的间距为200px。
![](/img/in-post/post-frontend-css/bfc2.png#pic_center)

### 解决包含塌陷的问题
有些时候，我们为父盒子里的子盒子指定`margin-top: 100px`，我们希望子盒子与父盒子相距100px，而实际上的效果是：
![](/img/in-post/post-frontend-css/bfc3.png#pic_center)

显然，子盒子带着父盒子向下移动了100px，并没有实现子盒子在父盒子内部移动100px的效果，这是父子盒子外边距合并导致的。

我们可以将父盒子设置为BFC区域，效果如下：
![](/img/in-post/post-frontend-css/bfc4.png#pic_center)

### 清除浮动
浮动的元素会脱离标准流，从而导致被撑开的父盒子高度塌陷，如果将父盒子变成BFC，则可以清除浮动，这就是为父元素添加`overflow: hidden`的原因。

### 解决浮动元素遮挡的问题
浮动的元素会脱离标准流，从而遮挡住后面的标准流盒子。
![](/img/in-post/post-frontend-css/bfc5.png#pic_center)

我们只需要让被遮挡的元素变成BFC，就可以避免浮动带来的遮挡，还能实现自适应的布局方法。
![](/img/in-post/post-frontend-css/bfc6.png#pic_center)

> 该方法可以实现两列布局，具体参考后续章节。

