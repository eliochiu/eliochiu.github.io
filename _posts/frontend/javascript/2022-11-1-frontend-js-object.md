---
layout: "post"
title: "「前端开发」- JS-Object"
subtitle: "JavaScript —— 引用类型"
author: "eliochiu"
date: 2022-11-1

tags: ["前端开发@Tags", "JavaScript@Languages"]
lang: zh
catalog: true
header-image: ""
header-style: text
katex: true
---

## Object
几乎所有的引用类型都是`Object`的实例，`Object`类型也是ES中使用最多的一个类型。

### Object的创建
创建`Object`类型的方式有两种：构造函数和对象字面量。

构造函数使用`new`关键字紧跟`Object`构造函数，如下：
```js
var obj = new Object();
obj.name = "Nicholas";
obj.age = 29;
```

对象字面量是对象定义的简写形式，目的在于简化创建包含大量属性的对象的过程，它由一组花括号包括，属性和值用冒号分隔，属性与属性间用逗号分隔，例如：
```js
var obj = {
    name: "Nicholas",
    age: 29
};
```

### Object的访问
对象属性的访问可以使用点`.`和中括号`[]`，如需使用中括号访问，则需要在中括号中添加访问属性的字符串形式。
```js
alert(obj.name); // "Nicholas"
alert(obj["name"]); // "Nicholas"
```
功能上看，点和中括号没有任何区别。中括号的主要优点是可以通过变量来访问属性，例如：
```js
var prop = "name";
alert(obj[name]); // "Nicholas"
```
如果属性名中包含空格，则只能使用中括号访问属性。
```js
alert(obj["first name"]);
```

## Array
除了`Object`类型外，`Array`类型也是ES中最常用的类型。ES中的数组可以保存任意类型的数据，并且大小可以动态调整，可以随着数据的添加自动增长。
### 数组的创建
创建数组的方式也有两种：构造函数与数组字面量。
```js
var arr1 = new Array(2) // 创建一个长度为2的数组
var arr2 = new Array(1, 2, 3) // 创建一个数组[1, 2, 3]，长度为3
var arr3 = new Array("Gray") // 创建一个数组["Gray"]，长度为1
```
另外，构造函数可以省略`new`关键字。

数组字面量是由一对包含数组项的方括号表示的，例如：
```js
var arr4 = [1, "Hello", true, {name: "Alice"}];
```

### 数组的访问
可以使用索引访问数组的每一项，索引从0开始。例如：
```js
var colors = ["red", "blue", "yellow"];
alert(colors[0]); // "red"
```

### 数组属性
数组也是一个对象，也有它的属性和方法。数组对象最常用的一个属性就是数组的长度，使用`length`访问数组的长度。
```js
alert(colors.length) // 3
```

数组的长度是一个动态属性，如果我们将一个长度为3的数组的`length`属性设置为2，则将移除最后一项；如果我们将长度为2的数组`length`属性设置为3，它将会自动添加一个`undefined`的项。
```js
colors[colors.length] = "green"; // colors = ["red", "blue", "yellow", "green"]
```

### 数组方法
#### 检测数组
可以使用`instanceof`操作符检测一个对象是不是数组类型，该操作符的问题在于，它假设只有一个全局环境，如果存在两个`Array`构造函数，他会出现问题。

为了解决这个问题ES5新增了`Array.isArray()`方法用于判断一个值是不是数组。

#### 转换方法
如前所述，所有对象都有`valueOf()`、`toString()`等方法，调用数组的`toString()`方法将返回每个值的字符串形式拼接而成的逗号分隔的字符串，而`valueOf()`返回的还是数组。

`join(seperator)`方法可以将数组的每个元素，按照分隔符`seperator`拼接起来，返回一个字符串。例如：
```js
alert(colors.join("-")) // "red-blue-yellow-green"
```

#### 栈方法
ES提供了一组让数组表现为类似栈的方法，入栈方法`push()`接受一个或多个参数，将其作为元素插入到数组的尾部，并返回插入后的数组的长度；出栈方法`pop()`，从数组尾部减少一项，并返回移除的项。

#### 队列方法
ES也提供了一组让数组表现为类似队列的方法，`shift()`从数组头移除一项，并返回移除的项；类似的，`unshift()`方法接受一个或多个参数，将他们从数组头部插入数组，并返回新数组的长度。

#### 排序方法
数组中具有两个排序方法：`reverse()`和`sort()`。

其中，`reverse()`方法对数组元素进行翻转，如果数组的初值为`1、2、3、4、5`，调用翻转方法后将会变成`5、4、3、2、1`。这种排序方法不够灵活，因此我们需要`sort()`方法。

特别需要注意的是，`sort()`方法默认按照字符串顺序排列元素，对于数组`[0, 1, 5, 10, 15]`，由于`5 > 1`，因此`5`将会排在`10`的后面（升序）。

