---
layout: "post"
title: "「前端开发」- JS-ES6-09"
subtitle: "ECMAScript6 —— Promise"
author: "eliochiu"
date: 2022-11-15

tags: ["前端开发@Tags", "JavaScript@Languages", "ES6@Tags"]
lang: zh
catalog: true
header-image: ""
header-style: text
katex: true
---

## Promise的含义
`Promise`是异步编程的一种解决方案，相比较传统的解决方案——回调函数和事件，更合理也更强大。ES6将其写入语言标准，统一了用法，并原生提供了`Promise`对象。所谓`Promise`，简单来说就是一个容器，里面**保存了未来才会结束的事件**（**通常是一个异步的操作**）。从语法上来说，`Promise`是一个对象，从他可以获得异步操作的消息。`Promise`提供统一的API，各种异步操作都可以使用相同的方法进行处理。

`Promise`对象有以下特点：
- 对象不受外界影响。`Promise`对象代表一个异步操作，有三个状态：`Pending`（进行中）、`Fulfilled`（已成功）、`Rejected`（已失败）。只有异步操作的结果可以决定当前是哪一种状态，任何其他操作都无法改变这一状态。这也正是`Promise`这个名字的由来，他表示承诺，其他手段无法改变。
- `Promise`对象状态的改变只有两种可能：从进行中到已成功、从进行中到已失败。只要这两种情况发生，状态就凝固了，不会再发生变化，一直保持这个结果，这时候称为Resolved（已定型）。就算改变己经发生，再对`Promise`对象添加回调函数，也会立即得到这个结果。这与事件（Event)完全不同。 事件的特点是，如果错过了它，再去监听是得不到结果的。

有了`Promise`对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外`Promise`提供统一的接口，使异步操作更加容易。

## 基本用法
ES6规定，`Promise`对象是一个构造函数，用来生成`Promise`实例。
```js
var promise = new Promise(function(resolve, reject) {
  // some code...

  if (/* 异步操作成功 */) {
    resolve(value);
  } else {
    reject(value);
  }
});
```

`Promise`构造函数接受一个函数作为参数，该函数的两个参数分别是`resolve`和`reject`。它们是两个函数，由JavaScript引擎提供，不用自己部署。

`resolve`函数的作用是，将`Promise`对象的状态从“未完成”变为“成功”(即从`Pending`变为`Resolved`)，在异步操作成功时调用，并将异步操作的结果作为参数传递出去；`reject`函数的作用是，将`Promise`对象的状态从“未完成”变为“失败”(即从`Pending`变为`Rejected`), 在异步操作失败时调用，并将异步操作报出的错误作为参数传递出去。

`Promise`实例生成后，可以用`then`方法分别指定`Resovled`状态和`Rejected`状态的回调函数。
```js
promise.then(function(value) {
  // success
}, function(error) {
  // failure
});
```

`then`方法可以接受两个回调函数作为参数。第一个回调函数是`Promise`对象的状态变为`Resolved`时调用， 第二个回调函数是`Promise`对象的状态变为`Rejected`时调用。其中，第二个函数是可选的，不一定要提供。这两个函数都接受`Promise`对象传出的值作为参数。

```js
function timeout(ms) {
  return new Promise((resolve, reject) => {
    // 设置一个定时器，在ms毫秒后执行resolve函数，并将done作为参数传给resolve
    setTimeout(resolve, ms, 'done');
  });
}

timeout(100).then((value) => {
  console.log(value);
});
```

要特别注意的是，`Promise`在新建后就会立刻执行，而`then`方法指定的回调函数将在当前脚本所有同步任务执行完成后才执行。例如下面的代码：
```js
let promise = new Promise((resolve, reject) => {
  console.log("Promise");
  resolve();
});

promise.then(() => {
  console.log("Resolved");
});

console.log("Hi!");
// Promise
// Hi!
// Resolved
```

因为`then`指定的回调函数会在最后执行，因此`Resolved`最后输出。下面是一个使用`Promise`对象实例操作AJAX的例子：
```js
var getJSON = function(url) {
  var promise = new Promise((resolve, reject) => {
    var client = new XMLHttpRequest();
    client.open("GET", url);
    client.onreadystatechange = handler;
    client.responseType = "json";
    client.setRequestHeader("Accept", "application/json");
    client.send();

    function handler() {
      if (this.readyState !== 4 ) {
        return;
      }

      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    }
  });
  return promise();
}

getJSON("/post.json").then(function(json) => {
  console.log("contents: " + json);
}, function(error) {
  console.error('出错了', error)
});
```

