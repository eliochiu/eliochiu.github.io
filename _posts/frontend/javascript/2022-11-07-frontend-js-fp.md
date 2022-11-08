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

### 闭包与作用域链
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
var result = compare(5, 10);
```
上述代码定义了`compare`函数，然后在全局作用域中调用了该函数。当调用`compare`时，先创建一个包含了`arguments, value1, value2`的活动对象。全局作用域中的`compare`和`result`则处在第二位。作用域链如下图所示：
<img src='/img/in-post/scope1.png#pic_center'>

后台的每个执行环境都有一个表示变量的对象——变量对象。全局环境的变量对象始终存在，而像`compare()`函数这样的局部环境的变量对象，则只在函数执行的过程中存在。

在创建 compare()函数 时，会创建一个预先包含全局变量对象的作用域链，这个作用域链被保存在内部的`[[Scope]]`属性中。 当调用`compare()`函数时，会为函数创建一个执行环境，然后通过复制函数的`[[Scope]]`属性中的对象构建起执行环境的作用域链。

此后，又有一个活动对象（在此作为变量对象使用）被创建并被推入执行环境作用域链的前端。对于这个例子中`compare()`函数的执行环境而言，其作用域链中包含两个变量对象：**本地活动对象和全局变量对象**。**显然，作用域链本质上是一个指向变量对象的指针列表，它只引用但不实际包含变量对象。**

无论什么时候在函数中使用一个变量时，就会从作用域链中搜索相应名字的变量。一般来说，函数执行完毕，局部活动对象就会被销毁，内存中仅仅保存全局作用域。但是，闭包的情况又有所不同。

在一个函数内部定义函数会将包含函数（外部函数）的活动对象添加到它的作用域链中。最重要的是，外层函数的活动对象在外层函数执行完毕后，也不会被销毁，因为返回的匿名函数的作用域链仍然在引用这个活动对象，直至匿名函数被销毁，外层函数的活动对象才会被销毁。

<img src='/img/in-post/scope2.png#pic_center'>

### 闭包与变量
作用域链的机制也会引起一些问题，比如闭包只能取得外层函数的变量的最后一个值，因为闭包保存的是整个变量对象。例如：
```js
function createFunctions() {
  var result = new Array();

  for (var i = 0; i < 10; i++) {
    result[i] = function() {
      return i;
    };
  }
  return result;
}
```
上述代码看似定义了一个函数数组，每一个函数返回自身在数组中的索引值。实际上，每个函数都返回10，因为每个函数的作用域中都保存着`createFunctions()`的活动对象，他们引用的是同一个变量`i`，当函数运行结束后，`i`的值为10，所以每个函数内部的`i`也都是10，但我们可以通过创建另一个匿名函数强制让闭包符合预期：
```js
function createFunctions() {
  var result = new Array();

  for (var i = 0; i < 10; i++) {
    result[i] = function(num) {
      return function() {
        return num;
      };
    }(i);
  }
  return result;
}
```
重写了函数后，数组内的所有函数都具有自己的索引值了。在这个版本里，我们没有把闭包直接赋值给数组，而是定义了一个匿名函数，并立刻执行该匿名函数的结果并赋值给数组。在匿名函数的内部，创建了一个访问`num`的闭包，这样一来所有函数都有`num`的一个副本。

### 闭包与`this`
闭包中使用`this`也可能会导致一些问题。我们知道，`this`是与函数的执行环境绑定的：在全局函数中，`this`等于`window`，当函数被某个对象作为方法调用时，`this`指向该对象。匿名函数的执行环境具有全局性，因此`this`通常指向`window`。例如：
```js
var name = "The window";

var object = {
  name: "My Object",

  getNameFunc: function() {
    return function() {
      return this.name;
    };
  }
};

console.log(object.getNameFunc()()); // "The window"
```
上述代码显示先是创建一个全局变量`name`，又创建了一个包含`name`属性的对象，还包含了一个方法`getNameFunc()`，返回一个匿名函数，匿名函数返回`this.name`。调用`object.getNameFunc()`会立刻返回一个函数，因此调用`object.getNameFunc()()`就会立刻返回一个字符串。

每个函数在被调用时都会获得两个特殊变量`this, arguments`，内部函数在搜索这两个变量的时候，只会搜索到活动对象为止，因此永远不可能直接访问到外部函数的变量。但是，如果把外部函数作用域中的`this`对象保存在一个闭包能够访问到的变量中，就可以实现闭包访问对象了，例如：
```js
var name = "The window";