为了保证排序的准确性，`sort()`方法可以传入一个比较函数用来确定数组元素的顺序。比较函数接受两个参数，如果第一个参数位于第二个参数之前就返回一个负数，如果两个参数相等则返回0，否则返回正数，下面是一个通用的比较函数：
```js
function compare(value1, value2) { 
    if (value1 < value2) { 
        return -1;
    } 
    else if (value1 > value2) { 
        return 1;
    } 
    else { 
        return 0; 
    }
}
```
上述比较函数还可以进行简化：
```js
function compare(value1, value2) {
    return value1 - value2;
} 
```

#### 操作方法
`concat()`方法可以进行数组之间的拼接，这个方法会为数组创建一个副本，并将接收到的参数添加到副本的末尾（不会影响原数组），若不传递参数，则将直接返回一个副本。该方法的参数可以是一个序列，也可以是一个数组。例如：
```js
var colors = ["red", "green", "blue"];
var colors2 = colors.concat("yellow", ["black", "brown"]);
console.log(colors); // ["red", "green", "blue"]
console.log(colors2); // ["red", "green", "blue", "yellow", "black", "brown"]
```

`slice()`方法会对数组进行切片，基于原数组创建新数组。`slice()`方法接收一个或两个参数：当接受一个参数时，返回从该索引开始后的所有项组成的数组；当接受两个参数时，返回起始位置到终止位置（不包括终止位置）的项。
```js
console.log(colors.slice(1)); // ["green", "blue"];
console.log(colors.slice(0, 2)); // ["red", "green"]
```

`splice()`方法用于进行数组项的添加和删除。该方法不同于`concat()`和`slice()`，`splice()`将在原数组基础上进行操作。
- 删除：可以删除任意项，需要接受两个参数。第一个参数表示删除的第一项的索引，第二个参数表示要删除的项数。
- 插入：可以在任意位置插入任意项目，需要接受三个参数。第一个参数表示插入的位置，第二个参数表示要删除的项数（0），第三个参数表示要插入的项目。
- 替换：可以替换项目，需要接受三个参数。第一个参数表示开始替换的位置，第二个参数表示要替换的项数，第三个参数替换的项目。

`splice()`方法始终会返回一个数组，包含所有删除的项目。

```js
var colors = ["red", "green", "blue"]; 

// 删除
var removed = colors.splice(0,1); 
alert(colors); // green,blue 
alert(removed); // red，返回的数组中只包含一项

// 插入
var removed = colors.splice(1, 0, "yellow", "black");
alert(colors); // green,yellow,black,blue
alert(removed); // 空数组

// 替换
var removed = colors.splice(1, 1, "purple");
alert(colors); // green,purple,black,blue
alert(removed); // yellow，删除一项
```

#### 位置方法
ES数组有两个位置方法`indexOf()`和`lastIndexOf()`，均用于返回某一元素在数组中第一次出现的索引。

其中，`indexOf()`从前向后寻找，`lastIndexOf()`从后向前寻找。如果未找到该元素，则返回`-1`，否则返回元素第一次出现的索引。

```js
var nums = [1, 2, 3, 4, 5, 4, 3, 2, 1];
alert(nums.indexOf(1)); // 0
alert(nums.lastIndexOf(1)); // 8
alert(nums.indexOf(10)); // -1
```

#### 迭代方法
ES5为数组定义了五个迭代方法，每个方法都接受两个参数：在每一项上运行的函数和（可选）运行该函数的作用于对象。传入的函数会接受三个参数：当前数组项的值、当前数组项的索引和数组对象本身。
- `every()`：对数组每一项运行给定的函数，若每一项返回`true`，则返回`true`。
- `some()`：对数组每一项运行给定的函数，若存在一项返回`true`，则返回`true`。
- `forEach()`：对数组每一项运行给定的函数，无返回值。
- `filter()`：对数组每一项运行给定的函数，返回`true`的项组成的数组。
- `map()`：对数组每一项运行给定的函数，返回每一项的函数返回值所组成的数组。

```js
var num = [1, 2, 3, 4, 5, 4, 3, 2, 1];

var everyRes = nums.every(function(item, index, array) {
    return item > 2;
}); // false

var someRes = nums.some(function(item, index, array) {
    return item > 2;
}); // true

var filterRes = nums.filter(function(item, index, array) {
    return item > 2;
}); // [3, 4, 5, 4, 3]

var mapRes = nums.map(function(item, index, array) {
    return item * 2;
}); // [2, 4, 6, 8, 10, 8, 6, 4, 2]

var forEachRes = nums.forEach(function(item, index, array) {
     // 执行某些操作
}); 
```

#### 归并方法
ES5还新增了两个归并数组的方法，`reduce()`和`reduceRight()`。这两个方法都会迭代数组的所有项，然后构建一个最终返回的值。其中，`reduce()`方法从第一项开始，遍历到最后；`reduceRight()`从数组的最后一项开始，向前遍历到第一项。


## Date

## RegExp

## Function

## 基本包装类型