上述的代码中，`getJSON`函数是对`XMLHttpRequest`对象的封装，用于发出一个针对JSON数据的HTTP请求，并返回一个`Promise`对象。

`resolve`函数的参数除了其他值，还可以是`Promise`实例，比如：
```js
var p1 = new Promise((resolve, reject) => {
  // ...
});

var p2 = new Promise((resolve, reject) => {
  // ...
  resolve(p1);
});
```

此时`p1`的状态就会传递给`p2`。也就是说，`p1`的状态决定了`p2`的状态 。如果`p1`的状态
是`Pending`，那么`p2`的回调函数就会等待`p1`的状态改变；如果`p1`的状态已经是`Resolved`或 `Rejected`，那么`p2`的回调函数将会立刻执行。例如：
```js
var p1 = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error('fail')), 3000);
});

var p2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve(p1), 1000);
});

p2
.then(result => console.log(result))
.catch(error => console.log(error))
```

## Promise.prototype.then()
`Promise`实例具有`then`方法，即`then`方法是定义在原型对象`Promise.prototype`上的。它的作用是为`Promise`实例添加状态改变时的回调函数。前面说过，`then`方法的第一个参数是`Resolved`状态的回调函数，第二个参数（可选）是`Rejected`状态的回调函数。

`then`方法返回的是一个新的`Promise`实例（非原来的`Promise`）实例，因此可以使用链式写法：
```js
getJSON("/post.json").then(json => {
  return json.post;
}).then(post => {
  // ...
});
```

上面的代码使用`then`方法依次指定了两个回调函数。第一个回调函数完成以后，会将返回结果作为参数传入第二个回调函数。

### 不传参
如果不传参数，则then方法返回的promise和调用then的promise的状态一致。

更具体地，如果没有onFullfilled参数并且promise的状态为fullfilled，那么then方法返回的promise和调用then方法的promise状态一致；如果没有onRejected参数并且promise状态为rejected，那么then方法返回的promise和调用then方法的promise状态一致。

可以简单地理解：如果上一个promise不处理，那就下一个promise处理。
```js
var p = new Promise(resolve => {
    throw new Error('test');
});

p
.then(
    () => {}
)
.then(
    data => console.log('resolve', data),
    err => console.log('reject', err) 
);

// 执行结果
reject Error: test
```

```js
var p = new Promise(resolve => {
    resolve('test');
});

p
.then(
    undefined, () => {}
)
.then(
    data => console.log('resolve', data),
    err => console.log('reject', err) 
);

// 执行结果
resolve test
```

### 回调不返回值
无论onFullfilled中还是onRejected中，不返回值（即默认返回undefined），则then返回的新promise的状态变为fullfilled，值为undefined。
```js
var p = new Promise(resolve => {
    resolve('test');
});

p
.then(
    () => {}
)
.then(
    data => console.log('resolve', data),
    err => console.log('reject', err) 
);

// 执行结果
resolve undefined
```

```js
var p = new Promise(resolve => {
    throw new Error('test');
});

p
.then(
    () => {},
    () => {}
)
.then(
    data => console.log('resolve', data),
    err => console.log('reject', err)
);

// 执行结果
resolve undefined
```

### 返回普通值
无论onFullfilled中还是onRejected中，返回普通值，则then返回的新promise的状态变为fullfilled，值为这个值。普通值指的是，非promise对象、非thenable对象（含有then方法的对象）。
```js
var p = new Promise(resolve => {
    resolve('test');
});

p
.then(
    () => {return 'a'},
    () => {return {b: 1}}
)
.then(
    data => console.log('resolve', data),
    err => console.log('reject', err) 
);

// 执行结果
resolve a
```

```js
var p = new Promise(resolve => {
    throw new Error('test');
});

p
.then(
    () => {return 'a'},
    () => {return {b: 1}}
)
.then(
    data => console.log('resolve', data),
    err => console.log('reject', err) 
)

// 执行结果
resolve {b: 1}
```

### 返回Promise
无论onFullfilled中还是onRejected中，返回一个promise对象，则以该promise的任务和状态返回新的promise。

