---
layout: "post"
title: "「前端开发」- JS-Introduction"
subtitle: "JavaScript简介"
author: "eliochiu"
date: 2022-10-25

tags: ["前端开发@Tags", "JavaScript@Languages"]
lang: zh
catalog: true
header-image: ""
header-style: text
katex: true
---

## JavaScript简介
JavaScript是一种客户端的脚本语言，诞生之初是为了实现客户端的登陆验证功能，而现在已经成为功能强大的一门脚本语言。JavaScript主要包含三个部分：ECMAScript、DOM和BOM
- ECMAScript：ECMAScript简称ES，主要规定了这门语言得类型、语法、语句、关键字、保留字、操作符、对象等。
- DOM：文档对象模型，*Document Object Model*，是针对HTML的应用编程接口（API）。HTML文档的每一个标签、文本都被看成一个节点，借助DOM，开发人员可以任意地对HTML文档添加、删除、修改节点。
- BOM：浏览器对象模型，*Browser Object Model*，用于访问和操作浏览器对象。

## JavaScript在HTML文件中的位置

在HTML中，可以使用`<script></script>`标签插入JavaScript代码。`script`标签的`src`属性可以为HTML文档添加外部的JavaScript文件。例如：
```html
<script src="index.js"></script>
```
`script`标签可以放在`head`标签中，这是传统的做法。这种做法有一个很严重的问题是：HTML从上到下进行解析，当解析到JavaScript语句时，会先下载、解析JS代码，在遇到`body`标签后才会开始渲染页面。如果页面所包含的JS文件较多，下载时间较长，用户会感到页面打开很慢，影响用户体验。

出于性能考虑，我们经常在某一元素的后面为其添加`script`标签，可以边解析边渲染，大大提高性能。此外，我们还可以通过为`script`标签添加`defer`属性来延迟脚本的执行，`defer`属性告诉浏览器，立刻下载但延迟执行。

## 基本概念

### 语法
ES的语法在一定程度上借鉴了C、Java等语言的形式，JavaScript是一门大小写敏感的语言，这就意味着`age`、`AGE`是不同的变量。

#### 标识符
标识符是指变量、函数、属性的名称以及函数的参数名称，JS标识符是按照下列规则组织起来的字符串：
- 标识符中的每一个字符都由`$`、`_`、`字母`、`数字`组成。
- 标识符由`$`、`_`、`字母`开头



