---
layout: "post"
title: "「前端开发」- JS-OOP-01"
subtitle: "JavaScript —— 对象基础"
author: "eliochiu"
date: 2022-11-03

tags: ["前端开发@Tags", "JavaScript@Languages"]
lang: zh
catalog: true
header-image: ""
header-style: text
katex: true
---

## 属性类型
ES5规定了一部分内部才有的特性，描述了属性的各种特征。这些特征是内部值，为了JavaScript引擎准备的，我们无法在JavaScript中直接访问他们。为了表示是内部值，这些值用两对方括号围起。ES中有两种属性：数据属性和访问器属性。

### 数据属性
数据属性包含一个数据值的位置，在这个位置可以读写值。数据属性有四个特征：
- `[[Configurable]]`：表示能够通过`delete`删除从而重新定义属性，能否修改属性的特性以及能否把属性修改为访问器属性。默认值为`true`。
- `[[Enumerable]]`：表示能够通过`for-in`语句循环返回属性。默认值为`true`。
- `[[Writable]]`：标识是否可以修改属性的值。默认为`true`。
- `[[Value]]`：包含这个属性的数据值

可以使用`defineProperty()`方法来定义一个对象的属性，该方法接受三个参数，分别为要添加属性的对象、属性名以及属性的特征，例如：
```js
var person = {};
Object.defineProperty(person, "name", {
    value: "Nicholas",
    writable: false
});

console.log(person.name); // Nicholas
person.name = "Alice";
console.log(person.name); // Nicholas
```

### 访问器属性
访问器属性不包含数据值，它包含一对`getter`和`setter`函数，在读取访问器属性时，会调用`getter`函数，这个函数负责返回该访问器属性的值；在写入访问器属性时，会调用`setter`函数并传入新值，这个函数负责如何处理数据。访问器属性也有四个特征：
- `[[Configurable]]`：表示能够通过`delete`删除从而重新定义属性，能否修改属性的特性以及能否把属性修改为访问器属性。默认值为`true`。
- `[[Enumerable]]`：表示能够通过`for-in`语句循环返回属性。默认值为`true`。
- `[[Get]]`：读取属性时调用的函数。默认为`undefined`。
- `[[Set]]`：写入属性时调用的函数。默认为`undefined`。

访问器属性也需要使用`defineProperty()`来进行定义。例如：
```js
var book = {
    _year: 2004,
    edition: 1
};

Object.defineProperty(book, "year", {
    get: function () {
        return this._year;
    },
    set: function (newVal) {
        if (newVal > 2004) {
            this._year = newVal;
            this.edition += newVal - 2004;
        }
    }
});

book.year = 2005;
alert(book.edition); // 2
```

上述代码创建了一个`book`对象，并给了他两个默认的属性`_year`和`edition`，`_year`前的下划线是一种常用的记号，表示只能通过对象方法访问的属性。访问器属性`year`则包含了一个`getter`和一个`setter`。

可以使用`defineProperties()`定义多个属性，接受两个参数，分别是要定义属性的对象和要定义的属性特征对象。例如：
```js
var book = {};
Object.defineProperties(book, {
    _year: {
        value: 2004
    },
    edition: {
        value: 1
    },
    year: {
        get: function() {
            return this._year;
        },

        set: function(newVal) {
            if (newVal > 2004) {
                this._year = newVal;
                this.edition += newVal - 2004;
            }
        } 
    }
});
```
最终，代码的效果和上一个代码是一样的。

### 读取属性的特征
ES使用`Object.getOwnPropertyDescriptor()`方法来返回一个特征对象。该方法接受两个参数，属性所在的对象和想要访问的属性。可以访问的特征有`enumerable, configurable, get, set, value, writable`。
```js
var ds = Object.getOwnPropertyDescriptor(book, "_year");
alert(ds.value); // 2004
alert(ds.configurable); // false
```

## 创建对象
虽然可以使用字面量或者`Object`构造函数创建对象，但这些方式缺点明显：使用同一个接口创建很多对象，会产生大量重复的代码。