var object = {
  name: "My Object",

  getNameFunc: function() {
    var that = this;
    return function() {
      return that.name;
    };
  }
};

console.log(object.getNameFunc()()); // "The window"
```

## 块级作用域
ES5没有块级作用域。定义一个计数器函数：
```js
function outputNumbers(count) {
  for (var i = 0; i < count; i++) {
    console.log(i);
  }
  console.log(i);
}

outputNumbers(5);
```
这个函数内部有一个`for`循环，变量`i`的初始值是0。在Java, C++等语言中，变量`i`只在`for`循环语句中有意义，循环一旦结束变量就会被销毁。而在ES5中，变量`i`保存在函数的活动对象中，从他有定义开始，就可以在函数内部自由的访问它。即使重新声明一个变量也不会改变它的值：
```js
function outputNumbers(count) {
  for (var i = 0; i < count; i++) {
    console.log(i);
  }
  var i;
  console.log(i);
}

outputNumbers(5);
```

可以使用匿名函数来模仿块级作用域来避免这个问题。

```js
(function() {
  // 块级作用域
})();
```
以上代码定义并立刻调用了一个匿名函数。将函数声明包括在一对圆括号中，实际上是一个函数表达式。等价于下面的语句：
```js
var someFunc = function() {
  // 块级作用域
};

someFunc();
```
无论在什么地方，只要需要一些临时变量，就可以使用私有作用域。例如：
```js
function outputNumbers(count) {
  (function() {
    for (var i = 0; i < count; i++) {
    console.log(i);
    }
  })();

  console.log(i); // 报错，不存在i这个变量
}

outputNumbers(5);
```

这种技术经常在全局作用域中被用在函数外部，从而限制向全局作用域中添加过多的变量和函数。 一般来说，我们都应该尽量少向全局作用域中添加变量和函数。在一个由很多开发人员共同参与的大型应用程序中，过多的全局变量和函数很容易导致命名冲突。而通过创建私有作用域，每个开发人员既可以使用自己的变量，又不必担心搞乱全局作用域。例如：
```js
(function() {
  var now = new Date();
  if (now.getMonth() === 0 && now.getDate() === 1) {
    alert("Happy new year!");
  }
})();
```
把上面这段代码放在全局作用域中，可以用来确定哪一天是1月1日；如果到了这一天，就会向用户显示一条祝贺新年的消息。其中的变量`now`现在是匿名函数中的局部变量，而我们不必在全局作用域中创建它。

## 私有变量
ES没有私有成员的概念，所有对象属性都是共有的。但函数内部的变量可以当作私有变量，因为你不能在函数外部访问他们。私有变量包括函数的参数、局部变量和内部定义的其他函数。例如：
```js
function add(num1, num2) {
  var sum = num1 + num2;
  return sum;
}
```
其中有三个私有变量：`num1`，`num2`和`sum`。在函数内部可以访问这些变量，但在函数外部不能访问他们。如果在这个函数内部创建一个闭包，那么闭包也可以通过自己的作用域链访问这些变量，利用这一点，我们就可以创建用于访问私有变量的公有方法。

### 特权方法
我们将有权访问私有变量和私有函数的公有方法称为特权方法。
```js
function myObject() {
  // 私有属性
  var privateVariable = 10;

  // 私有方法
  function privateFunction() {
    return false;
  }

  // 特权方法
  this.publicMethod = function() {
    privateVariable++;
    return privateFunction();
  }
}
```
也可以在私有作用域中创建：
```js
(function() {
  // 私有属性
  var privateVariable = 10;

  // 私有方法
  function privateFunction() {
    return false;
  }

  myObject = function() {    
  };

  // 特权方法
  myObject.prototype.publicMethod = function() {
    privateVariable++;
    return privateFunction();
  }
})();
```

