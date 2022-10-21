---
layout: "post"
title: "「前端开发」- HTML-Introduction"
subtitle: "HTML简介"
author: "eliochiu"
date: 2022-10-18

tags: ["前端开发@Tags", "HTML@Languages"]
lang: zh
catalog: true
header-image: ""
header-style: text
katex: true
---

## Web定义及标准 



### Web定义 
网页主要是由文字、图像和超链接等元素构成的集合，网站则是众多网页的集合。\\
浏览器是网页渲染、显示、运行的平台，以上功能均由浏览器内核完成。



### Web标准 
Web标准由万维网联盟W3C制定，所有网页必须遵守Web标准才能在浏览器上正确显示。\\
Web标准主要包括：**结构标准、表现标准与行为标准**。
* 结构标准：对网页元素进行整理和分类，由HTML完成。
* 表现标准：设计网页的版式、颜色、大小、外观等，由CSS完成。
* 行为标准：网页模型的定义以及网页交互，由Javascript完成。 

将Web标准清晰地划分的优点是：
* 易于维护：分工明确，降低耦合性。例如，只要修改CSS样式表就能更改全站网页布局。
* 设备兼容性：遵循统一标准设计的网页具有较好的设备兼容性。
* 页面响应快：体积较小的HTML文件与CSS样式表分离开来，降低了响应时间。



## HTML简介



### HTML
HTML(*Hypertext Markup Language*, 超文本标记语言)，是用来描述网页的一种语言。
注意，HTML不是编程语言，而是一种标记语言，由一套标签体系组成。



### HTML标签
HTML的标签由一对尖括号构成，例如`<html></html>`就构成一对HTML标签。\\
HTML标签大都是成对出现的。其中，第一个标签`<html>`为开始标签，第二个标签 `</html>`为结束标签。\\
极个别标签只有开始标签，没有结束标签，称为单标签或空标签，如`<br />、<input />、<img />`等。\\
标签的关系有两种：包含关系与并列关系，例如：
```html
<!--div与span之间构成包含关系-->
<div>
    <!--span之间构成并列关系-->
    <span></span>
    <span></span>
</div>
```

### HTML骨架

下列代码声明了一个基本的HTML文档，构成了HTML文档的基本骨架：
```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title></title>
    </head>
    <body>
    </body>
</html>
```

- 文档声明标签：`<!DOCTYPE html>`，用于文档最头部，声明网页使用的HTML版本。（注：文档声明不属于HTML文档）
- 文档根标签：`<html></html>`，其余标签都要包括在`<html></html>`标签之内。
- 文档头部标签：`<head></head>`，这一部分用户不可见，主要为搜索引擎提供信息。
- `<title></title>`包含在`<head>`中，指定网站的标题，这一部分内容会显示在浏览器的标题栏处。
- 文档主体标签`<body></body>`，文档所包含的所有课件元素基本都放在`<body></body>`中。

### HTML属性

HTML标签内可以指定属性，用来规定有关该标签的信息。\\
属性总是以`name: value`的名值对形式出现的，其中`name`代表属性名，`value`代表属性值，例如：
```html
<a href="http://github.com">跳转到Github主页</a>
```
通过对超链接标签`<a></a>`指定了属性`href`，实现了超链接的跳转。

## 元数据meta

### meta简介

`<meta>`标签是HTML文档头部标签`<head></head>`中的一个标签，用来描述HTML网页文档的属性，被称为元标签。`<meta>`标签一般被用作页面说明，例如：作者、时间、编码、描述和关键字等信息。

### meta的属性

meta常用的属性`charset`、`name`、`content`、`http-equiv`等。

#### charset
`charset`用于指定页面使用的字符集，通常为`utf-8`，具体语法为：
```html
<meta charset="utf-8">
```

`charset`是H5提供的新属性，替换了早期版本中使用`http-equiv`设置字符集的方法：
```html
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8>
```

#### name

`name`属性用于描述网页，`content`属性以便于搜索引擎分类和查找信息。

- `author`：用来表示网页作者的名字，可以是某个组织或机构。
- `description`：网页的描述信息，可显示在搜索引擎的标题栏下。
- `keywords`：与页面相关的关键词，用逗号分隔，便于搜索引擎分类。
- `viewport`：视口初始化，仅用于移动设备。
    - `width`：表示viewport的宽度为设备宽度。
    - `initial-scale`：表示设备宽度与viewport宽度之间的缩放比例。
- `robots`：表示爬虫对此页面的处理行为。
    - `all`：文件被检索且页面上的链接可以查询
    - `index`：文件可以被检索
    - `follow`：文件上的链接可以查询
    - `noindex`：文件不可以被检索
    - `nofollow`：文件上的链接不可以查询
    - `none`：搜索引擎忽略此网页

#### http-equiv

`http-equiv`属性用于提供了HTTP协议的相应头报文。给浏览器提供一些有用的信息，以帮助网页正确地显示内容，而`content`就是`http-equiv`所对应的内容。

- `content-type`：`content-type`是HTTP请求响应头和请求头的字段。当作为请求头时，规定文档的字符编码。
- `default-style`：规定要使用的预定义的样式表
- `refresh`：定义文档自动刷新的时间间隔。（注：`refresh`属性要慎用，它会使得页面不受用户控制。）