### 工厂模式
工厂模式是一种常见的设计模式，这种模式抽象的对象的创建过程，封装特定接口创建对象的细节。
```js
function createPerson(name, age, job) {
    var o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function () {
        alert(this.name);
    };
    return o;
}

var p1 = createPerson("Nicholas", 29, "SDE");
var p2 = createPerson("Greg", 27, "Doctor");
```

函数`createObject`能根据接受的参数信息来创建一个包含所有信息的对象。工厂模式虽然能解决创建相似对象的问题，但是没有解决对象识别的问题，无法知道对象的类型。

### 构造函数模式
ES的构造函数用于创建特定类型的对象，如`Object`和`Array`这样的原生构造函数，在运行时会出现在执行环境中。此外，我们还可以创建自定义的构造函数，例如：
```js
function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function () {
        alert(this.name);
    };
}

var p1 = new Person("Nicholas", 29, "SDE");
var p2 = new Person("Greg", 27, "Doctor");
```
上述代码和工厂模式有部分相同，但仍有一些区别：
- 没有`return`语句
- 没有显示地创建对象
- 使用`this`对属性和方法进行赋值

> 注意：构造函数一般使用大写开头，用于区分其他函数

要使用构造函数模式创建对象，必须使用`new`操作符，在使用`new`操作符创建对象时，会经历下面四个步骤：
1. 创建一个新对象；
2. 将构造函数的作用域赋给新对象（`this`就指向了这个对象）；
3. 执行构造函数中的代码；
4. 返回一个新对象。

上一个例子中，两个实例`p1, p2`分别保存着`Person`的不同实例。两个对象都有一个`constructor`属性，指向了他们的构造函数`Person`，也就是`p1.constructor === Person`，如果使用`instanceof`操作符，会发现下列情况：
```js
p1 instanceof Object // true
p1 instanceof Person // true
```
自定义的函数可以标记对象的类型。在这个例子里，`p1`是`Object`的实例，是因为他们继承自`Object`。

> 注意，使用构造函数模式创建对象时，必须使用`new`关键字，否则将按照普通函数执行，全局作用域里的函数的`this`指向的是window对象。

