---
layout: "post"
title: "「前端开发」- JS-Function"
subtitle: "JavaScript —— 函数表达式"
author: "eliochiu"
date: 2022-11-07

tags: ["前端开发@Tags", "JavaScript@Languages"]
lang: zh
catalog: true
header-image: ""
header-style: text
katex: true
---

## 函数声明与函数表达式
函数声明与函数表达式是两种定义函数的不同方式。函数声明的语法是这样的：
```js
function functionName(arg0, srg1, arg2...) {
  // 函数体
}
```
其中`function`是用于声明函数的关键字，`functionName`是函数的名字。函数声明最重要的一个特点就是函数声明的提升，意思是在执行代码之前，会先读取函数声明。也就意味着，我们可以在一个函数声明之前调用该函数。例如：
```js
sayHi();
function sayHi() {
  alert("hi!");
}
```

第二种定义函数的方式是函数表达式，函数表达式有几种不同的形式。下面是最常见的一种形式：
```js
var functionName = function (arg0, arg1, arg2...) {
  // 函数体
};
```
这种方式创造了一个**匿名函数**，并将该函数赋值给`functionName`这一变量。此时，遵循变量提升的规则，下列代码会报错：
```js
sayHi(); // 错误，函数还未定义
var sayHi = function () {
  alert("hi!");
};
```
当我们使用函数表达式声明函数时，尽管会对变量进行提升，但是在声明函数前，变量仍然保持`undefined`值，因此在此时调用函数会发生错误。

由于函数声明的提升，一些代码可能会出现意想不到的错误。例如：
```js
if(condition) {
  function f() {
    // ...
  }
} else {
  function f() {
    // ...
  }
}
```
乍一看会以为这是一个分支控制语句，当条件成立时，让`f`为某一个函数，否则就让他为另一个函数。实际上，由于解析器会对两个函数声明进行提升，在不同的浏览器中，`f`会保存不一样的值，这是十分危险的。而当我们使用函数表达式时，这样的问题就不复存在了：
```js
var f;
if(condition) {
  f = function () {
    // ...
  }
} else {
  f = function () {
    // ...
  }
}
```
正如前面说过的，函数表达式仅进行变量的提升，而不会对函数整体进行提升，因此不存在函数声明的问题。

## 递归
递归是指一个函数通过名字调用自身的情况。例如，定义一个阶乘函数：
```js
function factorial(n) {
  if (n === 1) {
    return 1
  } 
  return n * factorial(n - 1);
}
```
但是这样的函数可能会出现问题，例如：
```js
var anotherFactorial = factorial;
factorial = null;
anotherFactorial(n); // error
```
上述代码执行了这样的操作：
- 将`factorial`赋值给`anotherFactorial`。根据前面的知识我们知道，函数亦是对象，因此`factorial, anotherFactorial`为两个同时指向阶乘函数的指针。
- 将`factorial`置空。
- 调用`anotherFactorial`，报错。

报错的原因是：函数内部仍然在调用`factorial`，而`factorial`已经被清除了。为了提高代码的可维护性和复用性，这里可以使用`arguments`的`callee`属性，他指向拥有`arguments`对象的函数。
```js
function factorial(n) {
  if (n === 1) {
    return 1
  } 
  return n * arguments.callee(n - 1);
}
```
在严格模式下，无法使用`callee`，可以通过命名函数表达式的方法来解决：
```js
var factorial = (function f(n) {
  if (n === 1) {
    return 1
  } 
  return n * f(n - 1);
});
```

## 闭包
**闭包是指有权访问另一函数作用域中变量的函数**。创建闭包的常用方法，是在在函数中返回另一个函数，以`createCompareFunction`为例：
```js
function createCompareFunction(propertyName) {
  return function (obj1, obj2) {
    var value1 = obj1[propertyName]; // 访问到了propertyName
    var value2 = obj2[propertyName]; // 访问到了propertyName
    
    if (value1 < value2) {
      return -1;
    } else if (value1 === value2) {
      return 0;
    } else {
      return -1;
    }
  }
}
```
上述代码实现了一个自动生成比较函数的函数，主要用于对象数组指定属性的排序。特别注意的是，`value1, value2`使用了函数外部的（最外层函数）的变量`propertyName`，之所以能访问这个变量，是因为返回的函数的内部作用域链中，包含了`createCompareFunction`函数的作用域。

当某个函数被调用时，会创建一个执行环境和对应的作用域链，然后使用`arguments`和其他命名参数的值来初始化函数的活动对象。在作用域链内部，当前执行环境拥有的变量永远是第一位的，外层函数位于第二位，外层的函数的外层函数位于第三位，以此类推，直至作为作用域终点的全局环境。在函数执行过程中，需要读写变量的值的时候，就需要用到作用域链来查找变量。例如，下面的例子：
```js
function compare (value1, value2) {
    if (value1 < value2) {
      return -1;
    } else if (value1 === value2) {
      return 0;
    } else {
      return -1;
    }
  }
```