```js
var p = new Promise(resolve => {
    throw new Error('test');
});

p
.then(
    () => {},
    () => {return Promise.resolve('yes');}
)
.then(
    data => console.log('resolve', data),
    err => console.log('reject', err) 
);

// 执行结果
resolve yes
```

```js
var p = new Promise(resolve => {
    resolve('test');
});

p
.then(
    () => {return Promise.reject('error');},
    () => {return {a: 1}}
)
.then(
    data => console.log('resolve', data),
    err => console.log('reject', err)
    
);

// 执行结果
reject error
```

### 返回thenable
无论onFullfilled中还是onRejected中，返回一个thenable对象，则调用该对象的then方法，该then方法接收两个参数resolvePromise和rejectPromise，如果then中调用了resolvePromise，则返回的promise状态置为fullfilled，如果then中调用了rejectPromise，或者then中抛出异常，则返回的Promise状态置为rejected，在调用resolvePromise或者rejectPromise之前，返回的promise处于pending状态。

```js
var p = new Promise((r) => {throw new Error('test')});


p
.then(
    () => ({then: function(resolvePromise, rejectPromise) {resolvePromise('resolvePromise')}}),
    e => ({then: function(resolvePromise, rejectPromise) {rejectPromise('rejectPromise')}})
)
.then(
    data => console.log('resolve', data),
    e => console.log('reject', e)
);

// 执行结果
reject rejectPromise
```

```js
var p = new Promise((r) => {throw new Error('test')});


p
.then(
    () => ({then: function(resolvePromise, rejectPromise) {}}),
    e => ({then: function(resolvePromise, rejectPromise) {}})
)
.then(
    data => console.log('resolve', data),
    e => console.log('reject', e)
);

// 执行结果
promise 处于pending状态
```

```js
var p = new Promise((r) => {throw new Error('test')});

p
.then(
    () => {return {then: function(resolvePromise, rejectPromise) {resolve('resolvePromise')}}},
    e => {return {then: function(resolvePromise, rejectPromise) {throw new Error('surprise')}}}
)
.then(
    data => console.log('resolve', data),
    e => {console.error('reject', e)}
);

// 执行结果
reject Error: surprise
```

### 抛出错误
无论onFullfilled中还是onRejected中，抛出错误，则以rejected为状态返回新promise。
```js
var p = new Promise(resolve => {resolve('test')});


p
.then(
    () => {throw new Error('1')},
    e => {return true}
)
.then(
    data => console.log('resolve', data),
    e => {console.error('reject', e)}
);

// 执行结果
reject Error: 1
```

```js
var p = new Promise((r) => {throw new Error('test')});


p
.then(
    () => {return true},
    e => {throw new Error('2')}
)
.then(
    data => console.log('resolve', data),
    e => {console.error('reject', e)}
);

// 执行结果
reject Error: 2
```

## Promise.prototype.catch()

catch方法和then方法的reject回调用法相同，如果这时候任务处于rejected状态，则直接执行catch，catch的参数就是reject的reason；如果任务处于pending状态，则注册catch回调，等到状态变成rejected时候再执行。

`Promise.prototype.catch()`方法是`then(null, rejection)`的别名，用于指定错误发生时的回调函数。
```js
getJSON("/post.json").then(function(posts) {
  // ...
}).catch(function(error) {
  // 处理GETJSON和前一个回调函数运行时发生的错误
  console.log("发生错误", error);
});
```
上面的代码中，`getJSON`方法返回一个`Promise`对象，如果该对象状态变为`Resolved`，则会调用 `then`方法指定的回调函数；如果异步操作抛出错误，状态就会变为`Rejcted`，然后调用`catch`方法指定的回调函数处理这个错误。另外，`then`方法指定的回调函数如果在运行中抛出错误，也会被`catch`方法捕获。

## Promise.all()
`Promise.all`方法用于将多个`Promise`实例包装成一个新的Promise实例。`Promise.all`方法接收一个promise数组作为参数，返回一个promise，当参数的数组中的所有promise都resolve时候，返回的promise才会resolve；而若有一个参数的数组中的promise reject，返回的promise就会reject。

`Promise.all`方法返回的promise的then的第一个参数onFullfilled回调的参数也是一个数组，对应参数中的数组promise resolve的结果。


```js
var p = Promise.all([p1, p2, p3]);
```

