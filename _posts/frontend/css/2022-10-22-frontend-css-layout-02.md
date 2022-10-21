---
layout: "post"
title: "「前端开发」- CSS-Layout-02"
subtitle: "CSS布局 —— 盒模型"
author: "eliochiu"
date: 2022-10-22

tags: ["前端开发@Tags", "CSS@Languages", "布局@Tags"]
lang: zh
catalog: true
header-image: ""
header-style: text
katex: true
---

## 盒模型
CSS中的一切元素都可以看成一个盒子，这个盒子用来描述该元素在文档布局中所占的空间。一个盒子由四部分组成：内容区（content）、内边距（padding）、边框（border）和外边距（margin），他们之间的关系如下图所示。

![](/img/in-post/post-frontend-css/box-model.png#pic_center)

## 内容区
我们知道，如果想为一个盒子指定高度和宽度，可以使用`height`,`width`属性，但这两个属性到底控制那一部分呢？

通常，盒子的宽度指的是内容+内边距+边框的总长度，根据定义的不同，盒模型可以分为标准盒模型和怪异盒模型（IE盒模型）。

### 标准盒模型
标准盒模型下，`width`指定的是内容区的宽度，因此内边距和边框的存在会撑大盒子。例如：
```css
.content-box {
  box-sizing: content-box;
  width: 100px;
  padding: 20px;
  border: 1px solid black;
}
```
该盒子的实际宽度为：$100 + 20\times2+1\times2px = 142px$

### 怪异盒模型
而在怪异盒模型下，`width`指定的是内容+内边距+边框的总长度。也就是说，一旦指定了宽度，盒子的大小就不再变化了，浏览器会自动根据当前边框和内边距的值，求出内容区的宽度。例如：
```css
.border-box {
  box-sizing: border-box;
  width: 100px;
  padding: 20px;
  border: 1px solid black;
}
```
该盒子实际的宽度为：$100px$，内容区的宽度为$100-20\times2-1\times2px=58px$

盒子模型通过`box-sizing`属性设置，其中`content-box`为标准盒模型，`border-box`为怪异盒模型。

## 内边距

### 内边距属性
紧邻元素内容区是内边距，它位于边框和内容区之间，通过`padding`属性为元素指定内边距，`padding`可以接受1-4个参数。

- 一个参数： `padding: 10px`表示为四个方向均指定10px的内边距。
- 两个参数：`padding: 10px 20px`表示为上下指定10px的内边距，左右指定20px的内边距。
- 三个参数：`padding: 10px 20px 30px`表示指定**10px的上内边距，20px的左右内边距和30px的下内边距**。
- 四个参数：`padding: 10px 20px 30px 40px`表示按照上、左、下、右的顺序指定10、20、30、40px的内边距。

### 内边距属性拆分
除了使用`padding`为四条边一起指定内边距，也可以使用`padding-left`、`padding-right`、`padding-top`、`padding-bottom`、分别为四个方向指定内边距。例如下列代码等价于`padding: 0 20px`:
```css
.box {
  padding-left: 20px; 
  padding-right: 20px; 
  padding-top: 0;
  padding-bottom: 0;
}
```
内边距的取值可以采用百分比，此时将会以父元素的宽度为参考（不会参考父元素的高度，都相对于宽度而言）。

### 行内元素的内边距
左右内边距对行内元素有效，然而上下内边距却不会影响行高（除非行内元素指定了背景图/背景色，背景会上下延伸）

## 边框
元素内边距的外侧是边框，边框就像是内容和内边距包围的一圈线段。边框有三个属性，宽度、样式和颜色，分别对应`border-width`, `border-style`和`border-color`。

此外，还可以通过形如`border-left-style`的属性，为四个方向分别指定宽度、样式和颜色。

### 边框的样式
边框有如下样式：
![](/img/in-post/post-frontend-css/border-style.png#pic_center)

border和padding一样，具有多边样式和单边样式，例如`border-style: dashed dotted solid none`

### 边框的颜色
通过`border-color`为元素指定边框颜色，这里比较简单，仅仅讨论一种特殊颜色：透明。

透明色的值为`transparent`，透明的色的边框有宽度但是没有颜色，就好像不存在一样，和`none`有本质区别。

### 边框的复合写法

```border: [border-width], [border-style], [border-color]```

这种复合写法为四个方向指定一样的边框，如果想修改某一方向的边框，可利用css层叠性在添加一条`border-left`规则即可。

### 行内元素的边框
和内边距一样，上下边框的设置不会改变行内元素的行高，左右两侧的边框属性生效，还会推开文字，导致行内元素宽度变大。

### 圆角边框
使用`border-radius`属性可以指定圆角边框，圆角的半径是圆的半径，css将会在直角边框内画内切圆，并将暴露的圆弧作为该方向的圆角边框，见下图。
![](/img/in-post/post-frontend-css/border-radius.png#pic_center)

如果想将一个正方形盒子变成圆形，只需添加`border-radius: 50%`即可，见下图：

![](/img/in-post/post-frontend-css/border-radius2.png#pic_center)

## 外边距

外边距常用处理相邻盒子之间的摆放间隙，外边距在元素的周围添加空白，外边距的设置与内边距类似，这里不再赘述。

### 外边距折叠
外边距最有趣的一点，就是会进行外边距的折叠，即相邻两个外边距相遇，会折叠为一个外边距，取值为二者的最大值。

外边距折叠之初是为了解决CSS1.0中`p`元素默认样式的问题，我们知道，相邻段落之间本身就有一定间距，这部分的间距就是通过`margin`属性设置的，如果不进行外边距折叠，那么行与行之间的间距将变成2倍的外边距。

外边距折叠常发生在：
- 相邻兄弟元素的`margin-bottom`和`margin-top`
- 父元素与其第一个子元素的`margin-top`
- 父元素与其最后一个子元素的`margin-bottom`

> 解决外边距折叠可以使用BFC，具体内容参见BFC的介绍


### 行内元素的外边距
和内边距一样，上下外边距不会改变行内元素的行高，左右外边距会推开文字。