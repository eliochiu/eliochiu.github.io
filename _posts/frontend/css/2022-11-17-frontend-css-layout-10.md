---
layout: "post"
title: "「前端开发」- CSS-Layout-10"
subtitle: "CSS布局 —— 实现元素垂直水平居中"
author: "eliochiu"
date: 2022-11-17

tags: ["前端开发@Tags", "CSS@Languages", "布局@Tags"]
lang: zh
catalog: true
header-image: ""
header-style: text
katex: true
---

## 行内元素的垂直和水平居中
如果想使文字、行内元素、行内块元素在块元素内水平和垂直居中，可以采用下列的方法：
- 水平居中：`text-align: center`
- 垂直居中：`line-height`等于`height`

例如：让一段文字水平垂直居中：
```html
<div class="father">
    12345
</div>
```

```css
.father {
    width: 200px;
    height: 200px;
    text-align: center;
    line-height: 200px;
}
```

效果如下图所示：
![](/img/in-post/post-frontend-css/center01.png#pic_center)

再例如：让一个行内元素垂直居中：
```html
<div class="father">
    <span class="son">
        12345
    </span>
</div>
```

```css
.father {
    width: 200px;
    height: 200px;
    text-align: center;
    line-height: 200px;
}

.son {
    background-color: skyblue;
}
```

效果如下图所示：
![](/img/in-post/post-frontend-css/center02.png#pic_center)

## 块级元素的垂直和水平居中
### margin
使用`margin: 0 auto`可以实现块元素在块元素内的水平居中：
```html
<div class="father">
    <div class="son"></div>
</div>
```

```css
.father {
    width: 200px;
    height: 200px;
    background-color: pink;
}

.son {
    width: 100px;
    height: 100px;
    margin: 0 auto;
    background-color: deeppink;
}
```

效果如下图所示：
![](/img/in-post/post-frontend-css/center03.png#pic_center)

> 该方法只能实现水平方向的居中

### table布局
将父元素设置为`display: table`，`text-align: center`，`vertical-align: center`，子元素设置为`display: table-cell`。可以让大小不固定的元素居中：
```html
<div class="father">
    <div class="son">
        11111111
        <br><br>
    </div>
</div>
```

```css
.father {
    display: table;
    width: 200px;
    height: 200px;
    background-color: pink;
}

.son {
    display: table-cell;
    width: 100px;
    height: 100px;
    text-align: center;
    vertical-align: middle;
}
```

效果如下图所示：
![](/img/in-post/post-frontend-css/center04.png#pic_center)

### flex布局
将父元素通过`display: flex`设置为弹性容器，并设置`justify-content: center; align-items: center`居中对齐：

```html
<div class="father">
    <div class="son"></div>
</div>
```

```css
.father {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 200px;
    background-color: pink;
}

.son {
    width: 100px;
    height: 100px;
    background-color: deeppink;
}
```

效果如下图所示：
![](/img/in-post/post-frontend-css/center05.png#pic_center)

### 定位+translate
父元素设置`position: relative`, 子元素设置绝对定位，并使用`transform`偏移：
```html
<div class="father">
    <div class="son"></div>
</div>
```

```css
.father {
    position: relative;
    width: 200px;
    height: 200px;
    background-color: pink;
}

.son {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
    background-color: deeppink;
}
```
效果如下图所示：
![](/img/in-post/post-frontend-css/center05.png#pic_center)

### 定位+calc
父元素设置`position: relative`, 子元素设置绝对定位，并使用`transform`偏移：
```html
<div class="father">
    <div class="son"></div>
</div>
```

```css
.father {
    position: relative;
    width: 200px;
    height: 200px;
    background-color: pink;
}

.son {
    position: absolute;
    left: calc(50% - 50px);
    top: calc(50% - 50px);
    width: 100px;
    height: 100px;
    background-color: deeppink;
}
```
效果如下图所示：
![](/img/in-post/post-frontend-css/center05.png#pic_center)