### 原型模式
构造函数虽然解决了对象类型判定的问题，但也引入了一个新问题：每个对象会有许多冗余的属性和方法，例如`p1, p2的方法虽然功能一样，但却是不同的函数实例，降低了代码的复用性。为此，ES引入了原型模式，使用原型链创建对象。

我们创建的每一个函数都有个`prototype`属性，这个属性是一个指针，他指向一个对象，这个对象的用途是保存了许多实例共享的属性与方法，`prototype`就是实例对象的原型对象。原型模式最大的优点是，他可以降低变量的冗余性，将所有实例共享的属性和方法放在原型对象中。
```js
function Person() {

}
Person.prototype.name = "Nicholas";
Person.prototype.sayName = function() {
  console.log(this.name);
}
var p1 = new Person();
p1.sayName(); // Nicholas
var p2 = new Person();
p2.sayName(); // Nicholas
console.log(p1.sayName === p2.sayName); // true
```

而使用构造函数模式，所有方法都保存在不同的作用域中，属于不同的对象。
```js
function Person (name) {
  this.name = name;
  this.sayName = function() {
    console.log(this.name);
  };
}
var p1 = new Person("Nicholas");
var p2 = new Person("Nicholas");
console.log(p1.sayName === p2.sayName); // false
```

#### 原型对象
任何情况下，只要创建了一个函数，他就会自动获得一个`prototype`属性，这个属性指向他的原型对象；而所有原型对象都会自动获得一个`constuctor`属性，用于指向`prototype1`所在的函数（构造函数），拿前面的例子说，`Person.prototype.constructor = Person`。

创建了自定义的构造函数后，原型对象默认只会获得`constructor`属性，其他属性和方法全部继承自`Object`，

<img src='/img/in-post/prototype.png#pic_center'>

每一个实例都有一个内部的属性`[[prototype]]`指向它的构造函数的原型对象（用户不可见的），使用`isPrototypeOf()`方法可以确认某一个对象是否是某一个实例构造函数的原型对象，如果`[[prototype]]`指向调用`isPrototypeOf()`方法的对象，则返回true：
```js
Person.prototype.isPrototypeOf(p1); // true
```
ES5还新增了`Object.getPrototype()`方法来获取某一实例对象的原型对象。例如：
```js
Object.getPrototype(p1) === Person.prototype; // true
```

#### 原型链
当解析器读到一次属性访问时，就会执行一次搜索操作，目标是给定名字的属性：
- 首先在对象实例内搜索，如果找到了目标属性，则返回目标属性的值；
- 否则，继续搜索`prototype`指针指向的原型对象;
- 在原型对象中寻找目标属性，若找到则返回值；否则重复上述过程。

上述过程就构成了一条原型链，原型链与作用域链类似，都是就近寻找，从内往外寻找。

#### 无法重写
虽然可以通过对象实例访问保存在原型中的值，但却不能通过对象实例重写原型中的值。如果我们在实例中添加了一个属性，该属性与原型对象中同名，那么会在实例对象中修改该属性的值，但不会影响原型属性的值。也就是说，对象实例的属性只会覆盖原型对象属性，而不会修改原型对象属性，这与我们所期待的是一致的。例如：
```js
function Person() {

}
Person.prototype.name = "Nicholas";
Person.prototype.sayName = function() {
  console.log(this.name);
}
var p1 = new Person();
p1.name = "Alice"
var p2 = new Person();
p1.sayName(); // Alice
p2.sayName(); // Nicholas
```
#### 属性检查
可以使用`hasOwnProperty()`方法检查某个对象的某一属性是存在于原型中还是实例中。例如：
```js
function Person() {

}
Person.prototype.name = "Nicholas";
Person.prototype.sayName = function() {
  console.log(this.name);
}

var p1 = new Person();
var p2 = new Person();

console.log(p1.hasOwnProperty("name")); // false，因为继承自Person.prototype

p1.name = "Greg";
console.log(p1.name); // Greg
console.log(p1.hasOwnProperty("name")); // true，因为来自实例对象

delete p1.name;
console.log(p1.name); // Nicholas
console.log(p1.hasOwnProperty("name")); // false
```
<img src='/img/in-post/prototype2.png#pic_center'>

`in`操作符也可以检查属性是否属于某一对象，且不区分**实例与原型**。例如：
```js
function Person() {

}
Person.prototype.name = "Nicholas";
Person.prototype.sayName = function() {
  console.log(this.name);
}

var p1 = new Person();
console.log("name" in p1); // true

p1.age = 18;
console.log("name" in p1); // true
```

同时使用`hasOwnProperty()`和`in`，可以判断属性是在实例中还是在原型中。下面是一个封装函数：
```js
function hasPrototypeProperty(object, property) {
    return !object.hasOwnProperty(property) && (property in Object); 
}
```

#### 属性与值的获取
要想获得对象上所有可枚举的实例属性集合，可以使用`Object.keys()`方法，他将返回一个包含所有可枚举属性的数组.实际上，`keys()`方法可以用`for-in`语句替代，他将迭代所有可枚举的属性。

若想获得对象上所有实例属性的集合，则可以使用`Object.getOwnPropertyNames()`。
```js
var o = {};
Object.defineProperties(o, {
  name: {
    value: "Elio",
    enumerable: true
  }, 
  age: {
    value: 21,
    enumerable: false
  },
  gender: {
    value: "male",
    enumerable: true
  }
});

console.log(Object.keys(o)); // ["name", "gender"]
console.log(Object.getOwnPropertyNames(o)); // ["name", "age", "gender"]
```
#### 更简洁的原型对象
既然构造函数的`prototype`属性指向了一个原型对象，那么可以将一个对象直接赋值给`prototype`属性，这是一种简洁的做法，我们不必使用多个语句去定义对象原型的属性。例如：
```js
function Person() {

}

