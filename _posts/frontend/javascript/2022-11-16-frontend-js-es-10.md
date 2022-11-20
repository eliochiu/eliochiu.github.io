---
layout: "post"
title: "「前端开发」- JS-ES6-10"
subtitle: "ECMAScript6 —— Class"
author: "eliochiu"
date: 2022-11-16

tags: ["前端开发@Tags", "JavaScript@Languages", "ES6@Tags"]
lang: zh
catalog: true
header-image: ""
header-style: text
katex: true
---

## 简介
JavaScript语言传统方法书通过构造函数生成新对象：
```js
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function() {
  return '(' + this.x + ',' + this.y + ')';
}

var p = new Point(1, 2)
```

上面这种写法和传统面向对象语言C++/Java写法差异很大，因此ES6提供了接近传统语言的写法，引入了`Class`作为对象的模版，通过`class`关键字可以定义类。基本上，ES6 中的`class`可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做到，新的`class`写法只是让对象原型的写法更加清晰，更像面向对象编程的语法而己。
```js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ',' + this.y + ')';
  }
}
```

## 类与原型
ES6的类完全可以看成构造函数的另一种写法。
```js
class Point {
  // ...
}

typeof Point // "function"
Point === Point.prototype.constructor; // true
```

使用的时候也是直接使用`new`关键字创建实例。构造函数的`prototype`属性在ES6的“类”上继续存在。事实上，类的所有方法都定义在类的prototype属性上。
```js
class Point {
  constructor() {
    //...
  }

  toString() {
    // ...
  }

  toValue() {
    //...
  }
}

// 等价于
Point.prototype = {
  constructor() {},
  toString() {},
  toValue() {}
}
```
在类的实例上调用方法，实际上调用的就是原型上的方法。
```js
const p = new Point(1, 2);
console.log(p.toString === Point.prototype.toString); // true
```

类上定义的所有方法都是不可枚举的（non-enumberable），也就是说他们不能被`Object.keys`访问到。
```js
Object.keys(Ponit.prototype); // []
```

## Class表达式
与函数一样，`Class`也可以使用表达式的形式定义。
```js
const myClass = class Me {
  // ...
}
```
> 注意，这个类的名字是myClass，而不是Me

也可以写成匿名的类：
```js
const myClass = class {
  // ...
}
```

类表达式可以创建立刻执行的类：
```js
let person = new class {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    console.log(this.name);
  }
}('张三');

person.sayName(); // 张三
```

## 不存在变量提升
类不存在变量提升。
```js
new Foo();
class Foo {}; // ReferenceError
```

## 私有方法
私有方法是常见需求，但ES6不支持，只能通过变通方法模拟来实现：
### 命名区分
```js
class Widget {
  // 共有方法
  foo(baz) {
    this._bar(baz);
  }

  // 私有方法
  _bar(baz) {
    return this.snaf = baz;
  }

  // ...
}
```
划线部分表示这是一个仅仅用在内部的私有方法，但是这种命名并不保险，在类的外部仍然可以调用。

### 移出类
另一种方法是将私有方法移出模块，因为模块内部的所有方法都是对外可见的。
```js
class Widget {
  foo(baz) {
    bar.call(this, baz)
  }
}

function bar(baz) {
  return this.snaf = baz;
}
```

### Symbol
还有一种方法，将私有方法命名为一个Symbol值。由于其唯一性，第三方无法获取到他们，达到了私有属性和私有方法的目的：
```js
const bar = Symbol("bar");
const snaf = Symbol("snaf");

class myClass {
  // 共有方法
  foo(baz) {
    this[bar](baz);
  }

  [bar](baz) {
    return this[snaf] = baz;
  }
}
```


## getter&setter
和ES5一样，在类的内部可以使用`get`和`set`关键字对某个属性设置取值函数和存取函数，拦截属性的存取行为。他们定义在属性的`Descriptor`上。
```js
class myClass {
  constructor() {
    // ...
  }
  get prop() {
    return "getter"
  }

  set prop(value) {
    console.log('setter' + value);
  }
}

let inst = new MyClass();
inst.prop = 123;
// setter: 123

inst.prop;
// getter


## 静态
### 静态方法
### 静态属性






