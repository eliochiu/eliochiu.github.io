---
layout: "post"
title: "「前端开发」- JS-Type"
subtitle: "JavaScript —— 数据类型"
author: "eliochiu"
date: 2022-10-26

tags: ["前端开发@Tags", "JavaScript@Languages"]
lang: zh
catalog: true
header-image: ""
header-style: text
katex: true
---

## 数据类型
ES中有五种简单数据类型`Number、String、Boolean、Undefined、Null`和一种复杂类型`Object`（ES6有更新）。

### typeof操作符
由于ES变量的松散性，我们需要一种手段来判断变量的类型。`typeof`专门负责判断基本类型。使用格式：`typeof variable`，他将返回一个字符串，代表变量的类型。
- `"undefined"`：变量未定义
- `"boolean"`：这个值是布尔类型
- `"string"`：这个值是字符串类型
- `"number"`：这个值是数字类型
- `"object"`：这个值是对象或`null` 
- `"function"`：这个值是函数

通过上述例子可以看出，`typeof`运算符的一个缺陷就是：仅能判断基本类型，且无法判断null；对于复杂类型如数组、正则等类型，他一律返回`"object"`。

> 特别注意的是：对于未声明的变量和已声明但未赋值的变量，`typeof`均返回`"undefined"`。

## Undefined
`Undefined`类型只有一个值`undefined`，当一个变量声明但未赋值时，他的值就是`undefined`。

## Null
`Null`类型也只有一个值`null`。从逻辑上看，`null`是一个空对象指针，指向一个未分配的内存。

## Boolean
`Boolean`类型很常用，他只有两个值：`true`代表真，`false`代表假。

Boolean类型可以和其他任意类型互相转换，转换的规则是：
- `true`：
  - `Number`：除`0`以外的其他数
  - `String`：非空字符串
  - `Object`：任何对象
- `false`：
  - `Number`：`0`和`NaN`
  - `String`：`""`
  - `undefined`
  - `null`

## Number
`Number`类型主要用于存储整数和浮点数，为了支持不同类型，ES规定了不同的字面量：
```js
var integer = 3; // 整数
var float = 3.3; // 浮点数
```
除了十进制外，还支持八进制和十六进制的字面量。其中八进制以`0`开头，十六进制以`0x`开头：
```js
var hex = 0xa; // 十进制中的10
var oct = 011; // 十进制中的9
```

### 浮点数
浮点数值的字面量里必须包含小数点，并且小数点后至少要有一位数字。ES会尽力将浮点数转化成整数，例如`10.0`最终会存储为整数`10`。

对于极大或极小的数，也可以使用科学记数法表示，例如：`1e-7`、`5.34e8`等。

ES中的浮点数存在精度问题，最高精度是17位小数，算术时的精度会大大降低。

### 数值范围
数字类型支持的最大值和最小值分别存储在`MAX_VALUE`和`MIN_VALUE`中，如果一个数超出了该范围，则将自动变为`Infinity`，即无穷大。可以使用全局方法`isFinite()`判断一个数是否为无穷大。

### NaN
NaN代表Not a number，是一个特殊的数字类型值，他用来表示一个本来要返回数字类型的操作数未返回数字类型的情况，他最大的一个特点是，NaN与任何数都不相等，包括其自身。

ES定义了全局的方法`isNaN()`用来判断一个数字是不是`NaN`：
```js
isNaN(10) // false
isNaN(10.3) // false
isNaN("a") // true
isNaN("1") //false，这里会进行类型转换
```

### 类型转换

#### Number()
`Number()`函数的转换规则如下：
- 如果是`Boolean`值，`true`和`false`将分别被转换为`1`和`0`。 
- 如果是数字值，只是简单的传入和返回。
- 如果是`null`值，返回`0`。
- 如果是`undefined`，返回`NaN`。
- 如果是字符串，遵循下列规则:
  - 如果字符串中只包含数字(包括前面带正号或负号的情况)，则将其转换为十进制数值，即"1" 会变成 1，"123"会变成 123，而"011"会变成11(注意:前导的零被忽略了);
  - 如果字符串中包含有效的浮点格式，如"1.1"，则将其转换为对应的浮点数值(同样，也会忽略前导零);
  - 如果字符串中包含有效的十六进制格式，例如"0xf"，则将其转换为相同大小的十进制整数值;
  - 如果字符串是空的(不包含任何字符)，则将其转换为 0;
  - 如果字符串中包含除上述格式之外的字符，则将其转换为 NaN。
