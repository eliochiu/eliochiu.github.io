---
layout: "post"
title: "「前端开发」- JS-JSON"
subtitle: "JavaScript —— json数据交换格式"
author: "eliochiu"
date: 2022-11-10

tags: ["前端开发@Tags", "JavaScript@Languages", "数据格式@Tags"]
lang: zh
catalog: true
header-image: ""
header-style: text
katex: true
---

## XML与JSON
下面是一段XML代码：
```XML
<book>
    <title>Gone with the wind</title>
    <author>...</author>
    <publish-year>....</publish-year>
</book>
```

曾经一段时间，XML是互联网上传输结构化数据的实施标准。但XML具有冗长、繁琐的特点。2006年，Douglas Crockford把JSON（*JavaScript Object Notation*）作为IETF RFC 4642提交给IETF，它利用了JavaScript的一些模式来表示数据。

关于JSON，最重要的是它是一种数据格式而不是一种编程语言。并不是只有JavaScript才使用JSON，很多编程语言都有JSON的解析器和序列器。

## 语法
JSON语法很简单，仅有三种类型的值：
- 简单值：使用与JavaScript相同，可以在JSON中表示字符串、数值、布尔、`null`，JSON不支持`undefined`。
- 对象：对象作为一种复杂数据类型，表示的是一组无序的键值对。而每个键值对中的值可以是简单值，也可以是复杂数据类型的值。
- 数组：数组也是一种复杂数据类型，表示一组有序的值的列表，可以通过数值索引来访问其中的值。数组的值也可以是任意类型——简单值、对象或数组。

特别要注意的是：JSON中的对象和JavaScript中的对象相比，有了以下几点不同：
- 没有声明变量。JSON只是一种数据格式，不需要声明变量。
- 没有末尾的分号。
- JSON中所有对象的属性必须为字符串，必须使用双引号。

下面是一个标准的JSON格式：
```json
{
    "name": "Nicholas",
    "age": 29,
    "school": {
        "name": "Merrimack College",
        "location": "North Andover, MA"
    }
}
```
而这个JSON若是变成JavaScript中的对象，应该写成这样：
```js
var person = {
    name: "Nicholas",
    age: 29,
    school: {
        name: "Merrimack College",
        location: "North Andover, MA"
    }
}
```

## 解析与序列化
JSON之所以流行，是因为JSON可以解析为可用的JavaScript对象；而XML则需要解析为DOM再从中提取数据。例如，要想从一个图书的JSON数据中找到第二本书的标题，只需简单的一行代码：
```js
books[2].title
```

若使用XML，则需要：
```js
doc.getElementByTagName("book")[2].getAttribute("title");
```

### JSON对象
早期的 JSON解析器基本上就是使用JavaScript的`eval()`函数。由于JSON是JavaScript语法的子集，因此 `eval()`函数可以解析、解释并返回JavaScript对象和数组。ECMAScript5对解析JSON的行为进行规范，定义了全局对象 JSON。支持这个对象的浏览器有 IE 8+、Firefox 3.5+、Safari 4+、Chrome 和 Opera 10.5+。

JSON对象有两个方法：`stringify()`和`parse()`。这两个方法分别用于把JavaScript对象转为JSON字符串、把JSON字符串转为JavaScript对象。例如：
```js
var book = {
    title: "Professional JavaScript",
    authors: [
        "Nicholas C. Zakas"
    ],
    edition: 3,
    year: 2011
};

var jsonText = JSON.stringify(book);
```
上面的例子将JavaScript对象转为了JSON字符串，最终得到了：`{"title":"Professional JavaScript","authors":["Nicholas C. Zakas"],"edition":3, "year":2011}`。

在序列化JavaScript对象时，所有函数和原型成员都会被自动忽略，不体现在结果中。值为`undefined`的成员也会被忽略，最终留下的值都是有效的值。

```js
var bookCopy = JSON.parse(jsonText);
```
`bookCopy`是`book`的一个副本，JSON也可以用来实现深拷贝。

### 序列化选项
`JSON.stringify()`方法除了接收要序列化的对象，还可以接受两个参数。第一个参数是一个过滤器，可以是一个数组，也可以是一个函数；第二个参数是一个选项，表示是否在JSON字符串中保留缩进。这两个参数可以更好地序列化对象。

#### 过滤
过滤器是数组，那么JSON字符串仅仅列出数组内的属性：
```js
var jsonText = JSON.stringify(book, ["title", "authors"]);
// {"title":"Professional JavaScript","authors":["Nicholas C. Zakas"]}
```

如果过滤器是函数，传入的函数有两个参数：属性（键）和属性值。根据属性（键）可以知道如何处理序列化对象中的属性：
```js
var book = {
    title: "Professional JavaScript",
    authors: [
        "Nicholas C. Zakas",
        "xxx",
        "xxxxx"
    ],
    edition: 3,
    year: 2011,
    method: function() {
        return 1
    }
};

var jsonText = JSON.stringify(book, function(key, value) {
    switch(key) {
        case "authors":
            return value.join(",");
        case "year":
            return 5000;
        case "edition":
            return undefined;
        default:
            return value;
    }
});

// {"title":"Professional JavaScript","authors":"Nicholas C. Zakas,xxx,xxxxx","year":5000}
```

注意，处理后为`undefined`的属性会自动被过滤掉。

#### 缩进
第二个参数用于JSON字符串缩进：
```js
var book = {
    "title": "Professional JavaScript", "authors": [
        "Nicholas C. Zakas"],
    edition: 3,
    year: 2011
};

var jsonText = JSON.stringify(book, null, 4);
console.log(jsonText);
/*{
    "title": "Professional JavaScript",
    "authors": [
        "Nicholas C. Zakas"
    ],
    "edition": 3,
    "year": 2011
}*/
```
