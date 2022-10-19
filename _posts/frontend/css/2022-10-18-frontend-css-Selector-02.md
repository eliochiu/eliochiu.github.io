---
layout: "post"
title: "「前端开发」- CSS-Selector-02"
subtitle: "CSS选择器 —— 复合选择器"
author: "eliochiu"
date: 2022-10-18

tags: ["前端开发@Tags", "CSS@Languages", "FrontEnd@Tags"]
lang: zh
catalog: true
header-image: ""
header-style: text
katex: true
---




复合选择器主要涉及多个元素之间的关系，结合基本选择器，根据关系选择元素。

## 并集选择器
有时候，我们需要为多个选择器指定同一组样式，此时可以使用并集选择器。语法为：`selector1, selector2...{}`

```css 
p, .red {
    font-size: 20px;
    color: red;
}
```

该选择器会将所有p标签以及所有red类的元素字体大小设为20px，颜色设为红色。

> 并集选择器可以嵌套任何选择器，选择器之间用逗号隔开即可

## 交集选择器
css中，如果想要同时满足两种选择器的需求，则可以使用交集选择器。语法为：`selector1selector2...{}`

```css
p#red {
    color: red;
}
```

该选择器会将所有id为red的p元素的文字指定为红色。

> 根据交集选择器的规范，如有元素选择器，为防止语法解析错误，元素选择器必须放在第一位

## HTML文档的结构

当服务器将HTML文档发送给用户时，用户的浏览器会解析整个HTML代码，生成DOM树，css文件则会被解析为规则树，浏览器则根据这两个树对页面进行渲染，下图是一颗DOM树：

![](/img/in-post/post-frontend-css/dom-tree.png#pic_center)

- 元素（element）：文档中的所有标签都是元素，元素可以看成是对象
- 节点（node）：文档中都有的内容都是节点：包括标签，属性，文本
- 文档（document）：一个页面就是一个文档

## 节点的关系

- 文档包含节点，节点包含元素。
- 如果标签a中嵌套了标签b，我们称标签a是标签b的父元素，标签b是标签a的子元素。
- 如果标签a中嵌套了标签b、c，b和c是平行关系，我们称标签b和c互为兄弟元素。
- 如果标签a中嵌套了标签b，标签b嵌套了标签c，则称标签a是标签c的祖先元素，标签c是标签a的后代元素。


## 子选择器
如果想要选出某个元素的子元素，可以使用子元素选择器。语法为：`father_element > son_element{}`

```css
ul > li {
    color: pink;
}
```

该选择器会将ul标签所有li子元素颜色设为粉色。

> 子选择器只能选择子元素，不能选中非子元素的后代元素

```css
div >  {
    color: pink;
}
```




## 后代选择器



## 相邻兄弟选择器


## 通用兄弟选择器

* 后代元素选择器：`父元素 后代元素{}`。例如：
```css
div span {
    color: red;
}
```
```html
<div>
    <span>1</span>
    <p>
        <span>2</span>
    </p>
</div>
```
上述代码将文字`1、2`均设置为红色。

* 子元素选择器：`父元素 > 子元素{}`。例如：
```css
div > span {
    color: red;
}
```
```html
<div>
    <span>1</span>
    <p>
        <span>2</span>
    </p>
</div>
```
上述代码将文字`1`设置为红色，因为`<p>`内的`<span>`不是`<div>`的子元素。

* 并集选择器：`条件1, 条件2{}`。例如：
```css
div, p {
    color: red;
}
```
```html
<div>1</div>
<span>2</span>
<p>3</p>
```
上述代码将文字`1、3`均设置为红色。

* 伪类选择器：`:类名{}`
  * `:link`：选中未点击过的链接
  * `:visited`：选中访问过的链接
  * `:hover`：选中光标移动的元素
  * `:active`：选中鼠标点击瞬间的元素
  * `:focus`：选取获取焦点的表单元素