- 如果是对象，则调用对象的`valueOf()`方法，然后依照前面的规则转换返回的值。如果转换
的结果是 NaN，则调用对象的`toString()`方法，然后再次依照前面的规则转换返回的字符
串值。

```js
Number("Hello, world!")  // NaN
Number("")  // 0
Number("000111")  // 111
Number(true)  // 1
```

#### parseInt()
`Number()`在解析字符串时不够合理，实际中常用的是`parseInt()`来解析数字，它会忽略字符串前面的空格，直至找到第一个非空格字符。如果第一个字符不是数字字符或者负号，`parseInt()`就会返回`NaN`;也就是说，用`parseInt()`转换空字符串会返回`NaN`，(`Number()`对空字符返回0)。如果第一个字符是数字字符，`parseInt()`会继续解析第二个字符，直到解析完所有后续字符或者遇到了一个非数字字符。

```js
parseInt("1234blue")  // 1234
parseInt("")  // NaN
parseInt("0xa")  // 10
parseInt("22.5")  // 22
parseInt("070")  // 56
parseInt("70")  // 70
parseInt("0xf")  // 15
```

值得注意的是，ES5的`parseInt()`已经不再支持解析八进制数，因此ES5中`parseInt(070)`将会返回70，为了防止进制之间的混淆，`parseInt`可指定进制。例如：`parseInt("010", 2) = 2, parseInt("010", 8) = 8`。

#### parseFloat()
与`parseInt`类似，`parseFloat`用于解析浮点数，直至遇到第一个无效的浮点数字符。

```js
parseFloat("1.1.1")  // NaN
parseFloat("1234blue")  // 1234
parseFloat("22.5")  // 22.5
parseFloat("098.5")  // 98.5
```

## String
`String`类型用于表示由零个或多个十六位`Unicode`字符组成的序列，即字符串。字符串可以由单引号和双引号表示。

### 不可变
字符串是不可变的，一个字符串被创建之后，他的值就不能改变，例如下面的代码：
```js
var str = "Java";
str = str + "Script";
console.log(str);
```
虽然我们打印的结果是`JavaScript`，但是在后台实际发生了下列的步骤：
- 创建一个长度为10的新字符串`JavaScript`，并将其赋值给`str`
- 销毁`Java`与`Script`

### 类型转换
#### toString()
可以使用`toString()`方法将任意类型的值转化成字符串（`Undefined`和`Null`类型没有这个方法）。

如果是数字类型，在转换时还可以指定要转成的进制数，例如：
```js
var num = 10;
num.toString();  // "10"
num.toString(8);  // "12"
num.toString(18);  // "a"
```

#### String()
与`Number()`类似，`String()`可以将任意值转换成字符串，规则如下：
- 如果是布尔、数字、字符串，直接返回对应的字符串
- 如果是空类型，返回`"null"`
- 如果是未定义类型，返回`"undefined"`

## Object
`Object`是JS中最重要的类型，所有的类型都可以看成是`Object`，对象类型可看成一组数据和功能的集合，主要包括属性与属性值，他们用冒号隔开。定义对象可以使用对象字面量`{}`，也可以使用构造函数`new Object()`。

`Object`类型是所有实例的基础，任何`Object`类型的值都包含着下列方法：
- `constructor`：保存创造当前对象的函数。
- `hasOwnProperty()`：用来检查给定属性是否在对象实例内（而不是原型中）
- `isPrototypeOf()`：用来检查某对象是否是传入对象的原型。
- `toString()`：返回对象的字符串表示。

> 关于对象，在引用类型章节会展开讨论，这里只是简单介绍。


