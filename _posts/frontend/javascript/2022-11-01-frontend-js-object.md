---
layout: "post"
title: "「前端开发」- JS-Object"
subtitle: "JavaScript —— 引用类型"
author: "eliochiu"
date: 2022-11-01

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
ES的`Date`类型是在早期Java中的java.util.Date类的基础上构建的。`Date`使用UTC（国际协调时间）1970年1月1日之前或之后的毫秒数来保存日期。

### 日期的创建
日期通过`new`关键字和`Date`构造函数创建，在不传参的情况下，他将自动获得当前的日期和时间。
```js
var now = new Date();
```

如果想获得特定日期和时间的对象，则需要在执行构造函数时传入毫秒数。`Date.parse()`方法会接受一个字符串，将它转成毫秒。实际上，将字符串作为参数传给构造函数后，后台会自动调用`parse()`，因此下列代码等价：
```js
var dt1 = new Date(Data.parse("May 24, 2005"));
var dt2 = new Date("May 24, 2005");
```
`Date.UTC()`同样接受参数并将其转化为对应的毫秒数，他的参数分别是年份、基于0的月份（0-11）、月中的一天（1-31）、小时、分钟、秒、毫秒，若忽略其他参数，则统统为0。

### 日期格式化方法
`Date`类型有一些专用于将日期格式转化成字符串格式的方法：

- `toDateString`：以特定的格式显示星期、日、月、年。
- `toTimeString`：以特定的格式显示时、分、秒、毫秒。
- `toLocaleDateString`：以特定的地区显示星期、日、月、年。
- `toLocaleTimeString`：以特定的地区显示时、分、秒、毫秒。
- `toUTCString`：以特定的格式显示完成的UTC时间。

### 日期组件方法
日期组件方法用于获得和修改日期对象中的各个部分：
<img src='/img/in-post/date.png#pic_center'>


## RegExp

## Function
ES中的函数也是对象，每一个函数都是`Function`类型的实例，和其他引用类型一样具有属性和方法。由于函数是对象，那么函数名也就是一个指针，不会与某一个函数绑定。

### 函数声明与函数表达式
有两种方式定义函数：
```js
function f() {
    // 函数体
}

var f = function() {
    // 函数体
}
```
这两种函数的定义方式在效果上是一致的，第一种称为函数声明，第二种称为函数表达式，后面的函数属于匿名函数。

但在解析器解析代码时，会优先将函数声明提升，然后再考虑函数表达式的提升。例如：
```js
console.log(sum(1, 1)); // 2
function sum(num1, num2) {
    return num1 + num2;
}
```
上述代码能正确执行其功能，是因为解析器会将所有函数声明进行提升，我们可以在声明前使用它。而下列的代码则有所不同：
```js
console.log(sum(1, 1)); // undefined
var sum = function (num1, num2) {
    return num1 + num2;
}
```
结果返回`undefined`，是因为解析器把函数表达式当成变量看待，对变量进行提升。因此，在变量初始化之前，变量的值都是`undefined`。



### 函数重载
ES中的函数没有重载，因为每一个函数名都是一个指针。考虑下面的语句：
```js
function add(num1, num2) {
    return num1 + num2;
}

function add(num) {
    return num;
}
```
这是两个同名函数，第二个函数会完全覆盖第一个函数，这是因为上述代码可以写成函数表达式的形式：
```js
var add = function (num1, num2) {
    return num1 + num2;
};

var add = function (num) {
    return num;
};
```
显然，根据ES中变量的特点，第二个函数覆盖了第一次的函数变量`add`。

### 函数内部属性
函数内部有两个特殊的对象：`this`和`arguments`。

`arguments`是一个类数组对象，包含了传入的参数：
```js
var getArgumentLength = function () {
    return arguments.length;
}
console.log(getArgumentLength()); // 0
console.log(getArgumentLength(1)); // 1
console.log(getArgumentLength(1, 2)); // 2
```

`arguments`有一个特殊的属性`callee`，它是一个指针，指向拥有`arguments`属性的函数。这个属性适合应用在递归的函数中，用于提高代码的可维护性，例如：
```js
var factorial = function(n) {
    if (n <= 1) {
        return 1
    } 
    return n * factorial(n - 1);
}
```

如果我们修改函数名为`myFactorial`，那么函数内部的`factorial`变量就无法找到对应的函数了。为了提高代码的可维护性，使得外部函数名修改后内部可以保持不变，我们使用`callee`：
```js
var factorial = function(n) {
    if (n <= 1) {
        return 1
    } 
    return n * arguments.callee(n - 1);
}
```

`this`也是一个特殊的对象，他是一个指针，指向当前函数的执行环境对象（在全局下`this`指向`window`），例如：
```js
var color = "red";
var o = {
    color: "blue";
};

function sayColor() {
    console.log(this.color);
}

sayColor(); // "red"
o.sayColor = sayColor;
o.sayColor(); // "blue"
```
最开始，sayColor函数定义在全局作用域中，`this`指向`window`对象；当把这个函数赋值o后，`this`就指向了`o`。




### 函数属性与方法
#### 函数属性
所有函数都有两个属性：`length`和`prototype`，其中`length`返回函数希望接受的参数的个数，`prototype`则是帮助函数实现继承必不可少的属性。

#### 函数方法
所有函数都有非继承来的三个方法：`call`、`apply`和`bind`，他们的作用都是改变函数执行环境，即`this`的值，但是用法略有不同。

