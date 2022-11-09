---
layout: "post"
title: "「前端开发」- JS-ES6-03"
subtitle: "ECMAScript6 —— 数值的扩展"
author: "eliochiu"
date: 2022-11-08

tags: ["前端开发@Tags", "JavaScript@Languages", "ES6@Tags"]
lang: zh
catalog: true
header-image: ""
header-style: text
katex: true
---

## 二进制、八进制表示
ES5在严格模式中已经不允许八进制使用`0`开头，eS6新增了二进制和八进制的字面量表示法：`0b(0B)`和`0o(0O)`：
```js
0b1110 === 14 // true
0o71 === 57 // true
```
如果想将`0b, 0o`前缀的字符串转成十进制数值，可以使用`Number()`方法：
```js
Number('0b1110') // 14
Number('0o71') // 57
```

## Number.isFinite()、Number.isNaN()
ES6在Number对象上新提供了两个方法`Number.isFinite()、Number.isNaN()`。
### Number.isFinite()
`Number.isFinite()`用于检测一个数值是否为有限的：
```js
Number.isFinite(15); // true
Number.isFinite(0.8); // true
Number.isFinite(NaN); // fasle
Number.isFinite(infinity); // fasle
Number.isFinite(-infinity); // fasle
Number.isFinite('foo'); // fasle
Number.isFinite('15'); // fasle
Number.isFinite(true); // fasle
```
ES5可以通过下面的代码部署该方法：
```js
(function (global) {
  var global_isFinite = global.isFinite;

  Object.defineProperty(Number, 'isFinite', { 
    value: function isFinite(value) {
      return typeof value === 'number' && global_isFinite(value);
      },
    configurable: true, 
    enumerable: false, 
    writable: true
    });
})(this);
```

### Number.isNaN()
`Number.isNaN()`方法用于判断一个值是否为`NaN`：
```js
Number.isNaN(NaN); // true
Number.isNaN(15); // false
Number.isNaN('15'); // false
Number.isNaN(true); // false
Number.isNaN(9 / NaN); // true
Number.isNaN('true' / 0); // true
Number.isNaN('true' / 'true'); // true
```
ES5可以通过下面的代码部署该方法：
```js
(function (global) {
  var global_isNaN = global.isNaN;

  Object.defineProperty(Number, 'isNaN', { 
    value: function isFinite(value) {
      return typeof value === 'number' && global_isNaN(value);
      },
    configurable: true, 
    enumerable: false, 
    writable: true
    });
})(this);
```

两个新方法和全局方法的区别是，新方法只判断数值型的值。而传统方法会进行数值转换。

## Number.parseInt()、Number.parseFloat()
ES6将全局的`parseInt()`和`parseFloat()`移植到`Number`对象上，行为完全保持不变，目的是减少全局性方法。

## Number.isInteger()
`Number.isInteger()`用于判断一个数是不是整数。特别注意的是，3和3.0在`JavaScript`里存储的方式是一致的，他们都是整数。
```js
Number.isInteger(25); // true
Number.isInteger(25.0); // true
Number.isInteger(25.1); // false
Number.isInteger("15"); // false
Number.isInteger(true); // false
```
ES5可以通过以下代码部署该方法：
```js
(function (global) {
  var global_isInteger = global.isInteger;

  Object.defineProperty(Number, 'isInteger', { 
    value: function isFinite(value) {
      return typeof value === 'number' && global_isInteger(value);
      },
    configurable: true, 
    enumerable: false, 
    writable: true
    });
})(this);
```

## Number.EPSILON
ES6在`Number`对象上添加了一个极小增量`EPSILON`
```js
Number.EPSILON; // 2.220446049250313e-16
```
引用这么小的量是为了浮点数运算时设置误差范围，如果误差比`EPSILON`小，我们可以认为得到了正确结果。

## 指数运算符
ES2016新增了指数运算符`**`。
```js
2 ** 3 === 8; // true
3 ** 2 === 9; // true
```

指数运算符可以和等号结合进行复合赋值。
```js
a **= 2; // 等价a = a ** 2
```

## BigInt数据类型
JavaScript所有数字都保存成64位浮点数，这决定了整数的精确程度只能到53个二进制位。大于这个范围的整数，JavaScript是无法精确表示的，这使得JavaScript不适合进行科学和金融方面的精确计算。

### BigInt简介

ES6新增了`BigInt`数据类型，他是一种基本类型，只能用来表示整数，没有位数的限制，任何证书都可以精确地表示。为了和`Number`类型区别，`BigInt`类型的数字后面都要加一个`n`。

```js
1n + 2n = 3n
```

二进制、八进制、十进制表示法也要加上后缀`n`：
```js
0b0110n
0o721n
0x2b3an
```

对于`BigInt`类型的数据，`typeof`运算符会返回`bigint`
```js
typeof 123n // "bigint"
```

JavaScript提供了原生对象`BigInt`，用来转换成`BigInt`类型的数值，转换规则和`Number()`一致。
```js
BigInt(123); // 123n
BigInt('123'); // 123n
BigInt(false); // 0n
BigInt(true); // 1n
```

以下的用法会报错：
```js
new BigInt() // 不存在完整的构造函数，不能使用`new`关键字
BigInt(undefined); 
BigInt(null); 
BigInt('123n'); 
BigInt('abc'); 
```

### 运算
数学方面，`BigInt`类型的+、-、*、**这四个二元运算符和`Number`类型一致。除法运算会舍去小数，返回一个整数：
```js
9n / 5n = 1n
```







