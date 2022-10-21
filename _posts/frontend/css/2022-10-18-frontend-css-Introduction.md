---
layout: "post"
title: "「前端开发」- CSS-Introduction"
subtitle: "CSS简介"
author: "eliochiu"
date: 2022-10-18

tags: ["前端开发@Tags", "CSS@Languages"]
lang: zh
catalog: true
header-image: ""
header-style: text
katex: true
---

## CSS简介

CSS（*Cascading Style Sheet*， 层叠样式表），是一个声明式样式语言，主要负责网页的样式。

### 声明
CSS主要由**选择器**和**声明**组成，例如，希望让p元素内的文字变成红色：

```css
p {
    color: red;
}
```
其中，`p {}`是一个元素选择器，`color: red;`是一条声明，声明采取名值对形式。


## CSS引入

CSS主要通过三种方式引入到HTML中：外部样式表、内部样式表以及行内样式。

### 行内样式

如果只想为某个元素提供少量样式，则可以使用行内样式，他通过元素的`style`属性声明：

```html
<p style="color: red">这是一段红色的文字</p>
```

如果需要给元素指定多个样式声明，声明间需要用分号隔开，例如：

```html
<p style="color: red; font-size: 16px;">这是一段红色的文字</p>
```

通常不建议使用`style`标签为元素指定样式（因为它违背CSS设计的初衷），这种方式复用性差、可维护性差。

### 内部样式表

如果想为整个HTML页面制定统一的样式，可以在`head`标签中通过`<style></style>`标签指定样式，例如：

```html
<head>
    <meta charset="utf-8">
    <title>...</title>
    <style>
        p {
            color: red;
            font-size: 16px;
        }
    </style>
</head>

```

这种方式一定程度上摒弃了行内样式的缺陷，但复用性仍不够强，只能对当前页面起作用。

### 外部样式表

通常情况下，CSS样式应该存储在`.css`文件当中，然后通过`link`标签引入至HTML页面。

```html
<head>
    <meta charset="utf-8">
    <title>...</title>
    <link rel="stylesheet" href="style.css">
</head>
```

### @import

除了使用`link`标签，也可以使用`@import url(stylesheet)`的方法引入外部样式表

```html
<head>
    <meta charset="utf-8">
    <title>...</title>
    <style>@import url(style.css)</style>
</head>
```

> 注意：`@import`语句必须放在style标签中

## CSS空白与注释

CSS对待空白的方式和HTML类似，即连续多个空白会变成一个空白。虽然如此，我们还是要注意CSS的代码风格：

- 选择器和花括号中间有一个空格。
- 每一条声明独占一行。
- 所有声明都要以分号结尾。

CSS只有一种注释`/* This is a CSS comment. */`，这是一个多行注释。
CSS并没有类似`//`的单行注释。