`apply`和`call`方法类似，均是在特定的作用域内调用函数。其中，`apply`接受两个参数，分别是函数体的`this`和参数数组，参数数组可以是Array类型，也可以是arguments对象。例如：
```js
function sum(num1, num2) {
    console.log(num1 + num2);
}

sum.apply(this, [10, 10]); // 20

function callSum(num1, num2) {
    return sum.apply(this, arguments);
}

callSum(10, 10); // 20
```

`call`和`apply`作用相同，只是用法略有不同。`call`不接受数组参数，其余参数直接传递给函数，逐一列举。例如：
```js
function sum(num1, num2) {
    console.log(num1 + num2);
}

sum.call(this, 10, 10); // 20
```

`call`和`apply`最重要的功能是改变函数运行的作用域，例如：
```js
var color = "red";
var o = {
    color: "blue";
}

function sayColor() {
    console.log(this.color);
}

sayColor(); // "red";
sayColor.call(this); // "red";
sayColor.call(window); // "red"
sayColor.call(o) // "blue"
```
- 首先，不使用`call`方法，`this`指向全局作用域，因此返回"red"；
- 其次，使用`call`方法传入`this`和`window`，他们都等于全局作用域，依然返回"red"；
- 最后，使用`call`方法将函数的作用域修改为对象`o`，直接在`o`中找到了变量`color`，因此返回了"blue"。

区别于`apply`和`call`，`bind`方法不调用函数，而是返回一个更新作用域后的新的函数。`bind`方法的参数传入的方式和`call`一致，均是用序列的方式传入。

```js
window.color = "red";
var o = {
    color: "blue"
};
function sayColor() {
    console.log(this.color);
}
var sayObjectColor = sayColor.bind(o);
sayObjectColor(); // "blue"
```

## 基本包装类型
为了方便操作基本类型值，ES还提供了三个特殊的引用类型`Number、String、Boolean`，这些类型和其他引用类型一样，都有各自的属性和方法。当我们读取一个基本类型值时，后台会自动创建一个对应的基本包装类型的对象，从而让我们能调用一些属性和方法。
例如：
```js
var str = "some text";
var s2 = str.substring(2);
```
在执行上述代码时，后台做了下面的操作：
- 创建`String`类型的一个实例
- 按照语句调用方法
- 销毁这个实例

我们可以理解为后台做了这样的操作：
```js
var s1 = new String("some text");
var s2 = s1.substring(2);
s1 = null;
```

需要注意的是，使用`new`关键字创造的包装类型，在`typeof`的判断上和基本类型是不一样的：
```js
var num1 = 2;
var num2 = new Number(2);
typeof num1; // "number"
typeof num2; // "object"
```

### Boolean
`Boolean`类型是布尔值对应的包装类型。要创建`Boolean`对象，可以调用构造函数传入布尔值：
```js
var boolObject = new Boolean(false);
```

在逻辑运算时，`Boolean`会被当作对象看待，因此始终返回true，例如：
```js
var res = boolObject && true; // true
```
上述结果并不是`false`，尽管`Boolean`包装类型的值确实为`false`。实际上，这里将变量`boolObject`当作对象看待，任何对象在逻辑运算中都会被视为`true`，因此返回`true && true`，结果为`true`。

官方建议不要使用`Boolean`类型，它经常会造成人们的误解。

### Number
`Number`类型是数字值对应的引用类型，关于`Number`类型主要需要掌握他的几个方法：

`toString()`：将`Number`类型转换为字符串，遵循一定的规则（见JS数据类型篇）。

`toFixed()`：按照传入参数，返回指定**小数位**的字符串。例如：
```js
var num = 10;
console.log(num.toFixed(2)); // "10.00"
```

`toPrecision()`：返回指定位**有效数字**的字符串表示。例如：
```js
var num = 99;
console.log(num.toPrecision(1)); // "1e+2"
console.log(num.toPrecision(2)); // "99"
console.log(num.toPrecision(3)); // "99.0"
```

`toExponential()`：返回一个数字的科学记数法表示，接受一个参数表示小数位数。例如：
```js
var num = 10;
console.log(num.toExponential(1)); // "1.0e+1"
```

### String
`String`类型是字符串值对应的引用类型，常用属性有`length`，用来返回字符串的长度。String类型具有丰富的方法，可以分为字符方法、字符串操作方法、字符串位置方法和大小写转换方法。

#### 字符方法
`charAt()`，接受一个索引，返回字符串该索引的字符。

`charCodeAt()`，接受一个索引，返回字符串该索引的字符的Unicode值。

#### 字符串操作方法
和`Array`一样，`String`也有字符串合并、切片方法。

`concat()`，接受任意多个参数，将他们拼接起来。实际情况中还是使用`+`进行字符串拼接。

`slice()`，起始位置和终止位置均接受负索引，使用方法和数组一致。

`substring()`，起始位置和终止位置均不接受负索引，其余行为和`slice()`一致。

`substr()`，起始位置接受负索引，但是第二个参数不再是终止位置，而是要截取的字符串的长度，并且不接受负长度。

#### 字符串位置方法
`indexOf()`和`lastIndexOf()`均和数组一致，不再赘述。

`String`还提供了`trim()`方法，去除所有空格。

#### 大小写转换方法
`toLowerCase()`将字符串每一个字符转成小写，`toUpperCase()`将字符串每一个字符转成大写。