上面的代码中，`Promise.all`方法接受一个数组作为参数， `p1`, `p2` , `p3`都是对象的实例。如果不是，就会先调用下面讲到的`Promise.resolve`方法，将参数转为`Promise`实例 ，再进一步处理( `Promise. all`方法的参数不一定是数组，但是必须具有`Iterator`接口 ，且返回的每个成员都是 `Promise`实例)。

`p`的状态由`p1, p2, p3`决定，分为两种情况：
- 只有`p1, p2, p3`均已成功，`p`的状态才会变成已成功。此时`p1, p2, p3`的返回值组成一个数组，传递给p的回调函数。
- 只要`p1, p2, p3`其中之一失败，`p`就失败，其中第一个失败的实例会返回给`p`的回调函数。

```js
const p1 = Promise.resolve(1);
const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(2);
    }, 3000);
});

Promise.all([p1, p2])
.then(
    ([result1, result2]) => { console.log("resolved", result1, result2)},
    e => console.log("rejected", e)
);
```

上述代码创建了两个`Promise`对象，第一个对象是`Resolved`状态，第二个对象表示3s后变成`Resolved`状态，因此当两个对象都变成`Resolved`状态后，才会执行`Promise.all().then()`。

```js
const p1 = Promise.reject(1);
const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(2);
    }, 3000);
});

Promise.all([p1, p2])
.then(
    ([result1, result2]) => { console.log("resolved", result1, result2)},
    e => console.log("rejected", e)
);
```

## Promise.race()
`Promise.race`方法用于多个异步任务执行，当有其中一个任务完成或失败时候，就执行后续处理的场景。

`Promise.race`接收一个promise数组作为参数，返回一个新的promise。当参数数组中其中一个promise resolve或者reject，返回的promise就相应地改变状态。

## 同步与异步
JavaScript是单线程的编程语言，只能同一时间内做一件事，按顺序来处理事件，但是在遇到异步事件的时候，js线程并没有阻塞，还会继续执行，这又是为什么呢？

### Js单线程
JavaScript是一种单线程的编程语言，只有一个调用栈，决定了它在同一时间只能做一件事。

在代码执行的时候，通过将不同函数的执行上下文压入执行栈中来保证代码的有序执行。在执行同步代码的时候，如果遇到了异步事件，js引擎并不会一直等待其返回结果，而是会将这个事件挂起，继续执行执行栈中的其他任务。因此JS又是一个非阻塞、异步、并发式的编程语言。

### 同步
指的是在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务。可以理解为在执行完一个函数或方法之后，一直等待系统返回值或消息，这时程序是处于阻塞的，只有接收到返回的值或消息后才往下执行其他的命令。

### 异步
指的是不进入主线程，某个异步任务可以执行了，该任务才会进入主线程执行。执行完函数或方法后，不必阻塞性地等待返回值或消息，只需要向系统委托一个异步过程，那么当系统接收到返回值或消息时，系统会自动触发委托的异步过程，从而完成一个完整的流程。

同步和异步的关系就类似于我们在餐厅排队吃饭的时候，每个人必须挨个的排队来进行买饭这个操作，而在这个过程中十分无聊，这时候我们可以边排着队边玩下手机，不需多久就排到了我们买饭。这个排队过程就是JS中的一个同步操作，玩手机就像一个异步操作。同步和异步的差别就在于排队买饭和玩手机这两个任务的执行顺序的不同。

例如下面的代码：
```js
console.log(1);
setTimeout(() => {
  console.log(2)
}, 0);
setTimeout(() => {
  console.log(3)
}, 0);
setTimeout(() => {
  console.log(4)
}, 0);
console.log(5);
```
它会一次输出1， 5， 2， 3， 4，为什么会是这样的顺序呢？

## 事件循环
事件循环过程可以简单描述为：
1. 函数入栈，当 Stack 中执行到异步任务的时候，就将他丢给 WebAPIs ,接着执行同步任务,直到 Stack 为空
2. 在此期间 WebAPIs 完成这个事件，把回调函数放入 CallbackQueue (任务队列)中等待;
3. 当执行栈为空时，Event Loop 把 Callback Queue中的一个任务放入Stack中,回到第1步。

