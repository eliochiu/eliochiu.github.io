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
## 属性简介表示
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
            return x !== 0 || 1 / x !== 1 / y;
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