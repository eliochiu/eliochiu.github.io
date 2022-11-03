---
layout: "post"
title: "「前端开发」- JS-OOP-02"
subtitle: "JavaScript —— 继承"
author: "eliochiu"
date: 2022-11-03

tags: ["前端开发@Tags", "JavaScript@Languages"]
lang: zh
catalog: true
header-image: ""
header-style: text
katex: true
---
继承是OOP中的重要概念，本篇主要介绍继承的几种方式。

## 原型链继承
在原型模式中，我们提出原型链的概念。原型链是继承的主要方法，他的基本思想是利用原型，让一个引用类型继承另一个引用类型的方法和属性。

构造函数、原型对象和实例对象的关系：
- 构造函数都有一个指针，该指针指向他的原型对象。
- 原型对象也有一个指针，指向构造函数。
- 实例对象有一个内部指针，指向他的原型对象。

### 原型与继承
如果**让一个原型对象等于另一个类型的实例**，则此时的原型对象包含了一个指针指向另一个原型，同时另一个原型对象里也包含另一个构造函数。如果另一个实例的原型仍然是某一对象，如此层层递进，就形成了原型链。继承有如下的模式：
```js
function superType() {
  this.property = true;
}

superType.prototype.getSuperValue = fuction() {
  return this.property;
}

function subType() {
  this.subproperty = false;
}

subType.prototype = new superType();
subType.prototype.getSubValue = function () {
  return this.subproperty;
}

var instance = new subType();
console.log(instance.getSuperType()); // true
```

上述代码定义了两个类型：`superType, subType`，前者为父类型，后者为子类型，后者继承前者。关键性的语句是：`subType.prototype = new superType();`，我们梳理他们的关系可以得出：
- 构造函数`superType()`中有一个指针`prototype`指向了原型对象`superType.prototype`；
- `subType`的原型是`superType`的一个实例，因此构造函数`subType()`的`prototype`指向了`superType`的一个实例；
- 该实例的`[[prototype]]`指向`superType.prototype`；
- `subType`的一个实例的`[[prototype]]`指向了`superType`的实例。

上述关系可以用下图描述：
<img src='/img/in-post/prototype4.png#pic_center'>
实现了`instance -> subType.prototype -> superType.prototype`的原型链，`instance`可以使用`superType`的方法。

### 默认原型
所有构造函数都有一个默认原型，那就是`Object`原生对象类型，默认原型都会包含一个内部指针，指向`Object.prototype`，`Object.prototype`集合了`constructor, hasOwnProperty, isPropertyOf, valueOf, toString`等属性和方法，这也是为什么自定义对象能够调用`toString`方法的原因。
<img src='/img/in-post/prototype5.png#pic_center'>

> 通过原型链继承的时候，不能使用对象字面量，这样会切断继承之间的联系。

## 经典继承
原型链可以实现继承，但仍有一个问题，就是在子对象中对引用类型的父属性修改会父属性发生变化，从而影响父属性的所有实例。为了解决这一问题，我们使用由构造函数组成的经典继承方式。这种方式很简单，就是在子类型的构造函数中调用超类型的构造函数，使用call或者apply来改变作用域，从而解决引用传递问题。例如：
```js
function SuperType() {
  this.colors = ["red", "blue", "green"];
}

function SubType() {
  // 继承supertype
  SuperType.call(this)
}

var instance1 = new SubType();
instance1.colors.push("yellow");
console.log(instance1.color); // ["red", "blue", "green", "yellow"]

var instance2 = new SubType();
console.log(instance1.color); // ["red", "blue", "green"]
```

通过使用`call()`方法(或`apply()`方法也可以)，我们实际上是在(未来将要)新创建的`SubType`实例的环境下调用了 `SuperType`构造函数。这样一来，就会在新`SubType`对象上执行`SuperType()`函数中定义的所有对象初始化代码。结果，`SubType`的每个实例就都会具有自己的`colors`属性的副本了。

### 传递参数
使用`call`的一个优点是，可以在子构造函数中向父构造函数传递参数。例如：
```js
function SuperType(name) {
  this.name = name;
}

function SubType() {
  // 继承supertype
  SuperType.call(this, "Nicholas");

  // 实例对象属性
  this.age = 21;
}

var instance = new SubType();
console.log(instance.name);  // Nicholas
console.log(instance.age); // 21
```

### 经典继承缺点
经典继承方法虽然能实现子类型对父类型的继承，但难免要出现函数无法复用的情况，并且在父类型原型中的属性，对子类型也是不可见的。因此实际开发中，很少使用纯粹的经典继承方法。

## 组合继承
组合继承（也叫伪经典继承），使用原型链和构造函数实现继承。例如：
```js
function SuperType(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}

SuperType.prototype.sayName = function () {
  console.log(this.name);
}

function SubType() {
  // 继承supertype
  SuperType.call(this, "Nicholas");

  // 实例对象属性
  this.age = 21;
}

// 继承方法
SubType.prototype = new SuperType();
// SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function () {
  console.log(this.age);
}

var instance1 = new SubType();
console.log(instance1.name);  // Nicholas
console.log(instance1.age); // 21
instance1.sayName(); // Nicholas
instance1.sayAge(); // 21
instance1.colors.push("yellow");
console.log(instance1.colors); // [ 'red', 'blue', 'green', 'yellow' ]

var instance2 = new SubType();
console.log(instance2.colors); // [ 'red', 'blue', 'green']
```

## 原型继承
道格拉斯·克罗克福德在 2006 年写了一篇文章，介绍了一种原型继承的方法，这种方法没有严格的构造函数，使用原型借助已有的对象创建新对象。为了达到这个目的，他给出了如下的函数：
```js
function object(o) {
  function F(){};
  F.prototype = o;
  return new F();
}
```

在`object`函数的内部，建立了一个临时性的构造函数`F`，并将传入的对象作为构造函数的原型，最后返回临时构造函数的实例。本质上讲，object对传入的对象进行了一次浅拷贝。例如：
```js
var person = {
  name: "Nicholas",
  friends: ["Shelby", "Court", "Van"]
};
var anotherPerson = object(person);
anotherPerson.name = "Greg";
anotherPerson.friends.push("Rob");

var yetAnotherPerson = object(person);
yetAnotherPerson.name = "Linda";
yetAnotherPerson.friends.push("Barbie");

alert(person.friends);   //"Shelby,Court,Van,Rob,Barbie"
```
ES5通过新增`Object.create()`方法来实现上述需求，一个用作新对象原型的对象和(可选的)一个为新对象定义额外属性的对象。当只传入一个参数时，他的行为和`object`函数相同。

## 寄生式继承
寄生式继承可以看成在原型式继承的基础上，增强了一些信息。例如：
```js
function anotherObject(original) {
  var clone = Object.create(original);
  clone.sayHi = function() {
    console.log("Hi");
  }
  return clone;
}
```
`createAnother`接受一个对象，也就是要创建的新对象的基础；然后把这个对象传递给`create`函数，结果赋值给`clone`，`clone`添加一个新方法，最后返回这个新的对象。
```js
var person = {
  name: "Nicholas",
  friends: ["Shelby", "Court", "Van"]
};

var anotherPerson = AnotherObject(person);
anotherPerson.sayHi(); // Hi
```

`anotherPerson`不仅继承了`Person`的属性和方法，还拥有了自己的方法。

## 寄生组合式继承




