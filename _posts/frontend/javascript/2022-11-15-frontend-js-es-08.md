---
layout: "post"
title: "「前端开发」- JS-ES6-08"
subtitle: "ECMAScript6 —— Proxy"
author: "eliochiu"
date: 2022-11-15

tags: ["前端开发@Tags", "JavaScript@Languages", "ES6@Tags"]
lang: zh
catalog: true
header-image: ""
header-style: text
katex: true
---

## 概述
`Proxy`用于修改某些操作的默认行为，等同于在语言层面进行修改，所以属于一种元编程，即对编程语言进行编程。`Proxy`可以理解为在目标对象前架设一个“拦截”层，外界对该对象的访问必须要先通过这层拦截，因此提供了一种机制可以对外界的访问进行过滤和改写。`Proxy`可以理解为代理某些操作，可以移为代理器。

```js
var obj = new Proxy({}, {
  get: function (target, key, receiver) {
    console.log(`getting ${key}!`);
    return Reflect.get(target, key, receiver);
  },
  set: function (target, key, value, receiver) {
    console.log(`setting ${key}!`);
    return Reflect.set(target, key, value, receiver);
  }
});
```

上述代码对空对象进行了一层拦截，重定义了属性的读取（get）和设置（set）行为。运行结果如下：
```js
obj.count = 1;
// setting count!

++obj.count;
// getting count!
// setting count!
// 2
```
上述代码说明，`Proxy`重载了点运算符，用自己的语言覆盖了语言的原始定义。ES6提供了原生的`Proxy`构造函数，用于生成`Proxy`实例：
```js
var proxy = new Proxy(target, handler);
```
其中，`new Proxy`用于生成`Proxy`实例，`target`参数表示要拦截的对象，`handler`参数也是一个对象，用来定义拦截的行为。例如：
```js
var proxy = new Proxy({}, {
  get: function(target, property) {
    return 35;
  }
});

proxy.time; // 35
proxy.name; // 35
```
上述代码中，构造函数`Proxy`接受了两个参数：
- 第一个参数是要代理的目标对象（上例是一个空对象）
- 第二个参数是一个配置对象，对于每一个被代理的操作，需要提供一个对应的处理函数。上面的代码中，配置对象有一个get方法用来拦截对目标对象属性的访问请求。get方法的两个参数分别是目标对象和所要访问的属性。可以看到，由于拦截函数总是返回35，所以访问任何属性都将得到35。

> 注意：要想`Proxy`起作用，必须针对`Proxy`实例操作，而不是目标对象进行操作。

如果`handler`没有设置任何拦截，就等于直通原对象。
```js
var target = {};
var handler = {};
var proxy = new Proxy(target, handler);
proxy.a = 'b';
target.a; // 'b'
```

## 


