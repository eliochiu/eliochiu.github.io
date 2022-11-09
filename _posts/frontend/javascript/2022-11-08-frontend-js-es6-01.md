---
layout: "post"
title: "「前端开发」- JS-ES6-01"
subtitle: "ECMAScript6 —— let、const、块级作用域"
author: "eliochiu"
date: 2022-11-08

tags: ["前端开发@Tags", "ES6@Tags","JavaScript@Languages"]
lang: zh
catalog: true
header-image: ""
header-style: text
katex: true
---

## let命令
### 基本用法
ES6新增了`let`命令，用于声明变量。其用法类似于`var`，但是所声明的变量只在`let`命令所在的代码块中有效。
```js
{
  let a = 10;
  var b = 1;
}

a // ReferenceError
b // 1
```
上述代码分别在代码块中声明了两个变量，其中`a`使用`let`命令声明，`b`使用`var`变量声明。然后再代码块外访问了这两个变量，其中`a`变量访问出错，`b`变量得到了正确的值。这表明了`let`声明的变量只在他所在的代码块中有效。

`let`很适合循环计数：
```js
for (let i = 0; i < 10; i++) {
  // ...
}
console.log(i); // ReferenceError
```
以上代码中的计数器`i`只能在循环体内部使用，在循环体外使用就会报错。而若使用`var`声明`i`，则最终将返回10。

```js
var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function() {
    console.log(i);
  };
}
a[6](); // 10
```
上面的代码中，`i`是由`var`声明的，在全局范围内都有效，所以全局变量只有一个`i`。每一次循环，变量`i`的值都会发生变化，而在循环内，被赋值给数组`a`的函数内部的`i`也指向全局的`i`。因此最终所有函数的`i`均指向10。如果使用`let`，将会输出6。
```js
var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function() {
    console.log(i);
  };
}
a[6](); // 6
```
使用`let`声明的`i`指在本轮循环内有效，所以每一个函数内的`i`都是全新的变量。

`for`循环还有一个特别之处，就是循环设置部分是一个父级块作用域，而循环体是一个子级的块作用域。例如：
```js
for (let i = 0; i < 3; i++) {
  let i = "abc";
  console.log(i);
}

// abc
// abc
// abc
```

### 不存在变量提升
`var`命令会发生变量提升现象，即变量可以在声明之前使用，值为`undefined`。为了纠正这一现象，ES6新增的`let`命令改变了语法行为，使用`let`声明的变量不存在变量提升的行为。也就是说，你必须在声明之后才能使用该变量，否则就会报错。
```js
// var
console.log(foo); // undefined
var foo = 2;

// let
console.log(foo); // ReferenceError
let foo = 2;
```

### 暂时性死区
只要在块级作用域中存在`let`命令，他所声明的变量就绑定了这个区域，不再受外部影响。在这个区域内，所有变量必须先声明再访问，否则会报错。例如：
```js
var tmp = 123;

if (true) {
  tmp = 'abc'; // ReferenceError
  let tmp;
}
```
尽管我们在块外声明了全局变量`tmp`，但由于在块内使用了`let`声明`tmp`，从而绑定了这个作用域，与外界无关，在声明前访问了这个变量，从而造成错误。

ES6明确规定，在代码块中只要使用了`let`和`const`命令，则这个区块对这些命令声明的变量在一开始就形成了封闭性的作用域。只要在声明之前访问了这些变量，就会报错。语法上称为暂时性死区（Temporal dead zone），简称TDZ。

```js
if (true) {
  // TDZ begins
  tmp = "abc";
  console.log(tmp); // ReferenceError
  // TDZ ends

  let tmp;
  console.log(tmp); // undefined

  tmp = 123;
  console.log(tmp); // 123
} 
```

### 不允许重复声明
let不允许在一个相同作用域内重复声明一个变量：
```js
// 报错
function() {
  let a = 10;
  let a = 1;
}

// 报错
function() {
  let a = 10;
  var a = 1;
}
```
不能在函数内部重新声明参数。
```js
function(arg) {
  let arg; // 报错
}

function(arg) {
  {
    let arg; // 不报错
  }
}
```

## 块级作用域
块级作用域主要用于防止变量泄露与覆盖。ES6新增了块级作用域。
```js
function f1() {
  let n = 5;
  if (true) {
    let n = 10;
  }
  console.log(n); // 5
}
```
ES6允许任意块的嵌套：
```js
{
  {
    {
      let insane = "Hello World!";
    }
      console.log(insane); // ReferenceError
  }
}
```

