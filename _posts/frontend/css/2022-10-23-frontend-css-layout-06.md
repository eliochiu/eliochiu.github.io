---
layout: "post"
title: "「前端开发」- CSS-Layout-06"
subtitle: "CSS布局 —— 弹性盒布局"
author: "eliochiu"
date: 2022-10-23

tags: ["前端开发@Tags", "CSS@Languages", "布局@Tags"]
lang: zh
catalog: true
header-image: ""
header-style: text
katex: true
---

<!-- ![](/img/in-post/post-frontend-css/position-relative1.png#pic_center) -->

## 弹性盒基础
弹性盒布局（*Flexible box*）是一种强大的布局方式，我们通过弹性盒设置空间的分布方式、元素之间的排列顺序，可以轻易地实现元素的横向、纵向、折行布局。

弹性盒依赖父子关系。在元素上声明`display: flex`或`display: inline-flex`可以使该元素变成弹性容器（*flexible container*），弹性容器中的元素称为弹性元素（*flexible item*）。

弹性盒有两个轴，其中横向的轴称为主轴（*main axis*），纵向的轴称为交叉轴（*cross axis*），每一个轴都有两端，分别为起始端（*start*）和终点端（*end*）。

## 弹性容器属性
弹性容器属性是作用在父盒子（弹性容器）上的属性，主要用于控制其内部弹性元素的排列方式，分别为`flex-direction`, `flex-wrap`, `flex-flow`, `justify-content`, `align-items`, `align-content`。

### flex-direction
`flex-direction`决定了弹性元素在弹性容器内部的排列方向，共有下列属性值：
- `row`：默认的排列方式，沿着容器主轴从左到右排列。
- `row-reverse`：沿着容器的主轴从右向左排列。
- `column`：沿着容器的交叉轴从上到下排列。
- `column-reverse`：沿着容器的交叉轴从下往上排列。

![](/img/in-post/post-frontend-css/flex-direction1.png#pic_center)

### flex-wrap
`flex-wrap`规定了当一行无法放置弹性元素时，该如何显示，他有下列属性值：
- `nowrap`：默认换行方式，表示不换行，此时元素的宽度失效，所有元素会自适应地挤在一行中。
- `wrap`：换行，即如果一行放不下，会自动的挤到下一行。
- `wrap-reverse`：反向换行，具体参见下列图示。

**no-wrap**
<img src='/img/in-post/post-frontend-css/flex-wrap1.png'>

**wrap**
<img src='/img/in-post/post-frontend-css/flex-wrap2.png' width="50%">

**wrap-reverse**
<img src='/img/in-post/post-frontend-css/flex-wrap3.png' width="50%">

### flex-flow
`flex-flow`是`flex-direction`和`flex-wrap`的复合写法，默认值为`row nowrap`。

### justify-content
`justify-content`规定了弹性元素在主轴方向上的对齐方式，他有下列属性值：
- `flex-start`：默认对齐方式。在主轴上左对齐。
- `center`：在主轴上居中对齐。
- `flex-end`：在主轴上右对齐。
- `space-between`：在主轴上两端对齐（最左最右的元素分别位于起始端和终止端，其他元素自适应排列）。
- `space-around`：以元素为单位考虑，保证每一个元素两侧的空白距离相等，因此元素的间隙应该是元素和容器间隙的2倍。
- `space-evenly`：以行为单位考虑，每一个元素两侧的空白距都相等，元素的间隙等于元素与容器的间隙。


**flex-start**
<img src='/img/in-post/post-frontend-css/flex-justify1.png' width="50%">

**center**
<img src='/img/in-post/post-frontend-css/flex-justify2.png' width="50%">

**flex-end**
<img src='/img/in-post/post-frontend-css/flex-justify3.png' width="50%">

**space-between**
<img src='/img/in-post/post-frontend-css/flex-justify4.png' width="50%">

**space-around**
<img src='/img/in-post/post-frontend-css/flex-justify5.png' width="50%">

**space-evenly**
<img src='/img/in-post/post-frontend-css/flex-justify6.png' width="50%">


### align-items
`align-items`属性用于规定元素在交叉轴上的排列方式，他有如下属性值：
- `flex-start`：默认的对齐方式。在交叉轴上顶部对齐。
- `center`：在交叉轴上居中对齐。
- `flex-end`：在交叉轴上底部对齐。
- `baseline`：在交叉轴上按文字基线对齐。
- `stretch`：在交叉轴上拉伸对齐。

<img src='/img/in-post/post-frontend-css/flex-align.png'>

### align-content
`align-content`属性指定垂直轴上的额外空间如何分配到弹性元素行之间和周围。

`align-content`和`align-items`虽然都是有关垂直轴上对齐方式的属性，但是`align-content`更关注如何实现行与行之间的对齐，而不是像`align-items`那样的元素与元素之间的对齐。

也就是说，**`align-content`以行为单位看待问题，`align-items`则是以元素为单位看待问题。**

他有如下属性值：
- `flex-start`：默认的对齐方式。行在交叉轴上顶部对齐。
- `center`：行在交叉轴上居中对齐。
- `flex-end`：行在交叉轴上底部对齐。
- `space-between`：行在交叉轴上按两端对齐。
- `space-around`：保证每一行在交叉轴上两侧的距离相等，行的间隙是行和容器间隙的2倍。
- `space-evenly`：保证每一行在交叉轴上两侧的距离相等，行的间隙和行和容器间隙相等。
- `stretch`：行在交叉轴上拉伸对齐。

<img src='/img/in-post/post-frontend-css/flex-align2.png'>

## 弹性元素属性
弹性容器的子代就是弹性元素。也就是说，只要我们为一个容器指定为`display: flex`，他其中的所有子元素就自动成为弹性元素。

弹性元素属性主要有：`flex-grow`, `flex-shrink`, `flex-basis`, `flex`, `order`, `align-itself`。

### 弹性元素的特性
弹性元素具有以下特性：
- 弹性元素外边距不折叠。
- 弹性元素的`float`和`clear`属性不生效，不会使元素脱离标准流。
- 弹性元素的绝对定位属性会导致元素脱离标准流，并且绝对定位有效。

### flex-grow
`flex-grow`属性规定了如果一行还有多余空间，如何分配多余空间。`flex-grow`默认值为0，代表不分配多余空间。

如果一个容器只有两个元素，他们的`flex-grow`都为1，则代表二者平分剩余空间。如果其中一个`flex-grow`为1，另一个为2，则为2的元素将会占用剩余空间的`2/3`，为1的占用剩余空间的`1/3`。
<img src='/img/in-post/post-frontend-css/flex-grow.png'>

### flex-shrink
`flex-shrink`属性规定了如果一行空间不够，该按何比例如何缩小元素。`flex-shrink`默认值为1，代表不缩小。

如果一个容器其他元素`flex-shrink`都为0，只有一个为`1`，那么先正常分配所有元素，为1的元素占据剩余的空间。
<img src='/img/in-post/post-frontend-css/flex-shrink.png'>

### flex-basis
`flex-basis`属性规定了在增长和缩小之前，元素的初始宽度。

### flex
`flex`属性是`flex-grow`、`flex-shrink`、`flex-basis`的复合属性。

### align-itself
`align-itself`属性规定了元素依照自身想法对齐。

弹性容器中的对齐方式将会应用于所有元素，而`align-itself`可以为元素自身定制对齐方式。

### order
`order`属性指定元素的排序方式。

默认情况下，元素的所有`order`属性都为0，此时将按照元素在html文档中的书写位置进行排序。

`order`可以为负数，`order`越小，元素排序越靠前，可以通过控制`order`的大小控制元素排列的顺序。

