---
layout: "post"
title: "「前端开发」- JS-ES6-05"
subtitle: "ECMAScript6 —— 对象的扩展"
author: "eliochiu"
date: 2022-11-09

tags: ["前端开发@Tags", "JavaScript@Languages", "ES6@Tags"]
lang: zh
catalog: true
header-image: ""
header-style: text
katex: true
---
## 对象简化表示
### 属性简写
ES6允许在对象中写入变量和函数作为对象的属性和方法，这样书写更简洁：
```js
var foo = 'bar';
var baz = {foo};
baz; // {foo: 'bar'}

function(x, y) {
    return {x, y}
}

// 等价于
function(x, y) {
    return {x: x, y: y}
}
```

### 方法简写
除了属性，方法也可以进行简写：
```js
var o = {
    method() {
        return "Hello!";
    }
};

// 等价于
var o = {
    method: function() {
        return "Hello!";
    }
};
```

下面是一个实际的例子：
```js
var birth = '2001/05/01';

var Person = {
    name: "张三",

    // 等价于birth: '2001/05/01'
    birth,
    
    // 等价于hello: function() {...}
    hello() {
        console.log('我的名字是', this.name);
    }
}
```

## Object.is()
ES5比较两个值是否相等，只有两个运算符：等值运算符（==）和全等运算符（===），他们都有缺点。前者会自动进行类型转换，后者的`NaN`不等于自身。

ES6提供了一个方法`Object.is()`，用来判断两个值是否相等，与全等运算符（===）类似。
```js
Object.is('foo', 'foo'); // true
Object.is({}, {}); // false
```
比较特殊的是，+0不等于-0，NaN等于自身。
```js
Object.is(+0, -0); // false
Object.is(NaN, NaN); // true
```

ES5可以使用以下代码部署该方法：
```js
Object.defineProperty(Object, 'is', {
    value: function(x, y) {
        if (x === y) {
            // 针对+0和-0的情况
            return x !== 0 || 1 / x === 1 / y;
        }

        // 针对NaN的情况
        return x !== x && y !== y;
    },

    configurable: true,
    writable: true,
    enumerable: false
});
```

## Object.assign()
`Object.assign`方法用于将源对象的所有可枚举属性复制到目标对象中。
```js
var target = {a: 1};
var s1 = {b: 2};
var s2 = {c: 3};
Object.assign(target, s1, s2);
target; // {a: 1, b: 2, c: 3};
```

注意：assign执行的是浅拷贝

## Object.keys()、Object.values()、Object.entries()
### Object.keys()
ES5引入了`Object.keys()`方法，返回一个数组，成员是参数对象自身的所有可遍历的属性（非继承）的键名。
```js
var obj = { foo: 'bar', baz: 42 };
Object.keys(obj); // ["foo", "baz"]
```

ES2017增加了一个提案，引入了`Object.keys`配套的`Object.values(), Object.entries()`作为遍历对象的一个补充手段，供`for ... of`循环使用。
```js
let { keys, values, entries } = Object;
let obj = { a: 1, b: 2, c: 3 };
for (let key of keys(obj)) {
    console.log(key); // 'a', 'b', 'c'
}

for (let value of values(obj)) {
    console.log(value); // 1, 2, 3
}

for (let [key, value] in entries(obj)) {
    console.log([key, value]); // ['a', 1], ['b', 2], ['c', 3]
}
```

### Object.values()
`Object.values()`返回一个数组，成员是参数对象的所有可遍历的属性（非继承）的键值。
```js
var obj = { foo: 'bar', baz: 42 };
Object.values(obj); // ['bar', 42];
```

`Object.values()`方法会自动过滤类型为`Symbol`的值。
```js
var obj = {
    [Symbol()]: 123,
    foo: 'abc'
};

Object.values(obj); // ['abc']
```

### Object.entries()
`Object.entries()`返回一个数组，成员是参数对象的所有可遍历的属性（非继承）的键名键值数组。
```js
var obj = { foo: 'bar', baz: 42 };
Object.entries(obj); // [['foo', 'bar'],['baz': 42]];
```

如果原对象的键是`Symbol`类型的，那么它会被忽略。
```js
var obj = {
    [Symbol()]: 123,
    foo: 'abc'
};

Object.entries(obj); // [['foo', 'abc']]
```

`Object.entries()`方法有很多用途，主要用于遍历对象的属性：
```js
let obj = { one: 1, two: 2 };
for (let [k, v] of Object.entries(obj)) {
    console.log(
        `${JSON.stringnify(k)}: ${JSON.stringnify(v)}`
    );
}

// "one": 1
// "two": 2
```

该方法还可以将对象转成真正的`Map`结构：
```js
var obj = { foo: 'bar', baz: 42 };
var map = new Map(Object.entries(obj));
map // Map{ foo: 'bar', baz: 42 }
```

自己实现`Object.entries()`：
```js
function entries(obj) {
    let arr = [];
    for (let key of Object.keys(obj)) {
        arr.push([key, obj[key]]);
    }
    return arr;
}
```

## 对象的扩展运算符
在数组篇，我们介绍了扩展运算符。例如：
```js
const [a, ...b] = [1, 2, 3];
a // 1
b // [2, 3]
```
ES2017将这个运算引入到对象中。对象的解构赋值用于从一个对象取值，相当于将所有可遍历的、但尚未被读取的属性分配到指定的对象上面。所有的键和它们的值都会复制到新对象上面。

```js
let {x, y, ...z} = {x: 1, y: 2, a: 3, b: 4};
x // 1
y // 2
z // {a: 3, b: 4}
```

> 注意：解构赋值是一个浅拷贝，如果一个键的值是复合类型的值，解构赋值得到的是这个值的引用，而不是这个值的副本。
```js
let obj = {a: {b: 1}};
let {...x} = obj;
obj.a.b = 2;
x.a.b // 2
```