内外作用域可以使用同名的变量
```js

  {
    let insane = "Hello World!";
    {
      let insane = "Hello JavaScript!";
      console.log(insane); //  "Hello JavaScript!"
    }
    console.log(insane); //  "Hello World!"
  }
```
块级作用域的存在，使得立刻执行匿名函数不在必要了：
```js
// IIFE
(function() {
  var tmp = ...;
})();

// 块级作用域
{
  let tmp = ...;
}
```

### 块级作用域与函数声明
ES5中，函数只能在全局作用域和函数作用域中声明，而不能在块级作用域中声明。下列两种声明都是非法的：
```js
if (true) {
  function f() {
    // ...
  }
}

try {
  function f() {
    // ...
  }
} catch(e) {
  // ...
}
```
ES6引入了块级作用域，明确规定了可以在块级作用域中声明函数。函数声明语句行为类似`let`，在代码块外不可用。这不是一种推荐的方式，如果确实需要，应该写成函数表达式的形式：
```js
// 函数声明
{
  let a = 'secret';
  function f() {
    return a;
  }
}

// 函数表达式
{
  let a = 'secret';
  let f = function() {
    return a;
  }
}
```

## const命令
`const`命令用于声明只读常量。一旦声明，常量的值就不能改，否则会报错。
```js
const PI = 3.1415;
PI // 3.1415
PI = 3;
// TypeError
```
`const`声明的变量不得改变值，也就意味着必须在声明时对变量进行初始化，只声明不赋值会报错。
```js
const foo;
// SyntaxError
```
`const`的作用域和`let`的作用域一样，只在块级作用域内有效。
```js
if (true) {
  const MAX = 5;
}
MAX // Error;
```
`const`命令声明变量也不会被提升，同样存在暂时性死区，只能在声明后使用。
```js
if (true) {
  console.log(MAX); // ReferenceError
  const MAX = 5;
}
```
`const`与`let`一样，不可以重复声明：
```js
var message = "Hello";
let age = 21;
// Error
const message = "Goodbye";
const age = 20;
```

### const的本质
`const`本质上并不是保证值不能改动，而是变量指向的那个保存值的地址不得改动。

对于简单类型（数字、布尔、字符串）而言，值就保存在变量指向的地址当中，因此等同于常量。而对于引用类型来说（对象和数组），变量指向的内存地址保存的只是一个指针，`const`只能保证这个指针是不变的，而不能保证改指针指向的那个值不变。例如：
```js
const foo = {};

// 为foo添加一个属性prop
foo.prop = 123;
foo.prop // 123

// 将foo指向另一个变量
const foo = {}; // Error
```
上面的代码中，`foo`存储的是一个地址，这个地址指向一个变量。不变的是这个地址，即不能把`foo`指向另一个地址，但对象本身是可变的，依然可以为其添加新属性。

如果真的想对对象冻结，使其变成不可变的，需要使用`Object.freeze({})`。例如：
```js
const foo = Object.freeze({});
foo.prop = 123;
// 严格模式下报错
// 其他模式下不起作用
```

除了将对象冻结，对象的属性也应该冻结。下面是一个彻底冻结的函数：
```js
var constantize = (obj) => {
  Object.freeze(obj);
  Object.keys.forEach((key, i) => {
    if (typeof obj[key] === 'object') {
      constantize(obj[key]);
    }
  });
}
```

## ES6声明变量的方法
ES6共有6种声明变量的方法，分别是`var`、`function`、`let`、`const`和`import`、`class`。

## 顶层对象
在浏览器中，顶层对象是`window`对象，在Node环境中，顶层对象是`global`，在ES5中，顶层对象和全局变量是等价的：
```js
window.a = 1;
a // 1

a = 2;
window.a // 2
```
这样的做法有很大弊端，被认为是JavaScript语言中最大的设计败笔之一。这样的设计带来了几个很大的问题：
- 首先，无法在编译时就提示变量未声明的错误，只有运行时才能知道（因为全局变量可能是顶层对象的属性创造的，而属性的创造是动态的）
- 其次，程序员很容易不知不觉地就创建全局变量（比如打字出错）：
- 最后，顶层对象的属性是到处都可以读写的，这非常不利于模块化编程。另一方面，`window`对象有实体含义，指的是浏览器的窗口对象，这样也是不合适的。

为了解决这一问题，ES6规定，使用`var`和`function`定义的变量仍然可以在顶层对象中访问；而`let`、`const`、`class`定义的全局变量则不能在顶层对象中访问，实现了顶层对象和全局变量的隔离。