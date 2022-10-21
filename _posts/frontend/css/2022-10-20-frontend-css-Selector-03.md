---
layout: "post"
title: "「前端开发」- CSS-Selector-03"
subtitle: "CSS选择器 —— 伪类选择器"
author: "eliochiu"
date: 2022-10-20

tags: ["前端开发@Tags", "CSS@Languages", "选择器@Tags"]
lang: zh
catalog: true
header-image: ""
header-style: text
katex: true
---



基本选择器和复合选择器都是选择页面中实际存在的元素，而有些时候我们需要具有给某种状态的元素指定样式，这时就可以使用伪类选择器（*pseudo-class selector*），伪类选择器的基本格式是`:pseudo-name(params)`。

## 结构伪类

### 选择根元素
`:root`用于选择HTML页面的根元素，通常为`html`标签。

### 选择空元素
`:empty`用于选择内容为空的元素，还可以结合元素选择器使用，例如
```css
p:empty {
  display: none;
}
```
上述CSS样式能够实现隐藏空段落的效果。

> 特别注意的是，`:empty`匹配的是html中的所有空元素，包括内容为空的和空标签，即`<img />`、`<input />`也会被匹配

### 选择唯一的子代
`:only-child`用于选择其本身是其父元素**唯一的子元素**的元素。

- 伪类选择器多数情况是选择一种状态，这种状态是**元素本身的状态，不是其父元素的状态**。
- `p:only-child`选中的不是`p`元素的唯一子元素，而是：该元素是某个父元素的唯一子元素、且该元素刚好为`p`元素。
- 使用`:only-child`伪类时，列出的元素未必是父子关系，如`div :only-child`，选中的是div的后代元素，并且该元素刚好是某个父元素的唯一子元素，而不一定是`div`的子元素。

`:only-of-type`用于选择本身是其父元素**唯一一类子元素**的元素。他和`:only-child`最大的区别是：

- `:only-child`选中的元素没有任何兄弟元素
- `:only-of-type`选中的元素没有和他类型一样的兄弟元素。

例如，现有下列css样式：
```css
p:only-child {
  font-size: 20px;
}

span:only-of-type {
  color: red;
}
```

它对应的html代码为：

```html
<div class="outer">
  <div class="inner">
    <p>我是inner中的p元素</p>
  </div>
  <p>我是<em>outer</em>中的p元素中<span>唯一的span元素</span></p>
  <p>我是<span>outer</span>中的p元素中的<span>span元素</span></p>
</div>
```
- 文字`我是inner中的p元素`会被选中，字体变为20px，因为他是`div.inner`中的唯一子元素
- 文字`唯一的span元素`会被选中，指定为红色，他虽然不是`p`的唯一子元素，但他是唯一一个`span`，因此被选中
- 文字`span元素`不会被选中，因为他不是`p`元素中唯一一个span元素

特别要注意的是，`only-of-type`中的“唯一一类元素”是按元素划分的，而不是其他东西，比如：
```css
p:only-of-type {
  color: red;
}
```
```html
<div>
  <p class="unique">这是唯一一个unique类</p>
  <p></p>
</div>
```
很显然，上述所有元素都不会被指定样式，因为他们并不是`div`中唯一的`p`元素。

### 选择第一个和最后一个子代
`:first-child`用于选择其本身是其父元素**第一个子元素**的元素。

`:first-of-type`用于选择本身是其父元素**某类子元素中第一个元素**的元素。

`:last-child`用于选择其本身是其父元素**最后一个子元素**的元素。

`:last-of-type`用于选择本身是其父元素**某类子元素中最后一个元素**的元素。

> 原理和`:only-child`、`:only-of-type`类似，这里不再赘述。

### 选择每n个元素
`:nth-child()`用于选择其本身是其父元素的任意子元素，其中括号可以填数字，甚至可以填代数式。

`nth-child()`的两种参数：

- 纯数字：如果括号内为纯数字$n$，则选中第$n$个子元素。例如`nth-child(1)`相当于`:first-child`。
- 表达式：如果括号内为表达式`an+b`，则对n进行循环($n = 0, 1, 2...$)，得到的数字按照纯数字规则匹配
  - `:nth-child(n)`选中所有子元素，因为$n$遍历了所有值。
  - `:nth-child(2n)`选中所有偶数项的子元素，因为$n$取$0, 1, 2...$时，$2n$取$0, 2, 4...$
  - `:nth-child(2n+1)`选中所有奇数项的子元素，因为$n$取$0, 1, 2...$时，$2n+1$取$1， 3， 5...$
  - `:nth-child(an+b)`从第$b$个元素开始，每隔$a$个元素选择一次。

`:nth-of-type()`用于选择其本身是其父元素的某类元素中的任意元素，其中括号可以填数字，甚至可以填代数式，用法与`nth-child()`类似，不再赘述。

## 动态伪类

### 超链接伪类

`:link`：指代用作超链接的锚记（即拥有href属性），而且尚未被访问过的地址。

`:visited`：指代已经访问过地址的超链接。出于安全的考虑，能应用到已访问链接上的样式非常有限。

### 用户操作伪类
`:focus`：指代当前获得鼠标焦点的元素。（例如表单元素）。

`:hover`：指代当前鼠标指针放置其上的元素。

`:active`：指代当前用户激活的元素，例如用户按下鼠标一瞬间的那段时间。

> 关于超链接伪类和用户操作伪类的顺序推荐为`link-visited-focus-hover-active`，具体原因参见CSS特性章节。

## UI状态伪类
UI状态伪类主要根据用户界面元素的状态选择元素。

`:enabled`：指代当前启用的用户界面元素，即接受输入的元素。

`:disabled`：指代当前禁用的用户界面元素，即不接受输入的元素。

`:checked`：指代当前用户或文档默认选中的单选按钮/复选框。

`:valid`：指代满足所有数据有效性语义的输入框。

`:invalid`：指代不满足所有数据有效性语义的输入框。

`:optional`：指代无需一定输入值的输入框。

`:required`：指代强制输入的输入框。

`:read-write`：指代用户可读写的输入框。

`:read-only`：指代不能由用户输入的输入框。

## lang伪类和否定伪类

`:lang()`：用于根据文本使用的语言选择元素。

`:not()`：用于选择不满足某条件的元素

> 注意：否定伪类的括号里可以填入简单选择器（ID、class、element、attribute and universal）





