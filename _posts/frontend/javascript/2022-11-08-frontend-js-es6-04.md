---
layout: "post"
title: "「前端开发」- JS-ES6-04"
subtitle: "ECMAScript6 —— 数组的扩展"
author: "eliochiu"
date: 2022-11-09

tags: ["前端开发@Tags", "JavaScript@Languages", "ES6@Tags"]
lang: zh
catalog: true
header-image: ""
header-style: text
katex: true
---

## 扩展运算符
### 扩展运算符简介
扩展运算符是剩余运算符的逆运算，也使用`...`三个点，将一个数组转为用逗号分隔的参数列表。
```js
console.log(...[1, 2, 3]); // 1 2 3
console.log(1, ...[2, 3, 4], 5); // 1 2 3 4 5
```

该运算符主要用于函数调用：
```js
function push(array, ...items) {
    array.push(...items);
}

function add(x + y) {
    return x + y;
}

var numbers = [4, 38];
add(...numbers); // 42
```

该运算符还可以用于代替`apply`方法将数组转化成函数参数。
```js
// ES5的写法
function f(x, y, x) {
    // ...
}
var args = [0, 1, 2]
f.apply(null, args);

// ES6的写法
f(...args)
```

例如，我们用扩展运算符代替`apply`来求一个数组中最大的元素：
```js
// ES5 
Math.max.apply(null, [14, 3, 77]); // 77

// ES6
Math.max(...[14, 3, 77]); // 77
```

再比如，我们可以用扩展运算符，将一个数组里的所有元素追加到另一个数组中：
```js
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];

// ES5
Array.prototype.push.apply(arr1, arr2);

// ES6
arr1.push(...arr2);
```
### 扩展运算符的应用
#### 合并数组
扩展运算符提供了合并数组的新写法：
```js
var arr1 = ['a', 'b'];
var arr2 = ['c'];
var arr3 = ['d', 'e'];

// ES5
arr1.concat(arr2, arr3);

// ES6
[...arr1, ...arr2, ...arr3];
```

#### 与解构赋值结合
```js
// ES5
a = list[0], rest = list.slice(1);

// ES6
[a, ...rest] = list;
```
扩展运算符用在解构赋值中，只能用在最后。

#### 函数返回值
JavaScript函数只能返回一个值，如果想返回多个值，需要返回一个数组或者对象。
```js
var dataFields = readDateFields(database);
var dt = new Date(...dataFields);
```

#### Iterator接口
任何Iterator接口的对象，都可以使用扩展运算符转为真正的数组。

## Array.from()
`Array.from()`方法用于将两类对象转化为真正的数组：类数组对象和可遍历对象（包括ES6新增的Map和Set）

下面是一个类数组对象：
```js
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};

// ES5
var arr1 = [].slice.call(arrayLike);

// ES6
var arr2 = Array.from(arrayLike);
```
实际应用中，`NodeList, arguments`等类数组对象都可以使用`Array.from()`转成真正的数组。

如果`Array.from()`的参数是一个数组，则返回该数组的一个副本。

`Array.from()`还可以接受第二个参数，作用类似于数组的`map`方法，对每个元素进行处理，将处理后的值放入数组。
```js
Array.from(arrayLike, x => x ** 2);

// 等价于
Array.from(arrayLike.map(x => x ** 2));
```

## Array.of()
`Array.of()`将一组值转换为数组。
```js
Array.of(3, 11, 8); // [3, 11, 8]
Array.of(3); // [3]
Array.of(3).length; // 1
```

该方法主要弥补数组构造函数的不足：
```js
Array(); // []
Array(3); // [, , ,]
Array(11, 8, 3); // [11, 8, 3]
```

`Array.of()`可以用来代替`Array`构造函数。

## 数组实例的find()和findIndex()
数组实例的`find()`方法用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为`true`的成员，然后返回该成员。如果没有符合条件的成员，则返回`undefined`。例如：
```js
[1, 4, -5, 10].find(n => n < 0); // -5
```

回调函数可以接受三个值：`value, index, array`，分别表示数组元素的值、所以和当前的数组。

数组实例的`findIndex()`方法和`find()`方法类似，用于找出第一个符合条件的数组成员的索引。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为`true`的成员，然后返回该成员在数组中的索引。如果没有符合条件的成员，则返回-1。例如：
```js
[1, 5, 10, 15].findIndex(function(value, index, arr) {
    return value > 9;
}); // 2
```

特别注意的是，这两个方法都能发现`NaN`。
```js
[NaN].indexOf(NaN); // -1
[NaN].findIndex(x => Object.is(NaN, x)); // 0
```

## 数组实例的fill()
`fill()`使用指定值给数组填充。
```js
[1, 2, 3].fill(7);
// [7, 7, 7]
new Array(3).fill(7);
// [7, 7, 7]
```

## 数组实例的includes()
`Array.prototype.includes()`方法返回一个布尔值，表示某个数组是否包含给定的值。
```js
[1, 2, 3].includes(2); // true
[1, 2, 3].includes(3); // false
[1, 2, NaN].includes(NaN); // true
```
