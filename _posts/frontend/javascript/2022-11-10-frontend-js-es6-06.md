---
layout: "post"
title: "「前端开发」- JS-ES6-06"
subtitle: "ECMAScript6 —— Symbol类型"
author: "eliochiu"
date: 2022-11-10

tags: ["前端开发@Tags", "JavaScript@Languages", "ES6@Tags"]
lang: zh
catalog: true
header-image: ""
header-style: text
katex: true
---
## 概述
ES5中，所有对象的属性都是字符串类型，容易造成属性名的冲突。为了解决此问题，ES6添加了一种基本类型——`Symbol`。

`Symbol`是基本类型，表示独一无二的值。他是JavaScipt语言中的第7种数据类型、第6种简单类型（其余的六种简单类型分别为`Number、String、Boolean、Undefined、Null、BigInt`）。至此，所有简单类型均已介绍完毕。

`Symbol`值通过`Symbol`函数生成。也就是说，对象的属性名可以有两种形式：字符串和`Symbol`。只要属性名属于`Symbol`类型，就可以保证属性名唯一，从而不会产生冲突。
```js
let s = Symbol();
typeof s // "symbol"
```

> 注意：`Symbol`函数不能使用`new`关键字，否则会报错。这是因为生成的`Symbol`是一个原始类型的值，而不是一个对象（构造函数不完整），本质上，`Symbol`类型是一个类似字符串的数据类型。

`Symbol`函数可以接受一个字符串作为参数，表示对`Symbol`实例的描述，主要是为了控制台显示。
```js
var s1 = Symbol('foo');
var s2 = Symbol('bar');

s1 // Symbol(foo);
s2 // Symbol(bar);

s1.toString() // "Symbol(foo)"
s2.toString() // "Symbol(bar)"
```

如果`Symbol`的参数是一个对象，就会调用对象的`toString()`方法，将其转为字符串，然后再生成一个`Symbol`值：
```js
const obj = {
    toString() {
        return "abc"
    }
};

const sym = Symbol(obj);
sym // Symbol(abc);
```

> 注意：`Symbol`函数的字符串仅仅是对当前的值的描述，所有`Symbol`值都是不相等的，因此相同描述的`Symbol`不等。

```js
const s1 = Symbol('a');
const s2 = Symbol('a');
s1 === s2; // false
```

## 作为对象属性
由于任何`Symbol`值都不想等，也就意味着它可以用作对象的属性，并不会出现同名的情况。
```js
var mySymbol = Symbol();

// 写法1
var a = {};
a[mySymbol] = 'Hello';

// 写法2
var a = {
    [mySymbol]: 'Hello'
};

// 写法3
var a = {};
Object.defineProperty(a, mySymbol, {
    value: 'Hello'
});

// 以上写法均得到同一个结果
a[mySymbol] // 'Hello'
```

> 注意：`Symbol`类型的对象属性不能通过点运算符访问，只能通过中括号来访问。

```js
var mySymbol = Symbol();
var a = {};

a.mySymbol = 'Hello';
a[mySymbol] // undefined
a['mySymbol'] // 'Hello'
```
上述代码使用了点运算符为对象`a`的`mySymbol`属性赋值，并没有成功。实际上，上述代码并未给`Symbol`类型的属性赋值，而是创造了一个普通的字符串属性`'Symbol'`。

同理，在对象中，如果要使用`Symbol`值定义属性时，必须当在中括号里：
```js
var s = Symbol();

let obj = {
    [s]: function() {
        //... 
    }
}
```

## 遍历属性名
`Symbol`类型的属性，不会出现在`for...in, for...of`循环中，也无法通过`Object.keys(), Object.getOwnPropertyNames()`获得。可以使用`Object.getOwnPropertySymbols()`方法获得。

`getOwnPropertySymbols()`方法返回一个数组，成员是当前对象的所有用作属性名的`Symbol`值：
```js
var obj = {};
var a = Symbol('a');
var b = Symbol('b');

obj[a] = 'Hello';
obj[b] = 'World';

var objectSymbols = Object.getOwnPropertySymbols(obj);

objectSymbols // [Symbol(a), Symbol(b)]
```

再看一个例子：
```js
var obj = {};

var foo = Symbol("foo");

Object.defineProperty(obj, foo, {
    value: "foobar",
    enumerable: true
});

Object.defineProperty(obj, 'bar', {
    value: "barbaz",
    enumerable: true
});

for (let i in obj) {
    console.log(i);
} 
// 'bar'

console.log(Object.getOwnPropertyNames(obj));
// [ 'bar' ]

console.log(Object.getOwnPropertySymbols(obj));
// [Symbol(foo)]
```