---
layout: "post"
title: "「前端开发」- CSS-Selector-01"
subtitle: "CSS选择器 —— 基本选择器"
author: "eliochiu"
date: 2022-10-18

tags: ["前端开发@Tags", "CSS@Languages", "FrontEnd@Tags"]
lang: zh
catalog: true
header-image: ""
header-style: text
katex: true
---

## 选择器
CSS选择器的主要作用是：将符合条件的元素选择出来，以便于为其设置样式。

CSS选择器基本选择器、复合选择器、伪类选择器和伪元素选择器，这里主要介绍基本选择器。

## 基本选择器

基本选择器只能选中某个或某类元素，不涉及到多个元素之间的关系。

### 元素选择器

元素选择器又叫标签选择器，语法为`tag_name{}`，用于给某一标签设置样式。例如：

```css
p {
    color: red;
}
```

上述css语句就将所有p标签内的元素设置成红色。

### 类选择器

类选择器的语法为`.class_name{}`，用于给某个类设置样式，标签中的属性`class`用于指定类名。例如：

```css
.red {
    color: red;
}
```

所应用的的HTML代码：

```html
<div>
    <span class="red">1</span>
    <span>2</span>
    <span>3</span>
</div>
```
上述代码将文字`1`设置为红色。

#### 多类名

CSS可以给一个标签指定多个类，类名之间用空格隔开。
```css
.red {
    color: red;
}

.big {
    font-size: 30px;
}
```

所应用的的HTML代码：

```html
<div>
    <span class="red big">1</span>
    <span>2</span>
    <span>3</span>
</div>
```
上述代码将文字`1`设置为红色，并将其字体设置为30px。

#### 元素选择器+类选择器

CSS选择器可以选择指定类名的指定元素，语法为`tag_name.class_name{}`，例如：

```css
p.red {
    color: red;
}
```

所应用的的HTML代码：

```html
<div>
    <p class="red">1</p>
    <span class="red">2</span>
    <span>3</span>
</div>
```
上述代码将p元素内的文字`1`设置为红色，而span虽然指定了red类，但由于不为p元素，因此不会变色。



### ID选择器
ID选择器又称身份选择器，语法为`#Id{}`，用于给某一ID的元素设置样式。例如：


```css
#red {
    color: red;
}
```

```html
<div>
    <span id="red">red</span>
    <span id="blue">blue</span>
    <span id="yellow">yellow</span>
</div>
```
上述代码将文字`red`设置为红色。


> 注意，通常情况下，每一个元素有且仅能有一个ID。


### 属性选择器

类选择器和ID选择器本质上讲都是对属性值进行选择，属性选择器能同时选择属性和值，可看作前者的推广。

属性选择器主要分为：简单属性选择器、精准属性值选择器、部分匹配属性值选择器。

#### 简单属性选择器

如果想要选择具有某个属性的特定元素，而不管属性值是什么，可以使用`tag_name[attribute]`；更简单的，如果只想选择具有某个属性的元素，不管属性值，甚至不管元素是什么，可以直接使用`[attribute]`，例如：

```css
[href] {
    color: red;
}
```

```html
<div>
    <span>span</span>
    <a href="http://github.com">a</a>
</div>
```
上述代码将文字`a`设置为红色，因为它具有href属性。

属性选择器可以串联，如果想选出同时具有`href`和`title`属性的元素，可以使用：

```css
a[href][title] {
    color: red;
}

```
#### 精准属性值选择器

如果想选择指定属性是某个精确值的元素，可以使用`[attribute=value]`，例如。

```css
[href="http://www.baidu.com"] {
    color: red;
}
```

```html
<div>
    <a href="http://www.baidu.com">Baidu</a>
    <a href="http://github.com">Github</a>
</div>
```
上述代码将文字`Baidu`设置为红色，因为它具有href属性，并且href属性的值为`http://www.baidu.com`。

与简单属性选择器一样，精准属性选择器也可以串联。

#### 部分匹配属性值选择器

如果想要匹配部分属性值，则可以使用部分匹配属性值选择器：

- `[foo|="bar"]`：元素具有foo属性，并且其值以`bar-`开头或者为`bar`本身
- `[foo~="bar"]`：元素具有foo属性，并且其值是包含`bar`这一词的词组（空格分开）
- `[foo*="bar"]`：元素具有foo属性，并且其值包含`bar`这一子串
- `[foo^="bar"]`：元素具有foo属性，并且其值以`bar`开头
- `[foo$="bar"]`：元素具有foo属性，并且其值以`bar`结尾

> 属性选择器比较复杂，理解记忆即可。


### 通配选择器

通配选择器的语法为`*{}`，为页面的所有元素统一设定样式。例如：

```css
* {
    color: red;
}
```

```html
<div>
    <span>1</span>
    <p>2</p>
    <div>3</div>
</div>
```
上述代码将文字`1、2、3`均设置为红色。

通配选择器常用于为页面清除默认样式：

```css
* {
    margin : 0;
    padding: 0;
}
```