Person.prototype = {
    name: "Nicholas",
    age: 18,
    sayname: function() {
        console.log(this.name);
    }
}
```
但要特别注意的是，将对象赋值给`prototype`后，`Person.prototye.constuctor`不再指向`Person`了。一般来说，使用这种方式赋值，需要指定`constructor`：
```js
function Person() {

}

Person.prototype = {
    constructor: Person,
    name: "Nicholas",
    age: 18,
    sayname: function() {
        console.log(this.name);
    }
}
```
> 这会导致`constructor`属性变为可枚举属性，而原生的`constructor`不可枚举

#### 原型的动态性
对原型属性的任意修改，都能反映到实例对象上，即使实例对象的创建先于原型属性修改。例如：
```js
function Person() {};

var p1 = new Person();
Person.prototype.sayHi = function() {
  console.log("Hi!");
}

p1.sayHi(); // Hi!
```
原型方法能运行成功的原因是，解析器遇到`sayHi`时，会在原型链中寻找属性的位置，而调用以前原型链已经改变，因此可以在原型中找到该方法，从而成功执行。

尽管可以随时为原型添加属性和方法，并且改变能在原型的所有实例中表现出来。但如果重写整个原型对象，情况会变得不一样。调用构造函数会为实例对象创建一个`[[prototype]]`属性指向原型对象，如果修改`prototype`使其指向了一个全新的对象，也就切断了实例与原型之间的联系。例如：
```js
function Person() {};
var p1 = new Person();

Person.prototype = {
  sayHi: function () {
    console.log("Hi!");
  }
}
p1.sayHi(); //error
```
上述代码出错的原因是，p1的`[[prototype]]`仍然指向原来的原型，而原来的原型中并没有`sayHi`这个方法。
<img src='/img/in-post/prototype3.png#pic_center'>

#### 原型模式的缺点
尽管原型模式能够提高属性与方法的共享性，但原型方法也有一个比较大的缺点，就是当共享的属性是引用类型时，对一个实例的修改会导致整个原型对象的变化。例如：
```js
function Person() {
}

Person.prototype = {
  constructor: Person,
  name: "Nicholas",
  age: 29,
  job: "Software Engineer",
  friends: ["Shelby", "Court"],
  sayName: function () {
    alert(this.name);
  }
};

var person1 = new Person();
var person2 = new Person();

person1.friends.push("Van");

alert(person1.friends);    //"Shelby,Court,Van"
alert(person2.friends);    //"Shelby,Court,Van"
alert(person1.friends === person2.friends);  //true
```

### 组合使用构造函数模式和原型模式
创建自定义类型的最常见方式，就是组合使用构造函数模式与原型模式。其中，构造函数用于自定义属性与方法，而原型模式则用于保存共享的属性和方法，这种方式集合了原型模式和构造函数模式的长处。
```js
function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
}

Person.prototype = {
  constructor: Person,
  friends: ["Shelby", "Court"],
  sayName: function () {
    alert(this.name);
  }
};

var person1 = new Person("Nicholas", 20, "SDE");
```

### 动态原型模式
这是一种封装的模式，他将对原型的操作封装在构造函数之中。
```js
function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    if (typeof this.sayName !== "function") {
        Person.prototype.sayName = function() {
            alert(this.name);
        };
    }
}

var person1 = new Person("Nicholas", 20, "SDE");
```
> 使用动态原型模式时，不能使用对象字面量重写原型。前面已经解释过了，如果在已经创建了实例的情况下重写原型，那么就会切断现有实例与新原型之间的联系。

### 寄生构造函数模式
通常，在前面所有构造方法都不使用的情况下，可以考虑寄生构造函数。
```js
function Person(name, age, job){
    var o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function(){
        alert(this.name);
        };
    return o; 
}

var friend = new Person("Nicholas", 29, "Software Engineer");
friend.sayName();  // Nicholas
```
除了在创建对象时使用了`new`关键字，这种方式和工厂模式一模一样。同时，他也很像构造函数，只是拥有了返回值。




