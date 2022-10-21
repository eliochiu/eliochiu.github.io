---
layout: "post"
title: "「前端开发」- CSS-Selector-04"
subtitle: "CSS选择器 —— 伪元素选择器"
author: "eliochiu"
date: 2022-10-20

tags: ["前端开发@Tags", "CSS@Languages", "选择器@Tags"]
lang: zh
catalog: true
header-image: ""
header-style: text
katex: true
---


伪元素和伪类很像，都是虚构的。伪类主要描述一种虚构的“状态”（幽灵态，比如第一个子元素、被访问过的链接），而伪元素则是为了实现某种效果，在文档中插入虚构的元素。CSS2定义了四种伪元素，分别用于装饰元素的首字母、首行、前置和后置内容。伪元素使用两个冒号进行定义，基本语法为`::pseudo-name(params)`

## 装饰首字母

使用`::first-letter`伪元素选择器装饰任何非行内元素的首字母，`::first-letter`伪元素常用于实现段落的首字母下沉功能，例如下列CSS样式，就能实现首段首字母的下沉：
```css
p:first-of-type::first-letter {
  font-size: 20px;
}
```

## 装饰首行

与`::first-letter`类似，使用`::first-line`伪元素选择器装饰任何非行内元素的首行。

目前，`::first-line`和`::first-letter`均只能应用到非行内元素中，并且能使用的样式也有一定限制，在此不展开陈述。

## 装饰前置和后置内容元素

使用`::before`和`::after`为元素的前置和后置部分添加内容，使用`content`属性添加内容，常用于清除浮动。
例如下列CSS样式，就能实现在p元素的最前端插入大号文字：
```css
p::before {
  content: "Hello"
  font-size: 20px;
}
```