事件循环（Event Loop） 是让 JavaScript 做到既是单线程，又绝对不会阻塞的核心机制，也是 JavaScript 并发模型（Concurrency Model）的基础，是用来协调各种事件、用户交互、脚本执行、UI 渲染、网络请求等的一种机制。在执行和协调各种任务时，Event Loop 会维护自己的事件队列。

事件队列是一个存储着待执行任务的队列，其中的任务严格按照时间先后顺序执行，排在队头的任务将会率先执行，而排在队尾的任务会最后执行。事件队列每次仅执行一个任务，在该任务执行完毕之后，再执行下一个任务,一个任务开始后直至结束，不会被其他任务中断。执行栈则是一个类似于函数调用栈的运行容器，当执行栈为空时，JS 引擎便检查事件队列，如果不为空的话，事件队列便将第一个任务压入执行栈中运行。

任务队列：在JavaScript中，异步任务被分为两种，一种宏任务（MacroTask）也叫Task，一种叫微任务：

宏任务的例子很多，包括**创建主文档对象、解析HTML、执行主线（或全局）JavaScript代码，更改当前URL以及各种事件，如页面加载、输入、网络事件和定时器事件**。从浏览器的角度来看，宏任务代表一个个离散的、独立工作单元。运行完任务后，浏览器可以继续其他调度，如重新渲染页面的UI或执行垃圾回收。

而微任务是更小的任务。微任务更新应用程序的状态，但必须在浏览器任务继续执行其他任务之前执行，浏览器任务包括重新渲染页面的UI。微任务的案例包括**promise回调函数、DOM发生变化**等。微任务需要尽可能快地、通过异步方式执行，同时不能产生全新的微任务。微任务使得我们能够在重新渲染UI之前执行指定的行为，避免不必要的UI重绘，UI重绘会使应用程序的状态不连续。

当当前执行栈中的事件执行完毕后，**js 引擎首先会判断微任务对列中是否有任务可以执行，如果有就将微任务队首的事件压入栈中执行**。**当微任务对列中的任务都执行完成后再去判断宏任务对列中的任务。每次宏任务执行完毕，都会去判断微任务队列是否产生新任务，若存在就优先执行微任务，否则按序执行宏任务。**

事件循环通常至少需要两个任务队列：**宏任务队列和微任务队列**。**两种队列在同一时刻都只执行一个任务**。

```js
console.log("script start");

setTimeout(function () {
  console.log("setTimeout");
}, 0);

Promise.resolve()
  .then(function () {
    console.log("promise1");
  })
  .then(function () {
    console.log("promise2");
  });

console.log("script end");
```
按照上面的步骤，分析执行过程：
1. 宏任务：执行整体代码（相当于`<script>`中的代码）：
  - 输出: script start
  - 遇到 setTimeout，加入宏任务队列，当前宏任务队列(setTimeout)
  - 遇到 promise，加入微任务，当前微任务队列(promise1)
  - 输出：script end
  
2. 微任务：执行微任务队列（promise1）
  - 输出：promise1，then 之后产生一个微任务，加入微任务队列，当前微任务队列（promise2）
  - 执行 then，输出promise2
  - 执行渲染操作，更新界面。
  - 宏任务：执行 setTimeout
  - 输出：setTimeout

> new Promise(..)中的代码，也是同步代码，会立即执行。只有then之后的代码，才是异步执行的代码，是一个微任务。

```js
console.log("script start");

setTimeout(function () {
  console.log("timeout1");
}, 10);

new Promise((resolve) => {
  console.log("promise1");
  resolve();
  setTimeout(() => console.log("timeout2"), 10);
}).then(function () {
  console.log("then1");
});

console.log("script end");
```
按照上面的步骤，分析执行过程：
1. 宏任务：执行整体代码（相当于`<script>`中的代码）：
  - 输出: script start
  - 遇到 setTimeout，加入宏任务队列，当前宏任务队列(timeout1)
  - promise内的代码是同步代码，输出：promise1
  - 遇到 promise，加入微任务，当前微任务队列(then1)
  - 遇到setTimeout，加入宏任务，当前宏任务队列（timeout1， timeout2）
  - 输出：script end
  
2. 微任务：执行微任务队列（then1）
  - 输出：then1
  - 执行渲染操作，更新界面。
  - 宏任务：执行timeout1
  - 输出：timeout1 
  - 宏任务：执行timeout2
  - 输出：timeout2




