---
layout: "post"
title: "「前端开发」- JS-ES6-02"
subtitle: "ECMAScript6 —— 变量的解构赋值"
author: "eliochiu"
date: 2022-11-08

tags: ["前端开发@Tags", "JavaScript@Languages", "ES6@Tags"]
lang: zh
catalog: true
header-image: ""
header-style: text
katex: true
---

## 数组的解构赋值
### 基本用法
ES6允许按照一定的模式，从数组和对象中提取值，然后对变量赋值，这被称为解构赋值（Destructuring）。

以前，为变量赋值只能直接指定其值：
```js
let a = 1;
let b = 2;
let c = 3;
```
ES6允许写成这样：
```js
let [a, b, c] = [1, 2, 3];
```
上面的代码表示，可以从数组中提取值，按照对应位置对变量赋值。本质上，这属于一种模式匹配，只要等号两端的模式相同，左边的变量就会被赋予对应的值。解构赋值可以使用嵌套模式：
```js
let [foo, [[bar], baz]] = [1, [[2], 3]];
foo // 1
bar // 2
baz // 3

let [, , third] = ["foo", "bar", "baz"];
third // "baz"

let [x, , y] = [1, 2, 3];
x // 1
y // 3

let [head, ...tail] = [1, 2, 3, 4];
head // 1
tail // [2, 3, 4]

let [x, y, ...z] = ['a'];
x // "a"
y // undefined
z // []
```
### 解构失败
如果解构不成功，变量的值就等于`undefined`。
```js
let [foo] = [];
foo // undefined
let [bar, foo] = [1];
foo // undefined
```

### 不完全解构
如果左边的模式只能匹配一部分，这种情况下依然能够解构成功，成为不完全解构。
```js
let [x, y] = [1, 2, 3];
x // 1
y // 2

let [a, [b], d] = [1, [2, 3], 4];
a // 1
b // 2
d // 4
```

### 解构条件
右侧必须是一个可遍历的结构，才能够实现解构赋值，否则会报错。例如：
```js
let [a] = 1; // Error
```

### 默认值
解构赋值允许默认值。
```js
let [foo = true] = [];
foo // true

let [x, y = 'b'] = ['a'];
x // 'a'
y // 'b'

let [x, y = 'b'] = ['a', undefined];
x // 'a'
y // 'b'

let [x = 1] = [undefined];
x // 1

let [x = 1] = [null];
x // null
```

注意，只有对应位置值为`undefined`的时候才会将变量指定为默认值，否则按照解构赋值原则赋值。上述代码中，`undefined`默认值生效，而`null`默认值未生效。

## 对象的解构赋值
解构赋值不仅可以用于数组，还可以用于对象。
```js
let {foo, bar} = {foo: "aaa", bar: "bbb"};
foo // "aaa"
bar // "bbb"
```

数组的解构赋值与对象的解构赋值略有不同，数组的解构赋值依靠元素的顺序，而对象的解构赋值则不考虑顺序，考虑属性的名字，同名属性才能解构成功。

```js
let {baz} = {foo: "aaa", bar: "bbb"};
baz // undefined
```

如果变量名和属性名不一致，写成下面的形式：
```js
let {foo: baz} = {foo: "aaa", bar: "bbb"};
baz // "aaa"

let obj =  { first: "hello", last: "world" };
let {first: f, last: l} = obj;
f // "hello"
l // "world"
```

上面的例子也说明了，对象解构赋值是下面形式的简写：
```js
let {foo: foo, bar: bar} = {foo: "aaa", bar: "bbb"};
```
对象解构赋值的内部机制是先找到同名属性，再赋值给对应的变量。真正被赋值的是后者，而不是前者。
```js
let {foo: baz} = {foo: "aaa"};
baz // "aaa"
foo // Error
```

## 字符串的解构赋值
字符串可以当成一个数组进行解构赋值，例如：
```js
const [a, b, c, d, e] = "abcde";
a // "a"
b // "b"
```
还可以使用对象的解构赋值获得字符串的长度：
```js
let {length: len} = "abcde";
len // 5
```

## 解构赋值的作用
### 交换两个变量的值
```js
let a = 10, b = 20;
[a, b] = [b, a];
a // 20
b // 10
```

分析上面的代码，可以看到，我们先定义了一个数组`[b, a]`，也就是`[20, 10]`，然后对`a, b`进行数组的解构赋值，从而实现了交换变量的需求。

### 从函数返回多个值
函数只能返回一个值，如果想从函数返回多个值，只能放在数组或对象里。有了解构赋值，取出这些值就变得很方便。
```js
// 返回一个数组
function example() {
  return [1, 2, 3];
}

let [a, b, c] = example();

// 返回一个对象
function example() {
  return {
    foo: 1,
    bar: 2
  }
}

let {foo, bar} = example();
```

### 函数参数的定义
解构赋值可以方便地将一组参数与变量名对应起来：
```js
// 参数是一组有序的值
function ([x, y, z]) {...}
f([1, 2, 3]);

// 参数是一组无序的值
function ({x, y, z}) {...}
f({z: 3, y: 2, x: 1});
```

### 提取JSON结构
解构赋值可以用来提取JSON中的数据。
```js
let jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};

let {id, status, data: number} = jsonData;
console.log(id, status, number);
// 42 "OK" [867, 5309]
```

### 遍历map结构
任何部署了`Iterator`接口的对象都可以使用`for of`遍历。
```js
var map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
  console.log(key + "is" + value);
}

// 获得键
for (let [key] of map) {
  ...
}

// 获得值
for (let [, value] of map) {
  ...
}
```




